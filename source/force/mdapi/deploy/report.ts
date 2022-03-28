/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Report } from '@salesforce/plugin-source/lib/commands/force/mdapi/beta/deploy/report';
import { MdDeployResult } from '@salesforce/plugin-source/lib/formatters/mdapi/mdDeployResultFormatter';
import { NoRequiredAttribute } from '../../../errors';

export type Output = MdDeployResult;

// Suppress UX logs and error handler for command
import UX from '../../../sfdx-suppressed-ux';
class Command extends Report {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, jobId: string, waitTimeout?: number): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:mdapi:deploy:report');
  }
  if (!jobId) {
    throw new NoRequiredAttribute('testLevel', 'sfdx force:mdapi:deploy:report');
  }

  const args = [];
  args.push('--targetusername', targetUserName);
  args.push('--jobid', jobId);
  args.push('--wait', `${waitTimeout || 30}`);
  args.push('--json');

  return args;
}

export default async function (targetUserName: string, jobId: string, waitTimeout?: number): Promise<Output> {
  return await Command.run(getArgs(targetUserName, jobId, waitTimeout));
}
