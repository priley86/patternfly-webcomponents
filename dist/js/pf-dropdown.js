/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* pf-dropdown webcomponent */
	__webpack_require__(23);

/***/ },

/***/ 23:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 *
	 *
	 */

	var PfDropdown = exports.PfDropdown = function (_HTMLElement) {
	  _inherits(PfDropdown, _HTMLElement);

	  function PfDropdown() {
	    _classCallCheck(this, PfDropdown);

	    return _possibleConstructorReturn(this, (PfDropdown.__proto__ || Object.getPrototypeOf(PfDropdown)).apply(this, arguments));
	  }

	  _createClass(PfDropdown, [{
	    key: 'attachedCallback',


	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      var self = this;
	      var button = this.querySelector('[data-toggle="dropdown"]');
	      button.addEventListener('click', function () {
	        self._showDropdown();
	      });
	      document.addEventListener('click', function (event) {
	        if (event.target !== self && !self.contains(event.target)) {
	          self._clearDropdown(button);
	        }
	      });
	      //this._detectTouch();
	    }

	    /**
	     * Called when element's attribute value has changed
	     *
	     * @param {string} attrName The attribute name that has changed
	     * @param {string} oldValue The old attribute value
	     * @param {string} newValue The new attribute value
	     */

	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(attrName, oldValue, newValue) {}

	    /**
	     * Called when an instance of the element is created
	     */

	  }, {
	    key: 'createdCallback',
	    value: function createdCallback() {}

	    /**
	     *Toggle the dropdown
	     */

	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this._showDropdown();
	    }

	    /**
	     * Open the dropdown
	     */

	  }, {
	    key: '_showDropdown',
	    value: function _showDropdown() {
	      var button = this.querySelector('[data-toggle="dropdown"]');
	      if (/\bdisabled/.test(button.className)) {
	        return;
	      }
	      var active = this.classList.contains('open');
	      if (!active) {
	        this._detectTouch();
	        this.dispatchEvent(new CustomEvent('show.bs.dropdown', {}));
	        button.setAttribute('aria-expanded', 'true');
	        this.classList.toggle('open');
	        this.dispatchEvent(new CustomEvent('shown.bs.dropdown', {}));
	      }
	      if (active) {
	        this._clearDropdown(button);
	      }
	    }

	    /**
	     * Close the dropdown
	     *
	     * @param {HTMLElement} value the button element
	     */

	  }, {
	    key: '_clearDropdown',
	    value: function _clearDropdown(button) {
	      //let backdrop = this.querySelector('.dropdown-backdrop');
	      //backdrop.parentNode.removeChild(backdrop);
	      this.dispatchEvent(new CustomEvent('hide.bs.dropdown', {}));
	      button.setAttribute('aria-expanded', 'false');
	      this.classList.remove('open');
	      this.dispatchEvent(new CustomEvent('hidden.bs.dropdown', {}));
	    }

	    /**
	     * Support for phone browser
	     *
	     */

	  }, {
	    key: '_detectTouch',
	    value: function _detectTouch() {
	      if ('ontouchstart' in document.documentElement) {
	        var div = document.createElement('div');
	        div.classList.add('dropdown-backdrop');
	        self.insertBefore(div, this.childNodes[0]);
	        div.addEventListener('click', this._clearDropdown);
	      }
	    }
	  }]);

	  return PfDropdown;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-dropdown', PfDropdown);
	})();

/***/ }

/******/ });