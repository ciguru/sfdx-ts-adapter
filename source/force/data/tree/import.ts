/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import ForceDataTreeImport from '@salesforce/plugin-data/lib/commands/force/data/tree/import';
import { JsonMap } from '@salesforce/ts-types';
import { IncorrectPath, NoRequiredAttribute } from '../../../errors';
import { existsSync } from 'fs';

// copied from @salesforce/plugin-data/lib/commands/force/data/tree/import
export interface ImportResult {
  refId: string;
  type: string;
  id: string;
}

export type Output = ImportResult[] | JsonMap;

// Suppress UX logs and error handler for command
import UX from '../../../sfdx-suppressed-ux';
class Command extends ForceDataTreeImport {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(targetUserName: string, planFile: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:data:tree:import');
  }
  if (!planFile) {
    throw new NoRequiredAttribute('planFile', 'sfdx force:data:tree:import');
  }

  if (!existsSync(planFile)) {
    throw new IncorrectPath(planFile);
  }

  const args: string[] = [];
  args.push('--plan', planFile);
  args.push('--targetusername', targetUserName);
  args.push('--json');

  return args;
}

export default async function (targetUserName: string, planFile: string): Promise<Output> {
  return await Command.run(getArgs(targetUserName, planFile));
}
