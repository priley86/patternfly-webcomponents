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

	/* pf-touchspin webcomponent */
	__webpack_require__(24);

/***/ },

/***/ 24:
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
	 * <b>&lt;pf-touchspin&gt;</b> element for Patternfly Web Components
	 *
	 * <pf-touchspin></pf-touchspin>
	 */

	var PfTouchspin = exports.PfTouchspin = function (_HTMLElement) {
	  _inherits(PfTouchspin, _HTMLElement);

	  _createClass(PfTouchspin, [{
	    key: 'init',
	    value: function init() {
	      this._min = this.getAttribute('min') ? this.getAttribute('min') : 0;
	      this._max = this.getAttribute('max') ? this.getAttribute('max') : 100;
	      this._initVal = this.getAttribute('initval') ? this.getAttribute('initval') : "";
	      this._step = this.getAttribute('step') ? this.getAttribute('step') : 1;
	      this._decimals = this.getAttribute('decimals') ? this.getAttribute('decimals') : 0;
	      this._booster = this.getAttribute('booster') ? this.getAttribute('booster') : true;
	      this._boostat = this.getAttribute('boostat') ? this.getAttribute('boostat') : 10;
	      this._maxBoostedStep = this.getAttribute('maxboostedstep') ? this.getAttribute('maxboostedstep') : false;
	      this._stepInterval = this.getAttribute('stepinterval') ? this.getAttribute('stepinterval') : 100;
	      this._stepIntervalDelay = this.getAttribute('stepintervaldelay') ? this.getAttribute('stepintervaldelay') : 500;
	    }
	  }, {
	    key: 'connectedCallback',
	    value: function connectedCallback() {
	      var self = this;
	      var input = this.querySelector('input');
	      var down = this.querySelector('.bootstrap-touchspin-down');
	      var up = this.querySelector('.bootstrap-touchspin-up');

	      this.init();

	      input.addEventListener('keydown', function (event) {
	        var keycode = event.keyCode ? event.keyCode : event.which;
	        if (keycode === 38) {
	          if (true) {
	            self._up();
	            self._upSpin();
	          }
	          event.preventDefault();
	        } else if (keycode === 40) {
	          if (true) {
	            self._down();
	            self._downSpin();
	          }
	          event.preventDefault();
	        }
	      });

	      input.addEventListener('keyup', function (event) {
	        var keycode = event.keyCode ? event.keyCode : event.which;
	        if (keycode === 38) {
	          self._stop();
	        } else if (keycode === 40) {
	          self._stop();
	        }
	      });

	      down.addEventListener('mousedown', function (event) {
	        if (input.classList.contains('disabled')) {
	          return;
	        }

	        self._down();
	        self._downSpin();

	        event.preventDefault();
	        event.stopPropagation();
	      });

	      down.addEventListener('mouseup', function (event) {
	        if (!this._spinning) {
	          return;
	        }

	        event.selfPropagation();
	        self._stop();
	      });
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
	    value: function attributeChangedCallback(attrName, oldValue, newValue) {
	      this.init();
	    }

	    /**
	     * Called when an instance of the element is created
	     */

	  }]);

	  function PfTouchspin() {
	    _classCallCheck(this, PfTouchspin);

	    return _possibleConstructorReturn(this, (PfTouchspin.__proto__ || Object.getPrototypeOf(PfTouchspin)).call(this));
	  }

	  /**
	   *
	   * @param {*} value
	   */


	  _createClass(PfTouchspin, [{
	    key: '_boostedStep',
	    value: function _boostedStep(value) {
	      if (!this._booster) {
	        return this._step;
	      }
	      if (isNaN(this._spincount)) {
	        this._spincount = 0;
	      }
	      var boosted = Math.pow(2, Math.floor(this._spincount / this._boostat)) * this._step;

	      if (this._maxBoostedStep) {
	        if (boosted > this._maxBoostedstep) {
	          boosted = this._maxBoostedStep;
	          value = Math.round(value / boosted) * boosted;
	        }
	      }

	      return Math.max(this._step, boosted);
	    }

	    /**
	     * increment input value
	     */

	  }, {
	    key: '_up',
	    value: function _up() {
	      var val = void 0,
	          boostedStep = void 0;
	      val = parseFloat(this.querySelector('input').value);
	      if (isNaN(val)) {
	        val = 0;
	      }

	      boostedStep = this._boostedStep(val);

	      val = val + boostedStep;

	      if (val > this._max) {
	        val = this._max;
	        this.dispatchEvent(new CustomEvent('pf-touchspin.max', {}));
	        this._stop();
	      }

	      this.querySelector('input').value = val.toFixed(this._decimals);
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_down',
	    value: function _down() {
	      var val = void 0,
	          boostedStep = void 0;
	      val = parseFloat(this.querySelector('input').value);
	      if (isNaN(val)) {
	        val = 0;
	      }

	      boostedStep = this._boostedStep(val);

	      val = val - boostedStep;

	      if (val < this._min) {
	        val = this._min;
	        this.dispatchEvent(new CustomEvent('pf-touchspin.min', {}));
	        this._stop();
	      }

	      this.querySelector('input').value = val.toFixed(this._decimals);
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_downSpin',
	    value: function _downSpin() {
	      var self = this;
	      this._stop();

	      this._spincount = 0;
	      this._spinning = 'down';

	      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
	      this.dispatchEvent(new CustomEvent('pf-touchspin.startdownspin', {}));

	      this._downDelayTimeout = setTimeout(function () {
	        this._downSpinTimer = setInterval(function () {
	          this._spincount++;
	          self._down();
	        }, this._stepInterval);
	      }, this._stepIntervalDelay);
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_upSpin',
	    value: function _upSpin() {
	      var self = this;
	      this._stop();

	      this._spincount = 0;
	      this._spinning = 'up';

	      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
	      this.dispatchEvent(new CustomEvent('pf-touchspin.startupspin', {}));

	      this._upDelayTimeout = setTimeout(function () {
	        this._upSpinTimer = setInterval(function () {
	          this._spincount++;
	          self._up();
	        }, this._stepInterval);
	      }, this._stepIntervalDelay);
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_stop',
	    value: function _stop() {

	      clearTimeout(this._downDelayTimeout);
	      clearTimeout(this._upDelayTimeout);
	      clearInterval(this._downSpinTimer);
	      clearInterval(this._upSpinTimer);

	      switch (this._spinning) {
	        case 'up':
	          this.dispatchEvent(new CustomEvent('pf-touchspin.stopupspin', {}));
	          this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));

	          break;
	        case 'down':
	          this.dispatchEvent(new CustomEvent('pf-touchspin.stopdownspin', {}));
	          this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));
	          break;
	      }

	      this._spincount = 0;
	      this._spinning = false;
	    }
	  }]);

	  return PfTouchspin;
	}(HTMLElement);

	window.customElements.define('pf-touchspin', PfTouchspin);

/***/ }

/******/ });