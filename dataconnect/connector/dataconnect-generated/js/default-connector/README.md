#  Generated TypeScript README
This README will guide you through the process of using the generated TypeScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.
You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of queries and mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

In order to call Data Connect queries and mutations, you need to create an instance of the connector in your application code.

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const connector: DataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```javascript
// add connectDataConnectEmulator to your imports 
import { connectDataConnectEmulator, getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const connector: DataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(connector, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK. 

# Queries
There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```javascript
listUsers(): QueryPromise<ListUsersData, undefined>;

listUsersRef(): QueryRef<ListUsersData, undefined>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

listUsersRef(dc: DataConnect): QueryRef<ListUsersData, undefined>;
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `ListUsersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    auth?: string | null;
    username: string;
    password: string;
    role: string;
    createAt: TimestampString;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@firebasegen/default-connector';

// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(connector);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@firebasegen/default-connector';

// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(connector);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

# Mutations
There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```javascript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

upsertUserRef(vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

upsertUserRef(dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface UpsertUserVariables {
  username: string;
  password: string;
  role: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `UpsertUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@firebasegen/default-connector';
// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  password: ..., 
  role: ..., 
}

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ username: ..., password: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(connector, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@firebasegen/default-connector';
// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  password: ..., 
  role: ..., 
}

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ username: ..., password: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(connector, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

