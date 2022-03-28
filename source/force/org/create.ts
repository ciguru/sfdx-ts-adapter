/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Create, ScratchOrgProcessObject } from '@salesforce/plugin-org/lib/commands/force/org/beta/create';
import { IncorrectPath, NoRequiredAttribute } from '../../errors';
import { existsSync } from 'fs';

export type Output = {
  edition?: string;
  devHubId?: string;
  instanceUrl?: string;
  createdDate?: string;
  alias?: string;
  orgId?: string;
  username?: string;
  status?: string;
  expirationDate?: string;
};

export type OverrideDefinition = {
  adminEmail?: string;
};

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends Create {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(
  alias: string,
  isNoAncestors: boolean,
  definitionFile: string,
  devHubUserName: string,
  duration: number,
  overrideDefinition?: OverrideDefinition,
): string[] {
  if (!alias) {
    throw new NoRequiredAttribute('alias', 'sfdx force:org:create');
  }
  if (!definitionFile) {
    throw new NoRequiredAttribute('definitionFile', 'sfdx force:org:create');
  }
  if (!devHubUserName) {
    throw new NoRequiredAttribute('devHubUserName', 'sfdx force:org:create');
  }
  if (!duration || duration < 1 || duration > 30) {
    throw new NoRequiredAttribute('duration', 'sfdx force:org:create');
  }

  if (!existsSync(definitionFile)) {
    throw new IncorrectPath(definitionFile);
  }

  const args: string[] = [];
  args.push('--setalias', alias);
  if (isNoAncestors) {
    args.push('--noancestors');
  }
  args.push('--durationdays', `${duration}`);
  args.push('--definitionfile', definitionFile);
  args.push('--targetdevhubusername', devHubUserName);
  args.push('--type', 'scratch');
  args.push('--wait', '60');
  args.push('--json');
  if (overrideDefinition?.adminEmail) {
    args.push(`adminEmail=${overrideDefinition.adminEmail}`);
  }

  return args;
}

export async function scratch(
  alias: string,
  isNoAncestors: boolean,
  definitionFile: string,
  devHubUserName: string,
  duration: number,
  overrideDefinition?: OverrideDefinition,
): Promise<Output> {
  const result: ScratchOrgProcessObject = await Command.run(
    getArgs(alias, isNoAncestors, definitionFile, devHubUserName, duration, overrideDefinition),
  );

  return {
    orgId: result.authFields?.orgId,
    devHubId: result.authFields?.devHubUsername,
    instanceUrl: result.authFields?.instanceUrl,
    username: result.authFields?.username,
    status: result.scratchOrgInfo.Status,
    expirationDate: result.authFields?.expirationDate,
    edition: result.scratchOrgInfo.Edition,
    createdDate: result.scratchOrgInfo.CreatedDate,
    alias: result.authFields?.alias,
  };
}
