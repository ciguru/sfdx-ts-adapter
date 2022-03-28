/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { existsSync } from 'fs';
import AuthSfdxUrlStore from '@salesforce/plugin-auth/lib/commands/auth/sfdxurl/store';
import { AuthFields } from '@salesforce/core';
import { NoRequiredAttribute, IncorrectPath } from '../errors';

export type Output = AuthFields;

// Suppress UX logs and error handler for command
import UX from '../sfdx-suppressed-ux';
class Command extends AuthSfdxUrlStore {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(alias: string, sfdxUrlFile: string): string[] {
  if (!alias) {
    throw new NoRequiredAttribute('alias', 'sfdx auth:sfdxurl:store');
  }
  if (!sfdxUrlFile) {
    throw new NoRequiredAttribute('sfdxUrlFile', 'sfdx auth:sfdxurl:store');
  }

  if (!existsSync(sfdxUrlFile)) {
    throw new IncorrectPath(sfdxUrlFile);
  }

  return ['--setalias', alias, '--sfdxurlfile', sfdxUrlFile, '--json'];
}

export default async function (alias: string, sfdxUrlFile: string): Promise<Output> {
  return await Command.run(getArgs(alias, sfdxUrlFile));
}
