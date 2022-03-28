/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import AuthAccessTokenStore from '@salesforce/plugin-auth/lib/commands/auth/accesstoken/store';
import { AuthFields } from '@salesforce/core';
import { NoRequiredAttribute } from '../errors';

export type Output = AuthFields;

// Suppress UX logs and error handler for command
import UX from '../sfdx-suppressed-ux';
class Command extends AuthAccessTokenStore {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(alias: string, instanceUrl: string): string[] {
  if (!alias) {
    throw new NoRequiredAttribute('alias', 'sfdx auth:accesstoken:store');
  }
  if (!instanceUrl) {
    throw new NoRequiredAttribute('instanceUrl', 'sfdx auth:accesstoken:store');
  }
  return ['--setalias', alias, '--instanceurl', instanceUrl, '--noprompt', '--json'];
}

export default async function (alias: string, instanceUrl: string, accessToken: string): Promise<Output> {
  // backup access token and override it
  const accessTokenBackup = process.env.SFDX_ACCESS_TOKEN;
  if (accessToken) {
    process.env.SFDX_ACCESS_TOKEN = accessToken;
  } else {
    throw new NoRequiredAttribute('accessToken', 'sfdx auth:accesstoken:store');
  }

  try {
    const authData: Output = await Command.run(getArgs(alias, instanceUrl));
    // Restore envs
    process.env.SFDX_ACCESS_TOKEN = accessTokenBackup;
    return authData;
  } catch (e) {
    // Anyway Restore envs
    process.env.SFDX_ACCESS_TOKEN = accessTokenBackup;
    throw e;
  }
}
