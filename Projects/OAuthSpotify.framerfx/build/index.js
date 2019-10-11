(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("framer"), require("framer/resource"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["framer", "framer/resource", "react", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("framer"), require("framer/resource"), require("react"), require("react-dom")) : factory(root["Framer"], root["framer/resource"], root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_framer__, __WEBPACK_EXTERNAL_MODULE_framer_resource__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		try { modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); } catch (error) { module.exports = { error } }
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// asset url
/******/ 	var __module_i = eval("typeof module !== 'undefined' ? module.i : ''");
/******/ 	var __framer_package = (/(node_modules[/].*)[/](build|dist).index.js/.exec(__module_i) || [])[1]
/******/ 	function __asset_url__(src) { return __WEBPACK_EXTERNAL_MODULE_framer__.serverURL(__framer_package, src) };
/******/ 	installedModules['framer/resource'] = { i: 'framer/resource', l: true, exports: { url: __asset_url__ } };
/******/
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./package.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./code sync recursive \\.(t|j)s(x?)|\\.css$":
/*!***************************************!*\
  !*** ./code sync \.(t|j)s(x?)|\.css$ ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./App.tsx": "./code/App.tsx",
	"./Navigation.tsx": "./code/Navigation.tsx",
	"./canvas.tsx": "./code/canvas.tsx"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./code sync recursive \\.(t|j)s(x?)|\\.css$";

/***/ }),

/***/ "./code/App.tsx":
/*!**********************!*\
  !*** ./code/App.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//# framerSourceMap=eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY29kZS9BcHAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEI7QUFDOUIsbUNBQXVDO0FBQ3ZDLDZDQUF1QztBQUN2QyxhQUFhO0FBQ2IsNkRBQTREO0FBRTVELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO0FBRWxDLFFBQVE7QUFFUixNQUFNLFFBQVEsR0FBRyxhQUFJLENBQUM7SUFDbEIsSUFBSSxFQUFFLEVBQVM7SUFDZixXQUFXLEVBQUUsSUFBYztJQUMzQixRQUFRLEVBQUUsSUFBSTtJQUNkLE9BQU8sRUFBRTtRQUNMLEtBQUssRUFBRSxFQUFFO0tBQ1o7Q0FDSixDQUFDLENBQUE7QUFFRixhQUFhO0FBRWIsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFOztJQUNuQixxQkFBUSxDQUFDO1FBQ0wsV0FBVyxFQUFFLENBQUM7UUFDZCxTQUFTLEVBQUUsUUFBUTtRQUNuQixVQUFVLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQUE7Q0FDTCxDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFOztJQUNqQixxQkFBUSxDQUFDO1FBQ0wsV0FBVyxFQUFFLENBQUM7UUFDZCxTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQUE7Q0FDTCxDQUFBO0FBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFOztJQUNwQixxQkFBUSxDQUFDO1FBQ0wsV0FBVyxFQUFFLENBQUM7UUFDZCxTQUFTLEVBQUUsUUFBUTtRQUNuQixVQUFVLEVBQUUsT0FBTztLQUN0QixDQUFDLENBQUE7Q0FDTCxDQUFBO0FBRUQsT0FBTztBQUVQLE1BQU0sY0FBYyxHQUFHLEdBQVMsRUFBRTs7SUFDOUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsK0JBQStCLEVBQUU7UUFDckQsT0FBTyxFQUFFO1lB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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const framer_1 = __webpack_require__(/*! framer */ "framer");
const Navigation_1 = __webpack_require__(/*! ./Navigation */ "./code/Navigation.tsx");
// @ts-ignore
const code_1 = __webpack_require__(/*! @framer/steveruizok.education/code */ "./node_modules/@framer/steveruizok.education/code/index.ts");
const { search } = window.location;
// state
const appState = framer_1.Data({
    user: {},
    accessToken: null,
    selected: null,
    results: {
        items: [],
    },
});
// Navigation
const showLogin = () => {
    window["__checkBudget__"]();
    Navigation_1.navigate({
        currentPage: 0,
        pageTitle: "Log In",
        backAction: null,
    });
};
const showAll = () => {
    window["__checkBudget__"]();
    Navigation_1.navigate({
        currentPage: 1,
        pageTitle: "All",
        backAction: null,
    });
};
const showDetail = () => {
    window["__checkBudget__"]();
    Navigation_1.navigate({
        currentPage: 2,
        pageTitle: "Detail",
        backAction: showAll,
    });
};
// Data
const getUserDetails = () => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    const res = yield fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + appState.accessToken,
        },
    });
    const userDetails = yield res.json();
    appState.user = userDetails;
});
const getUserPlayLists = () => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    const res = yield fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: "Bearer " + appState.accessToken,
        },
    });
    const playlists = yield res.json();
    appState.results = playlists;
});
const authenticate = () => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    window.location.assign("http://localhost:8888/login");
});
const skipAuth = () => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    showAll();
});
const loadAll = () => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    // set data to state
    getUserDetails();
    getUserPlayLists();
    showAll();
});
const loadDetail = (gist) => __awaiter(this, void 0, void 0, function* () {
    window["__checkBudget__"]();
    // fetch data
    showDetail();
});
// authenticate
exports.AuthenticateButton = () => {
    window["__checkBudget__"]();
    return {
        onTap: authenticate,
    };
};
exports.SkipAuthButton = () => {
    window["__checkBudget__"]();
    return {
        onTap: skipAuth,
    };
};
// Overrides
exports.Username = () => {
    window["__checkBudget__"]();
    return {
        value: appState.user.display_name,
    };
};
exports.UserEmail = () => {
    window["__checkBudget__"]();
    return {
        value: appState.user.email,
    };
};
exports.UserCountry = () => {
    window["__checkBudget__"]();
    return {
        value: appState.user.country,
    };
};
exports.UserPlaylists = () => {
    window["__checkBudget__"]();
    console.log(appState.results);
    return {
        content: appState.results.items.map(item => (React.createElement(code_1.RowItem, { width: "100%", text: item.name, component: "icon", icon: "chevron-right", onTap: () => window.open(item.external_urls.spotify) }))),
    };
};
// Kickoff
if (search && search.includes("access_token")) {
    appState.accessToken = search.split("?access_token=")[1];
    loadAll();
}
exports.__info__ = [{ "name": "AuthenticateButton", "type": "override" }, { "name": "SkipAuthButton", "type": "override" }, { "name": "Username", "type": "override" }, { "name": "UserEmail", "type": "override" }, { "name": "UserCountry", "type": "override" }, { "name": "UserPlaylists", "type": "override" }];


/***/ }),

/***/ "./code/Navigation.tsx":
/*!*****************************!*\
  !*** ./code/Navigation.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//# framerSourceMap=eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2NvZGUvTmF2aWdhdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBdUM7QUFFdkMsTUFBTSxRQUFRLEdBQUcsYUFBSSxDQUFDO0lBQ2xCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO0lBQ3RCLFdBQVcsRUFBRSxDQUFDO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLGFBQWE7QUFFYix3Q0FBd0M7QUFDeEMsU0FBZ0IsTUFBTTs7SUFDbEIsT0FBTztRQUNILEtBQUssRUFBRSxRQUFRLENBQUMsU0FBUztRQUN6QixRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNDLFFBQVEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDdkQsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtLQUNoRSxDQUFBO0NBQ0o7QUFQRCx3QkFPQztBQUVELFNBQWdCLGNBQWM7O0lBQzFCLE9BQU87UUFDSCxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7S0FDcEMsQ0FBQTtDQUNKO0FBSkQsd0NBSUM7QUFRWSxRQUFBLFFBQVEsR0FBRyxDQUFDLFVBQTJCLEVBQXFCLEVBQUUsRUFBRTs7SUFDekUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7Q0FDbkMsQ0FBQSJ9

Object.defineProperty(exports, "__esModule", { value: true });
const framer_1 = __webpack_require__(/*! framer */ "framer");
const navState = framer_1.Data({
    pageTitle: "Log In",
    backAction: () => null,
    currentPage: 0,
});
// Navigation
// Top navigation for current tab / back
function Header() {
    window["__checkBudget__"]();
    return {
        title: navState.pageTitle,
        leftLink: navState.backAction ? "Back" : "",
        leftIcon: navState.backAction ? "chevron-left" : "none",
        onLeftTap: () => navState.backAction && navState.backAction(),
    };
}
exports.Header = Header;
function NavigationPage() {
    window["__checkBudget__"]();
    return {
        currentPage: navState.currentPage,
    };
}
exports.NavigationPage = NavigationPage;
exports.navigate = (options = {}) => {
    window["__checkBudget__"]();
    Object.assign(navState, options);
};
exports.__info__ = [{ "name": "Header", "type": "override" }, { "name": "NavigationPage", "type": "override" }];


/***/ }),

/***/ "./code/canvas.tsx":
/*!*************************!*\
  !*** ./code/canvas.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// WARNING: this file is auto generated, any changes will be lost
const framer_1 = __webpack_require__(/*! framer */ "framer");
const canvas = framer_1.CanvasStore.shared({"children":[]});


/***/ }),

/***/ "./package.js":
/*!********************!*\
  !*** ./package.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The template for the dynamic webpack entry. Be aware of the variables

const packageJson = __webpack_require__(/*! ./package.json */ "./package.json")

const package = {
    packageJson,
    sourceModules: {},
    dependencies: {},
}

// This is a special webpack thing that watches the whole directory
// https://github.com/webpack/docs/wiki/context
const ctx = __webpack_require__("./code sync recursive \\.(t|j)s(x?)|\\.css$")

ctx.keys().forEach(key => {
    package.sourceModules[key] = () => ctx(key)
})

// The packages are passed in through a template
const packages = {}

                packages["framer"] = () => {
                    var package = {}
                    var designJson
                    try {
                        package = __webpack_require__(/*! framer */ "framer")
                        
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"name":"framer","version":"1.1.3","main":"build/framer.js","author":"Framer","license":"MIT","scripts":{"coverage":"jest --coverage","test":"jest","watch":"jest --watch"},"devDependencies":{"@emotion/is-prop-valid":"^0.8.2","@microsoft/api-extractor":"^7.3.4","@testing-library/react":"^8.0.1","@types/chalk":"^2.2.0","@types/draft-js":"0.10.19","@types/enzyme":"^3.1.10","@types/enzyme-adapter-react-16":"^1.0.3","@types/google.fonts":"^1.0.2","@types/hsluv":"https://github.com/framer/typed_hsluv#bump","@types/jest":"^23.0.0","@types/jest-diff":"^20.0.0","@types/jest-matcher-utils":"^21.0.1","@types/node":"^10.12.9","@types/promise-queue":"^2.2.0","@types/react":"16.8.4","@types/react-dom":"^16.8","@types/webfontloader":"^1.6.29","cache-loader":"^1.2.2","chalk":"^2.4.1","convert-tsconfig-paths-to-webpack-aliases":"^0.9.2","css.escape":"^1.5.1","draft-js":"0.10.4","enzyme":"^3.9.0","enzyme-adapter-react-16":"^1.9.1","eventemitter3":"^3.1.0","fork-ts-checker-webpack-plugin":"^0.4.1","framer-motion":"^1.6.7","hoist-non-react-statics":"^2.5.0","hsluv":"^0.0.3","immutable":"^3.8.2","jest":"^23.1.0","jest-diff":"^23.6.0","jest-dom":"^3.1.3","jest-junit":"^5.2.0","modclean":"^3.0.0-beta.1","progress-bar-webpack-plugin":"^1.11.0","promise-queue":"^2.2.5","raf":"^3.4.0","react":"^16.8","react-dev-utils":"^5.0.1","react-dom":"^16.8","react-hooks-testing-library":"^0.5.1","react-testing-library":"^6.0.0","resize-observer-polyfill":"^1.5.1","semver":"^5.6.0","style-value-types":"^3.1.4","ts-jest":"^23.10.5","ts-loader":"^4.1.0","tslint":"^5.12.1","tslint-react-hooks":"^1.1.0","typescript":"^3.5.3","watch":"^1.0.2","webfontloader":"^1.6.28","webpack":"^4.4.1","webpack-cli":"^3.1.2","webpack-dev-server":"^3.1.10","xcssmatrix":"^0.2.2"},"peerDependencies":{"react":"^16.8.2","react-dom":"^16.8.2"},"tsdoc":{"tsdocFlavor":"AEDoc"},"framer":{"components":[{"name":"Scroll","children":true,"properties":[{"key":"direction","title":"Direction","kind":"enum","options":["horizontal","vertical","both"]}]},{"name":"Page"},{"name":"Stack"},{"name":"useOpenURL","type":"action"},{"name":"useLog","type":"action"},{"name":"FramerAppleWatch38","type":"device"},{"name":"FramerAppleWatch42","type":"device"},{"name":"FramerSonySmartWatch","type":"device"},{"name":"FramerAppleIPhoneSE","type":"device"},{"name":"FramerAppleIPhone8","type":"device"},{"name":"FramerAppleIPhone8Plus","type":"device"},{"name":"FramerAppleIPhoneXS","type":"device"},{"name":"FramerAppleIPhoneXR","type":"device"},{"name":"FramerAppleIPhoneXSMax","type":"device"},{"name":"FramerGooglePixel2","type":"device"},{"name":"FramerGooglePixel2XL","type":"device"},{"name":"FramerGooglePixel3","type":"device"},{"name":"FramerGooglePixel3XL","type":"device"},{"name":"FramerSamsungNote5","type":"device"},{"name":"FramerSamsungGalaxyS9","type":"device"},{"name":"FramerAppleIPadAir","type":"device"},{"name":"FramerAppleIPadMini","type":"device"},{"name":"FramerAppleIPadPro","type":"device"},{"name":"FramerGoogleNexusTablet","type":"device"},{"name":"FramerMicrosoftSurfacePro3","type":"device"},{"name":"FramerMicrosoftSurfacePro4","type":"device"},{"name":"FramerAppleIMac","type":"device"},{"name":"FramerAppleThunderboltDisplay","type":"device"},{"name":"FramerAppleMacBook","type":"device"},{"name":"FramerAppleMacBookAir","type":"device"},{"name":"FramerAppleMacBookPro","type":"device"},{"name":"FramerDellXPS","type":"device"},{"name":"FramerMicrosoftSurfaceBook","type":"device"},{"name":"FramerSonyW850C","type":"device"},{"name":"FramerStoreArtwork","type":"device"},{"name":"FramerStoreIcon","type":"device"}]}}
                    package.__framer__.packageJson.design = designJson
                    return package
                }

                packages["@framer/steveruizok.education"] = () => {
                    var package = {}
                    var designJson
                    try {
                        package = __webpack_require__(/*! framer-package-loader!@framer/steveruizok.education */ "../../../../../../Applications/Framer X.app/Contents/Resources/Server/lib/framer-package-loader.js!./node_modules/@framer/steveruizok.education/dist/index.js")
                        designJson = __webpack_require__(/*! ./designDependencies.js */ "./designDependencies.js")["@framer/steveruizok.education"]
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"main":"dist/index.js","license":"MIT","devDependencies":{"@types/react":"^16.8","@types/react-dom":"^16.8"},"peerDependencies":{"framer":"^1.0 || ^0.10","react":"^16.8","react-dom":"^16.8"},"framer":{"id":"7668635d-a905-469e-ace4-623b6d8ffb30","displayName":"Learn Design System"},"author":"Steve Ruiz","dependencies":{"@mapbox/geo-viewport":"^0.4.0","copy-to-clipboard":"^3.2.0","geojson-extent":"^0.3.2","mapbox-gl":"^1.0.0","markdown-to-jsx":"^6.10.2","react-select":"^3.0.3"},"name":"@framer/steveruizok.education","version":"1.207.0"}
                    package.__framer__.packageJson.design = designJson
                    return package
                }

                packages["@framer/steveruizok.whats-my-preview-url"] = () => {
                    var package = {}
                    var designJson
                    try {
                        package = __webpack_require__(/*! framer-package-loader!@framer/steveruizok.whats-my-preview-url */ "../../../../../../Applications/Framer X.app/Contents/Resources/Server/lib/framer-package-loader.js!./node_modules/@framer/steveruizok.whats-my-preview-url/dist/index.js")
                        designJson = __webpack_require__(/*! ./designDependencies.js */ "./designDependencies.js")["@framer/steveruizok.whats-my-preview-url"]
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"main":"dist/index.js","license":"MIT","devDependencies":{"@types/react":"^16.8"},"peerDependencies":{"framer":"^1.0","react":"^16.8"},"framer":{"id":"f4c3ed99-9c90-46cb-aad0-5014b1019049","displayName":"What's my preview URL?"},"author":"Steve Ruiz","name":"@framer/steveruizok.whats-my-preview-url","version":"1.0.0"}
                    package.__framer__.packageJson.design = designJson
                    return package
                }

                packages["@framer/framer.device-skin-apple-iphone-xs-spacegrey"] = () => {
                    var package = {}
                    var designJson
                    try {
                        package = __webpack_require__(/*! framer-package-loader!@framer/framer.device-skin-apple-iphone-xs-spacegrey */ "../../../../../../Applications/Framer X.app/Contents/Resources/Server/lib/framer-package-loader.js!./node_modules/@framer/framer.device-skin-apple-iphone-xs-spacegrey/build/index.js")
                        
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"name":"@framer/framer.device-skin-apple-iphone-xs-spacegrey","version":"1.0.0","main":"build/index.js","license":"MIT","devDependencies":{"typescript":"^3.0.1"},"framer":{"components":[{"name":"DeviceSkin","type":"deviceSkin"}]}}
                    package.__framer__.packageJson.design = designJson
                    return package
                }

package.dependencies = packages

exports.__framer__ = package


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: main, license, devDependencies, peerDependencies, framer, author, dependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"main\":\"dist/index.js\",\"license\":\"MIT\",\"devDependencies\":{\"@framer/framer.device-skin-apple-iphone-xs-spacegrey\":\"^1.0.0\",\"@types/react\":\"^16.8\"},\"peerDependencies\":{\"framer\":\"^1.0\",\"react\":\"^16.8\"},\"framer\":{\"id\":\"77223c3e-fc31-46d2-99fa-28abc729130a\"},\"author\":\"Steve Ruiz\",\"dependencies\":{\"@framer/steveruizok.education\":\"^1.207.0\",\"@framer/steveruizok.whats-my-preview-url\":\"^1.0.0\",\"gist-client\":\"^1.1.0\",\"nanogist\":\"^1.0.0\",\"netlify-auth-providers\":\"^1.0.0-alpha5\"}}");

/***/ }),

/***/ "framer":
/*!******************************************************************************************!*\
  !*** external {"root":"Framer","commonjs2":"framer","commonjs":"framer","amd":"framer"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_framer__;

/***/ }),

/***/ "framer/resource":
/*!******************************************************************************************************************************!*\
  !*** external {"root":"framer/resource","commonjs2":"framer/resource","commonjs":"framer/resource","amd":"framer/resource"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_framer_resource__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!*****************************************************************************************************!*\
  !*** external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ });
});