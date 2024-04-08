#  Kanban task management web app solution to MaxSend

This is an Test Assessment App in the position of Front End Developer for MaxSend.
It is developed with the latest versions of **Ionic 7** and **Angular 17**, using technologies such as **NgRx**,
**RxJs** through the **Facade** design pattern and also using a custom architecture based on **Clean Architecture** and **Atomic Design**.


> [**!IMPORTANT**]
> ***The current solution queries information from a preloaded JSON file that stores the data in Storage, but is prepared to switch to a REST API to obtain the information.***

## Prerequisites

This project requires NodeJS (version .13.0 or later) and NPM. Node and NPM are really easy to install. To make sure you have them available on your machine, try running the following command.

```sh
$ npm -v && node -v
10.2.5
v20.9.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

1. Clone this repository: `git clone (https://github.com/EmmanuelChavezNataren/kanban-maxi-test-challenge)`
2. Install the dependencies by executing the command: `npm run postinstall:legacy` since due to the versions used in this project some require `--legacy-peer-deps` so that they can be installed, which is why this command is required npm.

## Dependencies

These are some project dependencies and their versions to consider.

  | **Library/Plugin**  | **Version** |
  | ------------------- | ----------- |
  | **_Ionic_**         | ^7.0.0      |
  | **_Angular_**       | ^17.0.2     |
  | **_Capacitor_**     | 5.7.4       |
  | **_NgRx_**          | ^17.1.1     |
  | **_rxjs_**          | ^7.8.0      |
  | **_typescript_**    | ~5.2.2      |

## Project Structure

```
.
 ├── src
 ├── .browserslistrc
 ├── .editorconfig
 ├── .gitignore
 ├── angular.json
 ├── capacitor.config.ts
 ├── .ionic.config.json
 ├── karma.conf.js
 ├── package-lock.json
 ├── package.json
 ├── readme.md
 ├── tsconfig.app.json
 ├── tsconfig.json
 └── tsconfig.spec.json
```

### src directory

```text
.
   ├── ...
   ├── src
   │   ├── app
   |   │   ├── components
   |   │   ├── core
   |   │   ├── modules
   |   |   │   ├── feature
   |   |   │   |   ├── common
   |   |   │   |   |   ├── models
   |   |   │   |   |   ├── enums
   |   |   │   |   |   ├── adapters
   |   |   │   |   |   └── ...
   |   |   │   |   ├── facades
   |   │   |   |   ├── providers
   |   │   |   |   ├── repositories
   |   |   │   |   ├── store
   |   |   │   |   |   ├── feature.actions.ts
   |   |   │   |   |   ├── feature.effects.ts
   |   |   │   |   |   ├── feature.reducer.ts
   |   |   │   |   |   ├── feature.selectors.ts
   |   |   │   |   |   └── ...
   |   │   |   |   ├── feature.module.ts
   |   │   |   |   ├── index.ts
   |   |   |   |   └── ...
   |   |   |   └── ...
   |   │   ├── pages
   |   │   ├── shared
   |   │   |   ├── contracts
   |   │   |   ├── enums
   |   │   |   ├── helpers
   |   │   |   ├── models
   |   │   |   └── ...
   |   │   └── ...
   │   ├── assets
   |   ├── environment
   |   ├── theme
   |   |   ├── atoms
   |   |   ├── molecules
   |   |   ├── organisms
   |   │   └── ...
   |   ├── global.scss
   |   ├── index.html
   |   ├── main.ts
   |   ├── polyfills.ts
   |   ├── test.ts
   |   ├── zone-flags.ts
   |   └── ...
   └── ...
```

## Start the project

The project starts with the following commands, depending on the environment we want to run.

1. Run `npm run serve:dev` to start the development environment.
2. Run `npm run serve:prod` to start the production environment.
3. To build the project run `npm run debug:apk` or `npm run debug:ios`. In order for you to build an iOS app, you need to run on MacOS.

An alternative is to emulate the app on a device or upload it to the ionic cloud. From here you can download the ionic view app and use the app on all devices.

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/EmmanuelChavezNataren/kanban-maxi-test-challenge/issues) here on Github.

## Next steps

**Wip Features**
1. (Create, Update and Delete) Boards.
2. (Create, Update and Delete) Columns-Tasks.
3. (Integrate) Services API in Firebase.
4. (Authentication and Authorization).
  
## Creator

The project was created by and is maintained by **[Emmanuel Chávez](https://www.linkedin.com/in/emmanuel-chavez-nataren-dev/)**
