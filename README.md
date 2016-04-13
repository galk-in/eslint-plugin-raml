# eslint-plugin-raml
[![Build Status](https://travis-ci.org/galk-in/eslint-plugin-raml.svg?branch=master)](https://travis-ci.org/galk-in/eslint-plugin-raml)
[![Dependency Status](https://david-dm.org/galk-in/eslint-plugin-raml.svg)](https://david-dm.org/galk-in/eslint-plugin-raml)
[![devDependency Status](https://david-dm.org/galk-in/eslint-plugin-raml/dev-status.svg)](https://david-dm.org/galk-in/eslint-plugin-raml#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/galk-in/eslint-plugin-raml/badge.svg?branch=master)](https://coveralls.io/github/galk-in/eslint-plugin-raml?branch=master)

Eslint rules for RAML

[![NPM](https://nodei.co/npm/eslint-plugin-raml.png?downloads=true&stars=true)](https://nodei.co/npm/eslint-plugin-raml/)
## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-raml`:

```
$ npm install eslint-plugin-raml --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-raml` globally.

## Usage

Add `raml` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "raml"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "raml/rule-name": 2
    }
}
```

## Supported Rules

TBD
