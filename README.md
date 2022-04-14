# TypeScript Adapter for SFDX CLI

Provide TS interfaces to the [SFDX CLI](https://developer.salesforce.com/tools/sfdxcli) as functions
instead of executing commands on the command line. This adapter imports SFDX plugins directly instead
of using the full [SFDX CLI Tool](https://www.npmjs.com/package/sfdx-cli). This adapter imitates CLI
calls to [oclif](https://oclif.io/) commands instead of directly calling plugin functions/classes,
since only the CLI API is officially supported.

# Releases

The plugins used for the released adapter version are the same as in the mentioned sfdx-cli version.

<table>
<tr><td><b>Adapter version</b></td><td><b>SFDX CLI version</b></td></tr>
<tr><td>v1.1.0</td><td>v7.142.1</td></tr>
<tr><td>v1.0.0</td><td>v7.142.1</td></tr>
</table>

# Installation

You can install this by either using npm installer.

### Requirements

To get started, you'll need to install node v16 (LTS) or greater. While this can be done using
an installer from nodejs.com or via an OS-specific package manager.

### Install package

```shell
> npm install --global @ciguru/sfdx-ts-adapter
```

# Usage

## Import adapter

```ts
import SFDX from '@ciguru/sfdx-ts-adapter';
```

## Supported Commands

---

### `> sfdx auth:accesstoken:store` (since v1.0.0)

#### Call function

```ts
await SFDX.auth.accessToken.store(alias, instanceUrl, accessToken);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>alias</td><td>true</td><td>--setalias</td><td></td></tr>
<tr><td>instanceUrl</td><td>true</td><td>--instanceurl</td><td></td></tr>
<tr><td>accessToken</td><td>true</td><td>N/A</td><td>To be used as env.SFDX_ACCESS_TOKEN</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx auth:sfdxurl:store` (since v1.0.0)

#### Call function

```ts
await SFDX.auth.sfdxUrl.store(alias, sfdxUrlFile);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>alias</td><td>true</td><td>--setalias</td><td></td></tr>
<tr><td>sfdxUrlFile</td><td>true</td><td>--sfdxUrlFile</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx auth:store` (since v1.0.0)

#### Call function

```ts
await SFDX.auth.list();
```

#### Output Data

ToBe Described

---

### `> sfdx auth:logout` (since v1.0.0)

#### Call function

```ts
await SFDX.auth.logout(targetUserName);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:apex:execute` (since v1.0.0)

#### Call function

```ts
await SFDX.force.apex.execute(targetUserName, apexCodeFile);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>apexCodeFile</td><td>true</td><td>--apexcodefile</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:apex:test:run` (since v1.0.0)

#### Call function

```ts
await SFDX.force.apex.test.run(targetUserName, outputDir, testLevel);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>outputDir</td><td>true</td><td>--outputdir</td><td></td></tr>
<tr><td>testLevel</td><td>true</td><td>--testlevel</td><td>Specifies which tests to run, using one of these TestLevel enum values:<br/>- RunSpecifiedTests—Only the tests that you specify are run (not supported yet)<br/>- RunLocalTests—All tests in your org are run, except the ones that originate from installed managed packages<br/>- RunAllTestsInOrg—All tests are in your org and in installed managed packages are run</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:data:bulk:upsert` (since v1.0.0)

#### Call function

```ts
await SFDX.force.data.bulk.upsert(
  targetUserName,
  csvFile,
  externalId,
  sObjectType,
  allowNoMoreFailedBatches,
  allowNoMoreFailedRecords,
);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>csvFile</td><td>true</td><td>--csvfile</td><td></td></tr>
<tr><td>externalId</td><td>true</td><td>--externalid</td><td></td></tr>
<tr><td>sObjectType</td><td>true</td><td>--sobjecttype</td><td></td></tr>
<tr><td>allowNoMoreFailedBatches</td><td>false</td><td>N/A</td><td>Mark the transaction as successful if the number of failed batches does not exceed the specified value (default 0)</td></tr>
<tr><td>allowNoMoreFailedRecords</td><td>false</td><td>N/A</td><td>Mark the transaction as successful if the number of failed records does not exceed the specified value (default 0)</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:data:tree:import` (since v1.0.0)

#### Call function

```ts
await SFDX.force.data.tree.import(targetUserName, planFile);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>planFile</td><td>true</td><td>--plan</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:mdapi:deploy` (since v1.0.0)

#### Call function

```ts
await SFDX.force.mdApi.deploy(targetUserName, testLevel, isCheckOnly, deployDir, deployZip);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>testLevel</td><td>true</td><td>--testlevel</td><td>Values:<br/>- NoTestRun<br/>- RunLocalTests<br/>- RunAllTestsInOrg<br/>- RunSpecifiedTests - not supported yet</td></tr>
<tr><td>isCheckOnly</td><td>true</td><td>--checkonly</td><td></td></tr>
<tr><td>deployDir</td><td>false</td><td>--deploydir</td><td>deployDir or deployZip is required. deployDir will be used if specified both parameters</td></tr>
<tr><td>deployZip</td><td>false</td><td>--zipfile</td><td>deployDir or deployZip is required. deployDir will be used if specified both parameters</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:mdapi:deploy:report` (since v1.0.0)

#### Call function

```ts
await SFDX.force.mdApi.deployReport(targetUserName, jobId, waitTimeout);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>jobId</td><td>true</td><td>--jobid</td><td></td></tr>
<tr><td>waitTimeout</td><td>false</td><td>--wait</td><td>default: 30</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:mdapi:retrieve` (since v1.0.0)

#### Call function

```ts
await SFDX.force.mdApi.retrieve(targetUserName, retrieveTargetDir, manifestFile, packageNames);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>retrieveTargetDir</td><td>true</td><td>--retrievetargetdir</td><td></td></tr>
<tr><td>manifestFile</td><td>true</td><td>--unpackaged</td><td>manifestFile or packageNames is required. manifestFile will be used if specified both parameters</td></tr>
<tr><td>packageNames</td><td>true</td><td>--packagenames</td><td>manifestFile or packageNames is required. manifestFile will be used if specified both parameters</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:org:create` (since v1.0.0)

#### Call function

```ts
await SFDX.force.org.create.scratch(alias, isNoAncestors, definitionFile, devHubUserName, duration, overrideDefinition);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>alias</td><td>true</td><td>--setalias</td><td></td></tr>
<tr><td>isNoAncestors</td><td>true</td><td>--noancestors</td><td></td></tr>
<tr><td>definitionFile</td><td>true</td><td>--definitionfile</td><td></td></tr>
<tr><td>devHubUserName</td><td>true</td><td>--targetdevhubusername</td><td></td></tr>
<tr><td>duration</td><td>true</td><td>--durationdays</td><td></td></tr>
<tr><td>overrideDefinition.adminEmail</td><td>false</td><td>Command argument: adminEmail=</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:org:delete` (since v1.0.0)

#### Call function

```ts
await SFDX.force.org.delete(targetUsername, devHubUserName);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>devHubUserName</td><td>true</td><td>--targetdevhubusername</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:org:display` (since v1.0.0)

#### Call function

```ts
await SFDX.force.org.display(targetUsername);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:package:install` (since v1.0.0)

#### Call function

```ts
await SFDX.force.package.install(targetUserName, packageId);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>packageId</td><td>true</td><td>--package</td><td></td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:source:convert` (since v1.1.0)

#### Call function

```ts
await SFDX.force.source.convert(outputDir, sourcePath);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>outputDir</td><td>true</td><td>--outputdir</td><td>Output directory to store the Metadata API–formatted files in</td></tr>
<tr><td>sourcePath</td><td>false</td><td>--sourcepath</td><td>Array of paths to the local source files to convert</td></tr>
</table>

#### Output Data

ToBe Described

---

### `> sfdx force:source:push` (since v1.0.0)

#### Call function

```ts
await SFDX.force.source.push(targetUserName, isForceOverwrite);
```

#### Parameters

<table>
<tr><td><b>Parameter</b></td><td><b>Required</b></td><td><b>SFDX Command attribute</b></td><td><b>Comment</b></td></tr>
<tr><td>targetUserName</td><td>true</td><td>--targetusername</td><td></td></tr>
<tr><td>isForceOverwrite</td><td>false</td><td>--forceoverwrite</td><td></td></tr>
</table>

#### Output Data

ToBe Described
