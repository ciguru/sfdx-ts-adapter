/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { appendFileSync, writeFileSync, cpSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { EOL } from 'os';
import { DataSoqlQueryCommand } from '@salesforce/plugin-data/lib/commands/force/data/soql/query';
import { Logger } from '@salesforce/command/node_modules/@salesforce/core';
import { NoRequiredAttribute, SfdxAdapterError } from '../../errors';
import { UX } from '@salesforce/command';
import { CliUx } from '@oclif/core';

export type Output = void;

function getCsvArgs(targetUserName: string, query: string): string[] {
  if (!targetUserName) {
    throw new NoRequiredAttribute('targetUserName', 'sfdx force:data:soql:query');
  }
  if (!query) {
    throw new NoRequiredAttribute('query', 'sfdx force:data:soql:query');
  }

  const args: string[] = [];
  args.push('--query', query);
  args.push('--resultformat', 'csv');
  args.push('--targetusername', targetUserName);

  return args;
}

export async function queryCsv(
  targetUserName: string,
  csvFile: string,
  query: string,
  replaceCsvHeader?: string,
): Promise<Output> {
  // Forward UX logs (CSV file) to file
  const logger = new Logger('UI');
  const tmpCsvFileName = join(process.cwd(), `data_${Date.now()}.csv`);
  class SuppressedOutput extends UX {
    constructor(logger: Logger, isOutputEnabled?: boolean, ux?: typeof CliUx) {
      super(logger, isOutputEnabled, ux);
    }
    logJson(): UX {
      return this;
    }
    log(...args: string[]): UX {
      args.forEach((str) => {
        if (existsSync(tmpCsvFileName)) {
          // append CSV data
          appendFileSync(tmpCsvFileName, `${str}${EOL}`, { encoding: 'utf-8' });
        } else {
          // It's header
          if (replaceCsvHeader) {
            // Replace header
            writeFileSync(tmpCsvFileName, `${replaceCsvHeader}${EOL}`, { encoding: 'utf-8' });
          } else {
            // Leave header
            writeFileSync(tmpCsvFileName, `${str}${EOL}`, { encoding: 'utf-8' });
          }
        }
      });
      return this;
    }
  }

  class Command extends DataSoqlQueryCommand {
    // We have to override standard loggers => suppress ts error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ux = new SuppressedOutput(logger, false);
    protected async catch(err: any): Promise<void> {
      throw err;
    }
  }

  if (!csvFile) {
    throw new NoRequiredAttribute('csvFile', 'sfdx force:data:soql:query');
  }

  const result = await Command.run(getCsvArgs(targetUserName, query));
  if (result?.done) {
    cpSync(tmpCsvFileName, csvFile);
    rmSync(tmpCsvFileName);
  } else {
    rmSync(tmpCsvFileName);
    throw new SfdxAdapterError('UnexpectedError', 'Unexpected Error');
  }
}
