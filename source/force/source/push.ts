/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import Push from '@salesforce/plugin-source/lib/commands/force/source/push';
import { PushResponse } from '@salesforce/plugin-source/lib/formatters/source/pushResultFormatter';
import { NoRequiredAttribute } from '../../errors';

export type Output = PushResponse;

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends Push {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, isForceOverwrite?: boolean): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:source:push');
  }

  const args: string[] = [];
  args.push('--targetusername', targetUserName);
  if (isForceOverwrite) {
    args.push('--forceoverwrite');
  }
  args.push('--wait', '60');
  args.push('--json');

  return args;
}

export default async function (targetUserName: string, isForceOverwrite?: boolean): Promise<Output> {
  return await Command.run(getArgs(targetUserName, isForceOverwrite));
}
