/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import ForceApexTestRun from '@salesforce/plugin-apex/lib/commands/force/apex/test/run';
import { ApexTestRunError, NoRequiredAttribute } from '../../../errors';

export type Output = { [k: string]: any };
export type TestLevel = 'RunLocalTests' | 'RunAllTestsInOrg' | 'RunSpecifiedTests';

// Suppress UX logs and error handler for command
import UX from '../../../sfdx-suppressed-ux';
class Command extends ForceApexTestRun {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, outputDir: string, testLevel: TestLevel): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:apex:test:run');
  }
  if (!outputDir) {
    throw new NoRequiredAttribute('outputDir', 'sfdx force:apex:test:run');
  }
  if (!testLevel) {
    throw new NoRequiredAttribute('testLevel', 'sfdx force:apex:test:run');
  }

  return [
    '--codecoverage',
    '--outputdir',
    outputDir,
    '--testlevel',
    testLevel,
    '--resultformat',
    'json',
    '--targetusername',
    targetUserName,
    '--wait',
    '30',
    '--json',
  ];
}

export default async function (targetUserName: string, outputDir: string, testLevel: TestLevel): Promise<Output> {
  const result = await Command.run(getArgs(targetUserName, outputDir, testLevel));

  if (result?.summary?.outcome === 'Passed') {
    return result.summary;
  } else if (result?.summary) {
    throw new ApexTestRunError('Apex Test Run Error', result.summary);
  } else {
    throw new ApexTestRunError('Unexpected Apex Test Run Error');
  }
}
