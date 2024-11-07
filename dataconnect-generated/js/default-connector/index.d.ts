import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface ListUsersData {
  users: ({
    id: string;
    username: string;
  } & User_Key)[];
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function listUsersRef(): QueryRef<ListUsersData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listUsersRef(dc: DataConnect): QueryRef<ListUsersData,undefined>;

export function listUsers(): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect): QueryPromise<ListUsersData,undefined>;


