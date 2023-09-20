# Setting up a project without a template

These instructions will guide you through how to use NPM to setup a project
without using Vite ore React projects. The purpose of the exercise is to
remove your dependency on other's works and provide the base understanding of
how NPM and Node function.

## From the Terminal

> By cloning this project, the following work has been completed for you
> it is your responsibility to understand how to setup a project.
> you may want to run through these steps if you do not know how.

Using your terminal program, run the following commands. Please note, on Windows system
you'll need to replace "$HOME" with "%HOMEPATH%". 


### Create project directory stucture and download node dependencies

```shell

mkdir -p $HOME/projects/wdg/chutes_and_ladders
cd $HOME/projects/wdg/chutes_and_ladders

npm init -y
npm install --save-dev jest typescript
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript
npm install --save-dev @types/node @types/jest
```

### Start Visual Studio code from the current directory

Start Visual Studio Code
```shell
code .
```

## In Visual Studio Code

### Create and edit the following files

Edit the package.json file, and add the following:
```json
...
"author": "<YOUR NAME>",
"description": "<PROJECT DESCRIPTION>",
"main": "main.ts",
"scripts": {
    "test": "jest"
},
...
```

Create the following files:

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

babel.config.cjs
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

## Conclsion

With these steps, you've create a project structure that will allow you to use javascript and/or typescript. In addition, you'll be able to write test cases using the 'jest' test framework. 

## Related Links

* [NPM Init](https://docs.npmjs.com/cli/v10/commands/npm-init)
* [Using Typescript with Node JS](https://nodejs.dev/en/learn/nodejs-with-typescript/)
* [Jest Testing](https://jestjs.io/docs/getting-started)
* [Why does TypeScript exist?](https://www.typescriptlang.org/why-create-typescript)
