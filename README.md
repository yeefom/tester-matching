## Tester Matching

### Overview

Tester Matching matches testers with specified locations and/or devices.

Tester Matching is mainly built in AngularJS and Node.js.

### Feature

- Display all testers
- Filter testers via region and/or device
- Sort by number of bugs filed from selected devices

### Demo

[Deployed sample](https://testermatching.herokuapp.com/).

To run Tester Matching locally, please first install dependencies by running `npm install`, and then simply use `npm start` to start the server. The local address is [localhost:8080](localhost:8080).

### Testing

Use `npm test` to run all testing examples. Or use `npm run test-client` to run client side tests and `npm run test-server` to run server side tests separately.

Client side tests are built with Karma, Mocha, and Chai. Server side tests are built with Mocha and Chai.
