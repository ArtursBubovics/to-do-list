"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateNewCheckboxActionCreator = exports.updateNewTaskTextActionCreator = exports.updateNewEnterTextActionCreator = exports.updateNewToDoDataActionCreator = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_TODO_DATA = "UPDATE-TODO-DATA";
var UPDATE_ENTER_TEXT = "UPDATE-ENTER-TEXT";
var UPDATE_TASK_TEXT = "UPDATE-TASK-TEXT";
var UPDATE_CHECKBOX = "UPDATE-CHECKBOX";

var toDoReducer = function toDoReducer(state, action) {
  switch (action.type) {
    case UPDATE_TODO_DATA:
      return new Promise(function _callee(resolve, reject) {
        var userId, response, data, test;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = localStorage.getItem('personID');
                _context.next = 4;
                return regeneratorRuntime.awrap(fetch("http://127.0.0.1:5000/api/data/task?userId=".concat(userId)));

              case 4:
                response = _context.sent;
                _context.next = 7;
                return regeneratorRuntime.awrap(response.json());

              case 7:
                data = _context.sent;
                test = _objectSpread({}, state, {
                  toDoListPage: _objectSpread({}, state.toDoListPage, {
                    toDoFieldData: state.toDoListPage.toDoFieldData === null ? data.data : state.toDoListPage.toDoFieldData.concat(data.data)
                  }),
                  authenticationPage: _objectSpread({}, state.authenticationPage, {
                    isAuthenticated: action.isAuthenticated
                  })
                });
                resolve(test);
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                console.error('Ошибка при получении данных:', _context.t0);
                reject(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[0, 12]]);
      });

    case UPDATE_ENTER_TEXT:
      return _objectSpread({}, state, {
        toDoListPage: _objectSpread({}, state.toDoListPage, {
          enterText: action.newEnterText
        })
      });

    case UPDATE_TASK_TEXT:
      return _objectSpread({}, state, {
        toDoFieldData: state.toDoListPage.toDoFieldData.map(function (todo) {
          if (todo._id === action.list.key) {
            return _objectSpread({}, todo, {
              text: action.list.body
            });
          }

          return todo;
        })
      });

    case UPDATE_CHECKBOX:
      return _objectSpread({}, state, {
        toDoFieldData: state.toDoListPage.toDoFieldData.map(function (todo) {
          if (todo._id === action.list.key) {
            return _objectSpread({}, todo, {
              isChecked: action.list.body
            });
          }

          return todo;
        })
      });

    default:
      return state;
  }
};

var updateNewToDoDataActionCreator = function updateNewToDoDataActionCreator(isAuthenticated) {
  return {
    type: UPDATE_TODO_DATA,
    isAuthenticated: isAuthenticated
  };
};

exports.updateNewToDoDataActionCreator = updateNewToDoDataActionCreator;

var updateNewEnterTextActionCreator = function updateNewEnterTextActionCreator(text) {
  return {
    type: UPDATE_ENTER_TEXT,
    newEnterText: text
  };
};

exports.updateNewEnterTextActionCreator = updateNewEnterTextActionCreator;

var updateNewTaskTextActionCreator = function updateNewTaskTextActionCreator(value) {
  return {
    type: UPDATE_TASK_TEXT,
    list: value
  };
};

exports.updateNewTaskTextActionCreator = updateNewTaskTextActionCreator;

var updateNewCheckboxActionCreator = function updateNewCheckboxActionCreator(value) {
  return {
    type: UPDATE_CHECKBOX,
    list: value
  };
};

exports.updateNewCheckboxActionCreator = updateNewCheckboxActionCreator;
var _default = toDoReducer;
exports["default"] = _default;