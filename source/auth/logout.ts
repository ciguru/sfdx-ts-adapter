/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import AuthLogout from '@salesforce/plugin-auth/lib/commands/auth/logout';
import { NoRequiredAttribute } from '../errors';

export type Output = string[];

// Suppress UX logs and error handler for command
import UX from '../sfdx-suppressed-ux';
class Command extends AuthLogout {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx auth:logout');
  }
  return ['--targetusername', targetUserName, '--noprompt', '--json'];
}

export default async function (targetUserName: string): Promise<Output> {
  return await Command.run(getArgs(targetUserName));
}
