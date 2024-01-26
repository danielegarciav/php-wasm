(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};

require.register("php-wasm/PhpBase.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "php-wasm");
  (function() {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhpBase = void 0;

var _globalThis$CustomEve;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var STR = 'string';
var NUM = 'number';

var PhpBase = /*#__PURE__*/function (_EventTarget) {
  _inherits(PhpBase, _EventTarget);

  var _super = _createSuper(PhpBase);

  function PhpBase(PhpBinary) {
    var _globalThis$phpSettin;

    var _this;

    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PhpBase);

    _this = _super.call(this);
    var FLAGS = {};

    _this.onerror = function () {};

    _this.onoutput = function () {};

    _this.onready = function () {};

    Object.defineProperty(_assertThisInitialized(_this), 'encoder', {
      value: new TextEncoder()
    });
    Object.defineProperty(_assertThisInitialized(_this), 'buffers', {
      value: {
        stdin: [],
        stdout: new EventBuffer(_assertThisInitialized(_this), 'output', -1),
        stderr: new EventBuffer(_assertThisInitialized(_this), 'error', -1)
      }
    });
    Object.freeze(_this.buffers);
    var defaults = {
      stdin: function stdin() {
        var _this$buffers$stdin$s;

        return (_this$buffers$stdin$s = _this.buffers.stdin.shift()) !== null && _this$buffers$stdin$s !== void 0 ? _this$buffers$stdin$s : null;
      },
      stdout: function stdout(_byte) {
        return _this.buffers.stdout.push(_byte);
      },
      stderr: function stderr(_byte2) {
        return _this.buffers.stderr.push(_byte2);
      },
      postRun: function postRun() {
        var event = new _Event('ready');

        _this.onready(event);

        _this.dispatchEvent(event);
      }
    };
    var fixed = {
      onRefresh: new Set()
    };
    var phpSettings = (_globalThis$phpSettin = globalThis.phpSettings) !== null && _globalThis$phpSettin !== void 0 ? _globalThis$phpSettin : {};
    _this.binary = new PhpBinary(Object.assign({}, defaults, phpSettings, args, fixed)).then(function (php) {
      var retVal = php.ccall('pib_init', NUM, [STR], []);
      return php;
    })["catch"](function (error) {
      return console.error(error);
    });
    return _this;
  }

  _createClass(PhpBase, [{
    key: "inputString",
    value: function inputString(byteString) {
      this.input(this.encoder.encode(byteString));
    }
  }, {
    key: "input",
    value: function input(items) {
      var _this$buffers$stdin;

      (_this$buffers$stdin = this.buffers.stdin).push.apply(_this$buffers$stdin, _toConsumableArray(items));
    }
  }, {
    key: "flush",
    value: function flush() {
      this.buffers.stdout.flush();
      this.buffers.stderr.flush();
    }
  }, {
    key: "run",
    value: function run(phpCode) {
      var _this2 = this;

      return this.binary.then(function (php) {
        return php.ccall('pib_run', NUM, [STR], ["?>".concat(phpCode)], {
          async: true
        });
      })["finally"](function () {
        return _this2.flush();
      });
    }
  }, {
    key: "exec",
    value: function exec(phpCode) {
      var _this3 = this;

      return this.binary.then(function (php) {
        return php.ccall('pib_exec', STR, [STR], [phpCode], {
          async: true
        });
      })["finally"](function () {
        return _this3.flush();
      });
    }
  }, {
    key: "tokenize",
    value: function tokenize(phpCode) {
      return this.binary.then(function (php) {
        return php.ccall('pib_tokenize', STR, [STR], [phpCode], {
          async: true
        });
      });
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var call = this.binary.then(function (php) {
        var _iterator = _createForOfIteratorHelper(php.onRefresh),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var callback = _step.value;
            callback();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return php.ccall('pib_refresh', NUM, [], [], {
          async: true
        });
      });
      call["catch"](function (error) {
        return console.error(error);
      });
      return call;
    }
  }]);

  return PhpBase;
}( /*#__PURE__*/_wrapNativeSuper(EventTarget));

exports.PhpBase = PhpBase;

var _Event = (_globalThis$CustomEve = globalThis.CustomEvent) !== null && _globalThis$CustomEve !== void 0 ? _globalThis$CustomEve : /*#__PURE__*/function (_globalThis$Event) {
  _inherits(_class, _globalThis$Event);

  var _super2 = _createSuper(_class);

  function _class(name) {
    var _this4;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, _class);

    _this4 = _super2.call(this, name, options);
    _this4.detail = options.detail;
    return _this4;
  }

  return _class;
}(globalThis.Event);

var EventBuffer = /*#__PURE__*/function () {
  function EventBuffer(target, eventType, maxLength) {
    _classCallCheck(this, EventBuffer);

    Object.defineProperty(this, 'target', {
      value: target
    });
    Object.defineProperty(this, 'buffer', {
      value: []
    });
    Object.defineProperty(this, 'eventType', {
      value: eventType
    });
    Object.defineProperty(this, 'maxLength', {
      value: maxLength
    });
    Object.defineProperty(this, 'decoder', {
      value: new TextDecoder()
    });
  }

  _createClass(EventBuffer, [{
    key: "push",
    value: function push() {
      var _this$buffer;

      (_this$buffer = this.buffer).push.apply(_this$buffer, arguments);

      var end = this.buffer.length - 1;

      if (this.maxLength === -1 && this.buffer[end] === 10) {
        this.flush();
      }

      if (this.maxLength >= 0 && this.buffer.length >= this.maxLength) {
        this.flush();
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      if (!this.buffer.length) {
        return;
      }

      var event = new _Event(this.eventType, {
        detail: [this.decoder.decode(new Uint8Array(this.buffer))]
      });

      if (this.target['on' + this.eventType]) {
        if (this.target['on' + this.eventType](event) === false) {
          return;
        }
      }

      if (!this.target.dispatchEvent(event)) {
        return;
      }

      this.buffer.splice(0);
    }
  }]);

  return EventBuffer;
}();
  })();
});

require.register("php-wasm/PhpWebDrupal.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "php-wasm");
  (function() {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhpWebDrupal = void 0;

var _PhpBase2 = require("./PhpBase");

var _phpWebDrupal = _interopRequireDefault(require("./php-web-drupal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PhpWebDrupal = /*#__PURE__*/function (_PhpBase) {
  _inherits(PhpWebDrupal, _PhpBase);

  var _super = _createSuper(PhpWebDrupal);

  function PhpWebDrupal() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PhpWebDrupal);

    return _super.call(this, _phpWebDrupal["default"], args);
  }

  _createClass(PhpWebDrupal, [{
    key: "run",
    value: function run(phpCode) {
      var _this = this;

      return this.binary.then(function (php) {
        var sync = !php.persist ? Promise.resolve() : new Promise(function (accept) {
          return php.FS.syncfs(true, function (err) {
            if (err) console.warn(err);
            accept();
          });
        });
        var run = sync.then(function () {
          return _get(_getPrototypeOf(PhpWebDrupal.prototype), "run", _this).call(_this, phpCode);
        });

        if (!php.persist) {
          return run;
        }

        return run.then(function () {
          return new Promise(function (accept) {
            return php.FS.syncfs(false, function (err) {
              if (err) console.warn(err);
              accept(run);
            });
          });
        });
      })["finally"](function () {
        return _this.flush();
      });
    }
  }, {
    key: "exec",
    value: function exec(phpCode) {
      var _this2 = this;

      return this.binary.then(function (php) {
        var sync = new Promise(function (accept) {
          return php.FS.syncfs(true, function (err) {
            if (err) console.warn(err);
            accept();
          });
        });
        var run = sync.then(function () {
          return _get(_getPrototypeOf(PhpWebDrupal.prototype), "exec", _this2).call(_this2, phpCode);
        });
        return run.then(function () {
          return new Promise(function (accept) {
            return php.FS.syncfs(false, function (err) {
              if (err) console.warn(err);
              accept(run);
            });
          });
        });
      })["finally"](function () {
        return _this2.flush();
      });
    }
  }]);

  return PhpWebDrupal;
}(_PhpBase2.PhpBase);

exports.PhpWebDrupal = PhpWebDrupal;
  })();
});

require.register("php-wasm/php-web-drupal.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "php-wasm");
  (function() {
    var PHP = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(moduleArg = {}) {

var Module = moduleArg;

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise(((resolve, reject) => {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
}));

[ "_pib_init", "_pib_destroy", "_pib_run", "_pib_exec", "_pib_refresh", "_main", "_php_embed_init", "_php_embed_shutdown", "_zend_eval_string", "_vrzno_expose_inc_zrefcount", "_vrzno_expose_dec_zrefcount", "_vrzno_expose_zrefcount", "_vrzno_expose_inc_crefcount", "_vrzno_expose_dec_crefcount", "_vrzno_expose_crefcount", "_vrzno_expose_efree", "_vrzno_expose_create_bool", "_vrzno_expose_create_null", "_vrzno_expose_create_undef", "_vrzno_expose_create_long", "_vrzno_expose_create_double", "_vrzno_expose_create_string", "_vrzno_expose_create_object_for_target", "_vrzno_expose_create_params", "_vrzno_expose_set_param", "_vrzno_expose_zval_is_target", "_vrzno_expose_object_keys", "_vrzno_expose_zval_dump", "_vrzno_expose_type", "_vrzno_expose_callable", "_vrzno_expose_long", "_vrzno_expose_double", "_vrzno_expose_string", "_vrzno_expose_property_pointer", "_vrzno_exec_callback", "_vrzno_del_callback", "_fflush", "_pib_tokenize", "_exec_callback", "_del_callback", "onRuntimeInitialized" ].forEach((prop => {
 if (!Object.getOwnPropertyDescriptor(Module["ready"], prop)) {
  Object.defineProperty(Module["ready"], prop, {
   get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
   set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
  });
 }
}));

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 if (Module["ENVIRONMENT_IS_PTHREAD"] || Module["$ww"]) return;
 var loadPackage = function(metadata) {
  var PACKAGE_PATH = "";
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof process === "undefined" && typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  }
  var PACKAGE_NAME = "../../build/php-web-drupal.js.data";
  var REMOTE_PACKAGE_BASE = "php-web-drupal.js.data";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"](`Downloading data... (${loaded}/${total})`);
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     callback(packageData);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }), handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + (new Error).stack;
   }
   Module["FS_createPath"]("/", "preload", true, true);
   Module["FS_createPath"]("/preload", "drupal-7.95", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "includes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/includes", "database", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/includes/database", "mysql", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/includes/database", "pgsql", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/includes/database", "sqlite", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/includes", "filetransfer", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "misc", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc", "brumann", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/brumann", "polyfill-unserialize", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/brumann/polyfill-unserialize", "src", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc", "farbtastic", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc", "typo3", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3", "drupal-security", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3", "phar-stream-wrapper", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3/phar-stream-wrapper", "src", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src", "Interceptor", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src", "Phar", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src", "Resolver", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc", "ui", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/misc/ui", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "modules", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "aggregator", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/aggregator", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "block", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/block", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/block/tests", "themes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/block/tests/themes", "block_test_theme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "blog", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "book", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "color", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/color", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "comment", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/comment", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "contact", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "contextual", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/contextual", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "dashboard", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "dblog", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "field", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field", "modules", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules", "field_sql_storage", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules", "list", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules/list", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules", "number", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules", "options", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field/modules", "text", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/field", "theme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "field_ui", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "file", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/file", "icons", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/file", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/file/tests", "fixtures", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/file/tests/fixtures", "file_scan_ignore", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/file/tests/fixtures/file_scan_ignore", "frontend_framework", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "filter", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/filter", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "forum", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "help", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "image", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/image", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "locale", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/locale", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/locale/tests", "translations", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "menu", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "node", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/node", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "openid", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/openid", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "overlay", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/overlay", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "path", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "php", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "poll", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "profile", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "rdf", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/rdf", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "search", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/search", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "shortcut", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "simpletest", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest", "files", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/files", "css_test_files", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/files/css_test_files", "css_subfolder", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest", "lib", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/lib", "Drupal", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/lib/Drupal", "simpletest", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/lib/Drupal/simpletest", "Tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest", "src", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/src", "Tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "drupal_autoload_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "drupal_system_listing_compatible_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "drupal_system_listing_incompatible_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "psr_0_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_0_test", "lib", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib", "Drupal", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib/Drupal", "psr_0_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib/Drupal/psr_0_test", "Tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib/Drupal/psr_0_test/Tests", "Nested", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "psr_4_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_4_test", "src", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/src", "Tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/src/Tests", "Nested", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "themes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes", "engines", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes/engines", "nyan_cat", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes", "test_basetheme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes", "test_subtheme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes", "test_theme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme", "templates", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes", "test_theme_nyan_cat", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme_nyan_cat", "templates", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/simpletest/tests", "upgrade", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "statistics", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "syslog", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "system", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/system", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "taxonomy", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "toolbar", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "tracker", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "translation", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/translation", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "trigger", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/trigger", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "update", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/update", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/update/tests", "themes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/update/tests/themes", "update_test_admintheme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/update/tests/themes", "update_test_basetheme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/update/tests/themes", "update_test_subtheme", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules", "user", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/modules/user", "tests", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "profiles", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles", "minimal", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles/minimal", "translations", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles", "standard", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles/standard", "translations", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles", "testing", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles/testing", "modules", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles/testing/modules", "drupal_system_listing_compatible_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/profiles/testing/modules", "drupal_system_listing_incompatible_test", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "scripts", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "sites", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites", "all", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/all", "libraries", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/all", "modules", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/all", "themes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites", "default", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/default", "files", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/default/files", "styles", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/sites/default/files", "tmp", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95", "themes", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes", "bartik", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/bartik", "color", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/bartik", "css", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/bartik", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/bartik", "templates", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes", "engines", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/engines", "phptemplate", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes", "garland", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/garland", "color", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/garland", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes", "seven", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes/seven", "images", true, true);
   Module["FS_createPath"]("/preload/drupal-7.95/themes", "stark", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"](`fp ${this.name}`);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"](`fp ${that.name}`);
     this.requests[this.name] = null;
    }
   };
   var files = metadata["files"];
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"] || 0).open("GET", files[i]["filename"]);
   }
   function processPackageData(arrayBuffer) {
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    var curr;
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata["files"];
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_../../build/php-web-drupal.js.data");
   }
   Module["addRunDependency"]("datafile_../../build/php-web-drupal.js.data");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "filename": "/preload/bench.php",
   "start": 0,
   "end": 7634
  }, {
   "filename": "/preload/drupal-7.95/.editorconfig",
   "start": 7634,
   "end": 7951
  }, {
   "filename": "/preload/drupal-7.95/.gitignore",
   "start": 7951,
   "end": 8125
  }, {
   "filename": "/preload/drupal-7.95/.htaccess",
   "start": 8125,
   "end": 14348
  }, {
   "filename": "/preload/drupal-7.95/CHANGELOG.txt",
   "start": 14348,
   "end": 133080
  }, {
   "filename": "/preload/drupal-7.95/COPYRIGHT.txt",
   "start": 133080,
   "end": 134561
  }, {
   "filename": "/preload/drupal-7.95/INSTALL.mysql.txt",
   "start": 134561,
   "end": 136278
  }, {
   "filename": "/preload/drupal-7.95/INSTALL.pgsql.txt",
   "start": 136278,
   "end": 138152
  }, {
   "filename": "/preload/drupal-7.95/INSTALL.sqlite.txt",
   "start": 138152,
   "end": 139450
  }, {
   "filename": "/preload/drupal-7.95/INSTALL.txt",
   "start": 139450,
   "end": 157504
  }, {
   "filename": "/preload/drupal-7.95/LICENSE.txt",
   "start": 157504,
   "end": 175596
  }, {
   "filename": "/preload/drupal-7.95/MAINTAINERS.txt",
   "start": 175596,
   "end": 184118
  }, {
   "filename": "/preload/drupal-7.95/README.txt",
   "start": 184118,
   "end": 189500
  }, {
   "filename": "/preload/drupal-7.95/UPGRADE.txt",
   "start": 189500,
   "end": 199623
  }, {
   "filename": "/preload/drupal-7.95/authorize.php",
   "start": 199623,
   "end": 206227
  }, {
   "filename": "/preload/drupal-7.95/cron.php",
   "start": 206227,
   "end": 206947
  }, {
   "filename": "/preload/drupal-7.95/includes/actions.inc",
   "start": 206947,
   "end": 220763
  }, {
   "filename": "/preload/drupal-7.95/includes/ajax.inc",
   "start": 220763,
   "end": 271252
  }, {
   "filename": "/preload/drupal-7.95/includes/archiver.inc",
   "start": 271252,
   "end": 272953
  }, {
   "filename": "/preload/drupal-7.95/includes/authorize.inc",
   "start": 272953,
   "end": 286388
  }, {
   "filename": "/preload/drupal-7.95/includes/batch.inc",
   "start": 286388,
   "end": 302705
  }, {
   "filename": "/preload/drupal-7.95/includes/batch.queue.inc",
   "start": 302705,
   "end": 305015
  }, {
   "filename": "/preload/drupal-7.95/includes/bootstrap.inc",
   "start": 305015,
   "end": 445983
  }, {
   "filename": "/preload/drupal-7.95/includes/cache-install.inc",
   "start": 445983,
   "end": 448470
  }, {
   "filename": "/preload/drupal-7.95/includes/cache.inc",
   "start": 448470,
   "end": 469520
  }, {
   "filename": "/preload/drupal-7.95/includes/common.inc",
   "start": 469520,
   "end": 790014
  }, {
   "filename": "/preload/drupal-7.95/includes/database/database.inc",
   "start": 790014,
   "end": 889723
  }, {
   "filename": "/preload/drupal-7.95/includes/database/log.inc",
   "start": 889723,
   "end": 894595
  }, {
   "filename": "/preload/drupal-7.95/includes/database/mysql/database.inc",
   "start": 894595,
   "end": 914108
  }, {
   "filename": "/preload/drupal-7.95/includes/database/mysql/install.inc",
   "start": 914108,
   "end": 914737
  }, {
   "filename": "/preload/drupal-7.95/includes/database/mysql/query.inc",
   "start": 914737,
   "end": 918197
  }, {
   "filename": "/preload/drupal-7.95/includes/database/mysql/schema.inc",
   "start": 918197,
   "end": 937493
  }, {
   "filename": "/preload/drupal-7.95/includes/database/pgsql/database.inc",
   "start": 937493,
   "end": 945865
  }, {
   "filename": "/preload/drupal-7.95/includes/database/pgsql/install.inc",
   "start": 945865,
   "end": 952999
  }, {
   "filename": "/preload/drupal-7.95/includes/database/pgsql/query.inc",
   "start": 952999,
   "end": 960889
  }, {
   "filename": "/preload/drupal-7.95/includes/database/pgsql/schema.inc",
   "start": 960889,
   "end": 993923
  }, {
   "filename": "/preload/drupal-7.95/includes/database/pgsql/select.inc",
   "start": 993923,
   "end": 997380
  }, {
   "filename": "/preload/drupal-7.95/includes/database/prefetch.inc",
   "start": 997380,
   "end": 1011503
  }, {
   "filename": "/preload/drupal-7.95/includes/database/query.inc",
   "start": 1011503,
   "end": 1070213
  }, {
   "filename": "/preload/drupal-7.95/includes/database/schema.inc",
   "start": 1070213,
   "end": 1100697
  }, {
   "filename": "/preload/drupal-7.95/includes/database/select.inc",
   "start": 1100697,
   "end": 1153044
  }, {
   "filename": "/preload/drupal-7.95/includes/database/sqlite/database.inc",
   "start": 1153044,
   "end": 1171932
  }, {
   "filename": "/preload/drupal-7.95/includes/database/sqlite/install.inc",
   "start": 1171932,
   "end": 1173557
  }, {
   "filename": "/preload/drupal-7.95/includes/database/sqlite/query.inc",
   "start": 1173557,
   "end": 1178167
  }, {
   "filename": "/preload/drupal-7.95/includes/database/sqlite/schema.inc",
   "start": 1178167,
   "end": 1202768
  }, {
   "filename": "/preload/drupal-7.95/includes/database/sqlite/select.inc",
   "start": 1202768,
   "end": 1203172
  }, {
   "filename": "/preload/drupal-7.95/includes/date.inc",
   "start": 1203172,
   "end": 1207678
  }, {
   "filename": "/preload/drupal-7.95/includes/entity.inc",
   "start": 1207678,
   "end": 1257877
  }, {
   "filename": "/preload/drupal-7.95/includes/errors.inc",
   "start": 1257877,
   "end": 1268856
  }, {
   "filename": "/preload/drupal-7.95/includes/file.inc",
   "start": 1268856,
   "end": 1366456
  }, {
   "filename": "/preload/drupal-7.95/includes/file.mimetypes.inc",
   "start": 1366456,
   "end": 1390828
  }, {
   "filename": "/preload/drupal-7.95/includes/file.phar.inc",
   "start": 1390828,
   "end": 1393292
  }, {
   "filename": "/preload/drupal-7.95/includes/filetransfer/filetransfer.inc",
   "start": 1393292,
   "end": 1405406
  }, {
   "filename": "/preload/drupal-7.95/includes/filetransfer/ftp.inc",
   "start": 1405406,
   "end": 1410196
  }, {
   "filename": "/preload/drupal-7.95/includes/filetransfer/local.inc",
   "start": 1410196,
   "end": 1412973
  }, {
   "filename": "/preload/drupal-7.95/includes/filetransfer/ssh.inc",
   "start": 1412973,
   "end": 1417102
  }, {
   "filename": "/preload/drupal-7.95/includes/form.inc",
   "start": 1417102,
   "end": 1619233
  }, {
   "filename": "/preload/drupal-7.95/includes/graph.inc",
   "start": 1619233,
   "end": 1624061
  }, {
   "filename": "/preload/drupal-7.95/includes/image.inc",
   "start": 1624061,
   "end": 1637477
  }, {
   "filename": "/preload/drupal-7.95/includes/install.core.inc",
   "start": 1637477,
   "end": 1717699
  }, {
   "filename": "/preload/drupal-7.95/includes/install.inc",
   "start": 1717699,
   "end": 1762057
  }, {
   "filename": "/preload/drupal-7.95/includes/iso.inc",
   "start": 1762057,
   "end": 1777650
  }, {
   "filename": "/preload/drupal-7.95/includes/json-encode.inc",
   "start": 1777650,
   "end": 1780838
  }, {
   "filename": "/preload/drupal-7.95/includes/language.inc",
   "start": 1780838,
   "end": 1800310
  }, {
   "filename": "/preload/drupal-7.95/includes/locale.inc",
   "start": 1800310,
   "end": 1886776
  }, {
   "filename": "/preload/drupal-7.95/includes/lock.inc",
   "start": 1886776,
   "end": 1896201
  }, {
   "filename": "/preload/drupal-7.95/includes/mail.inc",
   "start": 1896201,
   "end": 1922038
  }, {
   "filename": "/preload/drupal-7.95/includes/menu.inc",
   "start": 1922038,
   "end": 2064607
  }, {
   "filename": "/preload/drupal-7.95/includes/module.inc",
   "start": 2064607,
   "end": 2108766
  }, {
   "filename": "/preload/drupal-7.95/includes/pager.inc",
   "start": 2108766,
   "end": 2132468
  }, {
   "filename": "/preload/drupal-7.95/includes/password.inc",
   "start": 2132468,
   "end": 2141989
  }, {
   "filename": "/preload/drupal-7.95/includes/path.inc",
   "start": 2141989,
   "end": 2162892
  }, {
   "filename": "/preload/drupal-7.95/includes/registry.inc",
   "start": 2162892,
   "end": 2170217
  }, {
   "filename": "/preload/drupal-7.95/includes/request-sanitizer.inc",
   "start": 2170217,
   "end": 2174384
  }, {
   "filename": "/preload/drupal-7.95/includes/session.inc",
   "start": 2174384,
   "end": 2194628
  }, {
   "filename": "/preload/drupal-7.95/includes/stream_wrappers.inc",
   "start": 2194628,
   "end": 2223534
  }, {
   "filename": "/preload/drupal-7.95/includes/tablesort.inc",
   "start": 2223534,
   "end": 2230981
  }, {
   "filename": "/preload/drupal-7.95/includes/theme.inc",
   "start": 2230981,
   "end": 2346745
  }, {
   "filename": "/preload/drupal-7.95/includes/theme.maintenance.inc",
   "start": 2346745,
   "end": 2353815
  }, {
   "filename": "/preload/drupal-7.95/includes/token.inc",
   "start": 2353815,
   "end": 2363679
  }, {
   "filename": "/preload/drupal-7.95/includes/unicode.entities.inc",
   "start": 2363679,
   "end": 2369166
  }, {
   "filename": "/preload/drupal-7.95/includes/unicode.inc",
   "start": 2369166,
   "end": 2391947
  }, {
   "filename": "/preload/drupal-7.95/includes/update.inc",
   "start": 2391947,
   "end": 2451363
  }, {
   "filename": "/preload/drupal-7.95/includes/updater.inc",
   "start": 2451363,
   "end": 2465201
  }, {
   "filename": "/preload/drupal-7.95/includes/utility.inc",
   "start": 2465201,
   "end": 2467192
  }, {
   "filename": "/preload/drupal-7.95/includes/xmlrpc.inc",
   "start": 2467192,
   "end": 2486020
  }, {
   "filename": "/preload/drupal-7.95/includes/xmlrpcs.inc",
   "start": 2486020,
   "end": 2497853
  }, {
   "filename": "/preload/drupal-7.95/index.php",
   "start": 2497853,
   "end": 2498382
  }, {
   "filename": "/preload/drupal-7.95/install.php",
   "start": 2498382,
   "end": 2499104
  }, {
   "filename": "/preload/drupal-7.95/misc/ajax.js",
   "start": 2499104,
   "end": 2525385
  }, {
   "filename": "/preload/drupal-7.95/misc/arrow-asc.png",
   "start": 2525385,
   "end": 2525503
  }, {
   "filename": "/preload/drupal-7.95/misc/arrow-desc.png",
   "start": 2525503,
   "end": 2525621
  }, {
   "filename": "/preload/drupal-7.95/misc/authorize.js",
   "start": 2525621,
   "end": 2526589
  }, {
   "filename": "/preload/drupal-7.95/misc/autocomplete.js",
   "start": 2526589,
   "end": 2535078
  }, {
   "filename": "/preload/drupal-7.95/misc/batch.js",
   "start": 2535078,
   "end": 2536135
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/.gitignore",
   "start": 2536135,
   "end": 2536174
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/.travis.yml",
   "start": 2536174,
   "end": 2536389
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/LICENSE",
   "start": 2536389,
   "end": 2537459
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/README.md",
   "start": 2537459,
   "end": 2539442
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/composer.json",
   "start": 2539442,
   "end": 2540054
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/phpunit.xml.dist",
   "start": 2540054,
   "end": 2540669
  }, {
   "filename": "/preload/drupal-7.95/misc/brumann/polyfill-unserialize/src/Unserialize.php",
   "start": 2540669,
   "end": 2542586
  }, {
   "filename": "/preload/drupal-7.95/misc/collapse.js",
   "start": 2542586,
   "end": 2545909
  }, {
   "filename": "/preload/drupal-7.95/misc/configure.png",
   "start": 2545909,
   "end": 2546157
  }, {
   "filename": "/preload/drupal-7.95/misc/draggable.png",
   "start": 2546157,
   "end": 2546425
  }, {
   "filename": "/preload/drupal-7.95/misc/drupal.js",
   "start": 2546425,
   "end": 2567036
  }, {
   "filename": "/preload/drupal-7.95/misc/druplicon.png",
   "start": 2567036,
   "end": 2570941
  }, {
   "filename": "/preload/drupal-7.95/misc/farbtastic/farbtastic.css",
   "start": 2570941,
   "end": 2571517
  }, {
   "filename": "/preload/drupal-7.95/misc/farbtastic/farbtastic.js",
   "start": 2571517,
   "end": 2575585
  }, {
   "filename": "/preload/drupal-7.95/misc/farbtastic/marker.png",
   "start": 2575585,
   "end": 2576022
  }, {
   "filename": "/preload/drupal-7.95/misc/farbtastic/mask.png",
   "start": 2576022,
   "end": 2578023
  }, {
   "filename": "/preload/drupal-7.95/misc/farbtastic/wheel.png",
   "start": 2578023,
   "end": 2589612
  }, {
   "filename": "/preload/drupal-7.95/misc/favicon.ico",
   "start": 2589612,
   "end": 2595042
  }, {
   "filename": "/preload/drupal-7.95/misc/feed.png",
   "start": 2595042,
   "end": 2595698
  }, {
   "filename": "/preload/drupal-7.95/misc/form.js",
   "start": 2595698,
   "end": 2598158
  }, {
   "filename": "/preload/drupal-7.95/misc/forum-icons.png",
   "start": 2598158,
   "end": 2599923
  }, {
   "filename": "/preload/drupal-7.95/misc/grippie.png",
   "start": 2599923,
   "end": 2600029
  }, {
   "filename": "/preload/drupal-7.95/misc/help.png",
   "start": 2600029,
   "end": 2600323
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery-extend-3.4.0.js",
   "start": 2600323,
   "end": 2603738
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery-html-prefilter-3.5.0-backport.js",
   "start": 2603738,
   "end": 2616367
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery.ba-bbq.js",
   "start": 2616367,
   "end": 2620486
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery.cookie.js",
   "start": 2620486,
   "end": 2621447
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery.form.js",
   "start": 2621447,
   "end": 2631360
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery.js",
   "start": 2631360,
   "end": 2709961
  }, {
   "filename": "/preload/drupal-7.95/misc/jquery.once.js",
   "start": 2709961,
   "end": 2712935
  }, {
   "filename": "/preload/drupal-7.95/misc/machine-name.js",
   "start": 2712935,
   "end": 2718070
  }, {
   "filename": "/preload/drupal-7.95/misc/menu-collapsed-rtl.png",
   "start": 2718070,
   "end": 2718177
  }, {
   "filename": "/preload/drupal-7.95/misc/menu-collapsed.png",
   "start": 2718177,
   "end": 2718282
  }, {
   "filename": "/preload/drupal-7.95/misc/menu-expanded.png",
   "start": 2718282,
   "end": 2718388
  }, {
   "filename": "/preload/drupal-7.95/misc/menu-leaf.png",
   "start": 2718388,
   "end": 2718514
  }, {
   "filename": "/preload/drupal-7.95/misc/message-16-error.png",
   "start": 2718514,
   "end": 2719033
  }, {
   "filename": "/preload/drupal-7.95/misc/message-16-help.png",
   "start": 2719033,
   "end": 2719701
  }, {
   "filename": "/preload/drupal-7.95/misc/message-16-info.png",
   "start": 2719701,
   "end": 2720434
  }, {
   "filename": "/preload/drupal-7.95/misc/message-16-ok.png",
   "start": 2720434,
   "end": 2721073
  }, {
   "filename": "/preload/drupal-7.95/misc/message-16-warning.png",
   "start": 2721073,
   "end": 2721515
  }, {
   "filename": "/preload/drupal-7.95/misc/message-24-error.png",
   "start": 2721515,
   "end": 2722248
  }, {
   "filename": "/preload/drupal-7.95/misc/message-24-help.png",
   "start": 2722248,
   "end": 2723336
  }, {
   "filename": "/preload/drupal-7.95/misc/message-24-info.png",
   "start": 2723336,
   "end": 2724347
  }, {
   "filename": "/preload/drupal-7.95/misc/message-24-ok.png",
   "start": 2724347,
   "end": 2725405
  }, {
   "filename": "/preload/drupal-7.95/misc/message-24-warning.png",
   "start": 2725405,
   "end": 2726158
  }, {
   "filename": "/preload/drupal-7.95/misc/permissions.png",
   "start": 2726158,
   "end": 2726400
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-black-135x42.png",
   "start": 2726400,
   "end": 2729099
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-black-80x15.png",
   "start": 2729099,
   "end": 2730547
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-black-88x31.png",
   "start": 2730547,
   "end": 2732552
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-blue-135x42.png",
   "start": 2732552,
   "end": 2735431
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-blue-80x15.png",
   "start": 2735431,
   "end": 2736374
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-blue-88x31.png",
   "start": 2736374,
   "end": 2738383
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-gray-135x42.png",
   "start": 2738383,
   "end": 2740977
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-gray-80x15.png",
   "start": 2740977,
   "end": 2741675
  }, {
   "filename": "/preload/drupal-7.95/misc/powered-gray-88x31.png",
   "start": 2741675,
   "end": 2743643
  }, {
   "filename": "/preload/drupal-7.95/misc/print-rtl.css",
   "start": 2743643,
   "end": 2743699
  }, {
   "filename": "/preload/drupal-7.95/misc/print.css",
   "start": 2743699,
   "end": 2743990
  }, {
   "filename": "/preload/drupal-7.95/misc/progress.gif",
   "start": 2743990,
   "end": 2749862
  }, {
   "filename": "/preload/drupal-7.95/misc/progress.js",
   "start": 2749862,
   "end": 2752974
  }, {
   "filename": "/preload/drupal-7.95/misc/states.js",
   "start": 2752974,
   "end": 2770478
  }, {
   "filename": "/preload/drupal-7.95/misc/tabledrag.js",
   "start": 2770478,
   "end": 2814799
  }, {
   "filename": "/preload/drupal-7.95/misc/tableheader.js",
   "start": 2814799,
   "end": 2820817
  }, {
   "filename": "/preload/drupal-7.95/misc/tableselect.js",
   "start": 2820817,
   "end": 2824750
  }, {
   "filename": "/preload/drupal-7.95/misc/textarea.js",
   "start": 2824750,
   "end": 2825670
  }, {
   "filename": "/preload/drupal-7.95/misc/throbber-active.gif",
   "start": 2825670,
   "end": 2826903
  }, {
   "filename": "/preload/drupal-7.95/misc/throbber-inactive.png",
   "start": 2826903,
   "end": 2827223
  }, {
   "filename": "/preload/drupal-7.95/misc/throbber.gif",
   "start": 2827223,
   "end": 2828559
  }, {
   "filename": "/preload/drupal-7.95/misc/timezone.js",
   "start": 2828559,
   "end": 2831117
  }, {
   "filename": "/preload/drupal-7.95/misc/tree-bottom.png",
   "start": 2831117,
   "end": 2831246
  }, {
   "filename": "/preload/drupal-7.95/misc/tree.png",
   "start": 2831246,
   "end": 2831376
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/drupal-security/PharExtensionInterceptor.php",
   "start": 2831376,
   "end": 2833800
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/LICENSE",
   "start": 2833800,
   "end": 2834891
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/README.md",
   "start": 2834891,
   "end": 2843447
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/composer.json",
   "start": 2843447,
   "end": 2844271
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Assertable.php",
   "start": 2844271,
   "end": 2844817
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Behavior.php",
   "start": 2844817,
   "end": 2848028
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Collectable.php",
   "start": 2848028,
   "end": 2848975
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Exception.php",
   "start": 2848975,
   "end": 2849404
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Helper.php",
   "start": 2849404,
   "end": 2855556
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Interceptor/ConjunctionInterceptor.php",
   "start": 2855556,
   "end": 2857772
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Interceptor/PharExtensionInterceptor.php",
   "start": 2857772,
   "end": 2859259
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Interceptor/PharMetaDataInterceptor.php",
   "start": 2859259,
   "end": 2861446
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Manager.php",
   "start": 2861446,
   "end": 2864528
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/Container.php",
   "start": 2864528,
   "end": 2865651
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/DeserializationException.php",
   "start": 2865651,
   "end": 2866132
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/Manifest.php",
   "start": 2866132,
   "end": 2869797
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/Reader.php",
   "start": 2869797,
   "end": 2877657
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/ReaderException.php",
   "start": 2877657,
   "end": 2878129
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Phar/Stub.php",
   "start": 2878129,
   "end": 2879548
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/PharStreamWrapper.php",
   "start": 2879548,
   "end": 2892227
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Resolvable.php",
   "start": 2892227,
   "end": 2892848
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Resolver/PharInvocation.php",
   "start": 2892848,
   "end": 2895324
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Resolver/PharInvocationCollection.php",
   "start": 2895324,
   "end": 2900033
  }, {
   "filename": "/preload/drupal-7.95/misc/typo3/phar-stream-wrapper/src/Resolver/PharInvocationResolver.php",
   "start": 2900033,
   "end": 2907648
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_flat_0_aaaaaa_40x100.png",
   "start": 2907648,
   "end": 2907828
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_flat_75_ffffff_40x100.png",
   "start": 2907828,
   "end": 2908006
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_glass_55_fbf9ee_1x400.png",
   "start": 2908006,
   "end": 2908126
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_glass_65_ffffff_1x400.png",
   "start": 2908126,
   "end": 2908231
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_glass_75_dadada_1x400.png",
   "start": 2908231,
   "end": 2908342
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_glass_75_e6e6e6_1x400.png",
   "start": 2908342,
   "end": 2908452
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_glass_95_fef1ec_1x400.png",
   "start": 2908452,
   "end": 2908571
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-bg_highlight-soft_75_cccccc_1x100.png",
   "start": 2908571,
   "end": 2908672
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-icons_222222_256x240.png",
   "start": 2908672,
   "end": 2913041
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-icons_2e83ff_256x240.png",
   "start": 2913041,
   "end": 2917410
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-icons_454545_256x240.png",
   "start": 2917410,
   "end": 2921779
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-icons_888888_256x240.png",
   "start": 2921779,
   "end": 2926148
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/images/ui-icons_cd0a0a_256x240.png",
   "start": 2926148,
   "end": 2930517
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.blind.min.js",
   "start": 2930517,
   "end": 2931388
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.bounce.min.js",
   "start": 2931388,
   "end": 2933060
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.clip.min.js",
   "start": 2933060,
   "end": 2934122
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.core.min.js",
   "start": 2934122,
   "end": 2944951
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.drop.min.js",
   "start": 2944951,
   "end": 2946022
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.explode.min.js",
   "start": 2946022,
   "end": 2947666
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.fade.min.js",
   "start": 2947666,
   "end": 2948243
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.fold.min.js",
   "start": 2948243,
   "end": 2949372
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.highlight.min.js",
   "start": 2949372,
   "end": 2950286
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.pulsate.min.js",
   "start": 2950286,
   "end": 2951237
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.scale.min.js",
   "start": 2951237,
   "end": 2955161
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.shake.min.js",
   "start": 2955161,
   "end": 2956294
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.slide.min.js",
   "start": 2956294,
   "end": 2957356
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.effects.transfer.min.js",
   "start": 2957356,
   "end": 2958172
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.accordion.css",
   "start": 2958172,
   "end": 2959238
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.accordion.min.js",
   "start": 2959238,
   "end": 2968236
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.autocomplete.css",
   "start": 2968236,
   "end": 2969343
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.autocomplete.min.js",
   "start": 2969343,
   "end": 2978096
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.button.css",
   "start": 2978096,
   "end": 2980567
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.button.min.js",
   "start": 2980567,
   "end": 2987231
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.core.css",
   "start": 2987231,
   "end": 2988690
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.core.min.js",
   "start": 2988690,
   "end": 2993015
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.datepicker-1.13.0-backport.js",
   "start": 2993015,
   "end": 2994079
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.datepicker.css",
   "start": 2994079,
   "end": 2998126
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.datepicker.min.js",
   "start": 2998126,
   "end": 3033753
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.dialog-1.13.0-backport.js",
   "start": 3033753,
   "end": 3035476
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.dialog.css",
   "start": 3035476,
   "end": 3036839
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.dialog.min.js",
   "start": 3036839,
   "end": 3048360
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.draggable.min.js",
   "start": 3048360,
   "end": 3066912
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.droppable.min.js",
   "start": 3066912,
   "end": 3072682
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.mouse.min.js",
   "start": 3072682,
   "end": 3075415
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.position-1.13.0-backport.js",
   "start": 3075415,
   "end": 3076350
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.position.min.js",
   "start": 3076350,
   "end": 3079963
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.progressbar.css",
   "start": 3079963,
   "end": 3080321
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.progressbar.min.js",
   "start": 3080321,
   "end": 3082142
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.resizable.css",
   "start": 3082142,
   "end": 3083314
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.resizable.min.js",
   "start": 3083314,
   "end": 3100680
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.selectable.css",
   "start": 3100680,
   "end": 3101003
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.selectable.min.js",
   "start": 3101003,
   "end": 3105308
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.slider.css",
   "start": 3105308,
   "end": 3106449
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.slider.min.js",
   "start": 3106449,
   "end": 3116771
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.sortable.min.js",
   "start": 3116771,
   "end": 3140461
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.tabs.css",
   "start": 3140461,
   "end": 3141844
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.tabs.min.js",
   "start": 3141844,
   "end": 3153472
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.theme.css",
   "start": 3153472,
   "end": 3172615
  }, {
   "filename": "/preload/drupal-7.95/misc/ui/jquery.ui.widget.min.js",
   "start": 3172615,
   "end": 3175889
  }, {
   "filename": "/preload/drupal-7.95/misc/vertical-tabs-rtl.css",
   "start": 3175889,
   "end": 3176154
  }, {
   "filename": "/preload/drupal-7.95/misc/vertical-tabs.css",
   "start": 3176154,
   "end": 3178211
  }, {
   "filename": "/preload/drupal-7.95/misc/vertical-tabs.js",
   "start": 3178211,
   "end": 3184542
  }, {
   "filename": "/preload/drupal-7.95/misc/watchdog-error.png",
   "start": 3184542,
   "end": 3185322
  }, {
   "filename": "/preload/drupal-7.95/misc/watchdog-ok.png",
   "start": 3185322,
   "end": 3185697
  }, {
   "filename": "/preload/drupal-7.95/misc/watchdog-warning.png",
   "start": 3185697,
   "end": 3186015
  }, {
   "filename": "/preload/drupal-7.95/modules/README.txt",
   "start": 3186015,
   "end": 3186463
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-feed-source.tpl.php",
   "start": 3186463,
   "end": 3187568
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-item.tpl.php",
   "start": 3187568,
   "end": 3188864
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-rtl.css",
   "start": 3188864,
   "end": 3188988
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-summary-item.tpl.php",
   "start": 3188988,
   "end": 3189703
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-summary-items.tpl.php",
   "start": 3189703,
   "end": 3190355
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator-wrapper.tpl.php",
   "start": 3190355,
   "end": 3190752
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.admin.inc",
   "start": 3190752,
   "end": 3215172
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.api.php",
   "start": 3215172,
   "end": 3222551
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.css",
   "start": 3222551,
   "end": 3223330
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.fetcher.inc",
   "start": 3223330,
   "end": 3225026
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.info",
   "start": 3225026,
   "end": 3225405
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.install",
   "start": 3225405,
   "end": 3235273
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.module",
   "start": 3235273,
   "end": 3264241
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.pages.inc",
   "start": 3264241,
   "end": 3284111
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.parser.inc",
   "start": 3284111,
   "end": 3293669
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.processor.inc",
   "start": 3293669,
   "end": 3301737
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/aggregator.test",
   "start": 3301737,
   "end": 3342259
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/tests/aggregator_test.info",
   "start": 3342259,
   "end": 3342543
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/tests/aggregator_test.module",
   "start": 3342543,
   "end": 3344625
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/tests/aggregator_test_atom.xml",
   "start": 3344625,
   "end": 3345197
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/tests/aggregator_test_rss091.xml",
   "start": 3345197,
   "end": 3347790
  }, {
   "filename": "/preload/drupal-7.95/modules/aggregator/tests/aggregator_test_title_entities.xml",
   "start": 3347790,
   "end": 3348231
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block-admin-display-form.tpl.php",
   "start": 3348231,
   "end": 3350908
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.admin.inc",
   "start": 3350908,
   "end": 3375559
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.api.php",
   "start": 3375559,
   "end": 3391229
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.css",
   "start": 3391229,
   "end": 3391972
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.info",
   "start": 3391972,
   "end": 3392366
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.install",
   "start": 3392366,
   "end": 3409576
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.js",
   "start": 3409576,
   "end": 3415801
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.module",
   "start": 3415801,
   "end": 3455666
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.test",
   "start": 3455666,
   "end": 3494886
  }, {
   "filename": "/preload/drupal-7.95/modules/block/block.tpl.php",
   "start": 3494886,
   "end": 3497343
  }, {
   "filename": "/preload/drupal-7.95/modules/block/tests/block_test.info",
   "start": 3497343,
   "end": 3497585
  }, {
   "filename": "/preload/drupal-7.95/modules/block/tests/block_test.module",
   "start": 3497585,
   "end": 3499123
  }, {
   "filename": "/preload/drupal-7.95/modules/block/tests/themes/block_test_theme/block_test_theme.info",
   "start": 3499123,
   "end": 3499629
  }, {
   "filename": "/preload/drupal-7.95/modules/block/tests/themes/block_test_theme/page.tpl.php",
   "start": 3499629,
   "end": 3503071
  }, {
   "filename": "/preload/drupal-7.95/modules/blog/blog.info",
   "start": 3503071,
   "end": 3503314
  }, {
   "filename": "/preload/drupal-7.95/modules/blog/blog.install",
   "start": 3503314,
   "end": 3503718
  }, {
   "filename": "/preload/drupal-7.95/modules/blog/blog.module",
   "start": 3503718,
   "end": 3512827
  }, {
   "filename": "/preload/drupal-7.95/modules/blog/blog.pages.inc",
   "start": 3512827,
   "end": 3516321
  }, {
   "filename": "/preload/drupal-7.95/modules/blog/blog.test",
   "start": 3516321,
   "end": 3524807
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book-all-books-block.tpl.php",
   "start": 3524807,
   "end": 3525493
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book-export-html.tpl.php",
   "start": 3525493,
   "end": 3527395
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book-navigation.tpl.php",
   "start": 3527395,
   "end": 3529482
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book-node-export-html.tpl.php",
   "start": 3529482,
   "end": 3530168
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book-rtl.css",
   "start": 3530168,
   "end": 3530382
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.admin.inc",
   "start": 3530382,
   "end": 3539987
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.css",
   "start": 3539987,
   "end": 3541023
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.info",
   "start": 3541023,
   "end": 3541377
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.install",
   "start": 3541377,
   "end": 3543715
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.js",
   "start": 3543715,
   "end": 3544304
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.module",
   "start": 3544304,
   "end": 3592153
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.pages.inc",
   "start": 3592153,
   "end": 3599509
  }, {
   "filename": "/preload/drupal-7.95/modules/book/book.test",
   "start": 3599509,
   "end": 3614996
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color-rtl.css",
   "start": 3614996,
   "end": 3615714
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.css",
   "start": 3615714,
   "end": 3617161
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.info",
   "start": 3617161,
   "end": 3617451
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.install",
   "start": 3617451,
   "end": 3619730
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.js",
   "start": 3619730,
   "end": 3627347
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.module",
   "start": 3627347,
   "end": 3654976
  }, {
   "filename": "/preload/drupal-7.95/modules/color/color.test",
   "start": 3654976,
   "end": 3660687
  }, {
   "filename": "/preload/drupal-7.95/modules/color/images/hook-rtl.png",
   "start": 3660687,
   "end": 3660803
  }, {
   "filename": "/preload/drupal-7.95/modules/color/images/hook.png",
   "start": 3660803,
   "end": 3660919
  }, {
   "filename": "/preload/drupal-7.95/modules/color/images/lock.png",
   "start": 3660919,
   "end": 3661149
  }, {
   "filename": "/preload/drupal-7.95/modules/color/preview.html",
   "start": 3661149,
   "end": 3661711
  }, {
   "filename": "/preload/drupal-7.95/modules/color/preview.js",
   "start": 3661711,
   "end": 3663179
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment-node-form.js",
   "start": 3663179,
   "end": 3664229
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment-rtl.css",
   "start": 3664229,
   "end": 3664284
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment-wrapper.tpl.php",
   "start": 3664284,
   "end": 3666310
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.admin.inc",
   "start": 3666310,
   "end": 3675637
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.api.php",
   "start": 3675637,
   "end": 3679530
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.css",
   "start": 3679530,
   "end": 3679714
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.info",
   "start": 3679714,
   "end": 3680109
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.install",
   "start": 3680109,
   "end": 3698317
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.module",
   "start": 3698317,
   "end": 3791781
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.pages.inc",
   "start": 3791781,
   "end": 3796376
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.test",
   "start": 3796376,
   "end": 3897408
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.tokens.inc",
   "start": 3897408,
   "end": 3905259
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/comment.tpl.php",
   "start": 3905259,
   "end": 3908908
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/tests/comment_hook_test.info",
   "start": 3908908,
   "end": 3909179
  }, {
   "filename": "/preload/drupal-7.95/modules/comment/tests/comment_hook_test.module",
   "start": 3909179,
   "end": 3909591
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.admin.inc",
   "start": 3909591,
   "end": 3916989
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.info",
   "start": 3916989,
   "end": 3917310
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.install",
   "start": 3917310,
   "end": 3921463
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.module",
   "start": 3921463,
   "end": 3933108
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.pages.inc",
   "start": 3933108,
   "end": 3942943
  }, {
   "filename": "/preload/drupal-7.95/modules/contact/contact.test",
   "start": 3942943,
   "end": 3963626
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual-rtl.css",
   "start": 3963626,
   "end": 3964034
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.api.php",
   "start": 3964034,
   "end": 3965093
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.css",
   "start": 3965093,
   "end": 3967433
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.info",
   "start": 3967433,
   "end": 3967744
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.js",
   "start": 3967744,
   "end": 3969548
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.module",
   "start": 3969548,
   "end": 3975235
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/contextual.test",
   "start": 3975235,
   "end": 3977161
  }, {
   "filename": "/preload/drupal-7.95/modules/contextual/images/gear-select.png",
   "start": 3977161,
   "end": 3977667
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard-rtl.css",
   "start": 3977667,
   "end": 3978386
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.api.php",
   "start": 3978386,
   "end": 3979447
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.css",
   "start": 3979447,
   "end": 3981882
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.info",
   "start": 3981882,
   "end": 3982307
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.install",
   "start": 3982307,
   "end": 3984256
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.js",
   "start": 3984256,
   "end": 3991352
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.module",
   "start": 3991352,
   "end": 4018136
  }, {
   "filename": "/preload/drupal-7.95/modules/dashboard/dashboard.test",
   "start": 4018136,
   "end": 4024519
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog-rtl.css",
   "start": 4024519,
   "end": 4024732
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.admin.inc",
   "start": 4024732,
   "end": 4037043
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.css",
   "start": 4037043,
   "end": 4038479
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.info",
   "start": 4038479,
   "end": 4038757
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.install",
   "start": 4038757,
   "end": 4043147
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.module",
   "start": 4043147,
   "end": 4050497
  }, {
   "filename": "/preload/drupal-7.95/modules/dblog/dblog.test",
   "start": 4050497,
   "end": 4079861
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.api.php",
   "start": 4079861,
   "end": 4179649
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.attach.inc",
   "start": 4179649,
   "end": 4235961
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.crud.inc",
   "start": 4235961,
   "end": 4275707
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.default.inc",
   "start": 4275707,
   "end": 4285743
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.form.inc",
   "start": 4285743,
   "end": 4308849
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.info",
   "start": 4308849,
   "end": 4309301
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.info.class.inc",
   "start": 4309301,
   "end": 4331357
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.info.inc",
   "start": 4331357,
   "end": 4357481
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.install",
   "start": 4357481,
   "end": 4373174
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.module",
   "start": 4373174,
   "end": 4423173
  }, {
   "filename": "/preload/drupal-7.95/modules/field/field.multilingual.inc",
   "start": 4423173,
   "end": 4434647
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/field_sql_storage/field_sql_storage.info",
   "start": 4434647,
   "end": 4434967
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/field_sql_storage/field_sql_storage.install",
   "start": 4434967,
   "end": 4441733
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/field_sql_storage/field_sql_storage.module",
   "start": 4441733,
   "end": 4475210
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/field_sql_storage/field_sql_storage.test",
   "start": 4475210,
   "end": 4506010
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/list.info",
   "start": 4506010,
   "end": 4506351
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/list.install",
   "start": 4506351,
   "end": 4510316
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/list.module",
   "start": 4510316,
   "end": 4528085
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/tests/list.test",
   "start": 4528085,
   "end": 4547153
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/tests/list_test.info",
   "start": 4547153,
   "end": 4547418
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/list/tests/list_test.module",
   "start": 4547418,
   "end": 4548132
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/number/number.info",
   "start": 4548132,
   "end": 4548405
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/number/number.install",
   "start": 4548405,
   "end": 4549278
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/number/number.module",
   "start": 4549278,
   "end": 4564841
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/number/number.test",
   "start": 4564841,
   "end": 4571012
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/options/options.api.php",
   "start": 4571012,
   "end": 4573457
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/options/options.info",
   "start": 4573457,
   "end": 4573786
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/options/options.module",
   "start": 4573786,
   "end": 4586288
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/options/options.test",
   "start": 4586288,
   "end": 4609924
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/text/text.info",
   "start": 4609924,
   "end": 4610213
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/text/text.install",
   "start": 4610213,
   "end": 4612355
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/text/text.js",
   "start": 4612355,
   "end": 4614132
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/text/text.module",
   "start": 4614132,
   "end": 4635343
  }, {
   "filename": "/preload/drupal-7.95/modules/field/modules/text/text.test",
   "start": 4635343,
   "end": 4654252
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field.test",
   "start": 4654252,
   "end": 4824387
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.entity.inc",
   "start": 4824387,
   "end": 4839150
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.field.inc",
   "start": 4839150,
   "end": 4851228
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.info",
   "start": 4851228,
   "end": 4851528
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.install",
   "start": 4851528,
   "end": 4855850
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.module",
   "start": 4855850,
   "end": 4865264
  }, {
   "filename": "/preload/drupal-7.95/modules/field/tests/field_test.storage.inc",
   "start": 4865264,
   "end": 4876327
  }, {
   "filename": "/preload/drupal-7.95/modules/field/theme/field-rtl.css",
   "start": 4876327,
   "end": 4876648
  }, {
   "filename": "/preload/drupal-7.95/modules/field/theme/field.css",
   "start": 4876648,
   "end": 4877198
  }, {
   "filename": "/preload/drupal-7.95/modules/field/theme/field.tpl.php",
   "start": 4877198,
   "end": 4880136
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui-rtl.css",
   "start": 4880136,
   "end": 4880315
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.admin.inc",
   "start": 4880315,
   "end": 4960361
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.api.php",
   "start": 4960361,
   "end": 4966466
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.css",
   "start": 4966466,
   "end": 4968230
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.info",
   "start": 4968230,
   "end": 4968512
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.js",
   "start": 4968512,
   "end": 4980316
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.module",
   "start": 4980316,
   "end": 5002241
  }, {
   "filename": "/preload/drupal-7.95/modules/field_ui/field_ui.test",
   "start": 5002241,
   "end": 5033770
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.api.php",
   "start": 5033770,
   "end": 5035710
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.css",
   "start": 5035710,
   "end": 5036282
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.field.inc",
   "start": 5036282,
   "end": 5072066
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.info",
   "start": 5072066,
   "end": 5072339
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.install",
   "start": 5072339,
   "end": 5076645
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.js",
   "start": 5076645,
   "end": 5082820
  }, {
   "filename": "/preload/drupal-7.95/modules/file/file.module",
   "start": 5082820,
   "end": 5126610
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/application-octet-stream.png",
   "start": 5126610,
   "end": 5126799
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/application-pdf.png",
   "start": 5126799,
   "end": 5127145
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/application-x-executable.png",
   "start": 5127145,
   "end": 5127334
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/audio-x-generic.png",
   "start": 5127334,
   "end": 5127648
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/image-x-generic.png",
   "start": 5127648,
   "end": 5128033
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/package-x-generic.png",
   "start": 5128033,
   "end": 5128293
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/text-html.png",
   "start": 5128293,
   "end": 5128558
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/text-plain.png",
   "start": 5128558,
   "end": 5128778
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/text-x-generic.png",
   "start": 5128778,
   "end": 5128998
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/text-x-script.png",
   "start": 5128998,
   "end": 5129274
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/video-x-generic.png",
   "start": 5129274,
   "end": 5129488
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/x-office-document.png",
   "start": 5129488,
   "end": 5129684
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/x-office-presentation.png",
   "start": 5129684,
   "end": 5129865
  }, {
   "filename": "/preload/drupal-7.95/modules/file/icons/x-office-spreadsheet.png",
   "start": 5129865,
   "end": 5130048
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/file.test",
   "start": 5130048,
   "end": 5219160
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/file_module_test.info",
   "start": 5219160,
   "end": 5219430
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/file_module_test.module",
   "start": 5219430,
   "end": 5221657
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/fixtures/file_scan_ignore/a.txt",
   "start": 5221657,
   "end": 5221657
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/fixtures/file_scan_ignore/frontend_framework/b.txt",
   "start": 5221657,
   "end": 5221657
  }, {
   "filename": "/preload/drupal-7.95/modules/file/tests/fixtures/file_scan_ignore/frontend_framework/c.txt",
   "start": 5221657,
   "end": 5221657
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.admin.inc",
   "start": 5221657,
   "end": 5236418
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.admin.js",
   "start": 5236418,
   "end": 5237998
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.api.php",
   "start": 5237998,
   "end": 5249809
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.css",
   "start": 5249809,
   "end": 5250732
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.info",
   "start": 5250732,
   "end": 5251054
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.install",
   "start": 5251054,
   "end": 5266861
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.js",
   "start": 5266861,
   "end": 5267417
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.module",
   "start": 5267417,
   "end": 5335490
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.pages.inc",
   "start": 5335490,
   "end": 5337913
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/filter.test",
   "start": 5337913,
   "end": 5428093
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/tests/filter.url-input.txt",
   "start": 5428093,
   "end": 5430276
  }, {
   "filename": "/preload/drupal-7.95/modules/filter/tests/filter.url-output.txt",
   "start": 5430276,
   "end": 5433914
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum-icon.tpl.php",
   "start": 5433914,
   "end": 5434605
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum-list.tpl.php",
   "start": 5434605,
   "end": 5437948
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum-rtl.css",
   "start": 5437948,
   "end": 5438346
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum-submitted.tpl.php",
   "start": 5438346,
   "end": 5439057
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum-topic-list.tpl.php",
   "start": 5439057,
   "end": 5441554
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.admin.inc",
   "start": 5441554,
   "end": 5453558
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.css",
   "start": 5453558,
   "end": 5454614
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.info",
   "start": 5454614,
   "end": 5454977
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.install",
   "start": 5454977,
   "end": 5468564
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.module",
   "start": 5468564,
   "end": 5517506
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.pages.inc",
   "start": 5517506,
   "end": 5518544
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forum.test",
   "start": 5518544,
   "end": 5544192
  }, {
   "filename": "/preload/drupal-7.95/modules/forum/forums.tpl.php",
   "start": 5544192,
   "end": 5544742
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help-rtl.css",
   "start": 5544742,
   "end": 5544875
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help.admin.inc",
   "start": 5544875,
   "end": 5547422
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help.css",
   "start": 5547422,
   "end": 5547560
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help.info",
   "start": 5547560,
   "end": 5547813
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help.module",
   "start": 5547813,
   "end": 5552103
  }, {
   "filename": "/preload/drupal-7.95/modules/help/help.test",
   "start": 5552103,
   "end": 5556656
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image-rtl.css",
   "start": 5556656,
   "end": 5556795
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.admin.css",
   "start": 5556795,
   "end": 5557911
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.admin.inc",
   "start": 5557911,
   "end": 5591415
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.api.php",
   "start": 5591415,
   "end": 5598629
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.css",
   "start": 5598629,
   "end": 5598854
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.effects.inc",
   "start": 5598854,
   "end": 5611197
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.field.inc",
   "start": 5611197,
   "end": 5632450
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.info",
   "start": 5632450,
   "end": 5632770
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.install",
   "start": 5632770,
   "end": 5647908
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.module",
   "start": 5647908,
   "end": 5697883
  }, {
   "filename": "/preload/drupal-7.95/modules/image/image.test",
   "start": 5697883,
   "end": 5788290
  }, {
   "filename": "/preload/drupal-7.95/modules/image/sample.png",
   "start": 5788290,
   "end": 5956400
  }, {
   "filename": "/preload/drupal-7.95/modules/image/tests/image_module_styles_test.info",
   "start": 5956400,
   "end": 5956782
  }, {
   "filename": "/preload/drupal-7.95/modules/image/tests/image_module_styles_test.module",
   "start": 5956782,
   "end": 5957366
  }, {
   "filename": "/preload/drupal-7.95/modules/image/tests/image_module_test.info",
   "start": 5957366,
   "end": 5957688
  }, {
   "filename": "/preload/drupal-7.95/modules/image/tests/image_module_test.module",
   "start": 5957688,
   "end": 5958955
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale-rtl.css",
   "start": 5958955,
   "end": 5959266
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.admin.inc",
   "start": 5959266,
   "end": 6012445
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.api.php",
   "start": 6012445,
   "end": 6013354
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.css",
   "start": 6013354,
   "end": 6014229
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.datepicker.js",
   "start": 6014229,
   "end": 6016339
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.info",
   "start": 6016339,
   "end": 6016723
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.install",
   "start": 6016723,
   "end": 6031638
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.module",
   "start": 6031638,
   "end": 6078142
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/locale.test",
   "start": 6078142,
   "end": 6207887
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/tests/locale_test.info",
   "start": 6207887,
   "end": 6208155
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/tests/locale_test.js",
   "start": 6208155,
   "end": 6209884
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/tests/locale_test.module",
   "start": 6209884,
   "end": 6215429
  }, {
   "filename": "/preload/drupal-7.95/modules/locale/tests/translations/test.xx.po",
   "start": 6215429,
   "end": 6215869
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.admin.inc",
   "start": 6215869,
   "end": 6244969
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.admin.js",
   "start": 6244969,
   "end": 6246397
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.api.php",
   "start": 6246397,
   "end": 6248976
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.css",
   "start": 6248976,
   "end": 6249093
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.info",
   "start": 6249093,
   "end": 6249404
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.install",
   "start": 6249404,
   "end": 6256532
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.js",
   "start": 6256532,
   "end": 6259027
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.module",
   "start": 6259027,
   "end": 6289425
  }, {
   "filename": "/preload/drupal-7.95/modules/menu/menu.test",
   "start": 6289425,
   "end": 6320146
  }, {
   "filename": "/preload/drupal-7.95/modules/node/content_types.inc",
   "start": 6320146,
   "end": 6335784
  }, {
   "filename": "/preload/drupal-7.95/modules/node/content_types.js",
   "start": 6335784,
   "end": 6336989
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.admin.inc",
   "start": 6336989,
   "end": 6360814
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.api.php",
   "start": 6360814,
   "end": 6410413
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.css",
   "start": 6410413,
   "end": 6410557
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.info",
   "start": 6410557,
   "end": 6410943
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.install",
   "start": 6410943,
   "end": 6442211
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.js",
   "start": 6442211,
   "end": 6443814
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.module",
   "start": 6443814,
   "end": 6583327
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.pages.inc",
   "start": 6583327,
   "end": 6607878
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.test",
   "start": 6607878,
   "end": 6729917
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.tokens.inc",
   "start": 6729917,
   "end": 6736745
  }, {
   "filename": "/preload/drupal-7.95/modules/node/node.tpl.php",
   "start": 6736745,
   "end": 6741705
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_access_test.info",
   "start": 6741705,
   "end": 6741987
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_access_test.install",
   "start": 6741987,
   "end": 6743016
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_access_test.module",
   "start": 6743016,
   "end": 6749332
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_test.info",
   "start": 6749332,
   "end": 6749604
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_test.module",
   "start": 6749604,
   "end": 6754692
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_test_exception.info",
   "start": 6754692,
   "end": 6754984
  }, {
   "filename": "/preload/drupal-7.95/modules/node/tests/node_test_exception.module",
   "start": 6754984,
   "end": 6755290
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/login-bg.png",
   "start": 6755290,
   "end": 6755495
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid-rtl.css",
   "start": 6755495,
   "end": 6755875
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.api.php",
   "start": 6755875,
   "end": 6759212
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.css",
   "start": 6759212,
   "end": 6760252
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.inc",
   "start": 6760252,
   "end": 6787184
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.info",
   "start": 6787184,
   "end": 6787456
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.install",
   "start": 6787456,
   "end": 6794417
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.js",
   "start": 6794417,
   "end": 6796246
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.module",
   "start": 6796246,
   "end": 6837536
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.pages.inc",
   "start": 6837536,
   "end": 6841317
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/openid.test",
   "start": 6841317,
   "end": 6878816
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/tests/openid_test.info",
   "start": 6878816,
   "end": 6879107
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/tests/openid_test.install",
   "start": 6879107,
   "end": 6879550
  }, {
   "filename": "/preload/drupal-7.95/modules/openid/tests/openid_test.module",
   "start": 6879550,
   "end": 6894103
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/images/background.png",
   "start": 6894103,
   "end": 6894179
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/images/close-rtl.png",
   "start": 6894179,
   "end": 6894547
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/images/close.png",
   "start": 6894547,
   "end": 6894891
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay-child-rtl.css",
   "start": 6894891,
   "end": 6895462
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay-child.css",
   "start": 6895462,
   "end": 6898813
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay-child.js",
   "start": 6898813,
   "end": 6905541
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay-parent.css",
   "start": 6905541,
   "end": 6906663
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay-parent.js",
   "start": 6906663,
   "end": 6945087
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay.api.php",
   "start": 6945087,
   "end": 6946144
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay.info",
   "start": 6946144,
   "end": 6946404
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay.install",
   "start": 6946404,
   "end": 6946884
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay.module",
   "start": 6946884,
   "end": 6983353
  }, {
   "filename": "/preload/drupal-7.95/modules/overlay/overlay.tpl.php",
   "start": 6983353,
   "end": 6984721
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.admin.inc",
   "start": 6984721,
   "end": 6994739
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.api.php",
   "start": 6994739,
   "end": 6996223
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.info",
   "start": 6996223,
   "end": 6996506
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.js",
   "start": 6996506,
   "end": 6996926
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.module",
   "start": 6996926,
   "end": 7008948
  }, {
   "filename": "/preload/drupal-7.95/modules/path/path.test",
   "start": 7008948,
   "end": 7032783
  }, {
   "filename": "/preload/drupal-7.95/modules/php/php.info",
   "start": 7032783,
   "end": 7033056
  }, {
   "filename": "/preload/drupal-7.95/modules/php/php.install",
   "start": 7033056,
   "end": 7034672
  }, {
   "filename": "/preload/drupal-7.95/modules/php/php.module",
   "start": 7034672,
   "end": 7042333
  }, {
   "filename": "/preload/drupal-7.95/modules/php/php.test",
   "start": 7042333,
   "end": 7046900
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-bar--block.tpl.php",
   "start": 7046900,
   "end": 7047609
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-bar.tpl.php",
   "start": 7047609,
   "end": 7048384
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-results--block.tpl.php",
   "start": 7048384,
   "end": 7049206
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-results.tpl.php",
   "start": 7049206,
   "end": 7049995
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-rtl.css",
   "start": 7049995,
   "end": 7050129
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll-vote.tpl.php",
   "start": 7050129,
   "end": 7050926
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.css",
   "start": 7050926,
   "end": 7051735
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.info",
   "start": 7051735,
   "end": 7052078
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.install",
   "start": 7052078,
   "end": 7058158
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.module",
   "start": 7058158,
   "end": 7088890
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.pages.inc",
   "start": 7088890,
   "end": 7092017
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.test",
   "start": 7092017,
   "end": 7126378
  }, {
   "filename": "/preload/drupal-7.95/modules/poll/poll.tokens.inc",
   "start": 7126378,
   "end": 7129275
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile-block.tpl.php",
   "start": 7129275,
   "end": 7130640
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile-listing.tpl.php",
   "start": 7130640,
   "end": 7132286
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile-wrapper.tpl.php",
   "start": 7132286,
   "end": 7133105
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.admin.inc",
   "start": 7133105,
   "end": 7151229
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.css",
   "start": 7151229,
   "end": 7151397
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.info",
   "start": 7151397,
   "end": 7151970
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.install",
   "start": 7151970,
   "end": 7156845
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.js",
   "start": 7156845,
   "end": 7159542
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.module",
   "start": 7159542,
   "end": 7182592
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.pages.inc",
   "start": 7182592,
   "end": 7187107
  }, {
   "filename": "/preload/drupal-7.95/modules/profile/profile.test",
   "start": 7187107,
   "end": 7206609
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/rdf.api.php",
   "start": 7206609,
   "end": 7210245
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/rdf.info",
   "start": 7210245,
   "end": 7210609
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/rdf.install",
   "start": 7210609,
   "end": 7211901
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/rdf.module",
   "start": 7211901,
   "end": 7246241
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/rdf.test",
   "start": 7246241,
   "end": 7281867
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/tests/rdf_test.info",
   "start": 7281867,
   "end": 7282158
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/tests/rdf_test.install",
   "start": 7282158,
   "end": 7282630
  }, {
   "filename": "/preload/drupal-7.95/modules/rdf/tests/rdf_test.module",
   "start": 7282630,
   "end": 7284221
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search-block-form.tpl.php",
   "start": 7284221,
   "end": 7285393
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search-result.tpl.php",
   "start": 7285393,
   "end": 7288710
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search-results.tpl.php",
   "start": 7288710,
   "end": 7289761
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search-rtl.css",
   "start": 7289761,
   "end": 7289982
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.admin.inc",
   "start": 7289982,
   "end": 7298068
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.api.php",
   "start": 7298068,
   "end": 7311244
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.css",
   "start": 7311244,
   "end": 7311808
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.extender.inc",
   "start": 7311808,
   "end": 7329358
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.info",
   "start": 7329358,
   "end": 7329719
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.install",
   "start": 7329719,
   "end": 7335086
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.module",
   "start": 7335086,
   "end": 7386289
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.pages.inc",
   "start": 7386289,
   "end": 7392033
  }, {
   "filename": "/preload/drupal-7.95/modules/search/search.test",
   "start": 7392033,
   "end": 7475171
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/UnicodeTest.txt",
   "start": 7475171,
   "end": 7520416
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_embedded_form.info",
   "start": 7520416,
   "end": 7520710
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_embedded_form.module",
   "start": 7520710,
   "end": 7522657
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_extra_type.info",
   "start": 7522657,
   "end": 7522929
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_extra_type.module",
   "start": 7522929,
   "end": 7524601
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_node_tags.info",
   "start": 7524601,
   "end": 7524881
  }, {
   "filename": "/preload/drupal-7.95/modules/search/tests/search_node_tags.module",
   "start": 7524881,
   "end": 7525398
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut-rtl.css",
   "start": 7525398,
   "end": 7526465
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.admin.css",
   "start": 7526465,
   "end": 7526569
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.admin.inc",
   "start": 7526569,
   "end": 7553451
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.admin.js",
   "start": 7553451,
   "end": 7557936
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.api.php",
   "start": 7557936,
   "end": 7559175
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.css",
   "start": 7559175,
   "end": 7561583
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.info",
   "start": 7561583,
   "end": 7561918
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.install",
   "start": 7561918,
   "end": 7564971
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.module",
   "start": 7564971,
   "end": 7592170
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.png",
   "start": 7592170,
   "end": 7592728
  }, {
   "filename": "/preload/drupal-7.95/modules/shortcut/shortcut.test",
   "start": 7592728,
   "end": 7606390
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/drupal_web_test_case.php",
   "start": 7606390,
   "end": 7751103
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/README.txt",
   "start": 7751103,
   "end": 7751347
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/comment_hacks.css",
   "start": 7751347,
   "end": 7813383
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/comment_hacks.css.optimized.css",
   "start": 7813383,
   "end": 7814272
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/comment_hacks.css.unoptimized.css",
   "start": 7814272,
   "end": 7876308
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_with_import.css",
   "start": 7876308,
   "end": 7876791
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_with_import.css.optimized.css",
   "start": 7876791,
   "end": 7878084
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_with_import.css.unoptimized.css",
   "start": 7878084,
   "end": 7879601
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_without_import.css",
   "start": 7879601,
   "end": 7880755
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_without_import.css.optimized.css",
   "start": 7880755,
   "end": 7881569
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_input_without_import.css.unoptimized.css",
   "start": 7881569,
   "end": 7882723
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_subfolder/css_input_with_import.css",
   "start": 7882723,
   "end": 7883126
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_subfolder/css_input_with_import.css.optimized.css",
   "start": 7883126,
   "end": 7884339
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/css_subfolder/css_input_with_import.css.unoptimized.css",
   "start": 7884339,
   "end": 7885773
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/import1.css",
   "start": 7885773,
   "end": 7886780
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/import2.css",
   "start": 7886780,
   "end": 7886851
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/quotes.css",
   "start": 7886851,
   "end": 7887385
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/quotes.css.optimized.css",
   "start": 7887385,
   "end": 7887727
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/css_test_files/quotes.css.unoptimized.css",
   "start": 7887727,
   "end": 7888261
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/html-1.txt",
   "start": 7888261,
   "end": 7888285
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/html-2.html",
   "start": 7888285,
   "end": 7888309
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-1.png",
   "start": 7888309,
   "end": 7927634
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-2.jpg",
   "start": 7927634,
   "end": 7929465
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-test-no-transparency.gif",
   "start": 7929465,
   "end": 7930429
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-test-transparent-out-of-range.gif",
   "start": 7930429,
   "end": 7930612
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-test.gif",
   "start": 7930612,
   "end": 7930795
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-test.jpg",
   "start": 7930795,
   "end": 7932696
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/image-test.png",
   "start": 7932696,
   "end": 7932821
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/javascript-1.txt",
   "start": 7932821,
   "end": 7932879
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/javascript-2.script",
   "start": 7932879,
   "end": 7932936
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/phar-1.phar",
   "start": 7932936,
   "end": 7939845
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/php-1.txt",
   "start": 7939845,
   "end": 7939892
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/php-2.php",
   "start": 7939892,
   "end": 7939936
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/sql-1.txt",
   "start": 7939936,
   "end": 7939977
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/files/sql-2.sql",
   "start": 7939977,
   "end": 7940018
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/lib/Drupal/simpletest/Tests/PSR0WebTest.php",
   "start": 7940018,
   "end": 7940413
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.api.php",
   "start": 7940413,
   "end": 7941633
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.css",
   "start": 7941633,
   "end": 7943141
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.info",
   "start": 7943141,
   "end": 7945201
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.install",
   "start": 7945201,
   "end": 7951249
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.js",
   "start": 7951249,
   "end": 7954843
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.module",
   "start": 7954843,
   "end": 7979122
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.pages.inc",
   "start": 7979122,
   "end": 7997136
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/simpletest.test",
   "start": 7997136,
   "end": 8027929
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/src/Tests/PSR4WebTest.php",
   "start": 8027929,
   "end": 8028324
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/actions.test",
   "start": 8028324,
   "end": 8034164
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/actions_loop_test.info",
   "start": 8034164,
   "end": 8034431
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/actions_loop_test.install",
   "start": 8034431,
   "end": 8034637
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/actions_loop_test.module",
   "start": 8034637,
   "end": 8037236
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/ajax.test",
   "start": 8037236,
   "end": 8064064
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/ajax_forms_test.info",
   "start": 8064064,
   "end": 8064330
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/ajax_forms_test.module",
   "start": 8064330,
   "end": 8081288
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/ajax_test.info",
   "start": 8081288,
   "end": 8081548
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/ajax_test.module",
   "start": 8081548,
   "end": 8083437
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/batch.test",
   "start": 8083437,
   "end": 8100321
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/batch_test.callbacks.inc",
   "start": 8100321,
   "end": 8104827
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/batch_test.info",
   "start": 8104827,
   "end": 8105091
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/batch_test.module",
   "start": 8105091,
   "end": 8118726
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/boot.test",
   "start": 8118726,
   "end": 8119910
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/boot_test_1.info",
   "start": 8119910,
   "end": 8120181
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/boot_test_1.module",
   "start": 8120181,
   "end": 8120731
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/boot_test_2.info",
   "start": 8120731,
   "end": 8121007
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/boot_test_2.module",
   "start": 8121007,
   "end": 8121196
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/bootstrap.test",
   "start": 8121196,
   "end": 8165386
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/cache.test",
   "start": 8165386,
   "end": 8181137
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common.test",
   "start": 8181137,
   "end": 8326744
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test.css",
   "start": 8326744,
   "end": 8326823
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test.info",
   "start": 8326823,
   "end": 8327163
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test.module",
   "start": 8327163,
   "end": 8335831
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test.print.css",
   "start": 8335831,
   "end": 8335910
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test_cron_helper.info",
   "start": 8335910,
   "end": 8336204
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test_cron_helper.module",
   "start": 8336204,
   "end": 8336566
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/common_test_info.txt",
   "start": 8336566,
   "end": 8336900
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/database_test.info",
   "start": 8336900,
   "end": 8337168
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/database_test.install",
   "start": 8337168,
   "end": 8344569
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/database_test.module",
   "start": 8344569,
   "end": 8351233
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/database_test.test",
   "start": 8351233,
   "end": 8516471
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_autoload_test/drupal_autoload_test.info",
   "start": 8516471,
   "end": 8516842
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_autoload_test/drupal_autoload_test.module",
   "start": 8516842,
   "end": 8517421
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_autoload_test/drupal_autoload_test_class.inc",
   "start": 8517421,
   "end": 8517636
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_autoload_test/drupal_autoload_test_interface.inc",
   "start": 8517636,
   "end": 8517827
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_autoload_test/drupal_autoload_test_trait.sh",
   "start": 8517827,
   "end": 8518229
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.info",
   "start": 8518229,
   "end": 8518543
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.module",
   "start": 8518543,
   "end": 8518549
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_system_listing_incompatible_test/drupal_system_listing_incompatible_test.info",
   "start": 8518549,
   "end": 8518865
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/drupal_system_listing_incompatible_test/drupal_system_listing_incompatible_test.module",
   "start": 8518865,
   "end": 8518871
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_cache_test.info",
   "start": 8518871,
   "end": 8519189
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_cache_test.module",
   "start": 8519189,
   "end": 8520062
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_cache_test_dependency.info",
   "start": 8520062,
   "end": 8520356
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_cache_test_dependency.module",
   "start": 8520356,
   "end": 8520661
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_crud.test",
   "start": 8520661,
   "end": 8523013
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_crud_hook_test.info",
   "start": 8523013,
   "end": 8523285
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_crud_hook_test.module",
   "start": 8523285,
   "end": 8529428
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_crud_hook_test.test",
   "start": 8529428,
   "end": 8542199
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_query.test",
   "start": 8542199,
   "end": 8609561
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_query_access_test.info",
   "start": 8609561,
   "end": 8609849
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/entity_query_access_test.module",
   "start": 8609849,
   "end": 8611384
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/error.test",
   "start": 8611384,
   "end": 8616211
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/error_test.info",
   "start": 8616211,
   "end": 8616483
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/error_test.module",
   "start": 8616483,
   "end": 8618455
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/file.test",
   "start": 8618455,
   "end": 8744772
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/file_test.info",
   "start": 8744772,
   "end": 8745062
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/file_test.module",
   "start": 8745062,
   "end": 8757810
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/filetransfer.test",
   "start": 8757810,
   "end": 8762401
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/filter_test.info",
   "start": 8762401,
   "end": 8762663
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/filter_test.module",
   "start": 8762663,
   "end": 8764380
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/form.test",
   "start": 8764380,
   "end": 8860368
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/form_test.file.inc",
   "start": 8860368,
   "end": 8861801
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/form_test.info",
   "start": 8861801,
   "end": 8862062
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/form_test.module",
   "start": 8862062,
   "end": 8922850
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/graph.test",
   "start": 8922850,
   "end": 8929227
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/http.php",
   "start": 8929227,
   "end": 8930124
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/https.php",
   "start": 8930124,
   "end": 8930984
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/image.test",
   "start": 8930984,
   "end": 8952182
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/image_test.info",
   "start": 8952182,
   "end": 8952446
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/image_test.module",
   "start": 8952446,
   "end": 8955689
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/lock.test",
   "start": 8955689,
   "end": 8958313
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/mail.test",
   "start": 8958313,
   "end": 8980809
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/menu.test",
   "start": 8980809,
   "end": 9055080
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/menu_test.info",
   "start": 9055080,
   "end": 9055347
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/menu_test.module",
   "start": 9055347,
   "end": 9073710
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module.test",
   "start": 9073710,
   "end": 9092168
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module_test.file.inc",
   "start": 9092168,
   "end": 9092371
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module_test.implementations.inc",
   "start": 9092371,
   "end": 9092542
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module_test.info",
   "start": 9092542,
   "end": 9092809
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module_test.install",
   "start": 9092809,
   "end": 9093739
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/module_test.module",
   "start": 9093739,
   "end": 9097917
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/pager.test",
   "start": 9097917,
   "end": 9103927
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/password.test",
   "start": 9103927,
   "end": 9107454
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/path.test",
   "start": 9107454,
   "end": 9121657
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/path_test.info",
   "start": 9121657,
   "end": 9121924
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/path_test.module",
   "start": 9121924,
   "end": 9122334
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib/Drupal/psr_0_test/Tests/ExampleTest.php",
   "start": 9122334,
   "end": 9122755
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/lib/Drupal/psr_0_test/Tests/Nested/NestedExampleTest.php",
   "start": 9122755,
   "end": 9123196
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/psr_0_test.info",
   "start": 9123196,
   "end": 9123450
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_0_test/psr_0_test.module",
   "start": 9123450,
   "end": 9123456
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/psr_4_test.info",
   "start": 9123456,
   "end": 9123710
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/psr_4_test.module",
   "start": 9123710,
   "end": 9123716
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/src/Tests/ExampleTest.php",
   "start": 9123716,
   "end": 9124137
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/psr_4_test/src/Tests/Nested/NestedExampleTest.php",
   "start": 9124137,
   "end": 9124578
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/registry.test",
   "start": 9124578,
   "end": 9129475
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/request_sanitizer.test",
   "start": 9129475,
   "end": 9142758
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/requirements1_test.info",
   "start": 9142758,
   "end": 9143070
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/requirements1_test.install",
   "start": 9143070,
   "end": 9143575
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/requirements1_test.module",
   "start": 9143575,
   "end": 9143686
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/requirements2_test.info",
   "start": 9143686,
   "end": 9144077
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/requirements2_test.module",
   "start": 9144077,
   "end": 9144207
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/schema.test",
   "start": 9144207,
   "end": 9159931
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/session.test",
   "start": 9159931,
   "end": 9195632
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/session_test.info",
   "start": 9195632,
   "end": 9195899
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/session_test.module",
   "start": 9195899,
   "end": 9202090
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system.base.css",
   "start": 9202090,
   "end": 9202233
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_admin_test.info",
   "start": 9202233,
   "end": 9202543
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_admin_test.module",
   "start": 9202543,
   "end": 9202625
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_dependencies_test.info",
   "start": 9202625,
   "end": 9202946
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_dependencies_test.module",
   "start": 9202946,
   "end": 9202952
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_core_version_dependencies_test.info",
   "start": 9202952,
   "end": 9203319
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_core_version_dependencies_test.module",
   "start": 9203319,
   "end": 9203325
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_core_version_test.info",
   "start": 9203325,
   "end": 9203624
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_core_version_test.module",
   "start": 9203624,
   "end": 9203630
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_module_version_dependencies_test.info",
   "start": 9203630,
   "end": 9204071
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_module_version_dependencies_test.module",
   "start": 9204071,
   "end": 9204077
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_module_version_test.info",
   "start": 9204077,
   "end": 9204374
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_incompatible_module_version_test.module",
   "start": 9204374,
   "end": 9204380
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_null_version_test.info",
   "start": 9204380,
   "end": 9204658
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_null_version_test.module",
   "start": 9204658,
   "end": 9204664
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_project_namespace_test.info",
   "start": 9204664,
   "end": 9204997
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_project_namespace_test.module",
   "start": 9204997,
   "end": 9205003
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_requires_null_version_test.info",
   "start": 9205003,
   "end": 9205347
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_requires_null_version_test.module",
   "start": 9205347,
   "end": 9205353
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_test.info",
   "start": 9205353,
   "end": 9205638
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_test.install",
   "start": 9205638,
   "end": 9206176
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/system_test.module",
   "start": 9206176,
   "end": 9226574
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/tablesort.test",
   "start": 9226574,
   "end": 9231357
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/taxonomy_nodes_test.info",
   "start": 9231357,
   "end": 9231657
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/taxonomy_nodes_test.module",
   "start": 9231657,
   "end": 9232354
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/taxonomy_test.info",
   "start": 9232354,
   "end": 9232658
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/taxonomy_test.install",
   "start": 9232658,
   "end": 9233405
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/taxonomy_test.module",
   "start": 9233405,
   "end": 9237137
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/theme.test",
   "start": 9237137,
   "end": 9264411
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/theme_test.inc",
   "start": 9264411,
   "end": 9264783
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/theme_test.info",
   "start": 9264783,
   "end": 9265048
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/theme_test.module",
   "start": 9265048,
   "end": 9270163
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/theme_test.template_test.tpl.php",
   "start": 9270163,
   "end": 9270229
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/engines/nyan_cat/nyan_cat.engine",
   "start": 9270229,
   "end": 9271547
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_basetheme/test_basetheme.info",
   "start": 9271547,
   "end": 9271898
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_subtheme/test_subtheme.info",
   "start": 9271898,
   "end": 9272221
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme/template.php",
   "start": 9272221,
   "end": 9272802
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme/templates/node--1.tpl.php",
   "start": 9272802,
   "end": 9272865
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme/test_theme.info",
   "start": 9272865,
   "end": 9273911
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme/theme-settings.php",
   "start": 9273911,
   "end": 9274832
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme_nyan_cat/templates/theme_test_template_test.nyan-cat.html",
   "start": 9274832,
   "end": 9274837
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/themes/test_theme_nyan_cat/test_theme_nyan_cat.info",
   "start": 9274837,
   "end": 9275114
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/unicode.test",
   "start": 9275114,
   "end": 9286265
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update.test",
   "start": 9286265,
   "end": 9291064
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_script_test.info",
   "start": 9291064,
   "end": 9291338
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_script_test.install",
   "start": 9291338,
   "end": 9293286
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_script_test.module",
   "start": 9293286,
   "end": 9293705
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_1.info",
   "start": 9293705,
   "end": 9293965
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_1.install",
   "start": 9293965,
   "end": 9295592
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_1.module",
   "start": 9295592,
   "end": 9295598
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_2.info",
   "start": 9295598,
   "end": 9295858
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_2.install",
   "start": 9295858,
   "end": 9297065
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_2.module",
   "start": 9297065,
   "end": 9297071
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_3.info",
   "start": 9297071,
   "end": 9297331
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_3.install",
   "start": 9297331,
   "end": 9297767
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/update_test_3.module",
   "start": 9297767,
   "end": 9297773
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.bare.database.php",
   "start": 9297773,
   "end": 9533241
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.comments.database.php",
   "start": 9533241,
   "end": 9533988
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.duplicate-permission.database.php",
   "start": 9533988,
   "end": 9534163
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.filled.database.php",
   "start": 9534163,
   "end": 10111406
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.forum.database.php",
   "start": 10111406,
   "end": 10116166
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.locale.database.php",
   "start": 10116166,
   "end": 10121629
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.menu.database.php",
   "start": 10121629,
   "end": 10125423
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.node_type_broken.database.php",
   "start": 10125423,
   "end": 10126074
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.translatable.database.php",
   "start": 10126074,
   "end": 10128352
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.trigger.database.php",
   "start": 10128352,
   "end": 10129993
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.upload.database.php",
   "start": 10129993,
   "end": 10141905
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.user-no-password-token.database.php",
   "start": 10141905,
   "end": 10142175
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-6.user-password-token.database.php",
   "start": 10142175,
   "end": 10143289
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.aggregator.database.php",
   "start": 10143289,
   "end": 10164316
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.bare.minimal.database.php.gz",
   "start": 10164316,
   "end": 10204159
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.bare.standard_all.database.php.gz",
   "start": 10204159,
   "end": 10281583
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.field.database.php",
   "start": 10281583,
   "end": 10282063
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.filled.minimal.database.php.gz",
   "start": 10282063,
   "end": 10323868
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.filled.standard_all.database.php.gz",
   "start": 10323868,
   "end": 10421471
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/drupal-7.trigger.database.php",
   "start": 10421471,
   "end": 10421980
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/update.aggregator.test",
   "start": 10421980,
   "end": 10423505
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/update.field.test",
   "start": 10423505,
   "end": 10425230
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/update.trigger.test",
   "start": 10425230,
   "end": 10426306
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/update.user.test",
   "start": 10426306,
   "end": 10427234
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.comment.test",
   "start": 10427234,
   "end": 10428165
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.filter.test",
   "start": 10428165,
   "end": 10430116
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.forum.test",
   "start": 10430116,
   "end": 10432501
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.locale.test",
   "start": 10432501,
   "end": 10437113
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.menu.test",
   "start": 10437113,
   "end": 10440937
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.node.test",
   "start": 10440937,
   "end": 10446565
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.poll.test",
   "start": 10446565,
   "end": 10448720
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.taxonomy.test",
   "start": 10448720,
   "end": 10458015
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.test",
   "start": 10458015,
   "end": 10484440
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.translatable.test",
   "start": 10484440,
   "end": 10486500
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.trigger.test",
   "start": 10486500,
   "end": 10487766
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.upload.test",
   "start": 10487766,
   "end": 10493033
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/upgrade/upgrade.user.test",
   "start": 10493033,
   "end": 10496796
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/url_alter_test.info",
   "start": 10496796,
   "end": 10497067
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/url_alter_test.install",
   "start": 10497067,
   "end": 10497334
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/url_alter_test.module",
   "start": 10497334,
   "end": 10499147
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/xmlrpc.test",
   "start": 10499147,
   "end": 10510544
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/xmlrpc_test.info",
   "start": 10510544,
   "end": 10510846
  }, {
   "filename": "/preload/drupal-7.95/modules/simpletest/tests/xmlrpc_test.module",
   "start": 10510846,
   "end": 10514025
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.admin.inc",
   "start": 10514025,
   "end": 10526154
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.info",
   "start": 10526154,
   "end": 10526464
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.install",
   "start": 10526464,
   "end": 10530748
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.js",
   "start": 10530748,
   "end": 10530963
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.module",
   "start": 10530963,
   "end": 10550061
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.pages.inc",
   "start": 10550061,
   "end": 10553321
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.php",
   "start": 10553321,
   "end": 10554293
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.test",
   "start": 10554293,
   "end": 10573508
  }, {
   "filename": "/preload/drupal-7.95/modules/statistics/statistics.tokens.inc",
   "start": 10573508,
   "end": 10575291
  }, {
   "filename": "/preload/drupal-7.95/modules/syslog/syslog.info",
   "start": 10575291,
   "end": 10575599
  }, {
   "filename": "/preload/drupal-7.95/modules/syslog/syslog.install",
   "start": 10575599,
   "end": 10575865
  }, {
   "filename": "/preload/drupal-7.95/modules/syslog/syslog.module",
   "start": 10575865,
   "end": 10581897
  }, {
   "filename": "/preload/drupal-7.95/modules/syslog/syslog.test",
   "start": 10581897,
   "end": 10583108
  }, {
   "filename": "/preload/drupal-7.95/modules/system/form.api.php",
   "start": 10583108,
   "end": 10588247
  }, {
   "filename": "/preload/drupal-7.95/modules/system/html.tpl.php",
   "start": 10588247,
   "end": 10590980
  }, {
   "filename": "/preload/drupal-7.95/modules/system/image.gd.inc",
   "start": 10590980,
   "end": 10605159
  }, {
   "filename": "/preload/drupal-7.95/modules/system/language.api.php",
   "start": 10605159,
   "end": 10611723
  }, {
   "filename": "/preload/drupal-7.95/modules/system/maintenance-page.tpl.php",
   "start": 10611723,
   "end": 10614741
  }, {
   "filename": "/preload/drupal-7.95/modules/system/page.tpl.php",
   "start": 10614741,
   "end": 10621676
  }, {
   "filename": "/preload/drupal-7.95/modules/system/region.tpl.php",
   "start": 10621676,
   "end": 10622982
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.admin-rtl.css",
   "start": 10622982,
   "end": 10624456
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.admin.css",
   "start": 10624456,
   "end": 10629573
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.admin.inc",
   "start": 10629573,
   "end": 10747649
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.api.php",
   "start": 10747649,
   "end": 10952119
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.archiver.inc",
   "start": 10952119,
   "end": 10955246
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.base-rtl.css",
   "start": 10955246,
   "end": 10956119
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.base.css",
   "start": 10956119,
   "end": 10961547
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.cron.js",
   "start": 10961547,
   "end": 10962036
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.info",
   "start": 10962036,
   "end": 10962497
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.install",
   "start": 10962497,
   "end": 11087081
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.js",
   "start": 11087081,
   "end": 11091778
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.mail.inc",
   "start": 11091778,
   "end": 11097622
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.maintenance.css",
   "start": 11097622,
   "end": 11098433
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.menus-rtl.css",
   "start": 11098433,
   "end": 11098984
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.menus.css",
   "start": 11098984,
   "end": 11101019
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.messages-rtl.css",
   "start": 11101019,
   "end": 11101195
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.messages.css",
   "start": 11101195,
   "end": 11102156
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.module",
   "start": 11102156,
   "end": 11246675
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.queue.inc",
   "start": 11246675,
   "end": 11259326
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.tar.inc",
   "start": 11259326,
   "end": 11349750
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.test",
   "start": 11349750,
   "end": 11480371
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.theme-rtl.css",
   "start": 11480371,
   "end": 11481182
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.theme.css",
   "start": 11481182,
   "end": 11484893
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.tokens.inc",
   "start": 11484893,
   "end": 11493030
  }, {
   "filename": "/preload/drupal-7.95/modules/system/system.updater.inc",
   "start": 11493030,
   "end": 11497787
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/cron_queue_test.info",
   "start": 11497787,
   "end": 11498056
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/cron_queue_test.module",
   "start": 11498056,
   "end": 11498604
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/system_cron_test.info",
   "start": 11498604,
   "end": 11498878
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/system_cron_test.module",
   "start": 11498878,
   "end": 11499186
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/system_test_archive.tar.gz",
   "start": 11499186,
   "end": 11499437
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/system_test_archive_abs.tgz",
   "start": 11499437,
   "end": 11499653
  }, {
   "filename": "/preload/drupal-7.95/modules/system/tests/system_test_archive_rel.tar",
   "start": 11499653,
   "end": 11509893
  }, {
   "filename": "/preload/drupal-7.95/modules/system/theme.api.php",
   "start": 11509893,
   "end": 11518884
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy-term.tpl.php",
   "start": 11518884,
   "end": 11521028
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.admin.inc",
   "start": 11521028,
   "end": 11557685
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.api.php",
   "start": 11557685,
   "end": 11563737
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.css",
   "start": 11563737,
   "end": 11563969
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.info",
   "start": 11563969,
   "end": 11564321
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.install",
   "start": 11564321,
   "end": 11595222
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.js",
   "start": 11595222,
   "end": 11596992
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.module",
   "start": 11596992,
   "end": 11669150
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.pages.inc",
   "start": 11669150,
   "end": 11675863
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.test",
   "start": 11675863,
   "end": 11766460
  }, {
   "filename": "/preload/drupal-7.95/modules/taxonomy/taxonomy.tokens.inc",
   "start": 11766460,
   "end": 11772488
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar-print.css",
   "start": 11772488,
   "end": 11772561
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar-rtl.css",
   "start": 11772561,
   "end": 11773122
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.css",
   "start": 11773122,
   "end": 11776498
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.info",
   "start": 11776498,
   "end": 11776821
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.js",
   "start": 11776821,
   "end": 11780041
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.module",
   "start": 11780041,
   "end": 11791159
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.png",
   "start": 11791159,
   "end": 11791717
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.test",
   "start": 11791717,
   "end": 11793249
  }, {
   "filename": "/preload/drupal-7.95/modules/toolbar/toolbar.tpl.php",
   "start": 11793249,
   "end": 11794589
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.css",
   "start": 11794589,
   "end": 11794680
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.info",
   "start": 11794680,
   "end": 11794974
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.install",
   "start": 11794974,
   "end": 11801135
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.module",
   "start": 11801135,
   "end": 11814079
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.pages.inc",
   "start": 11814079,
   "end": 11819616
  }, {
   "filename": "/preload/drupal-7.95/modules/tracker/tracker.test",
   "start": 11819616,
   "end": 11831219
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/tests/translation_test.info",
   "start": 11831219,
   "end": 11831507
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/tests/translation_test.module",
   "start": 11831507,
   "end": 11831714
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/translation.info",
   "start": 11831714,
   "end": 11832035
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/translation.module",
   "start": 11832035,
   "end": 11855439
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/translation.pages.inc",
   "start": 11855439,
   "end": 11858717
  }, {
   "filename": "/preload/drupal-7.95/modules/translation/translation.test",
   "start": 11858717,
   "end": 11880854
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/tests/trigger_test.info",
   "start": 11880854,
   "end": 11881096
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/tests/trigger_test.module",
   "start": 11881096,
   "end": 11885003
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.admin.inc",
   "start": 11885003,
   "end": 11895751
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.api.php",
   "start": 11895751,
   "end": 11898436
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.info",
   "start": 11898436,
   "end": 11898786
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.install",
   "start": 11898786,
   "end": 11902389
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.module",
   "start": 11902389,
   "end": 11922996
  }, {
   "filename": "/preload/drupal-7.95/modules/trigger/trigger.test",
   "start": 11922996,
   "end": 11953628
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/aaa_update_test.1_0.xml",
   "start": 11953628,
   "end": 11954833
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/aaa_update_test.info",
   "start": 11954833,
   "end": 11955082
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/aaa_update_test.module",
   "start": 11955082,
   "end": 11955149
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/aaa_update_test.no-releases.xml",
   "start": 11955149,
   "end": 11955277
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/aaa_update_test.tar.gz",
   "start": 11955277,
   "end": 11955660
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/bbb_update_test.1_0.xml",
   "start": 11955660,
   "end": 11956865
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/bbb_update_test.info",
   "start": 11956865,
   "end": 11957114
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/bbb_update_test.module",
   "start": 11957114,
   "end": 11957181
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/ccc_update_test.1_0.xml",
   "start": 11957181,
   "end": 11958386
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/ccc_update_test.info",
   "start": 11958386,
   "end": 11958635
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/ccc_update_test.module",
   "start": 11958635,
   "end": 11958702
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/drupal.0.xml",
   "start": 11958702,
   "end": 11959841
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/drupal.1.xml",
   "start": 11959841,
   "end": 11961584
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/drupal.2-sec.xml",
   "start": 11961584,
   "end": 11964003
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/drupal.dev.xml",
   "start": 11964003,
   "end": 11965693
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/themes/update_test_admintheme/update_test_admintheme.info",
   "start": 11965693,
   "end": 11965931
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/themes/update_test_basetheme/update_test_basetheme.info",
   "start": 11965931,
   "end": 11966191
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/themes/update_test_subtheme/update_test_subtheme.info",
   "start": 11966191,
   "end": 11966483
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/update_test.info",
   "start": 11966483,
   "end": 11966746
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/update_test.module",
   "start": 11966746,
   "end": 11972989
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/update_test_basetheme.1_1-sec.xml",
   "start": 11972989,
   "end": 11974970
  }, {
   "filename": "/preload/drupal-7.95/modules/update/tests/update_test_subtheme.1_0.xml",
   "start": 11974970,
   "end": 11976204
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update-rtl.css",
   "start": 11976204,
   "end": 11976721
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.api.php",
   "start": 11976721,
   "end": 11981879
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.authorize.inc",
   "start": 11981879,
   "end": 11994075
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.compare.inc",
   "start": 11994075,
   "end": 12029535
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.css",
   "start": 12029535,
   "end": 12031563
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.fetch.inc",
   "start": 12031563,
   "end": 12046615
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.info",
   "start": 12046615,
   "end": 12046992
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.install",
   "start": 12046992,
   "end": 12053365
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.manager.inc",
   "start": 12053365,
   "end": 12088027
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.module",
   "start": 12088027,
   "end": 12126912
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.report.inc",
   "start": 12126912,
   "end": 12139398
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.settings.inc",
   "start": 12139398,
   "end": 12144222
  }, {
   "filename": "/preload/drupal-7.95/modules/update/update.test",
   "start": 12144222,
   "end": 12179144
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/anonymous_user_unblock_test.info",
   "start": 12179144,
   "end": 12179447
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/anonymous_user_unblock_test.module",
   "start": 12179447,
   "end": 12179874
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_email_validation_test.info",
   "start": 12179874,
   "end": 12180174
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_email_validation_test.module",
   "start": 12180174,
   "end": 12180553
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_flood_test.info",
   "start": 12180553,
   "end": 12180845
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_flood_test.module",
   "start": 12180845,
   "end": 12181338
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_form_test.info",
   "start": 12181338,
   "end": 12181612
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_form_test.module",
   "start": 12181612,
   "end": 12185941
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_session_test.info",
   "start": 12185941,
   "end": 12186221
  }, {
   "filename": "/preload/drupal-7.95/modules/user/tests/user_session_test.module",
   "start": 12186221,
   "end": 12186801
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user-picture.tpl.php",
   "start": 12186801,
   "end": 12187408
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user-profile-category.tpl.php",
   "start": 12187408,
   "end": 12188409
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user-profile-item.tpl.php",
   "start": 12188409,
   "end": 12189327
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user-profile.tpl.php",
   "start": 12189327,
   "end": 12191016
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user-rtl.css",
   "start": 12191016,
   "end": 12191526
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.admin.inc",
   "start": 12191526,
   "end": 12231989
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.api.php",
   "start": 12231989,
   "end": 12248760
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.css",
   "start": 12248760,
   "end": 12250587
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.info",
   "start": 12250587,
   "end": 12250952
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.install",
   "start": 12250952,
   "end": 12282332
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.js",
   "start": 12282332,
   "end": 12288932
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.module",
   "start": 12288932,
   "end": 12436663
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.pages.inc",
   "start": 12436663,
   "end": 12464873
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.permissions.js",
   "start": 12464873,
   "end": 12467596
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.test",
   "start": 12467596,
   "end": 12595500
  }, {
   "filename": "/preload/drupal-7.95/modules/user/user.tokens.inc",
   "start": 12595500,
   "end": 12600333
  }, {
   "filename": "/preload/drupal-7.95/profiles/README.txt",
   "start": 12600333,
   "end": 12601374
  }, {
   "filename": "/preload/drupal-7.95/profiles/minimal/minimal.info",
   "start": 12601374,
   "end": 12601644
  }, {
   "filename": "/preload/drupal-7.95/profiles/minimal/minimal.install",
   "start": 12601644,
   "end": 12603708
  }, {
   "filename": "/preload/drupal-7.95/profiles/minimal/minimal.profile",
   "start": 12603708,
   "end": 12604164
  }, {
   "filename": "/preload/drupal-7.95/profiles/minimal/translations/README.txt",
   "start": 12604164,
   "end": 12604256
  }, {
   "filename": "/preload/drupal-7.95/profiles/standard/standard.info",
   "start": 12604256,
   "end": 12604998
  }, {
   "filename": "/preload/drupal-7.95/profiles/standard/standard.install",
   "start": 12604998,
   "end": 12616852
  }, {
   "filename": "/preload/drupal-7.95/profiles/standard/standard.profile",
   "start": 12616852,
   "end": 12617310
  }, {
   "filename": "/preload/drupal-7.95/profiles/standard/translations/README.txt",
   "start": 12617310,
   "end": 12617402
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/modules/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.info",
   "start": 12617402,
   "end": 12617769
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/modules/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.module",
   "start": 12617769,
   "end": 12617775
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/modules/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.test",
   "start": 12617775,
   "end": 12618866
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/modules/drupal_system_listing_incompatible_test/drupal_system_listing_incompatible_test.info",
   "start": 12618866,
   "end": 12619362
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/modules/drupal_system_listing_incompatible_test/drupal_system_listing_incompatible_test.module",
   "start": 12619362,
   "end": 12619368
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/testing.info",
   "start": 12619368,
   "end": 12619645
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/testing.install",
   "start": 12619645,
   "end": 12620256
  }, {
   "filename": "/preload/drupal-7.95/profiles/testing/testing.profile",
   "start": 12620256,
   "end": 12620315
  }, {
   "filename": "/preload/drupal-7.95/robots.txt",
   "start": 12620315,
   "end": 12622504
  }, {
   "filename": "/preload/drupal-7.95/scripts/code-clean.sh",
   "start": 12622504,
   "end": 12623073
  }, {
   "filename": "/preload/drupal-7.95/scripts/cron-curl.sh",
   "start": 12623073,
   "end": 12623139
  }, {
   "filename": "/preload/drupal-7.95/scripts/cron-lynx.sh",
   "start": 12623139,
   "end": 12623217
  }, {
   "filename": "/preload/drupal-7.95/scripts/drupal.sh",
   "start": 12623217,
   "end": 12627481
  }, {
   "filename": "/preload/drupal-7.95/scripts/dump-database-d6.sh",
   "start": 12627481,
   "end": 12630436
  }, {
   "filename": "/preload/drupal-7.95/scripts/dump-database-d7.sh",
   "start": 12630436,
   "end": 12633009
  }, {
   "filename": "/preload/drupal-7.95/scripts/generate-d6-content.sh",
   "start": 12633009,
   "end": 12639881
  }, {
   "filename": "/preload/drupal-7.95/scripts/generate-d7-content.sh",
   "start": 12639881,
   "end": 12650671
  }, {
   "filename": "/preload/drupal-7.95/scripts/password-hash.sh",
   "start": 12650671,
   "end": 12653038
  }, {
   "filename": "/preload/drupal-7.95/scripts/run-tests.sh",
   "start": 12653038,
   "end": 12681133
  }, {
   "filename": "/preload/drupal-7.95/scripts/test.script",
   "start": 12681133,
   "end": 12681318
  }, {
   "filename": "/preload/drupal-7.95/sites/README.txt",
   "start": 12681318,
   "end": 12682222
  }, {
   "filename": "/preload/drupal-7.95/sites/all/libraries/README.txt",
   "start": 12682222,
   "end": 12682373
  }, {
   "filename": "/preload/drupal-7.95/sites/all/modules/README.txt",
   "start": 12682373,
   "end": 12683847
  }, {
   "filename": "/preload/drupal-7.95/sites/all/themes/README.txt",
   "start": 12683847,
   "end": 12684867
  }, {
   "filename": "/preload/drupal-7.95/sites/default/default.settings.php",
   "start": 12684867,
   "end": 12718714
  }, {
   "filename": "/preload/drupal-7.95/sites/default/files/.ht.sqlite",
   "start": 12718714,
   "end": 15458938
  }, {
   "filename": "/preload/drupal-7.95/sites/default/files/styles/.gitignore",
   "start": 15458938,
   "end": 15458938
  }, {
   "filename": "/preload/drupal-7.95/sites/default/files/tmp/.gitignore",
   "start": 15458938,
   "end": 15458938
  }, {
   "filename": "/preload/drupal-7.95/sites/default/logo.png",
   "start": 15458938,
   "end": 15473241
  }, {
   "filename": "/preload/drupal-7.95/sites/default/settings.php",
   "start": 15473241,
   "end": 15499706
  }, {
   "filename": "/preload/drupal-7.95/sites/example.sites.php",
   "start": 15499706,
   "end": 15502071
  }, {
   "filename": "/preload/drupal-7.95/themes/README.txt",
   "start": 15502071,
   "end": 15502515
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/bartik.info",
   "start": 15502515,
   "end": 15503583
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/base.png",
   "start": 15503583,
   "end": 15503689
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/color.inc",
   "start": 15503689,
   "end": 15507270
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/preview.css",
   "start": 15507270,
   "end": 15511641
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/preview.html",
   "start": 15511641,
   "end": 15513796
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/preview.js",
   "start": 15513796,
   "end": 15515814
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/color/preview.png",
   "start": 15515814,
   "end": 15515920
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/colors.css",
   "start": 15515920,
   "end": 15517232
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/ie-rtl.css",
   "start": 15517232,
   "end": 15518081
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/ie.css",
   "start": 15518081,
   "end": 15519200
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/ie6.css",
   "start": 15519200,
   "end": 15519497
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/layout-rtl.css",
   "start": 15519497,
   "end": 15519880
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/layout.css",
   "start": 15519880,
   "end": 15521514
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/maintenance-page.css",
   "start": 15521514,
   "end": 15522827
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/print.css",
   "start": 15522827,
   "end": 15523483
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/style-rtl.css",
   "start": 15523483,
   "end": 15528350
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/css/style.css",
   "start": 15528350,
   "end": 15561052
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/add.png",
   "start": 15561052,
   "end": 15561146
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/buttons.png",
   "start": 15561146,
   "end": 15561977
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/comment-arrow-rtl.gif",
   "start": 15561977,
   "end": 15562074
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/comment-arrow.gif",
   "start": 15562074,
   "end": 15562171
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/search-button.png",
   "start": 15562171,
   "end": 15562896
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/images/tabs-border.png",
   "start": 15562896,
   "end": 15562979
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/logo.png",
   "start": 15562979,
   "end": 15566458
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/screenshot.png",
   "start": 15566458,
   "end": 15586116
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/template.php",
   "start": 15586116,
   "end": 15592033
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/templates/comment-wrapper.tpl.php",
   "start": 15592033,
   "end": 15594035
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/templates/comment.tpl.php",
   "start": 15594035,
   "end": 15598039
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/templates/maintenance-page.tpl.php",
   "start": 15598039,
   "end": 15600605
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/templates/node.tpl.php",
   "start": 15600605,
   "end": 15606009
  }, {
   "filename": "/preload/drupal-7.95/themes/bartik/templates/page.tpl.php",
   "start": 15606009,
   "end": 15616239
  }, {
   "filename": "/preload/drupal-7.95/themes/engines/phptemplate/phptemplate.engine",
   "start": 15616239,
   "end": 15616811
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/color/base.png",
   "start": 15616811,
   "end": 15637705
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/color/color.inc",
   "start": 15637705,
   "end": 15643664
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/color/preview.css",
   "start": 15643664,
   "end": 15644586
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/color/preview.png",
   "start": 15644586,
   "end": 15654551
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/comment.tpl.php",
   "start": 15654551,
   "end": 15655365
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/fix-ie-rtl.css",
   "start": 15655365,
   "end": 15656527
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/fix-ie.css",
   "start": 15656527,
   "end": 15657847
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/garland.info",
   "start": 15657847,
   "end": 15658255
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-bar-white.png",
   "start": 15658255,
   "end": 15658358
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-bar.png",
   "start": 15658358,
   "end": 15658483
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-content-left.png",
   "start": 15658483,
   "end": 15661372
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-content-right.png",
   "start": 15661372,
   "end": 15664191
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-content.png",
   "start": 15664191,
   "end": 15664676
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-navigation-item-hover.png",
   "start": 15664676,
   "end": 15665117
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-navigation-item.png",
   "start": 15665117,
   "end": 15665616
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-navigation.png",
   "start": 15665616,
   "end": 15665720
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/bg-tab.png",
   "start": 15665720,
   "end": 15665835
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/body.png",
   "start": 15665835,
   "end": 15666515
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/gradient-inner.png",
   "start": 15666515,
   "end": 15666703
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/menu-collapsed-rtl.gif",
   "start": 15666703,
   "end": 15666879
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/menu-collapsed.gif",
   "start": 15666879,
   "end": 15667055
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/menu-expanded.gif",
   "start": 15667055,
   "end": 15667238
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/menu-leaf.gif",
   "start": 15667238,
   "end": 15667412
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/images/task-list.png",
   "start": 15667412,
   "end": 15667540
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/logo.png",
   "start": 15667540,
   "end": 15672656
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/maintenance-page.tpl.php",
   "start": 15672656,
   "end": 15675405
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/node.tpl.php",
   "start": 15675405,
   "end": 15676397
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/page.tpl.php",
   "start": 15676397,
   "end": 15679311
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/print.css",
   "start": 15679311,
   "end": 15680358
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/screenshot.png",
   "start": 15680358,
   "end": 15691308
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/style-rtl.css",
   "start": 15691308,
   "end": 15696275
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/style.css",
   "start": 15696275,
   "end": 15717061
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/template.php",
   "start": 15717061,
   "end": 15721727
  }, {
   "filename": "/preload/drupal-7.95/themes/garland/theme-settings.php",
   "start": 15721727,
   "end": 15722480
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/ie.css",
   "start": 15722480,
   "end": 15722784
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/ie6.css",
   "start": 15722784,
   "end": 15723052
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/ie7.css",
   "start": 15723052,
   "end": 15723420
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/add.png",
   "start": 15723420,
   "end": 15723580
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/arrow-asc.png",
   "start": 15723580,
   "end": 15723668
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/arrow-desc.png",
   "start": 15723668,
   "end": 15723763
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/arrow-next.png",
   "start": 15723763,
   "end": 15723881
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/arrow-prev.png",
   "start": 15723881,
   "end": 15723996
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/buttons.png",
   "start": 15723996,
   "end": 15724782
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/fc-rtl.png",
   "start": 15724782,
   "end": 15724858
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/fc.png",
   "start": 15724858,
   "end": 15724940
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/list-item-rtl.png",
   "start": 15724940,
   "end": 15725165
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/list-item.png",
   "start": 15725165,
   "end": 15725360
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/task-check.png",
   "start": 15725360,
   "end": 15725621
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/task-item-rtl.png",
   "start": 15725621,
   "end": 15725799
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/task-item.png",
   "start": 15725799,
   "end": 15725904
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/ui-icons-222222-256x240.png",
   "start": 15725904,
   "end": 15729606
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/ui-icons-454545-256x240.png",
   "start": 15729606,
   "end": 15733308
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/ui-icons-800000-256x240.png",
   "start": 15733308,
   "end": 15737010
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/ui-icons-888888-256x240.png",
   "start": 15737010,
   "end": 15740712
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/images/ui-icons-ffffff-256x240.png",
   "start": 15740712,
   "end": 15744414
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/jquery.ui.theme.css",
   "start": 15744414,
   "end": 15759648
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/logo.png",
   "start": 15759648,
   "end": 15763553
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/maintenance-page.tpl.php",
   "start": 15763553,
   "end": 15764863
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/page.tpl.php",
   "start": 15764863,
   "end": 15765992
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/reset.css",
   "start": 15765992,
   "end": 15768939
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/screenshot.png",
   "start": 15768939,
   "end": 15781237
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/seven.info",
   "start": 15781237,
   "end": 15781788
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/style-rtl.css",
   "start": 15781788,
   "end": 15785550
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/style.css",
   "start": 15785550,
   "end": 15804004
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/template.php",
   "start": 15804004,
   "end": 15808710
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/vertical-tabs-rtl.css",
   "start": 15808710,
   "end": 15809216
  }, {
   "filename": "/preload/drupal-7.95/themes/seven/vertical-tabs.css",
   "start": 15809216,
   "end": 15811629
  }, {
   "filename": "/preload/drupal-7.95/themes/stark/README.txt",
   "start": 15811629,
   "end": 15812633
  }, {
   "filename": "/preload/drupal-7.95/themes/stark/layout.css",
   "start": 15812633,
   "end": 15813837
  }, {
   "filename": "/preload/drupal-7.95/themes/stark/logo.png",
   "start": 15813837,
   "end": 15816163
  }, {
   "filename": "/preload/drupal-7.95/themes/stark/screenshot.png",
   "start": 15816163,
   "end": 15827825
  }, {
   "filename": "/preload/drupal-7.95/themes/stark/stark.info",
   "start": 15827825,
   "end": 15828264
  }, {
   "filename": "/preload/drupal-7.95/update.php",
   "start": 15828264,
   "end": 15848154
  }, {
   "filename": "/preload/drupal-7.95/web.config",
   "start": 15848154,
   "end": 15850928
  }, {
   "filename": "/preload/drupal-7.95/xmlrpc.php",
   "start": 15850928,
   "end": 15851345
  } ],
  "remote_package_size": 15851345
 });
})();

if (Module["ENVIRONMENT_IS_PTHREAD"] || Module["$ww"]) Module["preRun"] = [];

var necessaryPreJSTasks = Module["preRun"].slice();

Module.WeakerMap = Module.WeakerMap || class WeakerMap {
 constructor(entries) {
  this.registry = new FinReg((held => this.delete(held)));
  this.map = new Map;
  entries && entries.forEach((([key, value]) => this.set(key, value)));
 }
 get size() {
  return this.map.size;
 }
 clear() {
  this.map.clear();
 }
 delete(key) {
  this.map.delete(key);
 }
 [Symbol.iterator]() {
  const mapIterator = this.map[Symbol.iterator]();
  return {
   next: () => {
    do {
     const entry = mapIterator.next();
     if (entry.done) {
      return {
       done: true
      };
     }
     const [key, ref] = entry.value;
     const value = ref.deref();
     if (!value) {
      this.map.delete(key);
      continue;
     }
     return {
      done: false,
      value: [ key, value ]
     };
    } while (true);
   }
  };
 }
 entries() {
  return {
   [Symbol.iterator]: () => this[Symbol.iterator]()
  };
 }
 forEach(callback) {
  for (const [k, v] of this) {
   callback(v, k, this);
  }
 }
 get(key) {
  if (!this.has(key)) {
   return;
  }
  return this.map.get(key).deref();
 }
 has(key) {
  if (!this.map.has(key)) {
   return false;
  }
  const result = this.map.get(key).deref();
  if (!result) {
   this.map.delete(key);
  }
  return result;
 }
 keys() {
  return [ ...this ].map((v => v[0]));
 }
 set(key, value) {
  if (typeof value !== "function" && typeof value !== "object") {
   throw new Error("WeakerMap values must be objects.");
  }
  if (this.map.has(key)) {
   this.registry.unregister(this.get(key));
  }
  this.registry.register(value, key, value);
  return this.map.set(key, new wRef(value));
 }
 values() {
  return [ ...this ].map((v => v[1]));
 }
};

const FinReg = globalThis.FinalizationRegistry || class {
 register() {}
 unregister() {}
};

const wRef = globalThis.WeakRef || class {
 constructor(val) {
  this.val = val;
 }
 deref() {
  return this.val;
 }
};

Module.UniqueIndex = Module.UniqueIndex || class UniqueIndex {
 constructor() {
  this.byObject = new WeakMap;
  this.byInteger = new Module.WeakerMap;
  this.id = 0;
  Object.defineProperty(this, "clear", {
   configurable: false,
   writable: false,
   value: () => {
    this.byInteger.clear();
   }
  });
  Object.defineProperty(this, "add", {
   configurable: false,
   writable: false,
   value: callback => {
    if (this.byObject.has(callback)) {
     const id = this.byObject.get(callback);
     return id;
    }
    const newid = ++this.id;
    this.byObject.set(callback, newid);
    this.byInteger.set(newid, callback);
    return newid;
   }
  });
  Object.defineProperty(this, "has", {
   configurable: false,
   writable: false,
   value: obj => {
    if (this.byObject.has(obj)) {
     const id = this.byObject.get(obj);
     return this.byInteger.has(id);
    }
   }
  });
  Object.defineProperty(this, "hasId", {
   configurable: false,
   writable: false,
   value: address => {
    if (this.byInteger.has(address)) {
     return this.byInteger.get(address);
    }
   }
  });
  Object.defineProperty(this, "get", {
   configurable: false,
   writable: false,
   value: address => {
    if (this.byInteger.has(address)) {
     return this.byInteger.get(address);
    }
   }
  });
  Object.defineProperty(this, "getId", {
   configurable: false,
   writable: false,
   value: obj => {
    if (this.byObject.has(obj)) {
     return this.byObject.get(obj);
    }
   }
  });
  Object.defineProperty(this, "remove", {
   configurable: false,
   writable: false,
   value: address => {
    const obj = this.byInteger.get(address);
    if (obj) {
     this.byObject.delete(obj);
     this.byInteger.delete(address);
    }
   }
  });
 }
};

const zvalSym = Symbol("ZVAL");

Module.marshalObject = zvalPtr => {
 const nativeTarget = Module.ccall("vrzno_expose_zval_is_target", "number", [ "number" ], [ zvalPtr ]);
 if (nativeTarget && Module.targets.hasId(nativeTarget)) {
  return Module.targets.get(nativeTarget);
 }
 const proxy = new Proxy({}, {
  ownKeys: target => {
   const keysLoc = Module.ccall("vrzno_expose_object_keys", "number", [ "number" ], [ zvalPtr ]);
   const keyJson = UTF8ToString(keysLoc);
   const keys = JSON.parse(keyJson);
   _free(keysLoc);
   keys.push(...Reflect.ownKeys(target));
   return keys;
  },
  has: (target, prop) => {
   if (typeof prop === "symbol") {
    return false;
   }
   const len = lengthBytesUTF8(prop) + 1;
   const namePtr = _malloc(len);
   stringToUTF8(prop, namePtr, len);
   const retPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zvalPtr, namePtr ]);
   return !!retPtr;
  },
  get: (target, prop, receiver) => {
   if (typeof prop === "symbol") {
    return target[prop];
   }
   const len = lengthBytesUTF8(prop) + 1;
   const namePtr = _malloc(len);
   stringToUTF8(prop, namePtr, len);
   const retPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zvalPtr, namePtr ]);
   const proxy = Module.zvalToJS(retPtr);
   if (proxy && [ "function", "object" ].includes(typeof proxy)) {
    Module.zvalMap.set(proxy, retPtr);
    Module._zvalMap.set(retPtr, proxy);
   }
   _free(namePtr);
   return proxy ?? Reflect.get(target, prop);
  },
  getOwnPropertyDescriptor: (target, prop) => {
   if (typeof prop === "symbol" || prop in target) {
    return Reflect.getOwnPropertyDescriptor(target, prop);
   }
   const len = lengthBytesUTF8(prop) + 1;
   const namePtr = _malloc(len);
   stringToUTF8(prop, namePtr, len);
   const retPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zvalPtr, namePtr ]);
   const proxy = Module.zvalToJS(retPtr);
   if (proxy && [ "function", "object" ].includes(typeof proxy)) {
    Module.zvalMap.set(proxy, retPtr);
    Module._zvalMap.set(retPtr, proxy);
   }
   _free(namePtr);
   return {
    configurable: true,
    enumerable: true,
    value: target[prop]
   };
  }
 });
 Object.defineProperty(proxy, zvalSym, {
  value: `PHP_@{${zvalPtr}}`
 });
 Module.zvalMap.set(proxy, zvalPtr);
 Module._zvalMap.set(zvalPtr, proxy);
 if (!Module.targets.has(proxy)) {
  Module.targets.add(proxy);
  Module.ccall("vrzno_expose_inc_zrefcount", "number", [ "number" ], [ zvalPtr ]);
  Module.fRegistry.register(proxy, zvalPtr, proxy);
 }
 return proxy;
};

Module.callableToJs = Module.callableToJs || (funcPtr => {
 if (Module.callables.has(funcPtr)) {
  return Module.callables.get(funcPtr);
 }
 const wrapped = (...args) => {
  let paramPtrs = [], paramsPtr = null;
  if (args.length) {
   paramsPtr = Module.ccall("vrzno_expose_create_params", "number", [ "number" ], [ args.length ]);
   paramPtrs = args.map((a => Module.jsToZval(a)));
   paramPtrs.forEach(((paramPtr, i) => {
    Module.ccall("vrzno_expose_set_param", "number", [ "number", "number", "number" ], [ paramsPtr, i, paramPtr ]);
   }));
  }
  const zvalPtr = Module.ccall("vrzno_exec_callback", "number", [ "number", "number", "number" ], [ funcPtr, paramsPtr, args.length ]);
  if (args.length) {
   paramPtrs.forEach(((p, i) => {
    if (!args[i] || ![ "function", "object" ].includes(typeof args[i])) {
     Module.ccall("vrzno_expose_efree", "number", [ "number" ], [ p ]);
    }
   }));
   Module.ccall("vrzno_expose_efree", "number", [ "number", "number" ], [ paramsPtr, false ]);
  }
  if (zvalPtr) {
   const result = Module.zvalToJS(zvalPtr);
   if (!result || ![ "function", "object" ].includes(typeof result)) {
    Module.ccall("vrzno_expose_efree", "number", [ "number" ], [ zvalPtr ]);
   }
   return result;
  }
 };
 Object.defineProperty(wrapped, "name", {
  value: `PHP_@{${funcPtr}}`
 });
 Module.ccall("vrzno_expose_inc_crefcount", "number", [ "number" ], [ funcPtr ]);
 Module.callables.set(funcPtr, wrapped);
 return wrapped;
});

Module.zvalToJS = Module.zvalToJS || (zvalPtr => {
 if (Module._zvalMap.has(zvalPtr)) {
  return Module._zvalMap.get(zvalPtr);
 }
 const IS_UNDEF = 0;
 const IS_NULL = 1;
 const IS_FALSE = 2;
 const IS_TRUE = 3;
 const IS_LONG = 4;
 const IS_DOUBLE = 5;
 const IS_STRING = 6;
 const IS_ARRAY = 7;
 const IS_OBJECT = 8;
 const callable = Module.ccall("vrzno_expose_callable", "number", [ "number" ], [ zvalPtr ]);
 let valPtr;
 if (callable) {
  const nativeTarget = Module.ccall("vrzno_expose_zval_is_target", "number", [ "number" ], [ zvalPtr ]);
  if (nativeTarget) {
   return Module.targets.get(nativeTarget);
  }
  const wrapped = nativeTarget ? Module.targets.get(nativeTarget) : Module.callableToJs(callable);
  if (!Module.targets.has(wrapped)) {
   Module.targets.add(wrapped);
   Module.ccall("vrzno_expose_inc_zrefcount", "number", [ "number" ], [ zvalPtr ]);
  }
  Module.zvalMap.set(wrapped, zvalPtr);
  Module._zvalMap.set(zvalPtr, wrapped);
  Module.fRegistry.register(wrapped, zvalPtr, wrapped);
  return wrapped;
 }
 const type = Module.ccall("vrzno_expose_type", "number", [ "number" ], [ zvalPtr ]);
 switch (type) {
 case IS_UNDEF:
  return undefined;
  break;

 case IS_NULL:
  return null;
  break;

 case IS_TRUE:
  return true;
  break;

 case IS_FALSE:
  return false;
  break;

 case IS_LONG:
  return Module.ccall("vrzno_expose_long", "number", [ "number" ], [ zvalPtr ]);
  break;

 case IS_DOUBLE:
  valPtr = Module.ccall("vrzno_expose_double", "number", [ "number" ], [ zvalPtr ]);
  if (!valPtr) {
   return null;
  }
  return getValue(valPtr, "double");
  break;

 case IS_STRING:
  valPtr = Module.ccall("vrzno_expose_string", "number", [ "number" ], [ zvalPtr ]);
  if (!valPtr) {
   return null;
  }
  return UTF8ToString(valPtr);
  break;

 case IS_OBJECT:
  const proxy = Module.marshalObject(zvalPtr);
  return proxy;
  break;

 default:
  return null;
  break;
 }
});

Module.jsToZval = Module.jsToZval || (value => {
 let zvalPtr;
 if (typeof value === "undefined") {
  zvalPtr = Module.ccall("vrzno_expose_create_undef", "number", [], []);
 } else if (value === null) {
  zvalPtr = Module.ccall("vrzno_expose_create_null", "number", [], []);
 } else if ([ true, false ].includes(value)) {
  zvalPtr = Module.ccall("vrzno_expose_create_bool", "number", [ "number" ], [ value ]);
 } else if (value && [ "function", "object" ].includes(typeof value)) {
  let index, existed;
  if (!Module.targets.has(value)) {
   index = Module.targets.add(value);
   existed = false;
  } else {
   index = Module.targets.getId(value);
   existed = true;
  }
  const isFunction = typeof value === "function" ? index : 0;
  const isConstructor = isFunction && !!(value.prototype && value.prototype.constructor);
  zvalPtr = Module.ccall("vrzno_expose_create_object_for_target", "number", [ "number", "number", "number" ], [ index, isFunction, isConstructor ]);
  Module.zvalMap.set(value, zvalPtr);
  Module._zvalMap.set(zvalPtr, value);
  if (!existed) {
   Module.ccall("vrzno_expose_inc_zrefcount", "number", [ "number" ], [ zvalPtr ]);
   Module.fRegistry.register(value, zvalPtr, value);
  }
 } else if (typeof value === "number") {
  if (Number.isInteger(value)) {
   zvalPtr = Module.ccall("vrzno_expose_create_long", "number", [ "number" ], [ value ]);
  } else if (Number.isFinite(value)) {
   zvalPtr = Module.ccall("vrzno_expose_create_double", "number", [ "number" ], [ value ]);
  }
 } else if (typeof value === "string") {
  const len = lengthBytesUTF8(value) + 1;
  const strLoc = _malloc(len);
  stringToUTF8(value, strLoc, len);
  zvalPtr = Module.ccall("vrzno_expose_create_string", "number", [ "number" ], [ strLoc ]);
  _free(strLoc);
 }
 return zvalPtr;
});

Module.PdoD1Driver = Module.PdoD1Driver || class PdoD1Driver {
 prepare(db, query) {
  console.log("prepare", {
   db: db,
   query: query
  });
  return db.prepare(query);
 }
 doer(db, query) {
  console.log("doer", {
   db: db,
   query: query
  });
 }
};

HEAP8 = new Int8Array(1);

Module.zvalMap = new WeakMap;

Module._zvalMap = Module._zvalMap || new Module.WeakerMap;

Module.fRegistry = Module.fRegistry || new FinReg((zvalPtr => {
 console.log("Garbage collecting! zVal@" + zvalPtr);
 Module.ccall("vrzno_expose_dec_zrefcount", "number", [ "number" ], [ zvalPtr ]);
}));

Module.bufferMaps = new WeakMap;

Module.callables = Module.callables || new Module.WeakerMap;

Module.targets = Module.targets || new Module.UniqueIndex;

Module.classes = Module.classes || new WeakMap;

Module._classes = Module._classes || new Module.WeakerMap;

Module.PdoParams = new WeakMap;

Module.pdoDriver = Module.pdoDriver || new Module.PdoD1Driver;

Module.targets.add(globalThis);

Module.onRefresh = Module.onRefresh || new Set;

Module.onRefresh.add((() => {
 Module.callables.clear();
 Module.targets.clear();
 Module._classes.clear();
 Module._zvalMap.clear();
 Module.targets.byObject.set(globalThis, 1);
 Module.targets.byInteger.set(1, globalThis);
}));

if (!Module["preRun"]) throw "Module.preRun should exist because file support used it; did a pre-js delete it?";

necessaryPreJSTasks.forEach((function(task) {
 if (Module["preRun"].indexOf(task) < 0) throw "All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?";
}));

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = true;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_SHELL) {
 if (typeof process == "object" && typeof require === "function" || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 if (typeof read != "undefined") {
  read_ = f => read(f);
 }
 readBinary = f => {
  let data;
  if (typeof readbuffer == "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data == "object");
  return data;
 };
 readAsync = (f, onload, onerror) => {
  setTimeout((() => onload(readBinary(f))));
 };
 if (typeof clearTimeout == "undefined") {
  globalThis.clearTimeout = id => {};
 }
 if (typeof setTimeout == "undefined") {
  globalThis.setTimeout = f => typeof f == "function" ? f() : abort();
 }
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit == "function") {
  quit_ = (status, toThrow) => {
   setTimeout((() => {
    if (!(toThrow instanceof ExitStatus)) {
     let toLog = toThrow;
     if (toThrow && typeof toThrow == "object" && toThrow.stack) {
      toLog = [ toThrow, toThrow.stack ];
     }
     err(`exiting due to exception: ${toLog}`);
    }
    quit(status);
   }));
   throw toThrow;
  };
 }
 if (typeof print != "undefined") {
  if (typeof console == "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = title => document.title = title;
} else {
 throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

checkIncomingModuleAPI();

if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

if (Module["quit"]) quit_ = Module["quit"];

legacyModuleProp("quit", "quit_");

assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("read", "read_");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

var PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js";

var WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js";

var NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js";

assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time.  Add 'worker' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

legacyModuleProp("wasmBinary", "wasmBinary");

var noExitRuntime = Module["noExitRuntime"] || false;

legacyModuleProp("noExitRuntime", "noExitRuntime");

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed" + (text ? ": " + text : ""));
 }
}

var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");

assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");

var wasmTable;

function writeStackCookie() {
 var max = _emscripten_stack_get_end();
 assert((max & 3) == 0);
 if (max == 0) {
  max += 4;
 }
 HEAPU32[max >>> 2] = 34821223;
 HEAPU32[max + 4 >>> 2] = 2310721022;
 HEAPU32[0 >>> 2] = 1668509029;
}

function checkStackCookie() {
 if (ABORT) return;
 var max = _emscripten_stack_get_end();
 if (max == 0) {
  max += 4;
 }
 var cookie1 = HEAPU32[max >>> 2];
 var cookie2 = HEAPU32[max + 4 >>> 2];
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
 }
 if (HEAPU32[0 >>> 2] != 1668509029) {
  abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
 }
}

(function() {
 var h16 = new Int16Array(1);
 var h8 = new Int8Array(h16.buffer);
 h16[0] = 25459;
 if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
 return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 assert(!runtimeInitialized);
 runtimeInitialized = true;
 checkStackCookie();
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 SOCKFS.root = FS.mount(SOCKFS, {}, null);
 PIPEFS.root = FS.mount(PIPEFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 checkStackCookie();
 callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
 assert(!runtimeExited);
 Asyncify.state = Asyncify.State.Disabled;
 checkStackCookie();
 ___funcs_on_exit();
 callRuntimeCallbacks(__ATEXIT__);
 FS.quit();
 TTY.shutdown();
 IDBFS.quit();
 runtimeExited = true;
}

function postRun() {
 checkStackCookie();
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
 __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
 __ATEXIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

var runDependencyTracking = {};

function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval != "undefined") {
   runDependencyWatcher = setInterval((() => {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err("dependency: " + dep);
    }
    if (shown) {
     err("(end of list)");
    }
   }), 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 if (what.indexOf("RuntimeError: unreachable") >= 0) {
  what += '. "unreachable" may be due to ASYNCIFY_STACK_SIZE not being large enough (try increasing it)';
 }
 var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

function isFileURI(filename) {
 return filename.startsWith("file://");
}

function createExportWrapper(name, fixedasm) {
 return function() {
  var displayName = name;
  var asm = fixedasm;
  if (!fixedasm) {
   asm = Module["asm"];
  }
  assert(runtimeInitialized, "native function `" + displayName + "` called before runtime initialization");
  assert(!runtimeExited, "native function `" + displayName + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  if (!asm[name]) {
   assert(asm[name], "exported native function `" + displayName + "` not found");
  }
  return asm[name].apply(null, arguments);
 };
}

var wasmBinaryFile;

wasmBinaryFile = "php-web-drupal.js.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then((response => {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + binaryFile + "'";
    }
    return response["arrayBuffer"]();
   })).catch((() => getBinarySync(binaryFile)));
  }
 }
 return Promise.resolve().then((() => getBinarySync(binaryFile)));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then((binary => WebAssembly.instantiate(binary, imports))).then((instance => instance)).then(receiver, (reason => {
  err("failed to asynchronously prepare wasm: " + reason);
  if (isFileURI(wasmBinaryFile)) {
   err("warning: Loading from a file URI (" + wasmBinaryFile + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
  }
  abort(reason);
 }));
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then((response => {
   var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, (function(reason) {
    err("wasm streaming compile failed: " + reason);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   }));
  }));
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  exports = Asyncify.instrumentWasmExports(exports);
  exports = applySignatureConversions(exports);
  Module["asm"] = exports;
  wasmMemory = Module["asm"]["memory"];
  assert(wasmMemory, "memory not found in wasm exports");
  updateMemoryViews();
  wasmTable = Module["asm"]["__indirect_function_table"];
  assert(wasmTable, "table not found in wasm exports");
  addOnInit(Module["asm"]["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return exports;
 }
 addRunDependency("wasm-instantiate");
 var trueModule = Module;
 function receiveInstantiationResult(result) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   readyPromiseReject(e);
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
 return {};
}

var tempDouble;

var tempI64;

function legacyModuleProp(prop, newName) {
 if (!Object.getOwnPropertyDescriptor(Module, prop)) {
  Object.defineProperty(Module, prop, {
   configurable: true,
   get() {
    abort("Module." + prop + " has been replaced with plain " + newName + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
   }
  });
 }
}

function ignoredModuleProp(prop) {
 if (Object.getOwnPropertyDescriptor(Module, prop)) {
  abort("`Module." + prop + "` was supplied but `" + prop + "` not included in INCOMING_MODULE_JS_API");
 }
}

function isExportedByForceFilesystem(name) {
 return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

function missingGlobal(sym, msg) {
 if (typeof globalThis !== "undefined") {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    warnOnce("`" + sym + "` is not longer defined by emscripten. " + msg);
    return undefined;
   }
  });
 }
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

function missingLibrarySymbol(sym) {
 if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    var msg = "`" + sym + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
     librarySymbol = "$" + sym;
    }
    msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + librarySymbol + "')";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
    return undefined;
   }
  });
 }
 unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
 if (!Object.getOwnPropertyDescriptor(Module, sym)) {
  Object.defineProperty(Module, sym, {
   configurable: true,
   get() {
    var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    abort(msg);
   }
  });
 }
}

function dbg(text) {
 console.warn.apply(console, arguments);
}

var ASM_CONSTS = {
 3572092: ($0, $1) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  if (!(property in target)) {
   return Module.jsToZval(undefined);
  }
  if (target[property] === null) {
   return Module.jsToZval(null);
  }
  const result = target[property];
  if (!result || ![ "function", "object" ].includes(typeof result)) {
   return Module.jsToZval(result);
  }
  return 0;
 },
 3572440: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  const result = target[property];
  const zvalPtr = $2;
  if (result && [ "function", "object" ].includes(typeof result)) {
   let index = Module.targets.getId(result);
   if (!Module.targets.has(result)) {
    index = Module.targets.add(result);
    Module.zvalMap.set(result, zvalPtr);
    Module._zvalMap.set(zvalPtr, result);
   }
   return index;
  }
  return 0;
 },
 3572848: $0 => "function" === typeof Module.targets.get($0) ? $0 : 0,
 3572916: $0 => !!(Module.targets.get($0).prototype && Module.targets.get($0).prototype.constructor),
 3573017: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const newValue = $2;
  })();
 },
 3573129: ($0, $1, $2, $3, $4) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const funcPtr = $2;
   const zvalPtr = $3;
   const paramCount = $4;
   target[property] = Module.callableToJs(funcPtr);
  })();
 },
 3573332: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const zvalPtr = $2;
   if (!Module.targets.has(target[property])) {
    target[property] = Module.marshalObject(zvalPtr);
   }
  })();
 },
 3573539: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   delete target[property];
  })();
 },
 3573655: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = null;
  })();
 },
 3573771: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = false;
  })();
 },
 3573888: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = true;
  })();
 },
 3574004: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = $2;
  })();
 },
 3574118: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = $2;
  })();
 },
 3574232: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const newValue = UTF8ToString($2);
   target[property] = newValue;
  })();
 },
 3574387: ($0, $1) => {
  let target = Module.targets.get($0);
  const property = $1;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  if (!(property in target)) {
   const jsRet = "UN";
   const len = lengthBytesUTF8(jsRet) + 1;
   const strLoc = _malloc(len);
   stringToUTF8(jsRet, strLoc, len);
   return strLoc;
  }
  if (target[property] === null) {
   const jsRet = "NU";
   const len = lengthBytesUTF8(jsRet) + 1;
   const strLoc = _malloc(len);
   stringToUTF8(jsRet, strLoc, len);
   return strLoc;
  }
  const result = target[property];
  if (!result || ![ "function", "object" ].includes(typeof result)) {
   const jsRet = "OK" + String(result);
   const len = lengthBytesUTF8(jsRet) + 1;
   const strLoc = _malloc(len);
   stringToUTF8(jsRet, strLoc, len);
   return strLoc;
  }
  const jsRet = "XX";
  const len = lengthBytesUTF8(jsRet) + 1;
  const strLoc = _malloc(len);
  stringToUTF8(jsRet, strLoc, len);
  return strLoc;
 },
 3575353: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  const result = target[property];
  const zvalPtr = $2;
  if (result && [ "function", "object" ].includes(typeof result)) {
   let index = Module.targets.getId(result);
   if (!Module.targets.has(result)) {
    index = Module.targets.add(result);
    Module.zvalMap.set(result, zvalPtr);
    Module._zvalMap.set(zvalPtr, result);
   }
   return index;
  }
  return 0;
 },
 3575761: $0 => "function" === typeof Module.targets.get($0) ? $0 : 0,
 3575829: $0 => !!(Module.targets.get($0).prototype && Module.targets.get($0).prototype.constructor),
 3575930: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const newValue = $2;
  })();
 },
 3576028: ($0, $1, $2, $3) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const funcPtr = $2;
   const zvalPtr = $3;
   target[property] = Module.callableToJs(funcPtr);
  })();
 },
 3576194: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const zvalPtr = $2;
   if (!Module.targets.has(target[property])) {
    target[property] = Module.marshalObject(zvalPtr);
   }
  })();
 },
 3576387: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   delete target[property];
  })();
 },
 3576489: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = null;
  })();
 },
 3576591: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = false;
  })();
 },
 3576694: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = true;
  })();
 },
 3576796: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = $2;
  })();
 },
 3576896: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = $2;
  })();
 },
 3576996: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const newValue = UTF8ToString($2);
   target[property] = newValue;
  })();
 },
 3577137: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property = $1;
  const check_empty = $2;
  if (Array.isArray(target)) {
   return typeof target[property] !== "undefined";
  }
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   const targetBytes = Module.bufferMaps.get(target);
   return targetBytes[property] !== "undefined";
  }
  if (!check_empty) {
   return property in target;
  } else {
   return !!target[property];
  }
 },
 3577616: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   delete target[property];
  })();
 },
 3577732: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   delete target[property];
  })();
 },
 3577834: $0 => {
  const target = Module.targets.get($0);
  let json;
  if (typeof target === "function") {
   json = JSON.stringify({});
  } else {
   try {
    json = JSON.stringify({
     ...target
    });
   } catch {
    json = JSON.stringify({});
   }
  }
  const jsRet = String(json);
  const len = lengthBytesUTF8(jsRet) + 1;
  const strLoc = _malloc(len);
  stringToUTF8(jsRet, strLoc, len);
  return strLoc;
 },
 3578186: ($0, $1) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  return property in target;
 },
 3578291: $0 => {
  const target = Module.targets.get($0);
  const name = target.constructor && target.constructor.name || "Object";
  const len = lengthBytesUTF8(name) + 1;
  const namePtr = _malloc(name);
  stringToUTF8(name, namePtr, len);
  return namePtr;
 },
 3578528: ($0, $1, $2, $3, $4) => {
  const target = Module.targets.get($0);
  const method_name = UTF8ToString($1);
  const argp = $2;
  const argc = $3;
  const size = $4;
  const args = [];
  for (let i = 0; i < argc; i++) {
   const loc = argp + i * size;
   const ptr = Module.getValue(loc, "*");
   const arg = Module.zvalToJS(ptr);
   args.push(arg);
  }
  const jsRet = target[method_name](...args);
  const retZval = Module.jsToZval(jsRet);
  return retZval;
 },
 3578929: ($0, $1, $2, $3) => {
  const target = Module.targets.get($0);
  const argv = $1;
  const argc = $2;
  const size = $3;
  const args = [];
  for (let i = 0; i < argc; i++) {
   args.push(Module.zvalToJS(argv + i * size));
  }
  const jsRet = target(...args);
  return Module.jsToZval(jsRet);
 },
 3579181: ($0, $1) => {
  const target = Module.targets.get($0);
  const property_name = UTF8ToString($1);
  const jsRet = target[property_name];
  return Module.jsToZval(jsRet);
 },
 3579332: ($0, $1, $2, $3) => {
  const _class = Module._classes.get($0);
  const argv = $1;
  const argc = $2;
  const size = $3;
  const args = [];
  for (let i = 0; i < argc; i++) {
   args.push(Module.zvalToJS(argv + i * size));
  }
  const _object = new _class(...args);
  const index = Module.targets.add(_object);
  return index;
 },
 3579617: $0 => {
  const jsRet = String(eval(UTF8ToString($0)));
  const len = lengthBytesUTF8(jsRet) + 1;
  const strLoc = _malloc(len);
  stringToUTF8(jsRet, strLoc, len);
  return strLoc;
 },
 3579785: ($0, $1) => {
  const funcName = UTF8ToString($0);
  const argJson = UTF8ToString($1);
  const func = globalThis[funcName];
  const args = JSON.parse(argJson || "[]") || [];
  const jsRet = String(func(...args));
  const len = lengthBytesUTF8(jsRet) + 1;
  const strLoc = _malloc(len);
  stringToUTF8(jsRet, strLoc, len);
  return strLoc;
 },
 3580096: ($0, $1) => {
  const timeout = Number(UTF8ToString($0));
  const funcPtr = $1;
  setTimeout((() => {
   Module.ccall("vrzno_exec_callback", "number", [ "number", "number", "number" ], [ funcPtr, null, 0 ]);
   Module.ccall("vrzno_del_callback", "number", [ "number" ], [ funcPtr ]);
  }), timeout);
 },
 3580368: $0 => Module.jsToZval(Module[UTF8ToString($0)]),
 3580422: ($0, $1, $2, $3) => {
  const _class = Module.targets.get($0);
  const argv = $1;
  const argc = $2;
  const size = $3;
  const args = [];
  for (let i = 0; i < argc; i++) {
   args.push(Module.zvalToJS(argv + i * size));
  }
  const _object = new _class(...args);
  return Module.jsToZval(_object);
 },
 3580682: $0 => {
  const name = UTF8ToString($0);
  return Module.jsToZval(import(name));
 },
 3580755: $0 => {
  const target = Module.targets.get($0);
  return Module.classes.get(target);
 },
 3580833: ($0, $1) => {
  const target = Module.targets.get($0);
  Module.classes.set(target, $1);
  Module._classes.set($1, target);
 },
 3580941: $0 => {
  const results = Module.targets.get($0);
  if (results) {
   return results.length;
  }
  return 0;
 },
 3581034: $0 => {
  const results = Module.targets.get($0);
  if (results.length) {
   return Object.keys(results[0]).length;
  }
  return 0;
 },
 3581150: ($0, $1) => {
  const targetId = $0;
  const target = Module.targets.get(targetId);
  const current = $1;
  if (current >= target.length) {
   return null;
  }
  return Module.jsToZval(target[current]);
 },
 3581327: ($0, $1) => {
  const results = Module.targets.get($0);
  if (results.length) {
   const jsRet = Object.keys(results[0])[$1];
   const len = lengthBytesUTF8(jsRet) + 1;
   const strLoc = _malloc(len);
   stringToUTF8(jsRet, strLoc, len);
   return strLoc;
  }
  return 0;
 },
 3581565: ($0, $1, $2) => {
  const results = Module.targets.get($0);
  const current = -1 + $1;
  const colno = $2;
  if (current >= results.length) {
   return null;
  }
  const result = results[current];
  const key = Object.keys(result)[$2];
  const zval = Module.jsToZval(result[key]);
  return zval;
 },
 3581825: ($0, $1) => {
  const statement = Module.targets.get($0);
  const paramVal = Module.zvalToJS($1);
  if (!Module.PdoParams.has(statement)) {
   Module.PdoParams.set(statement, []);
  }
  const paramList = Module.PdoParams.get(statement);
  paramList.push(paramVal);
 },
 3582064: ($0, $1, $2) => {
  console.log("GET ATTR", $0, $1, $2);
 },
 3582105: ($0, $1, $2) => {
  console.log("COL META", $0, $1, $2);
 },
 3582146: ($0, $1, $2) => {
  console.log("CLOSE", $0, $1, $2);
 },
 3582184: $0 => {
  console.log("CLOSE", $0);
 },
 3582214: ($0, $1) => {
  const target = Module.targets.get($0);
  const query = UTF8ToString($1);
  if (Module.pdoDriver && Module.pdoDriver.prepare) {
   const prepared = Module.pdoDriver.prepare(target, query);
   const zval = Module.jsToZval(prepared);
   return zval;
  }
  return null;
 },
 3582466: ($0, $1) => {
  console.log("DO", $0, UTF8ToString($1));
  const target = Module.targets.get($0);
  const query = UTF8ToString($1);
  if (Module.pdoDriver && Module.pdoDriver.doer) {
   return Module.pdoDriver.doer(target, query);
  }
  return 1;
 },
 3582687: $0 => {
  console.log("BEGIN TXN", $0);
  return true;
 },
 3582734: $0 => {
  console.log("COMMIT TXN", $0);
  return true;
 },
 3582782: $0 => {
  console.log("ROLLBACK TXN", $0);
  return true;
 },
 3582832: ($0, $1, $2) => {
  console.log("SET ATTR", $0, $1, $2);
  return true;
 },
 3582886: ($0, $1) => {
  console.log("LAST INSERT ID", $0, UTF8ToString($1));
  return 0;
 },
 3582953: ($0, $1, $2) => {
  console.log("FETCH ERROR FUNC", $0, $1, $2);
 },
 3583002: ($0, $1, $2) => {
  console.log("GET ATTR", $0, $1, $2);
  return 0;
 },
 3583053: $0 => {
  console.log("SHUTDOWN", $0);
 },
 3583086: ($0, $1) => {
  console.log("GET GC", $0, $1);
 },
 3583121: () => Module.targets.getId(globalThis),
 3583166: ($0, $1) => {
  let target = Module.targets.get($0);
  const property = $1;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  if (Array.isArray(target) || ArrayBuffer.isView(target)) {
   if (property >= 0 && property < target.length) {
    return 1;
   }
  }
  return 0;
 },
 3583529: ($0, $1) => {
  let target = Module.targets.get($0);
  const property = $1;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  return Module.jsToZval(target[property]);
 },
 3583805: $0 => {
  if (Module.persist) {
   const localPath = Module.persist.localPath || "./persist";
   const mountPath = Module.persist.mountPath || "/persist";
   const wasmEnv = UTF8ToString($0);
   FS.mkdir(mountPath);
   switch (wasmEnv) {
   case "web":
    FS.mount(IDBFS, {}, mountPath);
    break;

   case "node":
    const fs = require("fs");
    if (!fs.existsSync(localPath)) {
     fs.mkdirSync(localPath, {
      recursive: true
     });
    }
    FS.mount(NODEFS, {
     root: localPath
    }, mountPath);
    break;
   }
  }
 }
};

function __asyncjs__vrzno_await_internal(targetId) {
 return Asyncify.handleAsync((async () => {
  const target = Module.targets.get(targetId);
  const result = await target;
  return Module.jsToZval(result);
 }));
}

function __asyncjs__pdo_vrzno_real_stmt_execute(targetId) {
 return Asyncify.handleAsync((async () => {
  let statement = Module.targets.get(targetId);
  if (!Module.PdoParams.has(statement)) {
   Module.PdoParams.set(statement, []);
  }
  const paramList = Module.PdoParams.get(statement);
  const bound = paramList.length ? statement.bind(...paramList) : statement;
  const result = await bound.run();
  Module.PdoParams.delete(statement);
  if (!result.success) {
   return false;
  }
  return Module.jsToZval(result.results);
 }));
}

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return HEAP8[ptr >>> 0];

 case "i8":
  return HEAP8[ptr >>> 0];

 case "i16":
  return HEAP16[ptr >>> 1];

 case "i32":
  return HEAP32[ptr >>> 2];

 case "i64":
  abort("to do getValue(i64) use WASM_BIGINT");

 case "float":
  return HEAPF32[ptr >>> 2];

 case "double":
  return HEAPF64[ptr >>> 3];

 case "*":
  return HEAPU32[ptr >>> 2];

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

var ptrToString = ptr => {
 assert(typeof ptr === "number");
 return "0x" + ptr.toString(16).padStart(8, "0");
};

function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  HEAP8[ptr >>> 0] = value;
  break;

 case "i8":
  HEAP8[ptr >>> 0] = value;
  break;

 case "i16":
  HEAP16[ptr >>> 1] = value;
  break;

 case "i32":
  HEAP32[ptr >>> 2] = value;
  break;

 case "i64":
  abort("to do setValue(i64) use WASM_BIGINT");

 case "float":
  HEAPF32[ptr >>> 2] = value;
  break;

 case "double":
  HEAPF64[ptr >>> 3] = value;
  break;

 case "*":
  HEAPU32[ptr >>> 2] = value;
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

var warnOnce = text => {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
};

function convertI32PairToI53Checked(lo, hi) {
 assert(lo == lo >>> 0 || lo == (lo | 0));
 assert(hi === (hi | 0));
 return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 idx >>>= 0;
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
};

var UTF8ToString = (ptr, maxBytesToRead) => {
 assert(typeof ptr == "number");
 ptr >>>= 0;
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

function ___assert_fail(condition, filename, line, func) {
 condition >>>= 0;
 filename >>>= 0;
 func >>>= 0;
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

var ___call_sighandler = function(fp, sig) {
 fp >>>= 0;
 return (a1 => dynCall_vi.apply(null, [ fp, a1 ]))(sig);
};

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter((p => !!p)), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments);
  return PATH.normalize(paths.join("/"));
 },
 join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p => !!p)), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 outIdx >>>= 0;
 assert(typeof str === "string");
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++ >>> 0] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++ >>> 0] = 192 | u >> 6;
   heap[outIdx++ >>> 0] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++ >>> 0] = 224 | u >> 12;
   heap[outIdx++ >>> 0] = 128 | u >> 6 & 63;
   heap[outIdx++ >>> 0] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
   heap[outIdx++ >>> 0] = 240 | u >> 18;
   heap[outIdx++ >>> 0] = 128 | u >> 12 & 63;
   heap[outIdx++ >>> 0] = 128 | u >> 6 & 63;
   heap[outIdx++ >>> 0] = 128 | u & 63;
  }
 }
 heap[outIdx >>> 0] = 0;
 return outIdx - startIdx;
};

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var FS_stdin_getChar = () => {
 if (!FS_stdin_getChar_buffer.length) {
  var result = null;
  if (typeof window != "undefined" && typeof window.prompt == "function") {
   result = window.prompt("Input: ");
   if (result !== null) {
    result += "\n";
   }
  } else if (typeof readline == "function") {
   result = readline();
   if (result !== null) {
    result += "\n";
   }
  }
  if (!result) {
   return null;
  }
  FS_stdin_getChar_buffer = intArrayFromString(result, true);
 }
 return FS_stdin_getChar_buffer.shift();
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   return FS_stdin_getChar();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  },
  ioctl_tcgets: function(tty) {
   return {
    c_iflag: 25856,
    c_oflag: 5,
    c_cflag: 191,
    c_lflag: 35387,
    c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
   };
  },
  ioctl_tcsets: function(tty, optional_actions, data) {
   return 0;
  },
  ioctl_tiocgwinsz: function(tty) {
   return [ 24, 80 ];
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var zeroMemory = (address, size) => {
 HEAPU8.fill(0, address, address + size);
 return address;
};

var alignMemory = (size, alignment) => {
 assert(alignment, "alignment argument is required");
 return Math.ceil(size / alignment) * alignment;
};

var mmapAlloc = size => {
 size = alignMemory(size, 65536);
 var ptr = _emscripten_builtin_memalign(65536, size);
 if (!ptr) return 0;
 return zeroMemory(ptr, size);
};

var MEMFS = {
 ops_table: null,
 mount(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   assert(size >= 0);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write(stream, buffer, offset, length, position, canOwn) {
   assert(!(buffer instanceof ArrayBuffer));
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     assert(position === 0, "canOwn must imply no weird position inside the file");
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr >>> 0);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, (arrayBuffer => {
  assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }), (event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 }));
 if (dep) addRunDependency(dep);
};

var preloadPlugins = Module["preloadPlugins"] || [];

function FS_handledByPreloadPlugin(byteArray, fullname, finish, onerror) {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach((function(plugin) {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 }));
 return handled;
}

function FS_createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   if (preFinish) preFinish();
   if (!dontCreateFile) {
    FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   if (onload) onload();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, (() => {
   if (onerror) onerror();
   removeRunDependency(dep);
  }))) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, (byteArray => processData(byteArray)), onerror);
 } else {
  processData(url);
 }
}

function FS_modeStringToFlags(str) {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
}

function FS_getMode(canRead, canWrite) {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
}

var IDBFS = {
 dbs: {},
 indexedDB: () => {
  if (typeof indexedDB != "undefined") return indexedDB;
  var ret = null;
  if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: function(mount) {
  return MEMFS.mount.apply(null, arguments);
 },
 syncfs: (mount, populate, callback) => {
  IDBFS.getLocalSet(mount, ((err, local) => {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, ((err, remote) => {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   }));
  }));
 },
 quit: () => {
  Object.values(IDBFS.dbs).forEach((value => value.close()));
  IDBFS.dbs = {};
 },
 getDB: (name, callback) => {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = e => {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = () => {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 getLocalSet: (mount, callback) => {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return p => PATH.join2(root, p);
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    "timestamp": stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: (mount, callback) => {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, ((err, db) => {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = e => {
     callback(e.target.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = event => {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      "timestamp": cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  }));
 },
 loadLocalEntry: (path, callback) => {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode,
    "contents": node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: (path, entry, callback) => {
  try {
   if (FS.isDir(entry["mode"])) {
    FS.mkdirTree(path, entry["mode"]);
   } else if (FS.isFile(entry["mode"])) {
    FS.writeFile(path, entry["contents"], {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry["mode"]);
   FS.utime(path, entry["timestamp"], entry["timestamp"]);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: (path, callback) => {
  try {
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: (store, path, callback) => {
  var req = store.get(path);
  req.onsuccess = event => {
   callback(null, event.target.result);
  };
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: (store, path, entry, callback) => {
  try {
   var req = store.put(entry, path);
  } catch (e) {
   callback(e);
   return;
  }
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: (store, path, callback) => {
  var req = store.delete(path);
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(e.target.error);
   e.preventDefault();
  };
 },
 reconcile: (src, dst, callback) => {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach((function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
    create.push(key);
    total++;
   }
  }));
  var remove = [];
  Object.keys(dst.entries).forEach((function(key) {
   if (!src.entries[key]) {
    remove.push(key);
    total++;
   }
  }));
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = e => {
   done(this.error);
   e.preventDefault();
  };
  transaction.oncomplete = e => {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach((path => {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, ((err, entry) => {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    }));
   } else {
    IDBFS.loadLocalEntry(path, ((err, entry) => {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    }));
   }
  }));
  remove.sort().reverse().forEach((path => {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  }));
 }
};

var ERRNO_MESSAGES = {
 0: "Success",
 1: "Arg list too long",
 2: "Permission denied",
 3: "Address already in use",
 4: "Address not available",
 5: "Address family not supported by protocol family",
 6: "No more processes",
 7: "Socket already connected",
 8: "Bad file number",
 9: "Trying to read unreadable message",
 10: "Mount device busy",
 11: "Operation canceled",
 12: "No children",
 13: "Connection aborted",
 14: "Connection refused",
 15: "Connection reset by peer",
 16: "File locking deadlock error",
 17: "Destination address required",
 18: "Math arg out of domain of func",
 19: "Quota exceeded",
 20: "File exists",
 21: "Bad address",
 22: "File too large",
 23: "Host is unreachable",
 24: "Identifier removed",
 25: "Illegal byte sequence",
 26: "Connection already in progress",
 27: "Interrupted system call",
 28: "Invalid argument",
 29: "I/O error",
 30: "Socket is already connected",
 31: "Is a directory",
 32: "Too many symbolic links",
 33: "Too many open files",
 34: "Too many links",
 35: "Message too long",
 36: "Multihop attempted",
 37: "File or path name too long",
 38: "Network interface is not configured",
 39: "Connection reset by network",
 40: "Network is unreachable",
 41: "Too many open files in system",
 42: "No buffer space available",
 43: "No such device",
 44: "No such file or directory",
 45: "Exec format error",
 46: "No record locks available",
 47: "The link has been severed",
 48: "Not enough core",
 49: "No message of desired type",
 50: "Protocol not available",
 51: "No space left on device",
 52: "Function not implemented",
 53: "Socket is not connected",
 54: "Not a directory",
 55: "Directory not empty",
 56: "State not recoverable",
 57: "Socket operation on non-socket",
 59: "Not a typewriter",
 60: "No such device or address",
 61: "Value too large for defined data type",
 62: "Previous owner died",
 63: "Not super-user",
 64: "Broken pipe",
 65: "Protocol error",
 66: "Unknown protocol",
 67: "Protocol wrong type for socket",
 68: "Math result not representable",
 69: "Read only file system",
 70: "Illegal seek",
 71: "No such process",
 72: "Stale file handle",
 73: "Connection timed out",
 74: "Text file busy",
 75: "Cross-device link",
 100: "Device not a stream",
 101: "Bad font file fmt",
 102: "Invalid slot",
 103: "Invalid request code",
 104: "No anode",
 105: "Block device required",
 106: "Channel number out of range",
 107: "Level 3 halted",
 108: "Level 3 reset",
 109: "Link number out of range",
 110: "Protocol driver not attached",
 111: "No CSI structure available",
 112: "Level 2 halted",
 113: "Invalid exchange",
 114: "Invalid request descriptor",
 115: "Exchange full",
 116: "No data (for no delay io)",
 117: "Timer expired",
 118: "Out of streams resources",
 119: "Machine is not on the network",
 120: "Package not installed",
 121: "The object is remote",
 122: "Advertise error",
 123: "Srmount error",
 124: "Communication error on send",
 125: "Cross mount point (not really error)",
 126: "Given log. name not unique",
 127: "f.d. invalid for this operation",
 128: "Remote address changed",
 129: "Can   access a needed shared lib",
 130: "Accessing a corrupted shared lib",
 131: ".lib section in a.out corrupted",
 132: "Attempting to link in too many libs",
 133: "Attempting to exec a shared library",
 135: "Streams pipe error",
 136: "Too many users",
 137: "Socket type not supported",
 138: "Not supported",
 139: "Protocol family not supported",
 140: "Can't send after socket shutdown",
 141: "Too many references",
 142: "Host is down",
 148: "No medium (in tape drive)",
 156: "Level 2 not synchronized"
};

var ERRNO_CODES = {};

function demangle(func) {
 warnOnce("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
 return func;
}

function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, (function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 }));
}

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 lookupPath: (path, opts = {}) => {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter((p => !!p));
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: node => {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
   }
   path = path ? `${node.name}/${path}` : node.name;
   node = node.parent;
  }
 },
 hashName: (parentid, name) => {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: (parent, name) => {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: (parent, name, mode, rdev) => {
  assert(typeof parent == "object");
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: node => {
  FS.hashRemoveNode(node);
 },
 isRoot: node => node === node.parent,
 isMountpoint: node => !!node.mounted,
 isFile: mode => (mode & 61440) === 32768,
 isDir: mode => (mode & 61440) === 16384,
 isLink: mode => (mode & 61440) === 40960,
 isChrdev: mode => (mode & 61440) === 8192,
 isBlkdev: mode => (mode & 61440) === 24576,
 isFIFO: mode => (mode & 61440) === 4096,
 isSocket: mode => (mode & 49152) === 49152,
 flagsToPermissionString: flag => {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: (node, perms) => {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: dir => {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: (dir, name) => {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: (dir, name, isdir) => {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: (node, flags) => {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: () => {
  for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStreamChecked: fd => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  return stream;
 },
 getStream: fd => FS.streams[fd],
 createStream: (stream, fd = -1) => {
  if (!FS.FSStream) {
   FS.FSStream = function() {
    this.shared = {};
   };
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get() {
      return this.node;
     },
     set(val) {
      this.node = val;
     }
    },
    isRead: {
     get() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get() {
      return this.flags & 1024;
     }
    },
    flags: {
     get() {
      return this.shared.flags;
     },
     set(val) {
      this.shared.flags = val;
     }
    },
    position: {
     get() {
      return this.shared.position;
     },
     set(val) {
      this.shared.position = val;
     }
    }
   });
  }
  stream = Object.assign(new FS.FSStream, stream);
  if (fd == -1) {
   fd = FS.nextfd();
  }
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: fd => {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: stream => {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: () => {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => dev >> 8,
 minor: dev => dev & 255,
 makedev: (ma, mi) => ma << 8 | mi,
 registerDevice: (dev, ops) => {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts: mount => {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: (populate, callback) => {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   assert(FS.syncFSRequests > 0);
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach((mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  }));
 },
 mount: (type, opts, mountpoint) => {
  if (typeof type == "string") {
   throw type;
  }
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: mountpoint => {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach((hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  }));
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  assert(idx !== -1);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: (parent, name) => parent.node_ops.lookup(parent, name),
 mknod: (path, mode, dev) => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: (path, mode) => {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: (path, mode) => {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: (path, mode) => {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: (path, mode, dev) => {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: (oldpath, newpath) => {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: (old_path, new_path) => {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink: path => {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: (path, dontFollow) => {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: path => FS.stat(path, true),
 chmod: (path, mode, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: (path, mode) => {
  FS.chmod(path, mode, true);
 },
 fchmod: (fd, mode) => {
  var stream = FS.getStreamChecked(fd);
  FS.chmod(stream.node, mode);
 },
 chown: (path, uid, gid, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: (path, uid, gid) => {
  FS.chown(path, uid, gid, true);
 },
 fchown: (fd, uid, gid) => {
  var stream = FS.getStreamChecked(fd);
  FS.chown(stream.node, uid, gid);
 },
 truncate: (path, len) => {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: (fd, len) => {
  var stream = FS.getStreamChecked(fd);
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: (path, atime, mtime) => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: (path, flags, mode) => {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512 && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close: stream => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: stream => stream.fd === null,
 llseek: (stream, offset, whence) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: (stream, buffer, offset, length, position) => {
  assert(offset >= 0);
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: (stream, buffer, offset, length, position, canOwn) => {
  assert(offset >= 0);
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate: (stream, offset, length) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: (stream, length, position, prot, flags) => {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync: (stream, buffer, offset, length, mmapFlags) => {
  assert(offset >= 0);
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: stream => 0,
 ioctl: (stream, cmd, arg) => {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: (path, opts = {}) => {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error(`Invalid encoding type "${opts.encoding}"`);
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: (path, data, opts = {}) => {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: () => {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: () => {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: () => {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: () => {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (parent, name) => {
      var fd = +name;
      var stream = FS.getStreamChecked(fd);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: () => {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
  assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
  assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
  assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
 },
 ensureErrnoError: () => {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.name = "ErrnoError";
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
    for (var key in ERRNO_CODES) {
     if (ERRNO_CODES[key] === errno) {
      this.code = key;
      break;
     }
    }
   };
   this.setErrno(errno);
   this.message = ERRNO_MESSAGES[errno];
   if (this.stack) {
    Object.defineProperty(this, "stack", {
     value: (new Error).stack,
     writable: true
    });
    this.stack = demangleAll(this.stack);
   }
  };
  FS.ErrnoError.prototype = new Error;
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach((code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  }));
 },
 staticInit: () => {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS
  };
 },
 init: (input, output, error) => {
  assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: () => {
  FS.init.initialized = false;
  _fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 findObject: (path, dontResolveLastLink) => {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath: (path, dontResolveLastLink) => {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath: (parent, path, canRead, canWrite) => {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: (parent, name, properties, canRead, canWrite) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS_getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: (parent, name, input, output) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: stream => {
    stream.seekable = false;
   },
   close: stream => {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: (stream, buffer, offset, length, pos) => {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: (stream, buffer, offset, length, pos) => {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile: obj => {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile: (parent, name, url, canRead, canWrite) => {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest;
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (from, to) => {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    }
    return intArrayFromString(xhr.responseText || "", true);
   };
   var lazyArray = this;
   lazyArray.setDataGetter((chunkNum => {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   }));
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array;
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach((key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    FS.forceLoadFile(node);
    return fn.apply(null, arguments);
   };
  }));
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   assert(size >= 0);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, HEAP8, ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 },
 absolutePath: () => {
  abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
 },
 createFolder: () => {
  abort("FS.createFolder has been removed; use FS.mkdir instead");
 },
 createLink: () => {
  abort("FS.createLink has been removed; use FS.symlink instead");
 },
 joinPath: () => {
  abort("FS.joinPath has been removed; use PATH.join instead");
 },
 mmapAlloc: () => {
  abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
 },
 standardizePath: () => {
  abort("FS.standardizePath has been removed; use PATH.normalize instead");
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt: function(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[buf >>> 2] = stat.dev;
  HEAP32[buf + 4 >>> 2] = stat.mode;
  HEAPU32[buf + 8 >>> 2] = stat.nlink;
  HEAP32[buf + 12 >>> 2] = stat.uid;
  HEAP32[buf + 16 >>> 2] = stat.gid;
  HEAP32[buf + 20 >>> 2] = stat.rdev;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 24 >>> 2] = tempI64[0], HEAP32[buf + 28 >>> 2] = tempI64[1];
  HEAP32[buf + 32 >>> 2] = 4096;
  HEAP32[buf + 36 >>> 2] = stat.blocks;
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 40 >>> 2] = tempI64[0], HEAP32[buf + 44 >>> 2] = tempI64[1];
  HEAPU32[buf + 48 >>> 2] = atime % 1e3 * 1e3;
  tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 56 >>> 2] = tempI64[0], HEAP32[buf + 60 >>> 2] = tempI64[1];
  HEAPU32[buf + 64 >>> 2] = mtime % 1e3 * 1e3;
  tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 72 >>> 2] = tempI64[0], HEAP32[buf + 76 >>> 2] = tempI64[1];
  HEAPU32[buf + 80 >>> 2] = ctime % 1e3 * 1e3;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 88 >>> 2] = tempI64[0], HEAP32[buf + 92 >>> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get() {
  assert(SYSCALLS.varargs != undefined);
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >>> 2];
  return ret;
 },
 getStr(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStreamChecked(fd);
  return stream;
 }
};

function ___syscall__newselect(nfds, readfds, writefds, exceptfds, timeout) {
 readfds >>>= 0;
 writefds >>>= 0;
 exceptfds >>>= 0;
 timeout >>>= 0;
 try {
  assert(nfds <= 64, "nfds must be less than or equal to 64");
  assert(!exceptfds, "exceptfds not supported");
  var total = 0;
  var srcReadLow = readfds ? HEAP32[readfds >>> 2] : 0, srcReadHigh = readfds ? HEAP32[readfds + 4 >>> 2] : 0;
  var srcWriteLow = writefds ? HEAP32[writefds >>> 2] : 0, srcWriteHigh = writefds ? HEAP32[writefds + 4 >>> 2] : 0;
  var srcExceptLow = exceptfds ? HEAP32[exceptfds >>> 2] : 0, srcExceptHigh = exceptfds ? HEAP32[exceptfds + 4 >>> 2] : 0;
  var dstReadLow = 0, dstReadHigh = 0;
  var dstWriteLow = 0, dstWriteHigh = 0;
  var dstExceptLow = 0, dstExceptHigh = 0;
  var allLow = (readfds ? HEAP32[readfds >>> 2] : 0) | (writefds ? HEAP32[writefds >>> 2] : 0) | (exceptfds ? HEAP32[exceptfds >>> 2] : 0);
  var allHigh = (readfds ? HEAP32[readfds + 4 >>> 2] : 0) | (writefds ? HEAP32[writefds + 4 >>> 2] : 0) | (exceptfds ? HEAP32[exceptfds + 4 >>> 2] : 0);
  var check = function(fd, low, high, val) {
   return fd < 32 ? low & val : high & val;
  };
  for (var fd = 0; fd < nfds; fd++) {
   var mask = 1 << fd % 32;
   if (!check(fd, allLow, allHigh, mask)) {
    continue;
   }
   var stream = SYSCALLS.getStreamFromFD(fd);
   var flags = SYSCALLS.DEFAULT_POLLMASK;
   if (stream.stream_ops.poll) {
    var timeoutInMillis = -1;
    if (timeout) {
     var tv_sec = readfds ? HEAP32[timeout >>> 2] : 0, tv_usec = readfds ? HEAP32[timeout + 8 >>> 2] : 0;
     timeoutInMillis = (tv_sec + tv_usec / 1e6) * 1e3;
    }
    flags = stream.stream_ops.poll(stream, timeoutInMillis);
   }
   if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
    fd < 32 ? dstReadLow = dstReadLow | mask : dstReadHigh = dstReadHigh | mask;
    total++;
   }
   if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
    fd < 32 ? dstWriteLow = dstWriteLow | mask : dstWriteHigh = dstWriteHigh | mask;
    total++;
   }
   if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
    fd < 32 ? dstExceptLow = dstExceptLow | mask : dstExceptHigh = dstExceptHigh | mask;
    total++;
   }
  }
  if (readfds) {
   HEAP32[readfds >>> 2] = dstReadLow;
   HEAP32[readfds + 4 >>> 2] = dstReadHigh;
  }
  if (writefds) {
   HEAP32[writefds >>> 2] = dstWriteLow;
   HEAP32[writefds + 4 >>> 2] = dstWriteHigh;
  }
  if (exceptfds) {
   HEAP32[exceptfds >>> 2] = dstExceptLow;
   HEAP32[exceptfds + 4 >>> 2] = dstExceptHigh;
  }
  return total;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var SOCKFS = {
 mount(mount) {
  Module["websocket"] = Module["websocket"] && "object" === typeof Module["websocket"] ? Module["websocket"] : {};
  Module["websocket"]._callbacks = {};
  Module["websocket"]["on"] = function(event, callback) {
   if ("function" === typeof callback) {
    this._callbacks[event] = callback;
   }
   return this;
  };
  Module["websocket"].emit = function(event, param) {
   if ("function" === typeof this._callbacks[event]) {
    this._callbacks[event].call(this, param);
   }
  };
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createSocket(family, type, protocol) {
  type &= ~526336;
  var streaming = type == 1;
  if (streaming && protocol && protocol != 6) {
   throw new FS.ErrnoError(66);
  }
  var sock = {
   family: family,
   type: type,
   protocol: protocol,
   server: null,
   error: null,
   peers: {},
   pending: [],
   recv_queue: [],
   sock_ops: SOCKFS.websocket_sock_ops
  };
  var name = SOCKFS.nextname();
  var node = FS.createNode(SOCKFS.root, name, 49152, 0);
  node.sock = sock;
  var stream = FS.createStream({
   path: name,
   node: node,
   flags: 2,
   seekable: false,
   stream_ops: SOCKFS.stream_ops
  });
  sock.stream = stream;
  return sock;
 },
 getSocket(fd) {
  var stream = FS.getStream(fd);
  if (!stream || !FS.isSocket(stream.node.mode)) {
   return null;
  }
  return stream.node.sock;
 },
 stream_ops: {
  poll(stream) {
   var sock = stream.node.sock;
   return sock.sock_ops.poll(sock);
  },
  ioctl(stream, request, varargs) {
   var sock = stream.node.sock;
   return sock.sock_ops.ioctl(sock, request, varargs);
  },
  read(stream, buffer, offset, length, position) {
   var sock = stream.node.sock;
   var msg = sock.sock_ops.recvmsg(sock, length);
   if (!msg) {
    return 0;
   }
   buffer.set(msg.buffer, offset);
   return msg.buffer.length;
  },
  write(stream, buffer, offset, length, position) {
   var sock = stream.node.sock;
   return sock.sock_ops.sendmsg(sock, buffer, offset, length);
  },
  close(stream) {
   var sock = stream.node.sock;
   sock.sock_ops.close(sock);
  }
 },
 nextname() {
  if (!SOCKFS.nextname.current) {
   SOCKFS.nextname.current = 0;
  }
  return "socket[" + SOCKFS.nextname.current++ + "]";
 },
 websocket_sock_ops: {
  createPeer(sock, addr, port) {
   var ws;
   if (typeof addr == "object") {
    ws = addr;
    addr = null;
    port = null;
   }
   if (ws) {
    if (ws._socket) {
     addr = ws._socket.remoteAddress;
     port = ws._socket.remotePort;
    } else {
     var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
     if (!result) {
      throw new Error("WebSocket URL must be in the format ws(s)://address:port");
     }
     addr = result[1];
     port = parseInt(result[2], 10);
    }
   } else {
    try {
     var runtimeConfig = Module["websocket"] && "object" === typeof Module["websocket"];
     var url = "ws:#".replace("#", "//");
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["url"]) {
       url = Module["websocket"]["url"];
      }
     }
     if (url === "ws://" || url === "wss://") {
      var parts = addr.split("/");
      url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/");
     }
     var subProtocols = "binary";
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["subprotocol"]) {
       subProtocols = Module["websocket"]["subprotocol"];
      }
     }
     var opts = undefined;
     if (subProtocols !== "null") {
      subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
      opts = subProtocols;
     }
     if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
      subProtocols = "null";
      opts = undefined;
     }
     var WebSocketConstructor;
     {
      WebSocketConstructor = WebSocket;
     }
     ws = new WebSocketConstructor(url, opts);
     ws.binaryType = "arraybuffer";
    } catch (e) {
     throw new FS.ErrnoError(23);
    }
   }
   var peer = {
    addr: addr,
    port: port,
    socket: ws,
    dgram_send_queue: []
   };
   SOCKFS.websocket_sock_ops.addPeer(sock, peer);
   SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
   if (sock.type === 2 && typeof sock.sport != "undefined") {
    peer.dgram_send_queue.push(new Uint8Array([ 255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (sock.sport & 65280) >> 8, sock.sport & 255 ]));
   }
   return peer;
  },
  getPeer(sock, addr, port) {
   return sock.peers[addr + ":" + port];
  },
  addPeer(sock, peer) {
   sock.peers[peer.addr + ":" + peer.port] = peer;
  },
  removePeer(sock, peer) {
   delete sock.peers[peer.addr + ":" + peer.port];
  },
  handlePeerEvents(sock, peer) {
   var first = true;
   var handleOpen = function() {
    Module["websocket"].emit("open", sock.stream.fd);
    try {
     var queued = peer.dgram_send_queue.shift();
     while (queued) {
      peer.socket.send(queued);
      queued = peer.dgram_send_queue.shift();
     }
    } catch (e) {
     peer.socket.close();
    }
   };
   function handleMessage(data) {
    if (typeof data == "string") {
     var encoder = new TextEncoder;
     data = encoder.encode(data);
    } else {
     assert(data.byteLength !== undefined);
     if (data.byteLength == 0) {
      return;
     }
     data = new Uint8Array(data);
    }
    var wasfirst = first;
    first = false;
    if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
     var newport = data[8] << 8 | data[9];
     SOCKFS.websocket_sock_ops.removePeer(sock, peer);
     peer.port = newport;
     SOCKFS.websocket_sock_ops.addPeer(sock, peer);
     return;
    }
    sock.recv_queue.push({
     addr: peer.addr,
     port: peer.port,
     data: data
    });
    Module["websocket"].emit("message", sock.stream.fd);
   }
   if (ENVIRONMENT_IS_NODE) {
    peer.socket.on("open", handleOpen);
    peer.socket.on("message", (function(data, isBinary) {
     if (!isBinary) {
      return;
     }
     handleMessage(new Uint8Array(data).buffer);
    }));
    peer.socket.on("close", (function() {
     Module["websocket"].emit("close", sock.stream.fd);
    }));
    peer.socket.on("error", (function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    }));
   } else {
    peer.socket.onopen = handleOpen;
    peer.socket.onclose = function() {
     Module["websocket"].emit("close", sock.stream.fd);
    };
    peer.socket.onmessage = function peer_socket_onmessage(event) {
     handleMessage(event.data);
    };
    peer.socket.onerror = function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    };
   }
  },
  poll(sock) {
   if (sock.type === 1 && sock.server) {
    return sock.pending.length ? 64 | 1 : 0;
   }
   var mask = 0;
   var dest = sock.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
   if (sock.recv_queue.length || !dest || dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
    mask |= 64 | 1;
   }
   if (!dest || dest && dest.socket.readyState === dest.socket.OPEN) {
    mask |= 4;
   }
   if (dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
    mask |= 16;
   }
   return mask;
  },
  ioctl(sock, request, arg) {
   switch (request) {
   case 21531:
    var bytes = 0;
    if (sock.recv_queue.length) {
     bytes = sock.recv_queue[0].data.length;
    }
    HEAP32[arg >>> 2] = bytes;
    return 0;

   default:
    return 28;
   }
  },
  close(sock) {
   if (sock.server) {
    try {
     sock.server.close();
    } catch (e) {}
    sock.server = null;
   }
   var peers = Object.keys(sock.peers);
   for (var i = 0; i < peers.length; i++) {
    var peer = sock.peers[peers[i]];
    try {
     peer.socket.close();
    } catch (e) {}
    SOCKFS.websocket_sock_ops.removePeer(sock, peer);
   }
   return 0;
  },
  bind(sock, addr, port) {
   if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
    throw new FS.ErrnoError(28);
   }
   sock.saddr = addr;
   sock.sport = port;
   if (sock.type === 2) {
    if (sock.server) {
     sock.server.close();
     sock.server = null;
    }
    try {
     sock.sock_ops.listen(sock, 0);
    } catch (e) {
     if (!(e.name === "ErrnoError")) throw e;
     if (e.errno !== 138) throw e;
    }
   }
  },
  connect(sock, addr, port) {
   if (sock.server) {
    throw new FS.ErrnoError(138);
   }
   if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
    if (dest) {
     if (dest.socket.readyState === dest.socket.CONNECTING) {
      throw new FS.ErrnoError(7);
     } else {
      throw new FS.ErrnoError(30);
     }
    }
   }
   var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
   sock.daddr = peer.addr;
   sock.dport = peer.port;
   throw new FS.ErrnoError(26);
  },
  listen(sock, backlog) {
   if (!ENVIRONMENT_IS_NODE) {
    throw new FS.ErrnoError(138);
   }
  },
  accept(listensock) {
   if (!listensock.server || !listensock.pending.length) {
    throw new FS.ErrnoError(28);
   }
   var newsock = listensock.pending.shift();
   newsock.stream.flags = listensock.stream.flags;
   return newsock;
  },
  getname(sock, peer) {
   var addr, port;
   if (peer) {
    if (sock.daddr === undefined || sock.dport === undefined) {
     throw new FS.ErrnoError(53);
    }
    addr = sock.daddr;
    port = sock.dport;
   } else {
    addr = sock.saddr || 0;
    port = sock.sport || 0;
   }
   return {
    addr: addr,
    port: port
   };
  },
  sendmsg(sock, buffer, offset, length, addr, port) {
   if (sock.type === 2) {
    if (addr === undefined || port === undefined) {
     addr = sock.daddr;
     port = sock.dport;
    }
    if (addr === undefined || port === undefined) {
     throw new FS.ErrnoError(17);
    }
   } else {
    addr = sock.daddr;
    port = sock.dport;
   }
   var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
   if (sock.type === 1) {
    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
     throw new FS.ErrnoError(53);
    } else if (dest.socket.readyState === dest.socket.CONNECTING) {
     throw new FS.ErrnoError(6);
    }
   }
   if (ArrayBuffer.isView(buffer)) {
    offset += buffer.byteOffset;
    buffer = buffer.buffer;
   }
   var data;
   data = buffer.slice(offset, offset + length);
   if (sock.type === 2) {
    if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
     if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
     }
     dest.dgram_send_queue.push(data);
     return length;
    }
   }
   try {
    dest.socket.send(data);
    return length;
   } catch (e) {
    throw new FS.ErrnoError(28);
   }
  },
  recvmsg(sock, length) {
   if (sock.type === 1 && sock.server) {
    throw new FS.ErrnoError(53);
   }
   var queued = sock.recv_queue.shift();
   if (!queued) {
    if (sock.type === 1) {
     var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
     if (!dest) {
      throw new FS.ErrnoError(53);
     }
     if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      return null;
     }
     throw new FS.ErrnoError(6);
    }
    throw new FS.ErrnoError(6);
   }
   var queuedLength = queued.data.byteLength || queued.data.length;
   var queuedOffset = queued.data.byteOffset || 0;
   var queuedBuffer = queued.data.buffer || queued.data;
   var bytesRead = Math.min(length, queuedLength);
   var res = {
    buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
    addr: queued.addr,
    port: queued.port
   };
   if (sock.type === 1 && bytesRead < queuedLength) {
    var bytesRemaining = queuedLength - bytesRead;
    queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
    sock.recv_queue.unshift(queued);
   }
   return res;
  }
 }
};

function getSocketFromFD(fd) {
 var socket = SOCKFS.getSocket(fd);
 if (!socket) throw new FS.ErrnoError(8);
 return socket;
}

var setErrNo = value => {
 HEAP32[___errno_location() >>> 2] = value;
 return value;
};

var Sockets = {
 BUFFER_SIZE: 10240,
 MAX_BUFFER_SIZE: 10485760,
 nextFd: 1,
 fds: {},
 nextport: 1,
 maxport: 65535,
 peer: null,
 connections: {},
 portmap: {},
 localAddr: 4261412874,
 addrPool: [ 33554442, 50331658, 67108874, 83886090, 100663306, 117440522, 134217738, 150994954, 167772170, 184549386, 201326602, 218103818, 234881034 ]
};

var inetPton4 = str => {
 var b = str.split(".");
 for (var i = 0; i < 4; i++) {
  var tmp = Number(b[i]);
  if (isNaN(tmp)) return null;
  b[i] = tmp;
 }
 return (b[0] | b[1] << 8 | b[2] << 16 | b[3] << 24) >>> 0;
};

var jstoi_q = str => parseInt(str);

var inetPton6 = str => {
 var words;
 var w, offset, z, i;
 var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
 var parts = [];
 if (!valid6regx.test(str)) {
  return null;
 }
 if (str === "::") {
  return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
 }
 if (str.startsWith("::")) {
  str = str.replace("::", "Z:");
 } else {
  str = str.replace("::", ":Z:");
 }
 if (str.indexOf(".") > 0) {
  str = str.replace(new RegExp("[.]", "g"), ":");
  words = str.split(":");
  words[words.length - 4] = jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256;
  words[words.length - 3] = jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256;
  words = words.slice(0, words.length - 2);
 } else {
  words = str.split(":");
 }
 offset = 0;
 z = 0;
 for (w = 0; w < words.length; w++) {
  if (typeof words[w] == "string") {
   if (words[w] === "Z") {
    for (z = 0; z < 8 - words.length + 1; z++) {
     parts[w + z] = 0;
    }
    offset = z - 1;
   } else {
    parts[w + offset] = _htons(parseInt(words[w], 16));
   }
  } else {
   parts[w + offset] = words[w];
  }
 }
 return [ parts[1] << 16 | parts[0], parts[3] << 16 | parts[2], parts[5] << 16 | parts[4], parts[7] << 16 | parts[6] ];
};

var writeSockaddr = (sa, family, addr, port, addrlen) => {
 switch (family) {
 case 2:
  addr = inetPton4(addr);
  zeroMemory(sa, 16);
  if (addrlen) {
   HEAP32[addrlen >>> 2] = 16;
  }
  HEAP16[sa >>> 1] = family;
  HEAP32[sa + 4 >>> 2] = addr;
  HEAP16[sa + 2 >>> 1] = _htons(port);
  break;

 case 10:
  addr = inetPton6(addr);
  zeroMemory(sa, 28);
  if (addrlen) {
   HEAP32[addrlen >>> 2] = 28;
  }
  HEAP32[sa >>> 2] = family;
  HEAP32[sa + 8 >>> 2] = addr[0];
  HEAP32[sa + 12 >>> 2] = addr[1];
  HEAP32[sa + 16 >>> 2] = addr[2];
  HEAP32[sa + 20 >>> 2] = addr[3];
  HEAP16[sa + 2 >>> 1] = _htons(port);
  break;

 default:
  return 5;
 }
 return 0;
};

var DNS = {
 address_map: {
  id: 1,
  addrs: {},
  names: {}
 },
 lookup_name: name => {
  var res = inetPton4(name);
  if (res !== null) {
   return name;
  }
  res = inetPton6(name);
  if (res !== null) {
   return name;
  }
  var addr;
  if (DNS.address_map.addrs[name]) {
   addr = DNS.address_map.addrs[name];
  } else {
   var id = DNS.address_map.id++;
   assert(id < 65535, "exceeded max address mappings of 65535");
   addr = "172.29." + (id & 255) + "." + (id & 65280);
   DNS.address_map.names[addr] = name;
   DNS.address_map.addrs[name] = addr;
  }
  return addr;
 },
 lookup_addr: addr => {
  if (DNS.address_map.names[addr]) {
   return DNS.address_map.names[addr];
  }
  return null;
 }
};

function ___syscall_accept4(fd, addr, addrlen, flags, d1, d2) {
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var newsock = sock.sock_ops.accept(sock);
  if (addr) {
   var errno = writeSockaddr(addr, newsock.family, DNS.lookup_name(newsock.daddr), newsock.dport, addrlen);
   assert(!errno);
  }
  return newsock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var inetNtop4 = addr => (addr & 255) + "." + (addr >> 8 & 255) + "." + (addr >> 16 & 255) + "." + (addr >> 24 & 255);

var inetNtop6 = ints => {
 var str = "";
 var word = 0;
 var longest = 0;
 var lastzero = 0;
 var zstart = 0;
 var len = 0;
 var i = 0;
 var parts = [ ints[0] & 65535, ints[0] >> 16, ints[1] & 65535, ints[1] >> 16, ints[2] & 65535, ints[2] >> 16, ints[3] & 65535, ints[3] >> 16 ];
 var hasipv4 = true;
 var v4part = "";
 for (i = 0; i < 5; i++) {
  if (parts[i] !== 0) {
   hasipv4 = false;
   break;
  }
 }
 if (hasipv4) {
  v4part = inetNtop4(parts[6] | parts[7] << 16);
  if (parts[5] === -1) {
   str = "::ffff:";
   str += v4part;
   return str;
  }
  if (parts[5] === 0) {
   str = "::";
   if (v4part === "0.0.0.0") v4part = "";
   if (v4part === "0.0.0.1") v4part = "1";
   str += v4part;
   return str;
  }
 }
 for (word = 0; word < 8; word++) {
  if (parts[word] === 0) {
   if (word - lastzero > 1) {
    len = 0;
   }
   lastzero = word;
   len++;
  }
  if (len > longest) {
   longest = len;
   zstart = word - longest + 1;
  }
 }
 for (word = 0; word < 8; word++) {
  if (longest > 1) {
   if (parts[word] === 0 && word >= zstart && word < zstart + longest) {
    if (word === zstart) {
     str += ":";
     if (zstart === 0) str += ":";
    }
    continue;
   }
  }
  str += Number(_ntohs(parts[word] & 65535)).toString(16);
  str += word < 7 ? ":" : "";
 }
 return str;
};

var readSockaddr = (sa, salen) => {
 var family = HEAP16[sa >>> 1];
 var port = _ntohs(HEAPU16[sa + 2 >>> 1]);
 var addr;
 switch (family) {
 case 2:
  if (salen !== 16) {
   return {
    errno: 28
   };
  }
  addr = HEAP32[sa + 4 >>> 2];
  addr = inetNtop4(addr);
  break;

 case 10:
  if (salen !== 28) {
   return {
    errno: 28
   };
  }
  addr = [ HEAP32[sa + 8 >>> 2], HEAP32[sa + 12 >>> 2], HEAP32[sa + 16 >>> 2], HEAP32[sa + 20 >>> 2] ];
  addr = inetNtop6(addr);
  break;

 default:
  return {
   errno: 5
  };
 }
 return {
  family: family,
  addr: addr,
  port: port
 };
};

function getSocketAddress(addrp, addrlen, allowNull) {
 if (allowNull && addrp === 0) return null;
 var info = readSockaddr(addrp, addrlen);
 if (info.errno) throw new FS.ErrnoError(info.errno);
 info.addr = DNS.lookup_addr(info.addr) || info.addr;
 return info;
}

function ___syscall_bind(fd, addr, addrlen, d1, d2, d3) {
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.bind(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_chdir(path) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  FS.chdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_chmod(path, mode) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.connect(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_dup(fd) {
 try {
  var old = SYSCALLS.getStreamFromFD(fd);
  return FS.createStream(old).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_dup3(fd, newfd, flags) {
 try {
  var old = SYSCALLS.getStreamFromFD(fd);
  assert(!flags);
  if (old.fd === newfd) return -28;
  var existing = FS.getStream(newfd);
  if (existing) FS.close(existing);
  return FS.createStream(old, newfd).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_faccessat(dirfd, path, amode, flags) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (amode & ~7) {
   return -28;
  }
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fallocate(fd, mode, offset_low, offset_high, len_low, len_high) {
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 var len = convertI32PairToI53Checked(len_low, len_high);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  assert(mode === 0);
  FS.allocate(stream, offset, len);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fchmod(fd, mode) {
 try {
  FS.fchmod(fd, mode);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fchown32(fd, owner, group) {
 try {
  FS.fchown(fd, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fchownat(dirfd, path, owner, group, flags) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  flags = flags & ~256;
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path);
  (nofollow ? FS.lchown : FS.chown)(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fcntl64(fd, cmd, varargs) {
 varargs >>>= 0;
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.createStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 5:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    HEAP16[arg + offset >>> 1] = 2;
    return 0;
   }

  case 6:
  case 7:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fdatasync(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fstat64(fd, buf) {
 buf >>>= 0;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ftruncate64(fd, length_low, length_high) {
 var length = convertI32PairToI53Checked(length_low, length_high);
 try {
  if (isNaN(length)) return 61;
  FS.ftruncate(fd, length);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function ___syscall_getcwd(buf, size) {
 buf >>>= 0;
 size >>>= 0;
 try {
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
  if (size < cwdLengthInBytes) return -68;
  stringToUTF8(cwd, buf, size);
  return cwdLengthInBytes;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getdents64(fd, dirp, count) {
 dirp >>>= 0;
 count >>>= 0;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name === ".") {
    id = stream.node.id;
    type = 4;
   } else if (name === "..") {
    var lookup = FS.lookupPath(stream.path, {
     parent: true
    });
    id = lookup.node.id;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
   }
   assert(id);
   tempI64 = [ id >>> 0, (tempDouble = id, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos >>> 2] = tempI64[0], HEAP32[dirp + pos + 4 >>> 2] = tempI64[1];
   tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
   +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos + 8 >>> 2] = tempI64[0], HEAP32[dirp + pos + 12 >>> 2] = tempI64[1];
   HEAP16[dirp + pos + 16 >>> 1] = 280;
   HEAP8[dirp + pos + 18 >>> 0] = type;
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getpeername(fd, addr, addrlen, d1, d2, d3) {
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  if (!sock.daddr) {
   return -53;
  }
  var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.daddr), sock.dport, addrlen);
  assert(!errno);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getsockname(fd, addr, addrlen, d1, d2, d3) {
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || "0.0.0.0"), sock.sport, addrlen);
  assert(!errno);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getsockopt(fd, level, optname, optval, optlen, d1) {
 optval >>>= 0;
 optlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  if (level === 1) {
   if (optname === 4) {
    HEAP32[optval >>> 2] = sock.error;
    HEAP32[optlen >>> 2] = 4;
    sock.error = null;
    return 0;
   }
  }
  return -50;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 varargs >>>= 0;
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21505:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcgets) {
     var termios = stream.tty.ops.ioctl_tcgets(stream);
     var argp = SYSCALLS.get();
     HEAP32[argp >>> 2] = termios.c_iflag || 0;
     HEAP32[argp + 4 >>> 2] = termios.c_oflag || 0;
     HEAP32[argp + 8 >>> 2] = termios.c_cflag || 0;
     HEAP32[argp + 12 >>> 2] = termios.c_lflag || 0;
     for (var i = 0; i < 32; i++) {
      HEAP8[argp + i + 17 >>> 0] = termios.c_cc[i] || 0;
     }
     return 0;
    }
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcsets) {
     var argp = SYSCALLS.get();
     var c_iflag = HEAP32[argp >>> 2];
     var c_oflag = HEAP32[argp + 4 >>> 2];
     var c_cflag = HEAP32[argp + 8 >>> 2];
     var c_lflag = HEAP32[argp + 12 >>> 2];
     var c_cc = [];
     for (var i = 0; i < 32; i++) {
      c_cc.push(HEAP8[argp + i + 17 >>> 0]);
     }
     return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
      c_iflag: c_iflag,
      c_oflag: c_oflag,
      c_cflag: c_cflag,
      c_lflag: c_lflag,
      c_cc: c_cc
     });
    }
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    HEAP32[argp >>> 2] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tiocgwinsz) {
     var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
     var argp = SYSCALLS.get();
     HEAP16[argp >>> 1] = winsize[0];
     HEAP16[argp + 2 >>> 1] = winsize[1];
    }
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21515:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_listen(fd, backlog) {
 try {
  var sock = getSocketFromFD(fd);
  sock.sock_ops.listen(sock, backlog);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_lstat64(path, buf) {
 path >>>= 0;
 buf >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_mkdirat(dirfd, path, mode) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
 path >>>= 0;
 buf >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  var allowEmpty = flags & 4096;
  flags = flags & ~6400;
  assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
  path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 path >>>= 0;
 varargs >>>= 0;
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var PIPEFS = {
 BUCKET_BUFFER_SIZE: 8192,
 mount(mount) {
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createPipe() {
  var pipe = {
   buckets: [],
   refcnt: 2
  };
  pipe.buckets.push({
   buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
   offset: 0,
   roffset: 0
  });
  var rName = PIPEFS.nextname();
  var wName = PIPEFS.nextname();
  var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
  var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  rNode.pipe = pipe;
  wNode.pipe = pipe;
  var readableStream = FS.createStream({
   path: rName,
   node: rNode,
   flags: 0,
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  rNode.stream = readableStream;
  var writableStream = FS.createStream({
   path: wName,
   node: wNode,
   flags: 1,
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  wNode.stream = writableStream;
  return {
   readable_fd: readableStream.fd,
   writable_fd: writableStream.fd
  };
 },
 stream_ops: {
  poll(stream) {
   var pipe = stream.node.pipe;
   if ((stream.flags & 2097155) === 1) {
    return 256 | 4;
   }
   if (pipe.buckets.length > 0) {
    for (var i = 0; i < pipe.buckets.length; i++) {
     var bucket = pipe.buckets[i];
     if (bucket.offset - bucket.roffset > 0) {
      return 64 | 1;
     }
    }
   }
   return 0;
  },
  ioctl(stream, request, varargs) {
   return 28;
  },
  fsync(stream) {
   return 28;
  },
  read(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   var currentLength = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var bucket = pipe.buckets[i];
    currentLength += bucket.offset - bucket.roffset;
   }
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   if (length <= 0) {
    return 0;
   }
   if (currentLength == 0) {
    throw new FS.ErrnoError(6);
   }
   var toRead = Math.min(currentLength, length);
   var totalRead = toRead;
   var toRemove = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var currBucket = pipe.buckets[i];
    var bucketSize = currBucket.offset - currBucket.roffset;
    if (toRead <= bucketSize) {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     if (toRead < bucketSize) {
      tmpSlice = tmpSlice.subarray(0, toRead);
      currBucket.roffset += toRead;
     } else {
      toRemove++;
     }
     data.set(tmpSlice);
     break;
    } else {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     data.set(tmpSlice);
     data = data.subarray(tmpSlice.byteLength);
     toRead -= tmpSlice.byteLength;
     toRemove++;
    }
   }
   if (toRemove && toRemove == pipe.buckets.length) {
    toRemove--;
    pipe.buckets[toRemove].offset = 0;
    pipe.buckets[toRemove].roffset = 0;
   }
   pipe.buckets.splice(0, toRemove);
   return totalRead;
  },
  write(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   var dataLen = data.byteLength;
   if (dataLen <= 0) {
    return 0;
   }
   var currBucket = null;
   if (pipe.buckets.length == 0) {
    currBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: 0,
     roffset: 0
    };
    pipe.buckets.push(currBucket);
   } else {
    currBucket = pipe.buckets[pipe.buckets.length - 1];
   }
   assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
   var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
   if (freeBytesInCurrBuffer >= dataLen) {
    currBucket.buffer.set(data, currBucket.offset);
    currBucket.offset += dataLen;
    return dataLen;
   } else if (freeBytesInCurrBuffer > 0) {
    currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
    currBucket.offset += freeBytesInCurrBuffer;
    data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
   }
   var numBuckets = data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE | 0;
   var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
   for (var i = 0; i < numBuckets; i++) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: PIPEFS.BUCKET_BUFFER_SIZE,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
    data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
   }
   if (remElements > 0) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: data.byteLength,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data);
   }
   return dataLen;
  },
  close(stream) {
   var pipe = stream.node.pipe;
   pipe.refcnt--;
   if (pipe.refcnt === 0) {
    pipe.buckets = null;
   }
  }
 },
 nextname() {
  if (!PIPEFS.nextname.current) {
   PIPEFS.nextname.current = 0;
  }
  return "pipe[" + PIPEFS.nextname.current++ + "]";
 }
};

function ___syscall_pipe(fdPtr) {
 fdPtr >>>= 0;
 try {
  if (fdPtr == 0) {
   throw new FS.ErrnoError(21);
  }
  var res = PIPEFS.createPipe();
  HEAP32[fdPtr >>> 2] = res.readable_fd;
  HEAP32[fdPtr + 4 >>> 2] = res.writable_fd;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_poll(fds, nfds, timeout) {
 fds >>>= 0;
 try {
  var nonzero = 0;
  for (var i = 0; i < nfds; i++) {
   var pollfd = fds + 8 * i;
   var fd = HEAP32[pollfd >>> 2];
   var events = HEAP16[pollfd + 4 >>> 1];
   var mask = 32;
   var stream = FS.getStream(fd);
   if (stream) {
    mask = SYSCALLS.DEFAULT_POLLMASK;
    if (stream.stream_ops.poll) {
     mask = stream.stream_ops.poll(stream, -1);
    }
   }
   mask &= events | 8 | 16;
   if (mask) nonzero++;
   HEAP16[pollfd + 6 >>> 1] = mask;
  }
  return nonzero;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
 path >>>= 0;
 buf >>>= 0;
 bufsize >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len >>> 0];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len >>> 0] = endChar;
  return len;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_recvfrom(fd, buf, len, flags, addr, addrlen) {
 buf >>>= 0;
 len >>>= 0;
 addr >>>= 0;
 addrlen >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var msg = sock.sock_ops.recvmsg(sock, len);
  if (!msg) return 0;
  if (addr) {
   var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port, addrlen);
   assert(!errno);
  }
  HEAPU8.set(msg.buffer, buf >>> 0);
  return msg.buffer.byteLength;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
 oldpath >>>= 0;
 newpath >>>= 0;
 try {
  oldpath = SYSCALLS.getStr(oldpath);
  newpath = SYSCALLS.getStr(newpath);
  oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
  newpath = SYSCALLS.calculateAt(newdirfd, newpath);
  FS.rename(oldpath, newpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_rmdir(path) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
 message >>>= 0;
 length >>>= 0;
 addr >>>= 0;
 addr_len >>>= 0;
 try {
  var sock = getSocketFromFD(fd);
  var dest = getSocketAddress(addr, addr_len, true);
  if (!dest) {
   return FS.write(sock.stream, HEAP8, message, length);
  }
  return sock.sock_ops.sendmsg(sock, HEAP8, message, length, dest.addr, dest.port);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_socket(domain, type, protocol) {
 try {
  var sock = SOCKFS.createSocket(domain, type, protocol);
  assert(sock.stream.fd < 64);
  return sock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_stat64(path, buf) {
 path >>>= 0;
 buf >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_statfs64(path, size, buf) {
 path >>>= 0;
 size >>>= 0;
 buf >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  assert(size === 64);
  HEAP32[buf + 4 >>> 2] = 4096;
  HEAP32[buf + 40 >>> 2] = 4096;
  HEAP32[buf + 8 >>> 2] = 1e6;
  HEAP32[buf + 12 >>> 2] = 5e5;
  HEAP32[buf + 16 >>> 2] = 5e5;
  HEAP32[buf + 20 >>> 2] = FS.nextInode;
  HEAP32[buf + 24 >>> 2] = 1e6;
  HEAP32[buf + 28 >>> 2] = 42;
  HEAP32[buf + 44 >>> 2] = 2;
  HEAP32[buf + 36 >>> 2] = 255;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_symlink(target, linkpath) {
 target >>>= 0;
 linkpath >>>= 0;
 try {
  target = SYSCALLS.getStr(target);
  linkpath = SYSCALLS.getStr(linkpath);
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_unlinkat(dirfd, path, flags) {
 path >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (flags === 0) {
   FS.unlink(path);
  } else if (flags === 512) {
   FS.rmdir(path);
  } else {
   abort("Invalid flags passed to unlinkat");
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function readI53FromI64(ptr) {
 return HEAPU32[ptr >>> 2] + HEAP32[ptr + 4 >>> 2] * 4294967296;
}

function ___syscall_utimensat(dirfd, path, times, flags) {
 path >>>= 0;
 times >>>= 0;
 try {
  path = SYSCALLS.getStr(path);
  assert(flags === 0);
  path = SYSCALLS.calculateAt(dirfd, path, true);
  if (!times) {
   var atime = Date.now();
   var mtime = atime;
  } else {
   var seconds = readI53FromI64(times);
   var nanoseconds = HEAP32[times + 8 >>> 2];
   atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
   times += 16;
   seconds = readI53FromI64(times);
   nanoseconds = HEAP32[times + 8 >>> 2];
   mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  }
  FS.utime(path, atime, mtime);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var nowIsMonotonic = true;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var __emscripten_throw_longjmp = () => {
 throw Infinity;
};

function __gmtime_js(time_low, time_high, tmPtr) {
 var time = convertI32PairToI53Checked(time_low, time_high);
 tmPtr >>>= 0;
 var date = new Date(time * 1e3);
 HEAP32[tmPtr >>> 2] = date.getUTCSeconds();
 HEAP32[tmPtr + 4 >>> 2] = date.getUTCMinutes();
 HEAP32[tmPtr + 8 >>> 2] = date.getUTCHours();
 HEAP32[tmPtr + 12 >>> 2] = date.getUTCDate();
 HEAP32[tmPtr + 16 >>> 2] = date.getUTCMonth();
 HEAP32[tmPtr + 20 >>> 2] = date.getUTCFullYear() - 1900;
 HEAP32[tmPtr + 24 >>> 2] = date.getUTCDay();
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
 HEAP32[tmPtr + 28 >>> 2] = yday;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
};

function __localtime_js(time_low, time_high, tmPtr) {
 var time = convertI32PairToI53Checked(time_low, time_high);
 tmPtr >>>= 0;
 var date = new Date(time * 1e3);
 HEAP32[tmPtr >>> 2] = date.getSeconds();
 HEAP32[tmPtr + 4 >>> 2] = date.getMinutes();
 HEAP32[tmPtr + 8 >>> 2] = date.getHours();
 HEAP32[tmPtr + 12 >>> 2] = date.getDate();
 HEAP32[tmPtr + 16 >>> 2] = date.getMonth();
 HEAP32[tmPtr + 20 >>> 2] = date.getFullYear() - 1900;
 HEAP32[tmPtr + 24 >>> 2] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[tmPtr + 28 >>> 2] = yday;
 HEAP32[tmPtr + 36 >>> 2] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[tmPtr + 32 >>> 2] = dst;
}

var __mktime_js = function(tmPtr) {
 tmPtr >>>= 0;
 var ret = (() => {
  var date = new Date(HEAP32[tmPtr + 20 >>> 2] + 1900, HEAP32[tmPtr + 16 >>> 2], HEAP32[tmPtr + 12 >>> 2], HEAP32[tmPtr + 8 >>> 2], HEAP32[tmPtr + 4 >>> 2], HEAP32[tmPtr >>> 2], 0);
  var dst = HEAP32[tmPtr + 32 >>> 2];
  var guessedOffset = date.getTimezoneOffset();
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dstOffset = Math.min(winterOffset, summerOffset);
  if (dst < 0) {
   HEAP32[tmPtr + 32 >>> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
  } else if (dst > 0 != (dstOffset == guessedOffset)) {
   var nonDstOffset = Math.max(winterOffset, summerOffset);
   var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
   date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
  }
  HEAP32[tmPtr + 24 >>> 2] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[tmPtr + 28 >>> 2] = yday;
  HEAP32[tmPtr >>> 2] = date.getSeconds();
  HEAP32[tmPtr + 4 >>> 2] = date.getMinutes();
  HEAP32[tmPtr + 8 >>> 2] = date.getHours();
  HEAP32[tmPtr + 12 >>> 2] = date.getDate();
  HEAP32[tmPtr + 16 >>> 2] = date.getMonth();
  HEAP32[tmPtr + 20 >>> 2] = date.getYear();
  return date.getTime() / 1e3;
 })();
 return setTempRet0((tempDouble = ret, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)), 
 ret >>> 0;
};

function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
 len >>>= 0;
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 allocated >>>= 0;
 addr >>>= 0;
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  var res = FS.mmap(stream, len, offset, prot, flags);
  var ptr = res.ptr;
  HEAP32[allocated >>> 2] = res.allocated;
  HEAPU32[addr >>> 2] = ptr;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
 addr >>>= 0;
 len >>>= 0;
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (prot & 2) {
   SYSCALLS.doMsync(addr, stream, len, flags, offset);
  }
  FS.munmap(stream);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var timers = {};

var handleException = e => {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 checkStackCookie();
 if (e instanceof WebAssembly.RuntimeError) {
  if (_emscripten_stack_get_current() <= 0) {
   err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)");
  }
 }
 quit_(1, e);
};

var _proc_exit = code => {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  if (Module["onExit"]) Module["onExit"](code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
};

var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 if (!keepRuntimeAlive()) {
  exitRuntime();
 }
 if (keepRuntimeAlive() && !implicit) {
  var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
  readyPromiseReject(msg);
  err(msg);
 }
 _proc_exit(status);
};

var _exit = exitJS;

var maybeExit = () => {
 if (runtimeExited) {
  return;
 }
 if (!keepRuntimeAlive()) {
  try {
   _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
};

var callUserCallback = func => {
 if (runtimeExited || ABORT) {
  err("user callback triggered after runtime exited or application aborted.  Ignoring.");
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
};

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

var __setitimer_js = (which, timeout_ms) => {
 if (timers[which]) {
  clearTimeout(timers[which].id);
  delete timers[which];
 }
 if (!timeout_ms) return 0;
 var id = setTimeout((() => {
  assert(which in timers);
  delete timers[which];
  callUserCallback((() => __emscripten_timeout(which, _emscripten_get_now())));
 }), timeout_ms);
 timers[which] = {
  id: id,
  timeout_ms: timeout_ms
 };
 return 0;
};

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

function __tzset_js(timezone, daylight, tzname) {
 timezone >>>= 0;
 daylight >>>= 0;
 tzname >>>= 0;
 var currentYear = (new Date).getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 HEAPU32[timezone >>> 2] = stdTimezoneOffset * 60;
 HEAP32[daylight >>> 2] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = stringToNewUTF8(winterName);
 var summerNamePtr = stringToNewUTF8(summerName);
 if (summerOffset < winterOffset) {
  HEAPU32[tzname >>> 2] = winterNamePtr;
  HEAPU32[tzname + 4 >>> 2] = summerNamePtr;
 } else {
  HEAPU32[tzname >>> 2] = summerNamePtr;
  HEAPU32[tzname + 4 >>> 2] = winterNamePtr;
 }
}

var _abort = () => {
 abort("native code called abort()");
};

var readEmAsmArgsArray = [];

var readEmAsmArgs = (sigPtr, buf) => {
 assert(Array.isArray(readEmAsmArgsArray));
 assert(buf % 16 == 0);
 readEmAsmArgsArray.length = 0;
 var ch;
 buf >>= 2;
 while (ch = HEAPU8[sigPtr++ >>> 0]) {
  var chr = String.fromCharCode(ch);
  var validChars = [ "d", "f", "i" ];
  assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
  buf += ch != 105 & buf;
  readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf >>> 0] : HEAPF64[buf++ >>> 1]);
  ++buf;
 }
 return readEmAsmArgsArray;
};

var runEmAsmFunction = (code, sigPtr, argbuf) => {
 var args = readEmAsmArgs(sigPtr, argbuf);
 if (!ASM_CONSTS.hasOwnProperty(code)) abort(`No EM_ASM constant found at address ${code}`);
 return ASM_CONSTS[code].apply(null, args);
};

function _emscripten_asm_const_int(code, sigPtr, argbuf) {
 code >>>= 0;
 sigPtr >>>= 0;
 argbuf >>>= 0;
 return runEmAsmFunction(code, sigPtr, argbuf);
}

function _emscripten_asm_const_ptr(code, sigPtr, argbuf) {
 code >>>= 0;
 sigPtr >>>= 0;
 argbuf >>>= 0;
 return runEmAsmFunction(code, sigPtr, argbuf);
}

function _emscripten_console_error(str) {
 str >>>= 0;
 assert(typeof str == "number");
 console.error(UTF8ToString(str));
}

function _emscripten_date_now() {
 return Date.now();
}

var getHeapMax = () => 4294901760;

function _emscripten_get_heap_max() {
 return getHeapMax();
}

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = size - b.byteLength + 65535 >>> 16;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } catch (e) {
  err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
 }
};

function _emscripten_resize_heap(requestedSize) {
 requestedSize >>>= 0;
 var oldSize = HEAPU8.length;
 assert(requestedSize > oldSize);
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  err(`Cannot enlarge memory, asked to go up to ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
 return false;
}

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
 if (!getEnvStrings.strings) {
  var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(`${x}=${env[x]}`);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
 for (var i = 0; i < str.length; ++i) {
  assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
  HEAP8[buffer++ >>> 0] = str.charCodeAt(i);
 }
 HEAP8[buffer >>> 0] = 0;
};

function _environ_get(__environ, environ_buf) {
 __environ >>>= 0;
 environ_buf >>>= 0;
 var bufSize = 0;
 getEnvStrings().forEach((function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAPU32[__environ + i * 4 >>> 2] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 }));
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 penviron_count >>>= 0;
 penviron_buf_size >>>= 0;
 var strings = getEnvStrings();
 HEAPU32[penviron_count >>> 2] = strings.length;
 var bufSize = 0;
 strings.forEach((function(string) {
  bufSize += string.length + 1;
 }));
 HEAPU32[penviron_buf_size >>> 2] = bufSize;
 return 0;
}

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_fdstat_get(fd, pbuf) {
 pbuf >>>= 0;
 try {
  var rightsBase = 0;
  var rightsInheriting = 0;
  var flags = 0;
  {
   var stream = SYSCALLS.getStreamFromFD(fd);
   var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
  }
  HEAP8[pbuf >>> 0] = type;
  HEAP16[pbuf + 2 >>> 1] = flags;
  tempI64 = [ rightsBase >>> 0, (tempDouble = rightsBase, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[pbuf + 8 >>> 2] = tempI64[0], HEAP32[pbuf + 12 >>> 2] = tempI64[1];
  tempI64 = [ rightsInheriting >>> 0, (tempDouble = rightsInheriting, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[pbuf + 16 >>> 2] = tempI64[0], HEAP32[pbuf + 20 >>> 2] = tempI64[1];
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var doReadv = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >>> 2];
  var len = HEAPU32[iov + 4 >>> 2];
  iov += 8;
  var curr = FS.read(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
 iov >>>= 0;
 iovcnt >>>= 0;
 pnum >>>= 0;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  HEAPU32[pnum >>> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 newOffset >>>= 0;
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[newOffset >>> 2] = tempI64[0], HEAP32[newOffset + 4 >>> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_sync(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return Asyncify.handleSleep((function(wakeUp) {
   var mount = stream.node.mount;
   if (!mount.type.syncfs) {
    wakeUp(0);
    return;
   }
   mount.type.syncfs(mount, false, (function(err) {
    if (err) {
     wakeUp((function() {
      return 29;
     }));
     return;
    }
    wakeUp(0);
   }));
  }));
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var doWritev = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >>> 2];
  var len = HEAPU32[iov + 4 >>> 2];
  iov += 8;
  var curr = FS.write(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_write(fd, iov, iovcnt, pnum) {
 iov >>>= 0;
 iovcnt >>>= 0;
 pnum >>>= 0;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  HEAPU32[pnum >>> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _getaddrinfo(node, service, hint, out) {
 node >>>= 0;
 service >>>= 0;
 hint >>>= 0;
 out >>>= 0;
 var addrs = [];
 var canon = null;
 var addr = 0;
 var port = 0;
 var flags = 0;
 var family = 0;
 var type = 0;
 var proto = 0;
 var ai, last;
 function allocaddrinfo(family, type, proto, canon, addr, port) {
  var sa, salen, ai;
  var errno;
  salen = family === 10 ? 28 : 16;
  addr = family === 10 ? inetNtop6(addr) : inetNtop4(addr);
  sa = _malloc(salen);
  errno = writeSockaddr(sa, family, addr, port);
  assert(!errno);
  ai = _malloc(32);
  HEAP32[ai + 4 >>> 2] = family;
  HEAP32[ai + 8 >>> 2] = type;
  HEAP32[ai + 12 >>> 2] = proto;
  HEAPU32[ai + 24 >>> 2] = canon;
  HEAPU32[ai + 20 >>> 2] = sa;
  if (family === 10) {
   HEAP32[ai + 16 >>> 2] = 28;
  } else {
   HEAP32[ai + 16 >>> 2] = 16;
  }
  HEAP32[ai + 28 >>> 2] = 0;
  return ai;
 }
 if (hint) {
  flags = HEAP32[hint >>> 2];
  family = HEAP32[hint + 4 >>> 2];
  type = HEAP32[hint + 8 >>> 2];
  proto = HEAP32[hint + 12 >>> 2];
 }
 if (type && !proto) {
  proto = type === 2 ? 17 : 6;
 }
 if (!type && proto) {
  type = proto === 17 ? 2 : 1;
 }
 if (proto === 0) {
  proto = 6;
 }
 if (type === 0) {
  type = 1;
 }
 if (!node && !service) {
  return -2;
 }
 if (flags & ~(1 | 2 | 4 | 1024 | 8 | 16 | 32)) {
  return -1;
 }
 if (hint !== 0 && HEAP32[hint >>> 2] & 2 && !node) {
  return -1;
 }
 if (flags & 32) {
  return -2;
 }
 if (type !== 0 && type !== 1 && type !== 2) {
  return -7;
 }
 if (family !== 0 && family !== 2 && family !== 10) {
  return -6;
 }
 if (service) {
  service = UTF8ToString(service);
  port = parseInt(service, 10);
  if (isNaN(port)) {
   if (flags & 1024) {
    return -2;
   }
   return -8;
  }
 }
 if (!node) {
  if (family === 0) {
   family = 2;
  }
  if ((flags & 1) === 0) {
   if (family === 2) {
    addr = _htonl(2130706433);
   } else {
    addr = [ 0, 0, 0, 1 ];
   }
  }
  ai = allocaddrinfo(family, type, proto, null, addr, port);
  HEAPU32[out >>> 2] = ai;
  return 0;
 }
 node = UTF8ToString(node);
 addr = inetPton4(node);
 if (addr !== null) {
  if (family === 0 || family === 2) {
   family = 2;
  } else if (family === 10 && flags & 8) {
   addr = [ 0, 0, _htonl(65535), addr ];
   family = 10;
  } else {
   return -2;
  }
 } else {
  addr = inetPton6(node);
  if (addr !== null) {
   if (family === 0 || family === 10) {
    family = 10;
   } else {
    return -2;
   }
  }
 }
 if (addr != null) {
  ai = allocaddrinfo(family, type, proto, node, addr, port);
  HEAPU32[out >>> 2] = ai;
  return 0;
 }
 if (flags & 4) {
  return -2;
 }
 node = DNS.lookup_name(node);
 addr = inetPton4(node);
 if (family === 0) {
  family = 2;
 } else if (family === 10) {
  addr = [ 0, 0, _htonl(65535), addr ];
 }
 ai = allocaddrinfo(family, type, proto, null, addr, port);
 HEAPU32[out >>> 2] = ai;
 return 0;
}

function _getcontext() {
 err("missing function: getcontext");
 abort(-1);
}

function _getdtablesize() {
 err("missing function: getdtablesize");
 abort(-1);
}

var getHostByName = name => {
 var ret = _malloc(20);
 var nameBuf = stringToNewUTF8(name);
 HEAPU32[ret >>> 2] = nameBuf;
 var aliasesBuf = _malloc(4);
 HEAPU32[aliasesBuf >>> 2] = 0;
 HEAPU32[ret + 4 >>> 2] = aliasesBuf;
 var afinet = 2;
 HEAP32[ret + 8 >>> 2] = afinet;
 HEAP32[ret + 12 >>> 2] = 4;
 var addrListBuf = _malloc(12);
 HEAPU32[addrListBuf >>> 2] = addrListBuf + 8;
 HEAPU32[addrListBuf + 4 >>> 2] = 0;
 HEAP32[addrListBuf + 8 >>> 2] = inetPton4(DNS.lookup_name(name));
 HEAPU32[ret + 16 >>> 2] = addrListBuf;
 return ret;
};

function _gethostbyname(name) {
 name >>>= 0;
 return getHostByName(UTF8ToString(name));
}

function _gethostbyname_r(name, ret, buf, buflen, out, err) {
 name >>>= 0;
 ret >>>= 0;
 buf >>>= 0;
 buflen >>>= 0;
 out >>>= 0;
 err >>>= 0;
 var data = _gethostbyname(name);
 _memcpy(ret, data, 20);
 _free(data);
 HEAP32[err >>> 2] = 0;
 HEAPU32[out >>> 2] = ret;
 return 0;
}

function _getloadavg(loadavg, nelem) {
 loadavg >>>= 0;
 var limit = Math.min(nelem, 3);
 var doubleSize = 8;
 for (var i = 0; i < limit; i++) {
  HEAPF64[loadavg + i * doubleSize >>> 3] = .1;
 }
 return limit;
}

function _getnameinfo(sa, salen, node, nodelen, serv, servlen, flags) {
 sa >>>= 0;
 node >>>= 0;
 serv >>>= 0;
 var info = readSockaddr(sa, salen);
 if (info.errno) {
  return -6;
 }
 var port = info.port;
 var addr = info.addr;
 var overflowed = false;
 if (node && nodelen) {
  var lookup;
  if (flags & 1 || !(lookup = DNS.lookup_addr(addr))) {
   if (flags & 8) {
    return -2;
   }
  } else {
   addr = lookup;
  }
  var numBytesWrittenExclNull = stringToUTF8(addr, node, nodelen);
  if (numBytesWrittenExclNull + 1 >= nodelen) {
   overflowed = true;
  }
 }
 if (serv && servlen) {
  port = "" + port;
  var numBytesWrittenExclNull = stringToUTF8(port, serv, servlen);
  if (numBytesWrittenExclNull + 1 >= servlen) {
   overflowed = true;
  }
 }
 if (overflowed) {
  return -12;
 }
 return 0;
}

var Protocols = {
 list: [],
 map: {}
};

var _setprotoent = stayopen => {
 function allocprotoent(name, proto, aliases) {
  var nameBuf = _malloc(name.length + 1);
  stringToAscii(name, nameBuf);
  var j = 0;
  var length = aliases.length;
  var aliasListBuf = _malloc((length + 1) * 4);
  for (var i = 0; i < length; i++, j += 4) {
   var alias = aliases[i];
   var aliasBuf = _malloc(alias.length + 1);
   stringToAscii(alias, aliasBuf);
   HEAPU32[aliasListBuf + j >>> 2] = aliasBuf;
  }
  HEAPU32[aliasListBuf + j >>> 2] = 0;
  var pe = _malloc(12);
  HEAPU32[pe >>> 2] = nameBuf;
  HEAPU32[pe + 4 >>> 2] = aliasListBuf;
  HEAP32[pe + 8 >>> 2] = proto;
  return pe;
 }
 var list = Protocols.list;
 var map = Protocols.map;
 if (list.length === 0) {
  var entry = allocprotoent("tcp", 6, [ "TCP" ]);
  list.push(entry);
  map["tcp"] = map["6"] = entry;
  entry = allocprotoent("udp", 17, [ "UDP" ]);
  list.push(entry);
  map["udp"] = map["17"] = entry;
 }
 _setprotoent.index = 0;
};

function _getprotobyname(name) {
 name >>>= 0;
 name = UTF8ToString(name);
 _setprotoent(true);
 var result = Protocols.map[name];
 return result;
}

function _getprotobynumber(number) {
 _setprotoent(true);
 var result = Protocols.map[number];
 return result;
}

function _makecontext() {
 err("missing function: makecontext");
 abort(-1);
}

var arraySum = (array, index) => {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= daysInCurrentMonth - newDate.getDate() + 1;
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
};

var writeArrayToMemory = (array, buffer) => {
 assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
 HEAP8.set(array, buffer >>> 0);
};

function _strftime(s, maxsize, format, tm) {
 s >>>= 0;
 maxsize >>>= 0;
 format >>>= 0;
 tm >>>= 0;
 var tm_zone = HEAP32[tm + 40 >>> 2];
 var date = {
  tm_sec: HEAP32[tm >>> 2],
  tm_min: HEAP32[tm + 4 >>> 2],
  tm_hour: HEAP32[tm + 8 >>> 2],
  tm_mday: HEAP32[tm + 12 >>> 2],
  tm_mon: HEAP32[tm + 16 >>> 2],
  tm_year: HEAP32[tm + 20 >>> 2],
  tm_wday: HEAP32[tm + 24 >>> 2],
  tm_yday: HEAP32[tm + 28 >>> 2],
  tm_isdst: HEAP32[tm + 32 >>> 2],
  tm_gmtoff: HEAP32[tm + 36 >>> 2],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : value || "";
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : value > 0 ? 1 : 0;
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": date => WEEKDAYS[date.tm_wday].substring(0, 3),
  "%A": date => WEEKDAYS[date.tm_wday],
  "%b": date => MONTHS[date.tm_mon].substring(0, 3),
  "%B": date => MONTHS[date.tm_mon],
  "%C": date => {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  },
  "%d": date => leadingNulls(date.tm_mday, 2),
  "%e": date => leadingSomething(date.tm_mday, 2, " "),
  "%g": date => getWeekBasedYear(date).toString().substring(2),
  "%G": date => getWeekBasedYear(date),
  "%H": date => leadingNulls(date.tm_hour, 2),
  "%I": date => {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": date => leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3),
  "%m": date => leadingNulls(date.tm_mon + 1, 2),
  "%M": date => leadingNulls(date.tm_min, 2),
  "%n": () => "\n",
  "%p": date => {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": date => leadingNulls(date.tm_sec, 2),
  "%t": () => "\t",
  "%u": date => date.tm_wday || 7,
  "%U": date => {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": date => {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": date => date.tm_wday,
  "%W": date => {
   var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": date => (date.tm_year + 1900).toString().substring(2),
  "%Y": date => date.tm_year + 1900,
  "%z": date => {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": date => date.tm_zone,
  "%%": () => "%"
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
}

function _strptime(buf, format, tm) {
 buf >>>= 0;
 format >>>= 0;
 tm >>>= 0;
 var pattern = UTF8ToString(format);
 var SPECIAL_CHARS = "\\!@#$^&*()+=-[]/{}|:<>?,.";
 for (var i = 0, ii = SPECIAL_CHARS.length; i < ii; ++i) {
  pattern = pattern.replace(new RegExp("\\" + SPECIAL_CHARS[i], "g"), "\\" + SPECIAL_CHARS[i]);
 }
 var EQUIVALENT_MATCHERS = {
  "%A": "%a",
  "%B": "%b",
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m\\/%d\\/%y",
  "%e": "%d",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%R": "%H\\:%M",
  "%r": "%I\\:%M\\:%S\\s%p",
  "%T": "%H\\:%M\\:%S",
  "%x": "%m\\/%d\\/(?:%y|%Y)",
  "%X": "%H\\:%M\\:%S"
 };
 for (var matcher in EQUIVALENT_MATCHERS) {
  pattern = pattern.replace(matcher, EQUIVALENT_MATCHERS[matcher]);
 }
 var DATE_PATTERNS = {
  "%a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
  "%b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
  "%C": "\\d\\d",
  "%d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
  "%H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
  "%I": "\\d(?!\\d)|0\\d|10|11|12",
  "%j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
  "%m": "0[1-9]|[1-9](?!\\d)|10|11|12",
  "%M": "0\\d|\\d(?!\\d)|[1-5]\\d",
  "%n": "\\s",
  "%p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
  "%S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
  "%U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
  "%W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
  "%w": "[0-6]",
  "%y": "\\d\\d",
  "%Y": "\\d\\d\\d\\d",
  "%%": "%",
  "%t": "\\s"
 };
 var MONTH_NUMBERS = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
 };
 var DAY_NUMBERS_SUN_FIRST = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6
 };
 var DAY_NUMBERS_MON_FIRST = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
 };
 for (var datePattern in DATE_PATTERNS) {
  pattern = pattern.replace(datePattern, "(" + datePattern + DATE_PATTERNS[datePattern] + ")");
 }
 var capture = [];
 for (var i = pattern.indexOf("%"); i >= 0; i = pattern.indexOf("%")) {
  capture.push(pattern[i + 1]);
  pattern = pattern.replace(new RegExp("\\%" + pattern[i + 1], "g"), "");
 }
 var matches = new RegExp("^" + pattern, "i").exec(UTF8ToString(buf));
 function initDate() {
  function fixup(value, min, max) {
   return typeof value != "number" || isNaN(value) ? min : value >= min ? value <= max ? value : max : min;
  }
  return {
   year: fixup(HEAP32[tm + 20 >>> 2] + 1900, 1970, 9999),
   month: fixup(HEAP32[tm + 16 >>> 2], 0, 11),
   day: fixup(HEAP32[tm + 12 >>> 2], 1, 31),
   hour: fixup(HEAP32[tm + 8 >>> 2], 0, 23),
   min: fixup(HEAP32[tm + 4 >>> 2], 0, 59),
   sec: fixup(HEAP32[tm >>> 2], 0, 59)
  };
 }
 if (matches) {
  var date = initDate();
  var value;
  var getMatch = symbol => {
   var pos = capture.indexOf(symbol);
   if (pos >= 0) {
    return matches[pos + 1];
   }
   return;
  };
  if (value = getMatch("S")) {
   date.sec = jstoi_q(value);
  }
  if (value = getMatch("M")) {
   date.min = jstoi_q(value);
  }
  if (value = getMatch("H")) {
   date.hour = jstoi_q(value);
  } else if (value = getMatch("I")) {
   var hour = jstoi_q(value);
   if (value = getMatch("p")) {
    hour += value.toUpperCase()[0] === "P" ? 12 : 0;
   }
   date.hour = hour;
  }
  if (value = getMatch("Y")) {
   date.year = jstoi_q(value);
  } else if (value = getMatch("y")) {
   var year = jstoi_q(value);
   if (value = getMatch("C")) {
    year += jstoi_q(value) * 100;
   } else {
    year += year < 69 ? 2e3 : 1900;
   }
   date.year = year;
  }
  if (value = getMatch("m")) {
   date.month = jstoi_q(value) - 1;
  } else if (value = getMatch("b")) {
   date.month = MONTH_NUMBERS[value.substring(0, 3).toUpperCase()] || 0;
  }
  if (value = getMatch("d")) {
   date.day = jstoi_q(value);
  } else if (value = getMatch("j")) {
   var day = jstoi_q(value);
   var leapYear = isLeapYear(date.year);
   for (var month = 0; month < 12; ++month) {
    var daysUntilMonth = arraySum(leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, month - 1);
    if (day <= daysUntilMonth + (leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[month]) {
     date.day = day - daysUntilMonth;
    }
   }
  } else if (value = getMatch("a")) {
   var weekDay = value.substring(0, 3).toUpperCase();
   if (value = getMatch("U")) {
    var weekDayNumber = DAY_NUMBERS_SUN_FIRST[weekDay];
    var weekNumber = jstoi_q(value);
    var janFirst = new Date(date.year, 0, 1);
    var endDate;
    if (janFirst.getDay() === 0) {
     endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
    } else {
     endDate = addDays(janFirst, 7 - janFirst.getDay() + weekDayNumber + 7 * (weekNumber - 1));
    }
    date.day = endDate.getDate();
    date.month = endDate.getMonth();
   } else if (value = getMatch("W")) {
    var weekDayNumber = DAY_NUMBERS_MON_FIRST[weekDay];
    var weekNumber = jstoi_q(value);
    var janFirst = new Date(date.year, 0, 1);
    var endDate;
    if (janFirst.getDay() === 1) {
     endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
    } else {
     endDate = addDays(janFirst, 7 - janFirst.getDay() + 1 + weekDayNumber + 7 * (weekNumber - 1));
    }
    date.day = endDate.getDate();
    date.month = endDate.getMonth();
   }
  }
  var fullDate = new Date(date.year, date.month, date.day, date.hour, date.min, date.sec, 0);
  HEAP32[tm >>> 2] = fullDate.getSeconds();
  HEAP32[tm + 4 >>> 2] = fullDate.getMinutes();
  HEAP32[tm + 8 >>> 2] = fullDate.getHours();
  HEAP32[tm + 12 >>> 2] = fullDate.getDate();
  HEAP32[tm + 16 >>> 2] = fullDate.getMonth();
  HEAP32[tm + 20 >>> 2] = fullDate.getFullYear() - 1900;
  HEAP32[tm + 24 >>> 2] = fullDate.getDay();
  HEAP32[tm + 28 >>> 2] = arraySum(isLeapYear(fullDate.getFullYear()) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, fullDate.getMonth() - 1) + fullDate.getDate() - 1;
  HEAP32[tm + 32 >>> 2] = 0;
  return buf + intArrayFromString(matches[0]).length - 1;
 }
 return 0;
}

function _swapcontext() {
 err("missing function: swapcontext");
 abort(-1);
}

var getWasmTableEntry = funcPtr => wasmTable.get(funcPtr);

function runAndAbortIfError(func) {
 try {
  return func();
 } catch (e) {
  abort(e);
 }
}

function sigToWasmTypes(sig) {
 assert(!sig.includes("j"), "i64 not permitted in function signatures when WASM_BIGINT is disabled");
 var typeNames = {
  "i": "i32",
  "j": "i64",
  "f": "f32",
  "d": "f64",
  "p": "i32"
 };
 var type = {
  parameters: [],
  results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
 };
 for (var i = 1; i < sig.length; ++i) {
  assert(sig[i] in typeNames, "invalid signature char: " + sig[i]);
  type.parameters.push(typeNames[sig[i]]);
 }
 return type;
}

var runtimeKeepalivePush = () => {
 runtimeKeepaliveCounter += 1;
};

var runtimeKeepalivePop = () => {
 assert(runtimeKeepaliveCounter > 0);
 runtimeKeepaliveCounter -= 1;
};

var Asyncify = {
 instrumentWasmImports: function(imports) {
  var importPatterns = [ /^invoke_.*$/, /^fd_sync$/, /^__wasi_fd_sync$/, /^__asyncjs__.*$/, /^emscripten_promise_await$/, /^emscripten_idb_load$/, /^emscripten_idb_store$/, /^emscripten_idb_delete$/, /^emscripten_idb_exists$/, /^emscripten_idb_load_blob$/, /^emscripten_idb_store_blob$/, /^emscripten_sleep$/, /^emscripten_wget_data$/, /^emscripten_scan_registers$/, /^emscripten_lazy_load_code$/, /^_load_secondary_module$/, /^emscripten_fiber_swap$/, /^SDL_Delay$/ ];
  for (var x in imports) {
   (function(x) {
    var original = imports[x];
    var sig = original.sig;
    if (typeof original == "function") {
     var isAsyncifyImport = original.isAsync || importPatterns.some((pattern => !!x.match(pattern)));
     imports[x] = function() {
      var originalAsyncifyState = Asyncify.state;
      try {
       return original.apply(null, arguments);
      } finally {
       var changedToDisabled = originalAsyncifyState === Asyncify.State.Normal && Asyncify.state === Asyncify.State.Disabled;
       var ignoredInvoke = x.startsWith("invoke_") && true;
       if (Asyncify.state !== originalAsyncifyState && !isAsyncifyImport && !changedToDisabled && !ignoredInvoke) {
        throw new Error(`import ${x} was not in ASYNCIFY_IMPORTS, but changed the state`);
       }
      }
     };
    }
   })(x);
  }
 },
 instrumentWasmExports: function(exports) {
  var ret = {};
  for (var x in exports) {
   (function(x) {
    var original = exports[x];
    if (typeof original == "function") {
     ret[x] = function() {
      Asyncify.exportCallStack.push(x);
      try {
       return original.apply(null, arguments);
      } finally {
       if (!ABORT) {
        var y = Asyncify.exportCallStack.pop();
        assert(y === x);
        Asyncify.maybeStopUnwind();
       }
      }
     };
    } else {
     ret[x] = original;
    }
   })(x);
  }
  return ret;
 },
 State: {
  Normal: 0,
  Unwinding: 1,
  Rewinding: 2,
  Disabled: 3
 },
 state: 0,
 StackSize: 4096,
 currData: null,
 handleSleepReturnValue: 0,
 exportCallStack: [],
 callStackNameToId: {},
 callStackIdToName: {},
 callStackId: 0,
 asyncPromiseHandlers: null,
 sleepCallbacks: [],
 getCallStackId: function(funcName) {
  var id = Asyncify.callStackNameToId[funcName];
  if (id === undefined) {
   id = Asyncify.callStackId++;
   Asyncify.callStackNameToId[funcName] = id;
   Asyncify.callStackIdToName[id] = funcName;
  }
  return id;
 },
 maybeStopUnwind: function() {
  if (Asyncify.currData && Asyncify.state === Asyncify.State.Unwinding && Asyncify.exportCallStack.length === 0) {
   Asyncify.state = Asyncify.State.Normal;
   runtimeKeepalivePush();
   runAndAbortIfError(_asyncify_stop_unwind);
   if (typeof Fibers != "undefined") {
    Fibers.trampoline();
   }
  }
 },
 whenDone: function() {
  assert(Asyncify.currData, "Tried to wait for an async operation when none is in progress.");
  assert(!Asyncify.asyncPromiseHandlers, "Cannot have multiple async operations in flight at once");
  return new Promise(((resolve, reject) => {
   Asyncify.asyncPromiseHandlers = {
    resolve: resolve,
    reject: reject
   };
  }));
 },
 allocateData: function() {
  var ptr = _malloc(12 + Asyncify.StackSize);
  Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
  Asyncify.setDataRewindFunc(ptr);
  return ptr;
 },
 setDataHeader: function(ptr, stack, stackSize) {
  HEAP32[ptr >>> 2] = stack;
  HEAP32[ptr + 4 >>> 2] = stack + stackSize;
 },
 setDataRewindFunc: function(ptr) {
  var bottomOfCallStack = Asyncify.exportCallStack[0];
  var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
  HEAP32[ptr + 8 >>> 2] = rewindId;
 },
 getDataRewindFunc: function(ptr) {
  var id = HEAP32[ptr + 8 >>> 2];
  var name = Asyncify.callStackIdToName[id];
  var func = Module["asm"][name];
  return func;
 },
 doRewind: function(ptr) {
  var start = Asyncify.getDataRewindFunc(ptr);
  runtimeKeepalivePop();
  return start();
 },
 handleSleep: function(startAsync) {
  assert(Asyncify.state !== Asyncify.State.Disabled, "Asyncify cannot be done during or after the runtime exits");
  if (ABORT) return;
  if (Asyncify.state === Asyncify.State.Normal) {
   var reachedCallback = false;
   var reachedAfterCallback = false;
   startAsync(((handleSleepReturnValue = 0) => {
    assert(!handleSleepReturnValue || typeof handleSleepReturnValue == "number" || typeof handleSleepReturnValue == "boolean");
    if (ABORT) return;
    Asyncify.handleSleepReturnValue = handleSleepReturnValue;
    reachedCallback = true;
    if (!reachedAfterCallback) {
     return;
    }
    assert(!Asyncify.exportCallStack.length, "Waking up (starting to rewind) must be done from JS, without compiled code on the stack.");
    Asyncify.state = Asyncify.State.Rewinding;
    runAndAbortIfError((() => _asyncify_start_rewind(Asyncify.currData)));
    if (typeof Browser != "undefined" && Browser.mainLoop.func) {
     Browser.mainLoop.resume();
    }
    var asyncWasmReturnValue, isError = false;
    try {
     asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData);
    } catch (err) {
     asyncWasmReturnValue = err;
     isError = true;
    }
    var handled = false;
    if (!Asyncify.currData) {
     var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
     if (asyncPromiseHandlers) {
      Asyncify.asyncPromiseHandlers = null;
      (isError ? asyncPromiseHandlers.reject : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
      handled = true;
     }
    }
    if (isError && !handled) {
     throw asyncWasmReturnValue;
    }
   }));
   reachedAfterCallback = true;
   if (!reachedCallback) {
    Asyncify.state = Asyncify.State.Unwinding;
    Asyncify.currData = Asyncify.allocateData();
    if (typeof Browser != "undefined" && Browser.mainLoop.func) {
     Browser.mainLoop.pause();
    }
    runAndAbortIfError((() => _asyncify_start_unwind(Asyncify.currData)));
   }
  } else if (Asyncify.state === Asyncify.State.Rewinding) {
   Asyncify.state = Asyncify.State.Normal;
   runAndAbortIfError(_asyncify_stop_rewind);
   _free(Asyncify.currData);
   Asyncify.currData = null;
   Asyncify.sleepCallbacks.forEach((func => callUserCallback(func)));
  } else {
   abort(`invalid state: ${Asyncify.state}`);
  }
  return Asyncify.handleSleepReturnValue;
 },
 handleAsync: function(startAsync) {
  return Asyncify.handleSleep((wakeUp => {
   startAsync().then(wakeUp);
  }));
 }
};

function getCFunc(ident) {
 var func = Module["_" + ident];
 assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
 return func;
}

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

var ccall = function(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": str => {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    ret = stringToUTF8OnStack(str);
   }
   return ret;
  },
  "array": arr => {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") {
   return UTF8ToString(ret);
  }
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 assert(returnType !== "array", 'Return type should not be "array".');
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var previousAsync = Asyncify.currData;
 var ret = func.apply(null, cArgs);
 function onDone(ret) {
  runtimeKeepalivePop();
  if (stack !== 0) stackRestore(stack);
  return convertReturnValue(ret);
 }
 var asyncMode = opts && opts.async;
 runtimeKeepalivePush();
 if (Asyncify.currData != previousAsync) {
  assert(!(previousAsync && Asyncify.currData), "We cannot start an async operation when one is already flight");
  assert(!(previousAsync && !Asyncify.currData), "We cannot stop an async operation in flight");
  assert(asyncMode, "The call to " + ident + " is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.");
  return Asyncify.whenDone().then(onDone);
 }
 ret = onDone(ret);
 if (asyncMode) return Promise.resolve(ret);
 return ret;
};

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

ERRNO_CODES = {
 "EPERM": 63,
 "ENOENT": 44,
 "ESRCH": 71,
 "EINTR": 27,
 "EIO": 29,
 "ENXIO": 60,
 "E2BIG": 1,
 "ENOEXEC": 45,
 "EBADF": 8,
 "ECHILD": 12,
 "EAGAIN": 6,
 "EWOULDBLOCK": 6,
 "ENOMEM": 48,
 "EACCES": 2,
 "EFAULT": 21,
 "ENOTBLK": 105,
 "EBUSY": 10,
 "EEXIST": 20,
 "EXDEV": 75,
 "ENODEV": 43,
 "ENOTDIR": 54,
 "EISDIR": 31,
 "EINVAL": 28,
 "ENFILE": 41,
 "EMFILE": 33,
 "ENOTTY": 59,
 "ETXTBSY": 74,
 "EFBIG": 22,
 "ENOSPC": 51,
 "ESPIPE": 70,
 "EROFS": 69,
 "EMLINK": 34,
 "EPIPE": 64,
 "EDOM": 18,
 "ERANGE": 68,
 "ENOMSG": 49,
 "EIDRM": 24,
 "ECHRNG": 106,
 "EL2NSYNC": 156,
 "EL3HLT": 107,
 "EL3RST": 108,
 "ELNRNG": 109,
 "EUNATCH": 110,
 "ENOCSI": 111,
 "EL2HLT": 112,
 "EDEADLK": 16,
 "ENOLCK": 46,
 "EBADE": 113,
 "EBADR": 114,
 "EXFULL": 115,
 "ENOANO": 104,
 "EBADRQC": 103,
 "EBADSLT": 102,
 "EDEADLOCK": 16,
 "EBFONT": 101,
 "ENOSTR": 100,
 "ENODATA": 116,
 "ETIME": 117,
 "ENOSR": 118,
 "ENONET": 119,
 "ENOPKG": 120,
 "EREMOTE": 121,
 "ENOLINK": 47,
 "EADV": 122,
 "ESRMNT": 123,
 "ECOMM": 124,
 "EPROTO": 65,
 "EMULTIHOP": 36,
 "EDOTDOT": 125,
 "EBADMSG": 9,
 "ENOTUNIQ": 126,
 "EBADFD": 127,
 "EREMCHG": 128,
 "ELIBACC": 129,
 "ELIBBAD": 130,
 "ELIBSCN": 131,
 "ELIBMAX": 132,
 "ELIBEXEC": 133,
 "ENOSYS": 52,
 "ENOTEMPTY": 55,
 "ENAMETOOLONG": 37,
 "ELOOP": 32,
 "EOPNOTSUPP": 138,
 "EPFNOSUPPORT": 139,
 "ECONNRESET": 15,
 "ENOBUFS": 42,
 "EAFNOSUPPORT": 5,
 "EPROTOTYPE": 67,
 "ENOTSOCK": 57,
 "ENOPROTOOPT": 50,
 "ESHUTDOWN": 140,
 "ECONNREFUSED": 14,
 "EADDRINUSE": 3,
 "ECONNABORTED": 13,
 "ENETUNREACH": 40,
 "ENETDOWN": 38,
 "ETIMEDOUT": 73,
 "EHOSTDOWN": 142,
 "EHOSTUNREACH": 23,
 "EINPROGRESS": 26,
 "EALREADY": 7,
 "EDESTADDRREQ": 17,
 "EMSGSIZE": 35,
 "EPROTONOSUPPORT": 66,
 "ESOCKTNOSUPPORT": 137,
 "EADDRNOTAVAIL": 4,
 "ENETRESET": 39,
 "EISCONN": 30,
 "ENOTCONN": 53,
 "ETOOMANYREFS": 141,
 "EUSERS": 136,
 "EDQUOT": 19,
 "ESTALE": 72,
 "ENOTSUP": 138,
 "ENOMEDIUM": 148,
 "EILSEQ": 25,
 "EOVERFLOW": 61,
 "ECANCELED": 11,
 "ENOTRECOVERABLE": 56,
 "EOWNERDEAD": 62,
 "ESTRPIPE": 135
};

function checkIncomingModuleAPI() {
 ignoredModuleProp("fetchSettings");
}

var wasmImports = {
 __assert_fail: ___assert_fail,
 __asyncjs__pdo_vrzno_real_stmt_execute: __asyncjs__pdo_vrzno_real_stmt_execute,
 __asyncjs__vrzno_await_internal: __asyncjs__vrzno_await_internal,
 __call_sighandler: ___call_sighandler,
 __syscall__newselect: ___syscall__newselect,
 __syscall_accept4: ___syscall_accept4,
 __syscall_bind: ___syscall_bind,
 __syscall_chdir: ___syscall_chdir,
 __syscall_chmod: ___syscall_chmod,
 __syscall_connect: ___syscall_connect,
 __syscall_dup: ___syscall_dup,
 __syscall_dup3: ___syscall_dup3,
 __syscall_faccessat: ___syscall_faccessat,
 __syscall_fallocate: ___syscall_fallocate,
 __syscall_fchmod: ___syscall_fchmod,
 __syscall_fchown32: ___syscall_fchown32,
 __syscall_fchownat: ___syscall_fchownat,
 __syscall_fcntl64: ___syscall_fcntl64,
 __syscall_fdatasync: ___syscall_fdatasync,
 __syscall_fstat64: ___syscall_fstat64,
 __syscall_ftruncate64: ___syscall_ftruncate64,
 __syscall_getcwd: ___syscall_getcwd,
 __syscall_getdents64: ___syscall_getdents64,
 __syscall_getpeername: ___syscall_getpeername,
 __syscall_getsockname: ___syscall_getsockname,
 __syscall_getsockopt: ___syscall_getsockopt,
 __syscall_ioctl: ___syscall_ioctl,
 __syscall_listen: ___syscall_listen,
 __syscall_lstat64: ___syscall_lstat64,
 __syscall_mkdirat: ___syscall_mkdirat,
 __syscall_newfstatat: ___syscall_newfstatat,
 __syscall_openat: ___syscall_openat,
 __syscall_pipe: ___syscall_pipe,
 __syscall_poll: ___syscall_poll,
 __syscall_readlinkat: ___syscall_readlinkat,
 __syscall_recvfrom: ___syscall_recvfrom,
 __syscall_renameat: ___syscall_renameat,
 __syscall_rmdir: ___syscall_rmdir,
 __syscall_sendto: ___syscall_sendto,
 __syscall_socket: ___syscall_socket,
 __syscall_stat64: ___syscall_stat64,
 __syscall_statfs64: ___syscall_statfs64,
 __syscall_symlink: ___syscall_symlink,
 __syscall_unlinkat: ___syscall_unlinkat,
 __syscall_utimensat: ___syscall_utimensat,
 _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
 _emscripten_throw_longjmp: __emscripten_throw_longjmp,
 _gmtime_js: __gmtime_js,
 _localtime_js: __localtime_js,
 _mktime_js: __mktime_js,
 _mmap_js: __mmap_js,
 _munmap_js: __munmap_js,
 _setitimer_js: __setitimer_js,
 _tzset_js: __tzset_js,
 abort: _abort,
 emscripten_asm_const_int: _emscripten_asm_const_int,
 emscripten_asm_const_ptr: _emscripten_asm_const_ptr,
 emscripten_console_error: _emscripten_console_error,
 emscripten_date_now: _emscripten_date_now,
 emscripten_get_heap_max: _emscripten_get_heap_max,
 emscripten_get_now: _emscripten_get_now,
 emscripten_resize_heap: _emscripten_resize_heap,
 environ_get: _environ_get,
 environ_sizes_get: _environ_sizes_get,
 exit: _exit,
 fd_close: _fd_close,
 fd_fdstat_get: _fd_fdstat_get,
 fd_read: _fd_read,
 fd_seek: _fd_seek,
 fd_sync: _fd_sync,
 fd_write: _fd_write,
 getaddrinfo: _getaddrinfo,
 getcontext: _getcontext,
 getdtablesize: _getdtablesize,
 gethostbyname_r: _gethostbyname_r,
 getloadavg: _getloadavg,
 getnameinfo: _getnameinfo,
 getprotobyname: _getprotobyname,
 getprotobynumber: _getprotobynumber,
 invoke_i: invoke_i,
 invoke_ii: invoke_ii,
 invoke_iii: invoke_iii,
 invoke_iiii: invoke_iiii,
 invoke_iiiii: invoke_iiiii,
 invoke_iiiiii: invoke_iiiiii,
 invoke_iiiiiii: invoke_iiiiiii,
 invoke_iiiiiiii: invoke_iiiiiiii,
 invoke_iiiiiiiiii: invoke_iiiiiiiiii,
 invoke_v: invoke_v,
 invoke_vi: invoke_vi,
 invoke_vii: invoke_vii,
 invoke_viidii: invoke_viidii,
 invoke_viii: invoke_viii,
 invoke_viiii: invoke_viiii,
 invoke_viiiii: invoke_viiiii,
 invoke_viiiiii: invoke_viiiiii,
 makecontext: _makecontext,
 proc_exit: _proc_exit,
 strftime: _strftime,
 strptime: _strptime,
 swapcontext: _swapcontext
};

Asyncify.instrumentWasmImports(wasmImports);

var asm = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors");

var _vrzno_expose_inc_zrefcount = Module["_vrzno_expose_inc_zrefcount"] = createExportWrapper("vrzno_expose_inc_zrefcount");

var _vrzno_expose_dec_zrefcount = Module["_vrzno_expose_dec_zrefcount"] = createExportWrapper("vrzno_expose_dec_zrefcount");

var _vrzno_expose_zrefcount = Module["_vrzno_expose_zrefcount"] = createExportWrapper("vrzno_expose_zrefcount");

var _vrzno_expose_inc_crefcount = Module["_vrzno_expose_inc_crefcount"] = createExportWrapper("vrzno_expose_inc_crefcount");

var _vrzno_expose_dec_crefcount = Module["_vrzno_expose_dec_crefcount"] = createExportWrapper("vrzno_expose_dec_crefcount");

var _vrzno_expose_crefcount = Module["_vrzno_expose_crefcount"] = createExportWrapper("vrzno_expose_crefcount");

var _vrzno_expose_efree = Module["_vrzno_expose_efree"] = createExportWrapper("vrzno_expose_efree");

var _vrzno_expose_create_bool = Module["_vrzno_expose_create_bool"] = createExportWrapper("vrzno_expose_create_bool");

var _vrzno_expose_create_null = Module["_vrzno_expose_create_null"] = createExportWrapper("vrzno_expose_create_null");

var _vrzno_expose_create_undef = Module["_vrzno_expose_create_undef"] = createExportWrapper("vrzno_expose_create_undef");

var _vrzno_expose_create_long = Module["_vrzno_expose_create_long"] = createExportWrapper("vrzno_expose_create_long");

var _vrzno_expose_create_double = Module["_vrzno_expose_create_double"] = createExportWrapper("vrzno_expose_create_double");

var _vrzno_expose_create_string = Module["_vrzno_expose_create_string"] = createExportWrapper("vrzno_expose_create_string");

var _vrzno_expose_create_object_for_target = Module["_vrzno_expose_create_object_for_target"] = createExportWrapper("vrzno_expose_create_object_for_target");

var _vrzno_expose_create_params = Module["_vrzno_expose_create_params"] = createExportWrapper("vrzno_expose_create_params");

var _vrzno_expose_set_param = Module["_vrzno_expose_set_param"] = createExportWrapper("vrzno_expose_set_param");

var _vrzno_expose_zval_is_target = Module["_vrzno_expose_zval_is_target"] = createExportWrapper("vrzno_expose_zval_is_target");

var _vrzno_expose_object_keys = Module["_vrzno_expose_object_keys"] = createExportWrapper("vrzno_expose_object_keys");

var _vrzno_expose_zval_dump = Module["_vrzno_expose_zval_dump"] = createExportWrapper("vrzno_expose_zval_dump");

var _vrzno_expose_type = Module["_vrzno_expose_type"] = createExportWrapper("vrzno_expose_type");

var _vrzno_expose_callable = Module["_vrzno_expose_callable"] = createExportWrapper("vrzno_expose_callable");

var _vrzno_expose_long = Module["_vrzno_expose_long"] = createExportWrapper("vrzno_expose_long");

var _vrzno_expose_double = Module["_vrzno_expose_double"] = createExportWrapper("vrzno_expose_double");

var _vrzno_expose_string = Module["_vrzno_expose_string"] = createExportWrapper("vrzno_expose_string");

var _vrzno_expose_property_pointer = Module["_vrzno_expose_property_pointer"] = createExportWrapper("vrzno_expose_property_pointer");

var _vrzno_exec_callback = Module["_vrzno_exec_callback"] = createExportWrapper("vrzno_exec_callback");

var _vrzno_del_callback = Module["_vrzno_del_callback"] = createExportWrapper("vrzno_del_callback");

var _zend_eval_string = Module["_zend_eval_string"] = createExportWrapper("zend_eval_string");

var _php_embed_init = Module["_php_embed_init"] = createExportWrapper("php_embed_init");

var _php_embed_shutdown = Module["_php_embed_shutdown"] = createExportWrapper("php_embed_shutdown");

var _pib_init = Module["_pib_init"] = createExportWrapper("pib_init");

var _memcpy = createExportWrapper("memcpy");

var _free = createExportWrapper("free");

var _malloc = createExportWrapper("malloc");

var setTempRet0 = createExportWrapper("setTempRet0");

var ___errno_location = createExportWrapper("__errno_location");

var _fflush = Module["_fflush"] = createExportWrapper("fflush");

var _htons = createExportWrapper("htons");

var _ntohs = createExportWrapper("ntohs");

var _htonl = createExportWrapper("htonl");

var _pib_exec = Module["_pib_exec"] = createExportWrapper("pib_exec");

var _pib_run = Module["_pib_run"] = createExportWrapper("pib_run");

var _pib_tokenize = Module["_pib_tokenize"] = createExportWrapper("pib_tokenize");

var _pib_destroy = Module["_pib_destroy"] = createExportWrapper("pib_destroy");

var _pib_refresh = Module["_pib_refresh"] = createExportWrapper("pib_refresh");

var _exec_callback = Module["_exec_callback"] = createExportWrapper("exec_callback");

var _del_callback = Module["_del_callback"] = createExportWrapper("del_callback");

var _main = Module["_main"] = createExportWrapper("main");

var ___funcs_on_exit = createExportWrapper("__funcs_on_exit");

var _emscripten_builtin_memalign = createExportWrapper("emscripten_builtin_memalign");

var __emscripten_timeout = createExportWrapper("_emscripten_timeout");

var _setThrew = createExportWrapper("setThrew");

var _emscripten_stack_init = function() {
 return (_emscripten_stack_init = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
};

var _emscripten_stack_set_limits = function() {
 return (_emscripten_stack_set_limits = Module["asm"]["emscripten_stack_set_limits"]).apply(null, arguments);
};

var _emscripten_stack_get_free = function() {
 return (_emscripten_stack_get_free = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
};

var _emscripten_stack_get_base = function() {
 return (_emscripten_stack_get_base = Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
};

var _emscripten_stack_get_end = function() {
 return (_emscripten_stack_get_end = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
};

var stackSave = createExportWrapper("stackSave");

var stackRestore = createExportWrapper("stackRestore");

var stackAlloc = createExportWrapper("stackAlloc");

var _emscripten_stack_get_current = function() {
 return (_emscripten_stack_get_current = Module["asm"]["emscripten_stack_get_current"]).apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = createExportWrapper("dynCall_vi");

var dynCall_iiii = Module["dynCall_iiii"] = createExportWrapper("dynCall_iiii");

var dynCall_iii = Module["dynCall_iii"] = createExportWrapper("dynCall_iii");

var dynCall_ii = Module["dynCall_ii"] = createExportWrapper("dynCall_ii");

var dynCall_iiiii = Module["dynCall_iiiii"] = createExportWrapper("dynCall_iiiii");

var dynCall_iiiiii = Module["dynCall_iiiiii"] = createExportWrapper("dynCall_iiiiii");

var dynCall_vii = Module["dynCall_vii"] = createExportWrapper("dynCall_vii");

var dynCall_viii = Module["dynCall_viii"] = createExportWrapper("dynCall_viii");

var dynCall_v = Module["dynCall_v"] = createExportWrapper("dynCall_v");

var dynCall_viiiii = Module["dynCall_viiiii"] = createExportWrapper("dynCall_viiiii");

var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = createExportWrapper("dynCall_iiiiiii");

var dynCall_i = Module["dynCall_i"] = createExportWrapper("dynCall_i");

var dynCall_viiii = Module["dynCall_viiii"] = createExportWrapper("dynCall_viiii");

var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = createExportWrapper("dynCall_iiiiiiii");

var dynCall_vij = Module["dynCall_vij"] = createExportWrapper("dynCall_vij");

var dynCall_ji = Module["dynCall_ji"] = createExportWrapper("dynCall_ji");

var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = createExportWrapper("dynCall_viiiiiiii");

var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = createExportWrapper("dynCall_iiiiiiiiii");

var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = createExportWrapper("dynCall_viiiiiiiii");

var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = createExportWrapper("dynCall_viiiiiii");

var dynCall_viiiiii = Module["dynCall_viiiiii"] = createExportWrapper("dynCall_viiiiii");

var dynCall_ij = Module["dynCall_ij"] = createExportWrapper("dynCall_ij");

var dynCall_iiiij = Module["dynCall_iiiij"] = createExportWrapper("dynCall_iiiij");

var dynCall_vijii = Module["dynCall_vijii"] = createExportWrapper("dynCall_vijii");

var dynCall_iijj = Module["dynCall_iijj"] = createExportWrapper("dynCall_iijj");

var dynCall_iij = Module["dynCall_iij"] = createExportWrapper("dynCall_iij");

var dynCall_iijii = Module["dynCall_iijii"] = createExportWrapper("dynCall_iijii");

var dynCall_iiji = Module["dynCall_iiji"] = createExportWrapper("dynCall_iiji");

var dynCall_iiiiiij = Module["dynCall_iiiiiij"] = createExportWrapper("dynCall_iiiiiij");

var dynCall_iiid = Module["dynCall_iiid"] = createExportWrapper("dynCall_iiid");

var dynCall_iiij = Module["dynCall_iiij"] = createExportWrapper("dynCall_iiij");

var dynCall_dii = Module["dynCall_dii"] = createExportWrapper("dynCall_dii");

var dynCall_jii = Module["dynCall_jii"] = createExportWrapper("dynCall_jii");

var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = createExportWrapper("dynCall_iiiiiiiii");

var dynCall_vid = Module["dynCall_vid"] = createExportWrapper("dynCall_vid");

var dynCall_di = Module["dynCall_di"] = createExportWrapper("dynCall_di");

var dynCall_iiiiijii = Module["dynCall_iiiiijii"] = createExportWrapper("dynCall_iiiiijii");

var dynCall_j = Module["dynCall_j"] = createExportWrapper("dynCall_j");

var dynCall_jj = Module["dynCall_jj"] = createExportWrapper("dynCall_jj");

var dynCall_jiij = Module["dynCall_jiij"] = createExportWrapper("dynCall_jiij");

var dynCall_iiiiji = Module["dynCall_iiiiji"] = createExportWrapper("dynCall_iiiiji");

var dynCall_iiiijii = Module["dynCall_iiiijii"] = createExportWrapper("dynCall_iiiijii");

var dynCall_viiji = Module["dynCall_viiji"] = createExportWrapper("dynCall_viiji");

var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii");

var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = createExportWrapper("dynCall_iiiiiiiiiii");

var dynCall_iiiijji = Module["dynCall_iiiijji"] = createExportWrapper("dynCall_iiiijji");

var dynCall_dd = Module["dynCall_dd"] = createExportWrapper("dynCall_dd");

var dynCall_ddd = Module["dynCall_ddd"] = createExportWrapper("dynCall_ddd");

var dynCall_jiijii = Module["dynCall_jiijii"] = createExportWrapper("dynCall_jiijii");

var dynCall_viiijii = Module["dynCall_viiijii"] = createExportWrapper("dynCall_viiijii");

var dynCall_jiiiji = Module["dynCall_jiiiji"] = createExportWrapper("dynCall_jiiiji");

var dynCall_jiiji = Module["dynCall_jiiji"] = createExportWrapper("dynCall_jiiji");

var dynCall_iiiji = Module["dynCall_iiiji"] = createExportWrapper("dynCall_iiiji");

var dynCall_viidii = Module["dynCall_viidii"] = createExportWrapper("dynCall_viidii");

var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

var dynCall_iidiiii = Module["dynCall_iidiiii"] = createExportWrapper("dynCall_iidiiii");

var _asyncify_start_unwind = createExportWrapper("asyncify_start_unwind");

var _asyncify_stop_unwind = createExportWrapper("asyncify_stop_unwind");

var _asyncify_start_rewind = createExportWrapper("asyncify_start_rewind");

var _asyncify_stop_rewind = createExportWrapper("asyncify_stop_rewind");

var ___start_em_js = Module["___start_em_js"] = 3584249;

var ___stop_em_js = Module["___stop_em_js"] = 3584891;

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_iiii(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  dynCall_vi(index, a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ii(index, a1) {
 var sp = stackSave();
 try {
  return dynCall_ii(index, a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  dynCall_viii(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_v(index) {
 var sp = stackSave();
 try {
  dynCall_v(index);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return dynCall_iii(index, a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vii(index, a1, a2) {
 var sp = stackSave();
 try {
  dynCall_vii(index, a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return dynCall_iiiiii(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_i(index) {
 var sp = stackSave();
 try {
  return dynCall_i(index);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return dynCall_iiiii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  dynCall_viiii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  dynCall_viiiiii(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  dynCall_viiiii(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  dynCall_viidii(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function applySignatureConversions(exports) {
 exports = Object.assign({}, exports);
 var makeWrapper_pp = f => a0 => f(a0) >>> 0;
 var makeWrapper_p = f => () => f() >>> 0;
 var makeWrapper_ppp = f => (a0, a1) => f(a0, a1) >>> 0;
 exports["malloc"] = makeWrapper_pp(exports["malloc"]);
 exports["__errno_location"] = makeWrapper_p(exports["__errno_location"]);
 exports["emscripten_builtin_memalign"] = makeWrapper_ppp(exports["emscripten_builtin_memalign"]);
 exports["emscripten_stack_get_base"] = makeWrapper_p(exports["emscripten_stack_get_base"]);
 exports["emscripten_stack_get_end"] = makeWrapper_p(exports["emscripten_stack_get_end"]);
 exports["stackSave"] = makeWrapper_p(exports["stackSave"]);
 exports["stackAlloc"] = makeWrapper_pp(exports["stackAlloc"]);
 exports["emscripten_stack_get_current"] = makeWrapper_p(exports["emscripten_stack_get_current"]);
 return exports;
}

function intArrayFromBase64(s) {
 try {
  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
   bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
 } catch (_) {
  throw new Error("Converting base64 string to bytes failed.");
 }
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

Module["ccall"] = ccall;

Module["getValue"] = getValue;

Module["UTF8ToString"] = UTF8ToString;

Module["lengthBytesUTF8"] = lengthBytesUTF8;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS"] = FS;

var missingLibrarySymbols = [ "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromU64", "convertI32PairToI53", "convertU32PairToI53", "traverseStack", "getCallstack", "emscriptenLog", "convertPCtoSourceLocation", "runMainThreadEmAsm", "jstoi_s", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "setWasmTableEntry", "safeSetTimeout", "asmjsMangle", "handleAllocatorInit", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "cwrap", "uleb128Encode", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayToString", "AsciiToString", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "jsStackTrace", "stackTrace", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "ExceptionInfo", "setMainLoop", "_setNetworkCallback", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "__glGenObject", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "registerWebGlEventCallback", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "GLFW_Window", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "FS_createFolder", "FS_createLink", "out", "err", "callMain", "abort", "keepRuntimeAlive", "wasmMemory", "stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0", "writeStackCookie", "checkStackCookie", "readI53FromI64", "convertI32PairToI53Checked", "ptrToString", "zeroMemory", "exitJS", "getHeapMax", "growMemory", "ENV", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "ERRNO_CODES", "ERRNO_MESSAGES", "setErrNo", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "DNS", "getHostByName", "Protocols", "Sockets", "initRandomFill", "randomFill", "timers", "warnOnce", "UNWIND_CACHE", "readEmAsmArgsArray", "readEmAsmArgs", "runEmAsmFunction", "jstoi_q", "getExecutableName", "getWasmTableEntry", "handleException", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "asyncLoad", "alignMemory", "mmapAlloc", "getCFunc", "sigToWasmTypes", "freeTableIndexes", "functionsInTableMap", "setValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "stringToUTF8Array", "stringToUTF8", "intArrayFromString", "stringToAscii", "UTF16Decoder", "stringToNewUTF8", "stringToUTF8OnStack", "writeArrayToMemory", "JSEvents", "specialHTMLTargets", "currentFullscreenStrategy", "restoreOldWindowedStyle", "demangle", "demangleAll", "ExitStatus", "getEnvStrings", "doReadv", "doWritev", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "Browser", "wget", "SYSCALLS", "getSocketFromFD", "getSocketAddress", "preloadPlugins", "FS_modeStringToFlags", "FS_getMode", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "emscripten_webgl_power_preferences", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "runAndAbortIfError", "Asyncify", "Fibers", "SDL", "SDL_gfx", "GLFW", "allocateUTF8", "allocateUTF8OnStack", "IDBFS" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain() {
 assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
 assert(__ATPRERUN__.length == 0, "cannot call main when preRun functions remain to be called");
 var entryFunction = _main;
 var argc = 0;
 var argv = 0;
 try {
  var ret = entryFunction(argc, argv);
  exitJS(ret, true);
  return ret;
 } catch (e) {
  return handleException(e);
 }
}

function stackCheckInit() {
 _emscripten_stack_init();
 writeStackCookie();
}

function run() {
 if (runDependencies > 0) {
  return;
 }
 stackCheckInit();
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout((function() {
   setTimeout((function() {
    Module["setStatus"]("");
   }), 1);
   doRun();
  }), 1);
 } else {
  doRun();
 }
 checkStackCookie();
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = false;

if (Module["noInitialRun"]) shouldRunNow = false;

run();


  return moduleArg.ready
}

);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = PHP;
else if (typeof define === 'function' && define['amd'])
  define([], () => PHP);
  })();
});
require.register("initialize.js", function(exports, require, module) {
"use strict";

var _PhpWebDrupal = require("php-wasm/PhpWebDrupal");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var session_id = '';
var serviceWorker = navigator.serviceWorker;
serviceWorker.register("".concat(location.pathname, "DrupalWorker.js"));
if (serviceWorker && !serviceWorker.controller) {
  location.reload();
}
var php = new _PhpWebDrupal.PhpWebDrupal({
  persist: {
    mountPath: '/persist'
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('.input  textarea');
  var stdout = document.querySelector('.stdout > * > div.scroller');
  var stderr = document.querySelector('.stderr > * > div.scroller');
  var stdret = document.querySelector('.stdret > * > div.scroller');
  var run = document.querySelector('[data-run]');
  var reset = document.querySelector('[data-reset-storage]');
  var refresh = document.querySelector('[data-refresh]');
  var token = document.querySelector('[data-tokenize]');
  var status = document.querySelector('[data-status]');
  var load = document.querySelector('[data-load-demo]');
  var demo = document.querySelector('[data-select-demo]');
  var editor = ace.edit(input);
  var ret = document.querySelector('#ret');
  var stdoutFrame = document.querySelector('.stdout > * > iframe');
  var stderrFrame = document.querySelector('.stderr > * > iframe');
  var stdretFrame = document.querySelector('.stdret > * > iframe');
  var openFile = document.getElementById('openFile');
  var exitBox = document.querySelector('#exit');
  var exitLabel = exitBox.querySelector('span');
  var persistBox = document.getElementById('persist');
  var singleBox = document.getElementById('singleExpression');
  var autorun = document.querySelector('#autorun');
  var renderAs = Array.from(document.querySelectorAll('[name=render-as]'));
  var outputBuffer = [];
  var errorBuffer = [];
  var outputTimer;
  var errorTimer;
  reset.addEventListener('click', function (event) {
    var openDb = indexedDB.open("/persist", 21);
    openDb.onsuccess = function (event) {
      var db = openDb.result;
      var transaction = db.transaction(["FILE_DATA"], "readwrite");
      var objectStore = transaction.objectStore("FILE_DATA");
      var objectStoreRequest = objectStore.clear();
      objectStoreRequest.onsuccess = function (event) {
        location.reload();
      };
    };
  });
  openFile.addEventListener('input', function (event) {
    var reader = new FileReader();
    reader.onload = function (event) {
      editor.setValue(event.target.result);
    };
    reader.readAsText(event.target.files[0]);
  });
  var runCode = function runCode() {
    query["delete"]('demo');
    exitLabel.innerText = '_';
    status.innerText = 'Executing...';
    stdoutFrame.srcdoc = ' ';
    stderrFrame.srcdoc = ' ';
    stdretFrame.srcdoc = ' ';
    while (stdout.firstChild) {
      stdout.firstChild.remove();
    }
    while (stderr.firstChild) {
      stderr.firstChild.remove();
    }
    while (stdret.firstChild) {
      stdret.firstChild.remove();
    }
    var code = editor.session.getValue();
    if (1 || code.length < 1024 * 2) {
      query.set('autorun', autorun.checked ? 1 : 0);
      query.set('persist', persistBox.checked ? 1 : 0);
      query.set('single-expression', singleBox.checked ? 1 : 0);
      query.set('code', encodeURIComponent(code));
      history.replaceState({}, document.title, "?" + query.toString());
    }
    var func = singleBox.checked ? 'exec' : 'run';
    if (singleBox.checked) {
      code = code.replace(/^\s*<\?php/, '');
      code = code.replace(/\?>\s*/, '');
    }
    var refresh = Promise.resolve();
    if (!persistBox.checked) {
      refresh = refreshPhp();
    }
    run.setAttribute('disabled', 'disabled');
    refresh.then(function () {
      return php[func](code);
    }).then(function (ret) {
      status.innerText = 'php-wasm ready!';
      var content = String(ret);
      stdret.innerText = content;
      stdretFrame.srcdoc = content;
      exitLabel.innerText = '_';
      if (!singleBox.checked) {
        setTimeout(function () {
          return exitLabel.innerText = ret;
        }, 100);
      }
    })["finally"](function () {
      return run.removeAttribute('disabled');
    });
  };
  demo.addEventListener('change', function (event) {
    if (!demo.value) {
      return;
    }
    if (demo.value === 'drupal.php') {
      reset.style.display = '';
    } else {
      reset.style.display = 'none';
    }
  });
  var loadDemo = function loadDemo() {
    document.querySelector('#example').innerHTML = '';
    refreshPhp(2).then(function () {
      if (!demo.value) {
        return;
      }
      var scriptPath = '/php-wasm/scripts';
      if (window.location.hostname === 'localhost' || window.location.hostname.substr(0, 4) === '192.') {
        scriptPath = '/scripts';
      }
      fetch("".concat(scriptPath, "/").concat(demo.value)).then(function (r) {
        return r.text();
      }).then(function (phpCode) {
        var firstLine = String(phpCode.split(/\n/).shift());
        var settings = JSON.parse(firstLine.split('//').pop());
        query.set('demo', demo.value);
        if ('autorun' in settings) {
          autorun.checked = !!settings.autorun;
        }
        if ('single-expression' in settings) {
          singleBox.checked = !!settings['single-expression'];
        }
        if ('persist' in settings) {
          persistBox.checked = !!settings.persist;
        }
        if ('render-as' in settings) {
          if (settings['render-as'] === 'text') {
            renderAs[0].checked = true;
            renderAs[0].dispatchEvent(new Event('change'));
            query.set('render-as', 'text');
          } else if (settings['render-as'] === 'html') {
            renderAs[1].checked = true;
            renderAs[1].dispatchEvent(new Event('change'));
            query.set('render-as', 'html');
          }
        }
        persistBox.dispatchEvent(new Event('change'));
        singleBox.dispatchEvent(new Event('input'));
        autorun.dispatchEvent(new Event('change'));
        history.replaceState({}, document.title, "?" + query.toString());
        editor.getSession().setValue(phpCode);
        refreshPhp().then(function () {
          return runCode();
        });
      });
    });
  };
  load.addEventListener('click', function (event) {
    return loadDemo();
  });
  var query = new URLSearchParams(location.search);
  editor.setTheme('ace/theme/monokai');
  editor.session.setMode("ace/mode/php");
  status.innerText = 'php-wasm loading...';
  var cookieJar = new Map();
  var navigate = function navigate(_ref) {
    var action = _ref.action,
      clientId = _ref.clientId,
      path = _ref.path,
      method = _ref.method,
      _GET = _ref._GET,
      _POST = _ref._POST;
    if (action !== 'respond') {
      return;
    }

    // console.trace({path, method, _GET, _POST});

    exitLabel.innerText = '_';
    status.innerText = 'Executing...';
    stdoutFrame.srcdoc = ' ';
    stderrFrame.srcdoc = ' ';
    stdretFrame.srcdoc = ' ';
    while (stdout.firstChild) {
      stdout.firstChild.remove();
    }
    while (stderr.firstChild) {
      stderr.firstChild.remove();
    }
    while (stdret.firstChild) {
      stdret.firstChild.remove();
    }
    var code = "<?php\nini_set('session.save_path', '/persist');\nini_set('display_errors', 0);\n\n$stdErr = fopen('php://stderr', 'w');\n$errors = [];\n\n$request = (object) json_decode(\n\t'".concat(JSON.stringify({
      path: path,
      method: method,
      _GET: _GET,
      _POST: _POST,
      _COOKIE: Object.fromEntries(cookieJar.entries())
    }), "'\n\t, JSON_OBJECT_AS_ARRAY\n);\n\nparse_str(substr($request->_GET, 1), $_GET);\nparse_str(substr($request->_POST, 1), $_POST);\n\n$_COOKIE = $request->_COOKIE;\n\nfwrite($stdErr, json_encode(['_GET' => $_GET]) . PHP_EOL);\nfwrite($stdErr, json_encode(['_POST' => $_POST]) . PHP_EOL);\n\n$docroot = '/persist/drupal-7.95';\n$script  = 'index.php';\n\n$path = $request->path;\n$path = preg_replace('/^\\/php-wasm/', '', $path);\n$path = preg_replace('/^\\/persist/', '', $path);\n$path = preg_replace('/^\\/drupal-7.95/', '', $path);\n$path = preg_replace('/^\\//', '', $path);\n$path = $path ?: \"node\";\n\n$_SERVER['SERVER_SOFTWARE'] = ").concat(JSON.stringify(navigator.userAgent), ";\n$_SERVER['REQUEST_URI']     = '/php-wasm' . $docroot . '/' . $path;\n$_SERVER['QUERY_STRING']    = $request->_GET;\n$_SERVER['REMOTE_ADDR']     = '127.0.0.1';\n$_SERVER['SERVER_NAME']     = 'localhost';\n$_SERVER['SERVER_PORT']     = 3333;\n$_SERVER['REQUEST_METHOD']  = $request->method;\n$_SERVER['SCRIPT_FILENAME'] = $docroot . '/' . $script;\n$_SERVER['SCRIPT_NAME']     = $docroot . '/' . $script;\n$_SERVER['PHP_SELF']        = $docroot . '/' . $script;\n\nchdir($docroot);\n\nif(!defined('DRUPAL_ROOT')) define('DRUPAL_ROOT', getcwd());\n\nrequire_once DRUPAL_ROOT . '/includes/bootstrap.inc';\ndrupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);\ndrupal_session_start();\n\nfwrite($stdErr, json_encode(['session_id' => session_id()]) . \"\n\");\n\nglobal $user;\n\n$uid     = 1;\n$user    = user_load($uid);\n$account = array('uid' => $user->uid);\n\n$session_name = session_name();\nif(!$_COOKIE || !$_COOKIE[$session_name])\n{\n\tuser_login_submit(array(), $account);\n}\n\nfwrite($stdErr, json_encode(['PATH' => $path, \"ORIGINAL\" => $request->path]) . PHP_EOL);\n\n$GLOBALS['base_path'] = '/php-wasm' . $docroot . '/';\n$base_url = '/php-wasm' . $docroot;\n\n$_GET['q'] = $path;\n\nmenu_execute_active_handler();\n\nfwrite($stdErr, json_encode(['HEADERS' =>headers_list()]) . \"\n\");\nfwrite($stdErr, json_encode(['COOKIE'  => $_COOKIE]) . PHP_EOL);\nfwrite($stdErr, json_encode(['errors'  => error_get_last()]) . \"\n\");\n");
    refreshPhp().then(function () {
      return php.run(code);
    }).then(function (exitCode) {
      exitLabel.innerText = exitCode;
      status.innerText = 'php-wasm ready!';
    })["catch"](function (error) {
      return console.error(error);
    });
  };
  var _init = true;
  var ready = function ready(event) {
    document.body.classList.remove('loading');
    status.innerText = 'php-wasm ready!';
    run.removeAttribute('disabled');
    token && token.addEventListener('click', function () {
      var url = '/drupal-7.59/install.php';
      var options = {
        method: 'GET'
      };
      fetch(url, options).then(function (r) {
        return r.text();
      }).then(function (r) {
        console.log('Done');
      });
    });
    run.addEventListener('click', runCode);

    // refresh.addEventListener('click', () => void php.refresh());

    if (_init && _init !== 2 && query.get('autorun')) {
      runCode();
    }
  };
  var output = function output(event) {
    var content = event.detail.join('');
    outputBuffer.push(content);
    if (outputTimer) {
      clearTimeout(outputTimer);
      outputTimer = null;
    }
    outputTimer = setTimeout(function () {
      var chunk = outputBuffer.join('');
      if (!outputBuffer || !chunk) {
        return;
      }
      if (location.hostname.match(/github.io$/)) {
        chunk = chunk.replace(/\/preload/g, '/php-wasm/preload');
      }
      var node = document.createTextNode(chunk);
      stdout.append(node);
      stdoutFrame.srcdoc += chunk;
      outputBuffer.splice(0);
    }, 50);
  };
  var error = function error(event) {
    var content = event.detail.join('');
    var packet = {};
    try {
      Object.assign(packet, JSON.parse(content));
    } catch (error) {/*console.error(error);*/}
    if (packet.HEADERS) {
      var raw = packet.HEADERS;
      var headers = {};
      var _iterator = _createForOfIteratorHelper(raw),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          line = String(line);
          var colon = line.indexOf(':');
          if (colon >= 0) {
            headers[line.substr(0, colon)] = line.substr(2 + colon);
          } else {
            headers[line] = true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if ((headers[302] || headers[303]) && headers.Location) {
        var redirectUrl = headers.Location;
        var _GET = redirectUrl.search;
        navigate({
          method: 'GET',
          path: redirectUrl.pathname,
          _GET: '',
          _POST: ''
        });
      }
      if (headers['Set-Cookie']) {
        var _raw = headers['Set-Cookie'];
        var semi = _raw.indexOf(';');
        var equal = _raw.indexOf('=');
        var key = _raw.substr(0, equal);
        var value = _raw.substr(equal, semi - equal);
        cookieJar.set(key, value);
      }
    }
    errorBuffer.push(content);
    if (errorTimer) {
      clearTimeout(errorTimer);
      errorTimer = null;
    }
    errorTimer = setTimeout(function () {
      errorTimer = null;
      var chunk = errorBuffer.join('');
      if (!errorBuffer || !chunk) {
        return;
      }
      var node = document.createTextNode(chunk);
      stderr.append(node);
      stderrFrame.srcdoc += chunk;
      errorBuffer.splice(0);
    }, 50);
  };
  var onNavigate = function onNavigate(event) {
    return navigate(event.data);
  };
  var refreshPhp = function refreshPhp() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _init = init;
    if (init) {
      window.addEventListener('message', onNavigate);
      if (php) {
        php.removeEventListener('ready', ready);
        php.removeEventListener('output', output);
        php.removeEventListener('error', error);
      }
      php = new _PhpWebDrupal.PhpWebDrupal({
        persist: {
          mountPath: '/persist'
        }
      });
      php.addEventListener('ready', ready);
      php.addEventListener('output', output);
      php.addEventListener('error', error);
      return php.binary;
    } else {
      return php.refresh();
    }
  };
  refreshPhp(true);
  ret.style.display = 'none';
  singleBox.addEventListener('input', function (event) {
    if (event.target.checked) {
      exitBox.style.display = 'none';
      ret.style.display = 'flex';
    } else {
      exitBox.style.display = 'flex';
      ret.style.display = 'none';
    }
  });
  exitLabel.innerText = '_';
  var rewriteDemo = "%3C%3Fphp%0Aini_set('session.save_path'%2C%20'%2Fhome%2Fweb_user')%3B%0A%0A%24stdErr%20%3D%20fopen('php%3A%2F%2Fstderr'%2C%20'w')%3B%0A%24errors%20%3D%20%5B%5D%3B%0A%0Aregister_shutdown_function(function()%20use(%24stdErr%2C%20%26%24errors)%7B%0A%20%20%20%20fwrite(%24stdErr%2C%20json_encode(%5B'session_id'%20%3D%3E%20session_id()%5D)%20.%20%22%5Cn%22)%3B%0A%20%20%20%20fwrite(%24stdErr%2C%20json_encode(%5B'headers'%3D%3Eheaders_list()%5D)%20.%20%22%5Cn%22)%3B%0A%20%20%20%20fwrite(%24stdErr%2C%20json_encode(%5B'errors'%20%3D%3E%20error_get_last()%5D)%20.%20%22%5Cn%22)%3B%0A%7D)%3B%0A%0Aset_error_handler(function(...%24args)%20use(%24stdErr%2C%20%26%24errors)%7B%0A%09fwrite(%24stdErr%2C%20print_r(%24args%2C1))%3B%0A%7D)%3B%0A%0A%24docroot%20%3D%20'%2Fpreload%2Fdrupal-7.59'%3B%0A%24path%20%20%20%20%3D%20'%2F'%3B%0A%24script%20%20%3D%20'index.php'%3B%0A%0A%24_SERVER%5B'REQUEST_URI'%5D%20%20%20%20%20%3D%20%24docroot%20.%20%24path%3B%0A%24_SERVER%5B'REMOTE_ADDR'%5D%20%20%20%20%20%3D%20'127.0.0.1'%3B%0A%24_SERVER%5B'SERVER_NAME'%5D%20%20%20%20%20%3D%20'localhost'%3B%0A%24_SERVER%5B'SERVER_PORT'%5D%20%20%20%20%20%3D%203333%3B%0A%24_SERVER%5B'REQUEST_METHOD'%5D%20%20%3D%20'GET'%3B%0A%24_SERVER%5B'SCRIPT_FILENAME'%5D%20%3D%20%24docroot%20.%20'%2F'%20.%20%24script%3B%0A%24_SERVER%5B'SCRIPT_NAME'%5D%20%20%20%20%20%3D%20%24docroot%20.%20'%2F'%20.%20%24script%3B%0A%24_SERVER%5B'PHP_SELF'%5D%20%20%20%20%20%20%20%20%3D%20%24docroot%20.%20'%2F'%20.%20%24script%3B%0A%0Achdir(%24docroot)%3B%0A%0Aob_start()%3B%0A%0Adefine('DRUPAL_ROOT'%2C%20getcwd())%3B%0A%0Arequire_once%20DRUPAL_ROOT%20.%20'%2Fincludes%2Fbootstrap.inc'%3B%0Adrupal_bootstrap(DRUPAL_BOOTSTRAP_FULL)%3B%0A%0A%24uid%20%20%20%20%20%3D%201%3B%0A%24user%20%20%20%20%3D%20user_load(%24uid)%3B%0A%24account%20%3D%20array('uid'%20%3D%3E%20%24user-%3Euid)%3B%0Auser_login_submit(array()%2C%20%24account)%3B%0A%0A%24itemPath%20%3D%20%24path%3B%0A%24itemPath%20%3D%20preg_replace('%2F%5E%5C%5C%2Fpreload%2F'%2C%20''%2C%20%24itemPath)%3B%0A%24itemPath%20%3D%20preg_replace('%2F%5E%5C%5C%2Fdrupal-7.59%2F'%2C%20''%2C%20%24itemPath)%3B%0A%24itemPath%20%3D%20preg_replace('%2F%5E%5C%2F%2F'%2C%20''%2C%20%24itemPath)%3B%0A%0Aif(%24itemPath)%0A%7B%0A%20%20%20%20%0A%20%20%20%20%24router_item%20%3D%20menu_get_item(%24itemPath)%3B%0A%20%20%20%20%24router_item%5B'access_callback'%5D%20%3D%20true%3B%0A%20%20%20%20%24router_item%5B'access'%5D%20%3D%20true%3B%0A%20%20%20%20%0A%20%20%20%20if%20(%24router_item%5B'include_file'%5D)%20%7B%0A%20%20%20%20%20%20require_once%20DRUPAL_ROOT%20.%20'%2F'%20.%20%24router_item%5B'include_file'%5D%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20%24page_callback_result%20%3D%20call_user_func_array(%24router_item%5B'page_callback'%5D%2C%20unserialize(%24router_item%5B'page_arguments'%5D))%3B%0A%20%20%20%20%0A%20%20%20%20drupal_deliver_page(%24page_callback_result)%3B%0A%7D%0Aelse%0A%7B%0A%20%20%20%20menu_execute_active_handler()%3B%0A%7D";
  if (query.has('code')) {
    if (query.get('code') === rewriteDemo) {
      query["delete"]('code');
      query.set('demo', 'drupal.php');
    }
  }
  if (query.has('demo')) {
    demo.value = String(query.get('demo'));
    loadDemo();
  } else if (query.has('code')) {
    editor.setValue(decodeURIComponent(query.get('code')));
  }
  if (query.has('render-as')) {
    document.querySelector("[name=render-as][value=".concat(query.get('render-as'), "]")).checked = true;
  }
  autorun.checked = Number(query.get('autorun'));
  persistBox.checked = Number(query.get('persist'));
  singleBox.checked = Number(query.get('single-expression'));
  if (demo.value !== 'drupal.php') {
    reset.style.display = 'none';
  }
  if (singleBox.checked) {
    exitBox.style.display = 'none';
    ret.style.display = 'flex';
  } else {
    exitBox.style.display = 'flex';
    ret.style.display = 'none';
  }
  setTimeout(function () {
    return editor.selection.moveCursorFileStart();
  }, 150);
  renderAs.map(function (radio) {
    if (query.get('render-as') === 'html') {
      stdout.style.display = 'none';
      stdoutFrame.style.display = 'flex';
      stderr.style.display = 'none';
      stderrFrame.style.display = 'flex';
      stdret.style.display = 'none';
      stdretFrame.style.display = 'flex';
    } else {
      stdout.style.display = 'flex';
      stdoutFrame.style.display = 'none';
      stderr.style.display = 'flex';
      stderrFrame.style.display = 'none';
      stdret.style.display = 'flex';
      stdretFrame.style.display = 'none';
    }
    radio.addEventListener('change', function (event) {
      var type = event.target.value;
      query.set('render-as', type);
      history.replaceState({}, document.title, "?" + query.toString());
      if (type === 'html') {
        stdout.style.display = 'none';
        stdoutFrame.style.display = 'flex';
        stderr.style.display = 'none';
        stderrFrame.style.display = 'flex';
        stdret.style.display = 'none';
        stdretFrame.style.display = 'flex';
      } else {
        stdout.style.display = 'flex';
        stdoutFrame.style.display = 'none';
        stderr.style.display = 'flex';
        stderrFrame.style.display = 'none';
        stdret.style.display = 'flex';
        stdretFrame.style.display = 'none';
      }
    });
  });
});
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map