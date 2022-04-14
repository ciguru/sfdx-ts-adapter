/*******************************************************************************
 * Copyright (c) 2022, Customertimes Software
 *  All rights reserved.
 *  Licensed under the BSD 3-Clause license.
 *  For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// Import SFDX Adapters
import AuthAccessTokenStore from './auth/access-token';
import AuthSfdxUrlStore from './auth/sfdx-url';
import AuthList from './auth/list';
import AuthLogout from './auth/logout';
import ForceApexExecute from './force/apex/execute';
import ForceApexTest, { TestLevel as ApexTestLevel } from './force/apex/test/run';
import ForceDataBulkUpsert from './force/data/bulk/upsert';
import ForceDataTreeImport from './force/data/tree/import';
import ForceMdApiDeploy, { TestLevel as DeployTestLevel } from './force/mdapi/deploy';
import ForceMdApiDeployReport from './force/mdapi/deploy/report';
import ForceMdApiRetrieve from './force/mdapi/retrieve';
import * as ForceOrgCreate from './force/org/create';
import ForceOrgDelete from './force/org/delete';
import ForceOrgDisplay from './force/org/display';
import ForcePackageInstall from './force/package/install';
import ForceSourcePush from './force/source/push';
import ForceSourceConvert from './force/source/convert';

// Import other modules
import SfdxCommands from './index.interface';
export { default as SfdxOutputs } from './index.outputs';
export { SfdxAdapterError } from './errors';

const sfdx: SfdxCommands = {
  auth: {
    accessToken: {
      store: async (alias: string, instanceUrl: string, accessToken: string) =>
        await AuthAccessTokenStore(alias, instanceUrl, accessToken),
    },
    sfdxUrl: {
      store: async (alias: string, sfdxUrlFile: string) => await AuthSfdxUrlStore(alias, sfdxUrlFile),
    },
    list: async () => await AuthList(),
    logout: async (targetUserName: string) => await AuthLogout(targetUserName),
  },
  force: {
    apex: {
      execute: async (targetUserName: string, apexCodeFile: string) =>
        await ForceApexExecute(targetUserName, apexCodeFile),
      test: {
        run: async (targetUserName: string, outputDir: string, testLevel: ApexTestLevel) =>
          await ForceApexTest(targetUserName, outputDir, testLevel),
      },
    },
    data: {
      bulk: {
        upsert: async (
          targetUserName: string,
          csvFile: string,
          externalId: string,
          sObjectType: string,
          allowNoMoreFailedBatches?: number,
          allowNoMoreFailedRecords?: number,
        ) =>
          await ForceDataBulkUpsert(
            targetUserName,
            csvFile,
            externalId,
            sObjectType,
            allowNoMoreFailedBatches,
            allowNoMoreFailedRecords,
          ),
      },
      tree: {
        import: async (targetUserName: string, planFile: string) => await ForceDataTreeImport(targetUserName, planFile),
      },
    },
    mdApi: {
      deploy: async (
        targetUserName: string,
        testLevel: DeployTestLevel,
        isCheckOnly: boolean,
        deployDir?: string,
        deployZip?: string,
      ) => await ForceMdApiDeploy(targetUserName, testLevel, isCheckOnly, deployDir, deployZip),
      deployReport: async (targetUserName: string, jobId: string, waitTimeout?: number) =>
        await ForceMdApiDeployReport(targetUserName, jobId, waitTimeout),
      retrieve: async (
        targetUserName: string,
        retrieveTargetDir: string,
        manifestFile?: string,
        packageNames?: string[],
      ) => await ForceMdApiRetrieve(targetUserName, retrieveTargetDir, manifestFile, packageNames),
    },
    org: {
      create: {
        scratch: async (
          alias: string,
          isNoAncestors: boolean,
          definitionFile: string,
          devHubUserName: string,
          duration: number,
          overrideDefinition?: ForceOrgCreate.OverrideDefinition,
        ) =>
          await ForceOrgCreate.scratch(
            alias,
            isNoAncestors,
            definitionFile,
            devHubUserName,
            duration,
            overrideDefinition,
          ),
      },
      delete: async (targetUsername: string, devHubUserName: string) =>
        await ForceOrgDelete(targetUsername, devHubUserName),
      display: async (targetUsername: string) => await ForceOrgDisplay(targetUsername),
    },
    package: {
      install: async (targetUserName: string, packageId: string) =>
        await ForcePackageInstall(targetUserName, packageId),
    },
    source: {
      push: async (targetUserName: string, isForceOverwrite?: boolean) =>
        ForceSourcePush(targetUserName, isForceOverwrite),
      convert: async (outputDir: string, sourcePath?: string[]) => await ForceSourceConvert(outputDir, sourcePath),
    },
  },
};

export default sfdx;
