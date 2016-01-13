# BreadCrumbs

Your world. Your map. Your breadcrumbs.

## Team

  - __Product Owner__: Lex
  - __Scrum Master__: Ian
  - __Development Team Members__: Mark, Nikola

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> For development, run node (or nodemon) "server.js" to begin running the server. From there, it is a good idea to run "webpack --watch" while making changes to the client-side (React.js) code, so that it re-compiles as changes are saved. If you opt not to run "webpack --watch", you will still need to run "webpack" at least once, the first time, to compile the JavaScript into a file that will be called "bundle.js".

## Requirements

- "babel": "^6.3.26",
- "babel-core": "^6.4.0",
- "babel-loader": "^6.2.1",
- "babel-preset-es2015": "^6.3.13",
- "babel-preset-react": "^6.3.13",
- "body-parser": "^1.14.2",
- "express": "^4.13.3",
- "history": "^1.17.0",
- "moment": "^2.11.0",
- "mongoose": "^4.3.5",
- "react": "^0.14.6",
- "react-dom": "^0.14.6",
- "react-router": "^1.0.3",
- "webpack": "^1.12.10",
- "webpack-dev-server": "^1.14.0"

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
### API end points
|URL|METHOD|RES BODY|REQ BODY|
|---|---|---|---|
|/signup|GET|   |   |
|/login|POST|   |   |
|/api/users|GET|JSON(users)|   |
|/api/users|POST|JSON(user)|username: str, password: str|
|/api/users|DELETE|JSON(user)|username: str|
|/api/maps/:username|GET|JSON(user)|   |
|/api/maps/:username|PUT|JSON(pin)|pin: obj|
|/api/maps/:username|DELETE|JSON(pin)|_id: str|

### Roadmap

Login button does not currently do anything. Sign up workflow can be used with a new or returning username/password combination.


## Contributing

Contact any of the current Breadcrumbs team members (https://github.com/skepticaltheremin/skepticaltheremin) to learn how to get involved in the project!
