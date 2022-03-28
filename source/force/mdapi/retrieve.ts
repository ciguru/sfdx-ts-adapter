/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { MdapiRetrieveCommand } from 'salesforce-alm/dist/commands/force/mdapi/retrieve';
import { IncorrectPath, NoRequiredAttribute } from '../../errors';
import { existsSync } from 'fs';

export type Output = any;

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends MdapiRetrieveCommand {
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
  retrieveTargetDir: string,
  manifestFile?: string,
  packageNames?: string[],
): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:mdapi:retrieve');
  }
  if (!retrieveTargetDir) {
    throw new NoRequiredAttribute('retrieveTargetDir', 'sfdx force:mdapi:retrieve');
  }

  const args = [];
  if (manifestFile) {
    if (!existsSync(manifestFile)) {
      throw new IncorrectPath(manifestFile);
    }
    args.push('--unpackaged', manifestFile);
    args.push('--singlepackage');
  } else if (packageNames && packageNames.length > 0) {
    args.push('--packagenames', packageNames.join(','));
    // TODO Check multiple packages and --singlepackage
  } else {
    throw new NoRequiredAttribute('manifestFile or packageNames', 'sfdx force:mdapi:retrieve');
  }

  args.push('--retrievetargetdir', retrieveTargetDir);
  args.push('--targetusername', targetUserName);
  args.push('--wait', '-1');
  args.push('--json');

  return args;
}

export default async function (
  targetUserName: string,
  retrieveTargetDir: string,
  manifestFile?: string,
  packageNames?: string[],
): Promise<Output> {
  return await Command.run(getArgs(targetUserName, retrieveTargetDir, manifestFile, packageNames));
}
