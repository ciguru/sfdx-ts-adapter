/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { PackageInstallCommand } from 'salesforce-alm/dist/commands/force/package/install';
import { NoRequiredAttribute } from '../../errors';

export type Output = any;

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends PackageInstallCommand {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, packageId: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:package:install');
  }
  if (!packageId) {
    throw new NoRequiredAttribute('packageId', 'sfdx force:package:install');
  }

  const args = [];
  args.push('--apexcompile', 'all'); //todo
  args.push('--publishwait', '60');
  args.push('--package', packageId);
  args.push('--noprompt');
  args.push('--securitytype', 'AdminsOnly');
  args.push('--targetusername', targetUserName);
  args.push('--wait', '60');
  args.push('--json');

  return args;
}

export default async function (targetUserName: string, packageId: string): Promise<Output> {
  return await Command.run(getArgs(targetUserName, packageId));
}
