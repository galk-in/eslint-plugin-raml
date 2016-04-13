# eslint-plugin-raml

Eslint rules for RAML

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
