"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateNewConfirmActionCreator = exports.updateNewPasswordActionCreator = exports.updateNewGmailActionCreator = exports.logoutActionCreator = exports.updateUrlActionCreator = exports.updateAuthenticationStatus = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_AUTHENTICATE = "UPDATE-AUTHENTICATE";
var UPDATE_GMAIL = "UPDATE-GMAIL";
var UPDATE_PASSWORD = "UPDATE-PASSWORD";
var UPDATE_CONFIRM = "UPDATE-CONFIRM";
var UPDATE_URL = "UPDATE-URL";
var LOGOUT = "LOGOUT";

var authenticationReducer = function authenticationReducer(state, action) {
  switch (action.type) {
    case UPDATE_AUTHENTICATE:
      return _objectSpread({}, state, {
        authenticationPage: _objectSpread({}, state.authenticationPage, {
          isAuthenticated: action.authentication_value
        })
      });

    case UPDATE_URL:
      action.navigate('/');
      return _objectSpread({}, state, {
        authenticationPage: _objectSpread({}, state.authenticationPage)
      });

    case UPDATE_GMAIL:
      return _objectSpread({}, state, {
        authenticationPage: _objectSpread({}, state.authenticationPage, {
          gmailField: action.newGmail
        })
      });

    case UPDATE_PASSWORD:
      return _objectSpread({}, state, {
        authenticationPage: _objectSpread({}, state.authenticationPage, {
          passwordField: action.newPassword
        }),
        toDoListPage: state.toDoListPage
      });

    case UPDATE_CONFIRM:
      return _objectSpread({}, state, {
        authenticationPage: _objectSpread({}, state.authenticationPage, {
          confirmField: action.newConfirm
        })
      });

    case LOGOUT:
      localStorage.clear();
      return {
        authenticationPage: {
          gmailField: '',
          passwordField: '',
          confirmField: '',
          isAuthenticated: false
        },
        toDoListPage: {
          toDoFieldData: null,
          enterText: ''
        }
      };

    default:
      return state;
  }
};

var updateAuthenticationStatus = function updateAuthenticationStatus(value) {
  return {
    type: UPDATE_AUTHENTICATE,
    authentication_value: value
  };
};

exports.updateAuthenticationStatus = updateAuthenticationStatus;

var updateUrlActionCreator = function updateUrlActionCreator(navigateuUrl) {
  return {
    type: UPDATE_URL,
    navigate: navigateuUrl
  };
};

exports.updateUrlActionCreator = updateUrlActionCreator;

var logoutActionCreator = function logoutActionCreator() {
  return {
    type: LOGOUT
  };
};

exports.logoutActionCreator = logoutActionCreator;

var updateNewGmailActionCreator = function updateNewGmailActionCreator(text) {
  return {
    type: UPDATE_GMAIL,
    newGmail: text
  };
};

exports.updateNewGmailActionCreator = updateNewGmailActionCreator;

var updateNewPasswordActionCreator = function updateNewPasswordActionCreator(text) {
  return {
    type: UPDATE_PASSWORD,
    newPassword: text
  };
};

exports.updateNewPasswordActionCreator = updateNewPasswordActionCreator;

var updateNewConfirmActionCreator = function updateNewConfirmActionCreator(text) {
  return {
    type: UPDATE_CONFIRM,
    newConfirm: text
  };
};

exports.updateNewConfirmActionCreator = updateNewConfirmActionCreator;
var _default = authenticationReducer;
exports["default"] = _default;