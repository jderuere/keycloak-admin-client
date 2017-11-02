'use strict';

const test = require('blue-tape');
const keycloakAdminClient = require('../index');
// const kcSetupForTests = require('../scripts/kc-setup-for-tests.json');

const settings = {
  baseUrl: 'http://127.0.0.1:8080/auth',
  username: 'admin',
  password: 'admin',
  grant_type: 'password',
  client_id: 'admin-cli'
};

test('Test getting the list of events for a Realm', (t) => {
  const kca = keycloakAdminClient(settings);

  return kca.then((client) => {
    t.equal(typeof client.events.find, 'function', 'The client object returned should have a events.find function');

    // Use the master realm
    const realmName = 'master';

    return client.events.find(realmName).then((listOfEvents) => {
      // The listOfCients should be an Array
      t.equal(listOfEvents instanceof Array, true, 'the list of events should be an array');
      /*
      // The list of client in the master realm should have 4 people
      t.equal(listOfClients.length, 10, 'There should be 4 client in master');
      */
    });
  });
});

test("Test getting the list of events for a Realm that doesn't exist", (t) => {
  const kca = keycloakAdminClient(settings);

  return kca.then((client) => {
    // Use the master realm
    const realmName = 'notarealrealm';

    return t.shouldFail(client.events.find(realmName), 'Realm not found.', "Realm not found should be returned if the realm wasn't found");
  });
});
