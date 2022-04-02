
# core-package

## <a name="1"></a>1 Project structure
- Library:
    - **src** folder for the classes
    - **public_api.ts** entry point for all public APIs of the package
    - **package.json** _npm_ options
    - **rollup.config.js** _Rollup_ configuration for building the _umd_ bundles
    - **rollup.es.config.js** _Rollup_ configuration for building the _es2015_ bundles
    - **tsconfig-build.json** _ngc_ compiler options for _AoT compilation_
    - **build.js** building process using _ShellJS_
- Testing:
    - **tests** folder for unit & integration tests
    - **karma.conf.js** _Karma_ configuration that uses _webpack_ to build the tests
    - **spec.bundle.js** defines the files used by _webpack_
- Extra:
    - **tslint.json**  _Angular TSLint Preset_ (_TypeScript_ linter rules with _Codelyzer_)
    - **gitlab-ci.yml** _Gitlab CI_ configuration



## <a name="2"></a>2 Testing
The following command runs unit & integration tests that are in the `tests` folder (you can change the folder in `spec.bundle.js` file): 
```Shell
npm test 
```
It also reports coverage using _Istanbul_.
## <a name="3"></a>3 Building
The following command:
```Shell
npm run build
```
```
├── auth
├── components
├── config
├── environments
├── lib
├── models
|  ├── class
|  ├── interface
|  └── types
├── pipes
├── services
└── store
   ├── index.ts
   └── src
	    ├── index.ts
   		├── state.module.ts
		├── ui
			|  ├── ui.action.ts
			|  ├── ui.facade.ts
			|  ├── ui.reducer.ts
			|  └── ui.spec.ts
		└── user
		   ├── manager.effects.ts
		   ├── manager.facade.ts
		   ├── user.action.ts
		   ├── user.effects.ts
		   ├── user.facade.ts
		   ├── user.reducer.ts
		   └── user.spec.ts
```
To test locally the npm package before publishing:
```Shell
npm run pack:lib
```
Then you can install it in an app to test it:
```Shell
npm install [path]core-package-{version}.tgz
```

## <a name="4"></a>4 Publishing
```Shell
npm login
```
```Shell
npm run publish:lib
```

## <a name="5"></a>5 Documentation
To generate the documentation, this starter uses [compodoc](https://github.com/compodoc/compodoc):
```Shell
npm run compodoc
npm run compodoc:serve 
```

## <a name="6"></a>6 Using the library
### Installing
```Shell
npm install core-package --save 
```
## <a name="previous-versions"></a>Previous versions
- **# core-package v1.0.0**
    - [Master](https://github.com/wassef911/typify)
