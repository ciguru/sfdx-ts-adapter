/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Output as AuthAccessTokenStore } from './auth/access-token';
import { Output as AuthSfdxUrlStore } from './auth/sfdx-url';
import { Output as AuthList } from './auth/list';
import { Output as AuthLogout } from './auth/logout';
import { Output as ForceApexExecute } from './force/apex/execute';
import { Output as ForceApexTest } from './force/apex/test/run';
import { Output as ForceDataBulkUpsert } from './force/data/bulk/upsert';
import { Output as ForceDataTreeImport } from './force/data/tree/import';
import { Output as ForceMdApiDeploy } from './force/mdapi/deploy';
import { Output as ForceMdApiDeployReport } from './force/mdapi/deploy/report';
import { Output as ForceMdApiRetrieve } from './force/mdapi/retrieve';
import { Output as ForceOrgCreate } from './force/org/create';
import { Output as ForceOrgDelete } from './force/org/delete';
import { Output as ForceOrgDisplay } from './force/org/display';
import { Output as ForcePackageInstall } from './force/package/install';
import { Output as ForceSourcePush } from './force/source/push';
import { Output as ForceSourceConvert } from './force/source/convert';

export default interface SfdxOutputs {
  auth: {
    accessToken: {
      store: AuthAccessTokenStore;
    };
    sfdxUrl: {
      store: AuthSfdxUrlStore;
    };
    list: AuthList;
    logout: AuthLogout;
  };
  force: {
    apex: {
      execute: ForceApexExecute;
      test: {
        run: ForceApexTest;
      };
    };
    data: {
      bulk: {
        upsert: ForceDataBulkUpsert;
      };
      tree: {
        import: ForceDataTreeImport;
      };
    };
    mdApi: {
      deploy: ForceMdApiDeploy;
      deployReport: ForceMdApiDeployReport;
      retrieve: ForceMdApiRetrieve;
    };
    org: {
      create: {
        scratch: ForceOrgCreate;
      };
      delete: ForceOrgDelete;
      display: ForceOrgDisplay;
    };
    package: {
      install: ForcePackageInstall;
    };
    source: {
      push: ForceSourcePush;
      convert: ForceSourceConvert;
    };
  };
}
