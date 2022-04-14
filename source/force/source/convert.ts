/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Convert } from '@salesforce/plugin-source/lib/commands/force/source/convert';
import { ConvertCommandResult } from '@salesforce/plugin-source/lib/formatters/convertResultFormatter';
import { NoRequiredAttribute } from '../../errors';

export type Output = ConvertCommandResult;

// Suppress UX logs and error handler for command
import UX from '../../sfdx-suppressed-ux';
class Command extends Convert {
  // We have to override standard loggers => suppress ts error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ux = UX;
  protected async catch(err: any): Promise<void> {
    throw err;
  }
}

function getArgs(outputDir: string, sourcePath?: string[]): string[] {
  if (!outputDir) {
    throw new NoRequiredAttribute('outputDir', 'sfdx force:source:convert');
  }

  const args: string[] = [];
  args.push('--outputdir', outputDir);
  if (sourcePath && sourcePath.length > 0) {
    args.push('--sourcepath', sourcePath.join(','));
  }
  args.push('--json');

  return args;
}

export default async function (outputDir: string, sourcePath?: string[]): Promise<Output> {
  return await Command.run(getArgs(outputDir, sourcePath));
}
