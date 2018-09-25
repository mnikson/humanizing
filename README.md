# Humanizing API #

This is the Humanizing API.

## Installation ##

Clone git repository `git clone GIT_URL`. Go to cloned directory and hit `npm install`.

After cloning the code copy file `./src/config.js.dist` to `./src/config.js`.

If you need local ENV parameters, copy `.env.dist` file to `.env` file in the project root directory.

If you are in development mode, you can use `nodemon` for file watch. Start application with command `npm start dev`.

For production first build application with command `npm run build`. Application would be build in `./build` directory. 

After build application, start application with `npm start`.

## Code Standards ##

[https://eslint.org/](https://eslint.org/)

### Rules ###

* **2 spaces** – for indentation
* **Single quotes for strings** – except to avoid escaping
* **No unused variables** – this one catches tons of bugs!
* **No semicolons** – It's fine. Really!
* **Never start a line with (, [, or \`**

 1. This is the only gotcha with omitting semicolons – automatically checked for you!
 2. [More details](https://eslint.org/docs/rules/quotes)

* **Space after keywords** if (condition) { ... }
* **Space after function name** function name (arg) { ... }
* Always use === instead of == – but obj == null is allowed to check null || undefined.
* Always handle the node.js err function parameter
* Always prefix browser globals with window – except document and navigator are okay

1. Prevents accidental use of poorly-named browser globals like open, length, event, and name.
2. Use **ES2018** standards.

NOTE: Whenever is possible use `async/await` functions. Look for the [reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 

## API ##

#### JSON:API ####

Follow to implement all JSON API standards from [http://jsonapi.org/](http://jsonapi.org/)

#### Server HTTP Status ####

Use standards for HTTP status in response [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Usage ###

After you've installed ESLint, run command to initialise ESLint config file:

`$ ./node_modules/.bin/eslint`

Follow the configuration guide. 

After you finish with initialisation, the file `.eslintrc.json` will be created and you should be able to use the eslint program. The simplest use case would be checking the style of all JavaScript files in the current working directory:

`$ eslint ./src`

If you would like to automatically fix the files use `--fix` option with `eslint` command. 

Note: by default standard will look for all files matching the patterns: `**/*.js*`, `**/*.jsx`.

## Documentation ##

For technical documentation we are using [JSDoc](http://usejsdoc.org/) as generator for code specification.
If you installed JSDoc locally, the JSDoc command-line tool is available in `./node_modules/.bin`. To generate documentation for the file yourJavaScriptFile.js:

`./node_modules/.bin/jsdoc yourJavaScriptFile.js`

Or if you installed JSDoc globally, simply run the jsdoc command:

`jsdoc yourJavaScriptFile.js`

By default, the generated documentation is saved in a directory named `out`. You can use the `--destination (-d)` option to specify another directory.

Run `jsdoc --help` for a complete list of command-line options. 

## Testing ##

For test is used [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/) and [Should](https://shouldjs.github.io/#should-not-exist). 

All tests are located in `PROJECT_ROOT/test` directory. Directory structure and descriptions:
* `api` - Tests for API calls
* `handlers` - Tests for model handlers
* `lib` - Tests for libraries
* `services` - Tests for services
* `setup` - files necessary to run applications for tests 

Run tests with `npm test` command.

### Fixtures ###

Fixtures are located at `fixtures` directory. Each model have his own `.json` file with test data, named as DB collection name. For test database use `localhost` MongoDB service and data would be inserted before each test and deleted after tests are finished.

### Instanbul ###

For test coverage is used [Istanbul](https://istanbul.js.org/). Reporter is `HTML` and files with test coverage graphic data is stored in `PROJECT_ROOT/test/_coverage` directory.   