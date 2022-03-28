/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { existsSync } from 'fs';
import ForceApexExecute from '@salesforce/plugin-apex/lib/commands/force/apex/execute';
import { IncorrectPath, NoRequiredAttribute, ApexExecutionError } from '../../errors';

export interface Output {
  logs: string;
}

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends ForceApexExecute {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, apexCodeFile: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:apex:execute');
  }
  if (!apexCodeFile) {
    throw new NoRequiredAttribute('sfdxUrlFile', 'sfdx force:apex:execute');
  }

  if (!existsSync(apexCodeFile)) {
    throw new IncorrectPath(apexCodeFile);
  }

  return ['--apexcodefile', apexCodeFile, '--targetusername', targetUserName, '--json'];
}

export default async function (targetUserName: string, apexCodeFile: string): Promise<Output> {
  const result = await Command.run(getArgs(targetUserName, apexCodeFile));

  if (!result) {
    throw new ApexExecutionError('ApexError', 'Unexpected error', '');
  } else if (result.success && result.compiled) {
    return {
      logs: result.logs,
    };
  } else if (!result.compiled) {
    throw new ApexExecutionError(
      'ApexCompilingError',
      result.error?.message || 'Apex Compiling error',
      result.error?.stack || '',
    );
  } else {
    throw new ApexExecutionError(
      'ApexExecutionError',
      result.exceptionMessage || 'Apex Execution error',
      result.exceptionStackTrace,
      result.logs,
    );
  }
}
