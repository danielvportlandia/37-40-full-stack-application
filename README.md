**Author**: Daniel Shelton
**Version**: 1.0.2

# Overview
Bloomio is a plant-care schedule assistant which utilizes a MongoDB.

# Architecture
## Front-end
- Main: main.js
- View Library: React
- State Mgmt: Redux
- Bundler: Webpack
- Transpiler: Babel
- Testing Suite: Jest
- Continuous Integration: Travis CI

## Back-end
- Main: main.js
- runTime: Node.js
- Database: MongoDB
- Router: Express.js
- Transpiler: Babel
- Testing Suite: Jest
- Continuous Integration: Travis CI

# Testing
To test the initial state of the Dashboard, enter the following in the CLI from the front-end directory:

`npm run test`

To test the routers, enter the following in the CLI from the back-end directory:

`npm run test`
# Change Log
06-05-2018 3:29PM - Scaffolding complete, able to render to the DOM.
06-06-2018 5:40PM - logout functionality added.
06-11-2018 1:30PM - Token persistance implemented with cookies.
06-11-2018 2:41PM - Form validation added.
