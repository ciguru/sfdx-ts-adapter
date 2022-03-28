/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { MdapiDeployCommand } from 'salesforce-alm/dist/commands/force/mdapi/deploy';
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve/lib/src/client/types';
import { IncorrectPath, NoRequiredAttribute } from '../../errors';
import { existsSync } from 'fs';

export type Output = any;
export type TestLevel = 'NoTestRun' | 'RunLocalTests' | 'RunAllTestsInOrg' | 'RunSpecifiedTests';

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends MdapiDeployCommand {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(
  targetUserName: string,
  testLevel: TestLevel,
  isCheckOnly: boolean,
  deployDir?: string,
  deployZip?: string,
): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:mdapi:deploy');
  }
  if (!testLevel) {
    throw new NoRequiredAttribute('testLevel', 'sfdx force:mdapi:deploy');
  }

  const args = [];
  if (isCheckOnly) {
    args.push('--checkonly');
  }
  if (deployDir) {
    if (!existsSync(deployDir)) {
      throw new IncorrectPath(deployDir);
    }
    args.push('--deploydir', deployDir);
  } else if (deployZip) {
    if (!existsSync(deployZip)) {
      throw new IncorrectPath(deployZip);
    }
    args.push('--zipfile', deployZip);
  } else {
    throw new NoRequiredAttribute('deployDir or deployZip', 'sfdx force:mdapi:deploy');
  }

  args.push('--testlevel', testLevel);
  args.push('--targetusername', targetUserName);
  args.push('--singlepackage');
  args.push('--json');

  return args;
}

export default async function (
  targetUserName: string,
  testLevel: TestLevel,
  isCheckOnly: boolean,
  deployDir?: string,
  deployZip?: string,
): Promise<MetadataApiDeployStatus> {
  return await Command.run(getArgs(targetUserName, testLevel, isCheckOnly, deployDir, deployZip));
}
