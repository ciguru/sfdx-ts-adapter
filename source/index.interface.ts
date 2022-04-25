/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import AuthAccessTokenStore from './auth/access-token';
import AuthSfdxUrlStore from './auth/sfdx-url';
import AuthList from './auth/list';
import AuthLogout from './auth/logout';
import ForceApexExecute from './force/apex/execute';
import ForceApexTest from './force/apex/test/run';
import ForceDataBulkDelete from './force/data/bulk/delete';
import ForceDataBulkUpsert from './force/data/bulk/upsert';
import ForceDataTreeImport from './force/data/tree/import';
import * as ForceDataSoql from './force/data/soql';
import ForceMdApiDeploy from './force/mdapi/deploy';
import ForceMdApiDeployReport from './force/mdapi/deploy/report';
import ForceMdApiRetrieve from './force/mdapi/retrieve';
import * as ForceOrgCreate from './force/org/create';
import ForceOrgDelete from './force/org/delete';
import ForceOrgDisplay from './force/org/display';
import ForcePackageInstall from './force/package/install';
import ForceSourcePush from './force/source/push';
import ForceSourceConvert from './force/source/convert';

export default interface SfdxCommands {
  auth: {
    accessToken: {
      store: typeof AuthAccessTokenStore;
    };
    sfdxUrl: {
      store: typeof AuthSfdxUrlStore;
    };
    list: typeof AuthList;
    logout: typeof AuthLogout;
  };
  force: {
    apex: {
      execute: typeof ForceApexExecute;
      test: {
        run: typeof ForceApexTest;
      };
    };
    data: {
      bulk: {
        delete: typeof ForceDataBulkDelete;
        upsert: typeof ForceDataBulkUpsert;
      };
      tree: {
        import: typeof ForceDataTreeImport;
      };
      soql: {
        queryCsv: typeof ForceDataSoql.queryCsv;
      };
    };
    mdApi: {
      deploy: typeof ForceMdApiDeploy;
      deployReport: typeof ForceMdApiDeployReport;
      retrieve: typeof ForceMdApiRetrieve;
    };
    org: {
      create: {
        scratch: typeof ForceOrgCreate.scratch;
      };
      delete: typeof ForceOrgDelete;
      display: typeof ForceOrgDisplay;
    };
    package: {
      install: typeof ForcePackageInstall;
    };
    source: {
      push: typeof ForceSourcePush;
      convert: typeof ForceSourceConvert;
    };
  };
}
