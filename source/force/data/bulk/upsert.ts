/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import ForceDataBulkUpsert from '@salesforce/plugin-data/lib/commands/force/data/bulk/upsert';
import { JobInfo } from 'jsforce';
import { BulkResult } from '@salesforce/plugin-data/lib/batcher';
import { ApexDataBulkUpsertError, IncorrectPath, NoRequiredAttribute } from '../../../errors';
import { existsSync } from 'fs';

export type Output = JobInfo[] | BulkResult[];

// Suppress UX logs and error handler for command
import UX from '../../../sfdx-suppressed-ux';
class Command extends ForceDataBulkUpsert {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, csvFile: string, externalId: string, sObjectType: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:data:bulk:upsert');
  }
  if (!externalId) {
    throw new NoRequiredAttribute('externalId', 'sfdx force:data:bulk:upsert');
  }
  if (!sObjectType) {
    throw new NoRequiredAttribute('sObjectType', 'sfdx force:data:bulk:upsert');
  }
  if (!csvFile) {
    throw new NoRequiredAttribute('csvFile', 'sfdx force:data:bulk:upsert');
  }

  if (!existsSync(csvFile)) {
    throw new IncorrectPath(csvFile);
  }

  const args: string[] = [];
  args.push('--csvfile', csvFile);
  args.push('--externalid', externalId);
  args.push('--sobjecttype', sObjectType);
  args.push('--targetusername', targetUserName);
  args.push('--wait', '30');
  args.push('--json');

  return args;
}

export default async function (
  targetUserName: string,
  csvFile: string,
  externalId: string,
  sObjectType: string,
  allowNoMoreFailedBatches?: number,
  allowNoMoreFailedRecords?: number,
): Promise<Output> {
  allowNoMoreFailedBatches = allowNoMoreFailedBatches || 0;
  allowNoMoreFailedRecords = allowNoMoreFailedRecords || 0;
  const result = (await Command.run(getArgs(targetUserName, csvFile, externalId, sObjectType))) || [];

  if (result.length !== 1) {
    throw new ApexDataBulkUpsertError('Unexpected Error During Bulk Data Upsert', result);
  } else if (Number(result[0].numberBatchesFailed) > allowNoMoreFailedBatches) {
    throw new ApexDataBulkUpsertError(
      `Bulk Data Upsert: Failed Batches ${result[0].numberBatchesFailed} (allowed ${allowNoMoreFailedBatches})`,
      result[0],
    );
  } else if (Number(result[0].numberRecordsFailed) > allowNoMoreFailedRecords) {
    throw new ApexDataBulkUpsertError(
      `Bulk Data Upsert: Failed Records ${result[0].numberRecordsFailed} (allowed ${allowNoMoreFailedRecords})`,
      result[0],
    );
  } else {
    return result[0];
  }
}
