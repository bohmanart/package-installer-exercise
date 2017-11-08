# Package Installer Exercise

This exercise uses a Depth-first search algorithm to sort an input array of strings of packages and their dependencies in order such that an install will not fail due to a missing dependency.
Makes use of `Enzyme` and `Jest` for testing react components.

## Requirements

- The program should accept an array of strings defining packages and their dependencies. Each string contains the name of a package followed by a colon and space then any dependencies required by that package.
- The program should reject as invalid a dependency specification that contains cycles.
- The program should output a comma separated string of package names in the order of install, such that a package's dependency will always precede that package.

## To run the project: `yarn install && npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## To test the project: `npm run test`

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).