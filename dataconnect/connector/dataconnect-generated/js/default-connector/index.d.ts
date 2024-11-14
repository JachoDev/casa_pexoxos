import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface Client_Key {
  id: UUIDString;
  __typename?: 'Client_Key';
}

export interface Employee_Key {
  id: UUIDString;
  __typename?: 'Employee_Key';
}

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

export interface Pet_Key {
  id: UUIDString;
  clientId: UUIDString;
  __typename?: 'Pet_Key';
}

export interface SaleServices_Key {
  saleId: UUIDString;
  serviceId: UUIDString;
  serviceName: string;
  __typename?: 'SaleServices_Key';
}

export interface Sale_Key {
  id: UUIDString;
  __typename?: 'Sale_Key';
}

export interface Schedule_Key {
  id: UUIDString;
  __typename?: 'Schedule_Key';
}

export interface Service_Key {
  id: UUIDString;
  name: string;
  __typename?: 'Service_Key';
}

export interface Stock_Key {
  id: UUIDString;
  __typename?: 'Stock_Key';
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
  password: string;
  role: string;
}

export interface User_Key {
  id: UUIDString;
  username: string;
  __typename?: 'User_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function upsertUserRef(vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function upsertUserRef(dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData,UpsertUserVariables>;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData,UpsertUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listUsersRef(): QueryRef<ListUsersData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listUsersRef(dc: DataConnect): QueryRef<ListUsersData,undefined>;

export function listUsers(): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect): QueryPromise<ListUsersData,undefined>;


