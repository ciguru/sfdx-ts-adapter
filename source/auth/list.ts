/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import AuthList from '@salesforce/plugin-auth/lib/commands/auth/list';
import { Authorization } from '@salesforce/core';

export type Output = Authorization[];

// Suppress UX logs and error handler for command
import UX from '../sfdx-suppressed-ux';
class Command extends AuthList {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(): string[] {
  return ['--json'];
}

export default async function (): Promise<Output> {
  return await Command.run(getArgs());
}
