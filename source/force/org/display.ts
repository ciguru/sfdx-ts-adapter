/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { OrgDisplayCommand } from '@salesforce/plugin-org/lib/commands/force/org/display';
import { OrgDisplayReturn } from '@salesforce/plugin-org/lib/shared/orgTypes';
import { Output as CreateOutput } from './create';
import { NoRequiredAttribute } from '../../errors';

export type Output = CreateOutput & {
  accessToken?: string;
  refreshToken?: string;
};

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends OrgDisplayCommand {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUsername: string): string[] {
  if (!targetUsername) {
    throw new NoRequiredAttribute('targetUsername', 'sfdx force:org:display');
  }

  const args: string[] = [];
  args.push('--targetusername', targetUsername);
  args.push('--verbose');
  args.push('--json');

  return args;
}

export default async function (targetUsername: string): Promise<Output> {
  const result: OrgDisplayReturn = await Command.run(getArgs(targetUsername));

  return {
    orgId: result.id,
    devHubId: result.devHubId,
    instanceUrl: result.instanceUrl,
    username: result.username,
    status: result.status,
    expirationDate: result.expirationDate,
    edition: result.edition,
    createdDate: result.createdDate,
    alias: result.alias,
    accessToken: result.accessToken,
    refreshToken: result.sfdxAuthUrl?.replace(/^force:\/\/[0-9A-Za-z_.]*:[0-9A-Z]*:/, '').replace(/@.*/, ''),
  };
}
