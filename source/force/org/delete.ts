/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Delete } from '@salesforce/plugin-org/lib/commands/force/org/delete';
import { NoRequiredAttribute } from '../../errors';

export type Output = {
  orgId: string;
  username: string;
};

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends Delete {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUsername: string, devHubUserName: string): string[] {
  if (!targetUsername) {
    throw new NoRequiredAttribute('targetUsername', 'sfdx force:org:delete');
  }
  if (!devHubUserName) {
    throw new NoRequiredAttribute('devHubUserName', 'sfdx force:org:delete');
  }

  const args: string[] = [];
  args.push('--targetusername', targetUsername);
  args.push('--targetdevhubusername', devHubUserName);
  args.push('--noprompt');
  args.push('--json');

  return args;
}

export default async function (targetUsername: string, devHubUserName: string): Promise<Output> {
  return await Command.run(getArgs(targetUsername, devHubUserName));
}
