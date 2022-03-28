/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

type AnyObject = { [k: string]: any } | undefined;

export class SfdxAdapterError extends Error {
  logs?: string | undefined;
  summary?: AnyObject | undefined;
  constructor(name: string, message: string, opts?: { stack?: string; logs?: string; summary?: AnyObject }) {
    super(message);
    this.name = name;
    this.stack = opts?.stack || undefined;
    this.logs = opts?.logs || undefined;
    this.summary = opts?.summary || undefined;
  }
}

export class NoRequiredAttribute extends SfdxAdapterError {
  constructor(attr: string, command: string) {
    super('NoRequiredAttribute', `Attribute '${attr}' is required for '${command}' command.`);
  }
}

export class IncorrectPath extends SfdxAdapterError {
  constructor(path: string) {
    super('IncorrectPath', `There is no file '${path}'`);
  }
}

export class ApexExecutionError extends SfdxAdapterError {
  constructor(
    name: 'ApexError' | 'ApexExecutionError' | 'ApexCompilingError',
    message: string,
    stack: string,
    logs?: string,
  ) {
    super(name, message, { stack, logs });
  }
}

export class ApexTestRunError extends SfdxAdapterError {
  constructor(message: string, summary?: AnyObject) {
    super('ApexTestRunError', message, { summary });
  }
}

export class ApexDataBulkUpsertError extends SfdxAdapterError {
  constructor(message: string, summary?: AnyObject) {
    super('ApexDataBulkUpsertError', message, { summary });
  }
}
