# Chutes and Ladders

## Setup

### Prerequisites

* Visual Studio Code installed
* Node JS installed and on your system path

### From the Terminal

> By cloning this project, the following work has been completed for you
> it is your responsibility to understand how to setup a project.
> you may want to run through these steps if you do not know how.

Run the following commands:

```shell

mkdir -p $HOME/projects/wdg/chutes_and_ladders
cd $HOME/projects/wdg/chutes_and_ladders

npm init -y
npm install --save-dev jest typescript
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript
npm install --save-dev @types/node @types/jest
```

Start Visual Studio Code
```shell
vscode .
```

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
```json
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```
## Project Layout

### Lesson One - Dice

User story evolution:

1. As a developer I will write a method that produces a random number between 1 and 6
2. As a developer I will write a test case that proves my random function works as expected by calling it
in a for loop at least 100 times and verify that the number is between one and six by using the 'expect' method from Jest.
3. As a developer I will write a class that will have an constructor with the number of sides so that
I may simulate one or more dice in my program.
4. As a developer I will test my Die class and ensure that all methods work as expected.
