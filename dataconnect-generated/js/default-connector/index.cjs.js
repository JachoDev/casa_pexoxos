const { getDataConnect, queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'casa_pexoxos',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function listUsersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ListUsers');
}
exports.listUsersRef = listUsersRef;
exports.listUsers = function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
};

