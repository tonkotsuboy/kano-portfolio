webpackHotUpdate("static/development/pages/entry/[id].js",{

/***/ "./components/BasePage.tsx":
false,

/***/ "./components/base/BasePage.tsx":
/*!**************************************!*\
  !*** ./components/base/BasePage.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_index_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/index.module.scss */ \"./pages/index.module.scss\");\n/* harmony import */ var _pages_index_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pages_index_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _SideNavigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SideNavigation */ \"./components/SideNavigation.tsx\");\nvar _this = undefined,\n    _jsxFileName = \"/Users/kano/git/kano-portfolio/components/base/BasePage.tsx\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n/**\n * 各ページ共通で使用するテンプレート\n */\n\nvar BasePage = function BasePage(_ref) {\n  var children = _ref.children;\n  return __jsx(\"div\", {\n    className: \"container\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 3\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 5\n    }\n  }, __jsx(\"title\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 7\n    }\n  }, \"\\u9E7F\\u91CE\\u30DD\\u30FC\\u30C8\\u30D5\\u30A9\\u30EA\\u30AA\"), __jsx(\"link\", {\n    rel: \"icon\",\n    href: \"/favicon.ico\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 7\n    }\n  }), __jsx(\"link\", {\n    href: \"https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap\",\n    rel: \"stylesheet\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 7\n    }\n  })), __jsx(\"div\", {\n    className: _pages_index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.wrapper,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 5\n    }\n  }, __jsx(_SideNavigation__WEBPACK_IMPORTED_MODULE_3__[\"SideNavigation\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 7\n    }\n  }), __jsx(\"main\", {\n    className: _pages_index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.main,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 7\n    }\n  }, children)));\n};\n\n_c = BasePage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BasePage);\n\nvar _c;\n\n$RefreshReg$(_c, \"BasePage\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2Jhc2UvQmFzZVBhZ2UudHN4P2YzNWEiXSwibmFtZXMiOlsiQmFzZVBhZ2UiLCJjaGlsZHJlbiIsInN0eWxlcyIsIndyYXBwZXIiLCJtYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBR0EsSUFBTUEsUUFBa0IsR0FBRyxTQUFyQkEsUUFBcUI7QUFBQSxNQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxTQUN6QjtBQUFLLGFBQVMsRUFBQyxXQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhEQURGLEVBRUU7QUFBTSxPQUFHLEVBQUMsTUFBVjtBQUFpQixRQUFJLEVBQUMsY0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZGLEVBR0U7QUFDRSxRQUFJLEVBQUMsb0VBRFA7QUFFRSxPQUFHLEVBQUMsWUFGTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSEYsQ0FERixFQVNFO0FBQUssYUFBUyxFQUFFQywrREFBTSxDQUFDQyxPQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyw4REFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFFRTtBQUFNLGFBQVMsRUFBRUQsK0RBQU0sQ0FBQ0UsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUErQkgsUUFBL0IsQ0FGRixDQVRGLENBRHlCO0FBQUEsQ0FBM0I7O0tBQU1ELFE7QUFpQlNBLHVFQUFmIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9iYXNlL0Jhc2VQYWdlLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3BhZ2VzL2luZGV4Lm1vZHVsZS5zY3NzXCI7XG5pbXBvcnQgeyBTaWRlTmF2aWdhdGlvbiB9IGZyb20gXCIuLi9TaWRlTmF2aWdhdGlvblwiO1xuXG4vKipcbiAqIOWQhOODmuODvOOCuOWFsemAmuOBp+S9v+eUqOOBmeOCi+ODhuODs+ODl+ODrOODvOODiFxuICovXG5jb25zdCBCYXNlUGFnZTogUmVhY3QuRkMgPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgPEhlYWQ+XG4gICAgICA8dGl0bGU+6bm/6YeO44Od44O844OI44OV44Kp44Oq44KqPC90aXRsZT5cbiAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU5vdG8rU2FucytKUCZkaXNwbGF5PXN3YXBcIlxuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgIC8+XG4gICAgPC9IZWFkPlxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICA8U2lkZU5hdmlnYXRpb24gLz5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PntjaGlsZHJlbn08L21haW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/base/BasePage.tsx\n");

/***/ }),

/***/ "./pages/entry/[id].tsx":
/*!******************************!*\
  !*** ./pages/entry/[id].tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _contexts_IndexContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../contexts/IndexContext */ \"./contexts/IndexContext.ts\");\n/* harmony import */ var _components_base_BasePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/base/BasePage */ \"./components/base/BasePage.tsx\");\nvar _this = undefined,\n    _jsxFileName = \"/Users/kano/git/kano-portfolio/pages/entry/[id].tsx\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\nvar EntryPage = function EntryPage(_ref) {\n  var tagList = _ref.tagList,\n      entryData = _ref.entryData;\n  var contextValue = {\n    tagList: tagList\n  };\n  return __jsx(_contexts_IndexContext__WEBPACK_IMPORTED_MODULE_1__[\"IndexContext\"].Provider, {\n    value: contextValue,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 5\n    }\n  }, __jsx(_components_base_BasePage__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 7\n    }\n  }, __jsx(\"p\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 9\n    }\n  }, entryData.title, \"\\u3084\\u3067\")));\n};\n\n_c = EntryPage;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (EntryPage);\n\nvar _c;\n\n$RefreshReg$(_c, \"EntryPage\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9lbnRyeS8udHN4PzdjNDciXSwibmFtZXMiOlsiRW50cnlQYWdlIiwidGFnTGlzdCIsImVudHJ5RGF0YSIsImNvbnRleHRWYWx1ZSIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBOztBQXNDQSxJQUFNQSxTQUdKLEdBQUcsU0FIQ0EsU0FHRCxPQUE0QjtBQUFBLE1BQXpCQyxPQUF5QixRQUF6QkEsT0FBeUI7QUFBQSxNQUFoQkMsU0FBZ0IsUUFBaEJBLFNBQWdCO0FBQy9CLE1BQU1DLFlBQThCLEdBQUc7QUFDckNGLFdBQU8sRUFBUEE7QUFEcUMsR0FBdkM7QUFJQSxTQUNFLE1BQUMsbUVBQUQsQ0FBYyxRQUFkO0FBQXVCLFNBQUssRUFBRUUsWUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsaUVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSUQsU0FBUyxDQUFDRSxLQUFkLGlCQURGLENBREYsQ0FERjtBQU9ELENBZkQ7O0tBQU1KLFM7O0FBaUJTQSx3RUFBZiIsImZpbGUiOiIuL3BhZ2VzL2VudHJ5L1tpZF0udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2V0U3RhdGljUGF0aHMsIEdldFN0YXRpY1Byb3BzIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IFBvcnRmb2xpb01vZGVsIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3NlcnZlci9Qb3J0Zm9saW9Nb2RlbFwiO1xuaW1wb3J0IHtcbiAgZmV0Y2hFbnRyaWVzRGF0YSxcbiAgZmV0Y2hFbnRyeURhdGEsXG59IGZyb20gXCIuLi8uLi91dGlsL2FwaS9mZXRjaEVudHJpZXNEYXRhXCI7XG5cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEluZGV4Q29udGV4dCwgSW5kZXhDb250ZXh0VHlwZSB9IGZyb20gXCIuLi8uLi9jb250ZXh0cy9JbmRleENvbnRleHRcIjtcbmltcG9ydCBCYXNlUGFnZSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9iYXNlL0Jhc2VQYWdlXCI7XG5pbXBvcnQgeyBUYWdUeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2NsaWVudC9UYWdUeXBlXCI7XG5pbXBvcnQgeyBUYWdNb2RlbCB9IGZyb20gXCIuLi8uLi90eXBlcy9zZXJ2ZXIvVGFnTW9kZWxcIjtcblxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1BhdGhzOiBHZXRTdGF0aWNQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgLy8gR2V0IHRoZSBwYXRocyB3ZSB3YW50IHRvIHByZS1yZW5kZXIgYmFzZWQgb24gcG9zdHNcbiAgY29uc3QgcG9ydGZvbGlvRGF0YSA9IGF3YWl0IGZldGNoRW50cmllc0RhdGE8UG9ydGZvbGlvTW9kZWw+KFwicG9ydGZvbGlvXCIpO1xuICBjb25zdCBwYXRocyA9IHBvcnRmb2xpb0RhdGEuaXRlbXMubWFwKChlbnRyeSkgPT4gYC9lbnRyeS8ke2VudHJ5LnN5cy5pZH1gKTtcbiAgLy8gV2UnbGwgcHJlLXJlbmRlciBvbmx5IHRoZXNlIHBhdGhzIGF0IGJ1aWxkIHRpbWUuXG4gIC8vIHsgZmFsbGJhY2s6IGZhbHNlIH0gbWVhbnMgb3RoZXIgcm91dGVzIHNob3VsZCA0MDQuXG4gIHJldHVybiB7IHBhdGhzLCBmYWxsYmFjazogZmFsc2UgfTtcbn07XG5leHBvcnQgY29uc3QgZ2V0U3RhdGljUHJvcHM6IEdldFN0YXRpY1Byb3BzID0gYXN5bmMgKHsgcGFyYW1zIH0pID0+IHtcbiAgY29uc3QgZW50cnlJZCA9IHBhcmFtcz8uaWQgYXMgc3RyaW5nO1xuICBpZiAoZW50cnlJZCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGVudHJ5RGF0YTogbnVsbCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBjb25zdCBbZW50cnlEYXRhLCB0YWdEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBmZXRjaEVudHJ5RGF0YTxQb3J0Zm9saW9Nb2RlbD4oZW50cnlJZCksXG4gICAgZmV0Y2hFbnRyaWVzRGF0YTxUYWdNb2RlbD4oXCJ0YWdcIiksXG4gIF0pO1xuXG4gIGNvbnN0IHRhZ0xpc3Q6IFRhZ1R5cGVbXSA9IHRhZ0RhdGEuaXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0uZmllbGRzO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICB0YWdMaXN0LFxuICAgICAgZW50cnlEYXRhOiBlbnRyeURhdGEuZmllbGRzLFxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBFbnRyeVBhZ2U6IFJlYWN0LkZDPHtcbiAgdGFnTGlzdDogVGFnVHlwZVtdO1xuICBlbnRyeURhdGE6IFBvcnRmb2xpb01vZGVsO1xufT4gPSAoeyB0YWdMaXN0LCBlbnRyeURhdGEgfSkgPT4ge1xuICBjb25zdCBjb250ZXh0VmFsdWU6IEluZGV4Q29udGV4dFR5cGUgPSB7XG4gICAgdGFnTGlzdCxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxJbmRleENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2NvbnRleHRWYWx1ZX0+XG4gICAgICA8QmFzZVBhZ2U+XG4gICAgICAgIDxwPntlbnRyeURhdGEudGl0bGV944KE44GnPC9wPlxuICAgICAgPC9CYXNlUGFnZT5cbiAgICA8L0luZGV4Q29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVudHJ5UGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/entry/[id].tsx\n");

/***/ })

})