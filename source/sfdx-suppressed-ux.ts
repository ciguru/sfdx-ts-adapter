/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { UX } from '@salesforce/command';
import { Logger } from '@salesforce/command/node_modules/@salesforce/core';

const logger = new Logger('UI');

class SuppressedOutput extends UX {
  logJson(): UX {
    return this;
  }
}

// Customize SFDX command to suppress JSON outputs
const ux = new SuppressedOutput(logger, false);
export default ux;
