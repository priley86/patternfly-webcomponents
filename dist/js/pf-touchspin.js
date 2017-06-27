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
	__webpack_require__(31);

/***/ },

/***/ 31:
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
	 * <pf-touchspin id="touchspin" class="input-group bootstrap-touchspin" decimals="2" step="0.1">
	 *  <span class="input-group-btn">
	 *    <button class="btn btn-default bootstrap-touchspin-down" type="button">-</button>
	 *  </span>
	 *  <input value="50.00" type="text" class="form-control">
	 *  <span class="input-group-btn">
	 *    <button class="btn btn-default bootstrap-touchspin-up" type="button">+</button>
	 *  </span>
	 * </pf-touchspin>
	 *
	 * @prop {number} min the minimum value
	 * @prop {number} max the maximum value
	 * @prop {number} step Increment/Decrement in value on up/down
	 * @prop {number} decimals decimal points in value
	 * @prop {boolean} booster if true, spinner will become faster continousally on holding down the button
	 * @prop {number} boostat boost at every nth step
	 * @prop {number} maxboostedstep maximum step when boosted
	 * @prop {number} stepinterval refresh reate of spinner in millisecond
	 * @prop {number} stepintervaldelay delay before sppiner starts to spin(millisecond)
	 * @prop {string} forcestepdivisibility force the value to be divisible by step value: 'none' | 'round' | 'floor' | 'ceil'
	 *
	 */

	var PfTouchspin = exports.PfTouchspin = function (_HTMLElement) {
	  _inherits(PfTouchspin, _HTMLElement);

	  _createClass(PfTouchspin, [{
	    key: 'init',
	    value: function init() {
	      this._min = parseFloat(this.getAttribute('min')) ? this.getAttribute('min') : 0;
	      this._max = parseFloat(this.getAttribute('max')) ? this.getAttribute('max') : 100;
	      this._step = parseFloat(this.getAttribute('step')) ? this.getAttribute('step') : 1;
	      this._decimals = parseInt(this.getAttribute('decimals')) ? this.getAttribute('decimals') : 0;
	      this._booster = this.getAttribute('booster') ? this.getAttribute('booster') : true;
	      this._boostat = parseInt(this.getAttribute('boostat')) ? this.getAttribute('boostat') : 10;
	      this._maxBoostedStep = this.getAttribute('maxboostedstep') ? this.getAttribute('maxboostedstep') : false;
	      this._stepInterval = this.getAttribute('stepinterval') ? this.getAttribute('stepinterval') : 100;
	      this._stepIntervalDelay = this.getAttribute('stepintervaldelay') ? this.getAttribute('stepintervaldelay') : 500;
	      this._forceStepDivisibility = this.getAttribute('forcestepdivisibility') ? this.getAttribute('forcestepdivisibility') : 'round';
	      this._spinning = false;
	      this.spincount = 0;
	    }
	  }, {
	    key: 'connectedCallback',
	    value: function connectedCallback() {
	      var self = this;
	      var input = this.querySelector('input');
	      var down = this.querySelector('.bootstrap-touchspin-down');
	      var up = this.querySelector('.bootstrap-touchspin-up');
	      this.init();

	      // support for up/down keys
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

	      // support for click foe down spin
	      down.addEventListener('mousedown', function (event) {
	        if (input.classList.contains('disabled')) {
	          return;
	        }
	        self._down();
	        self._downSpin();

	        event.preventDefault();
	        event.stopPropagation();
	      });

	      document.addEventListener('mouseup', function (event) {

	        event.preventDefault();
	        self._stop();
	      });

	      up.addEventListener('mousedown', function (event) {
	        if (input.classList.contains('disabled')) {
	          return;
	        }

	        self._up();
	        self._upSpin();

	        event.preventDefault();
	        event.stopPropagation();
	      });

	      // stop spinning if mouse is not over buttons
	      down.addEventListener('mouseout', function (event) {
	        event.stopPropagation();
	        self._stop();
	      });

	      up.addEventListener('mouseout', function (event) {

	        event.stopPropagation();
	        self._stop();
	      });

	      //support for mouse scroll
	      document.addEventListener('wheel', function (event) {
	        var delta = -event.deltaY;
	        if (input !== document.activeElement) {
	          return;
	        }
	        event.stopPropagation();
	        event.preventDefault();
	        if (delta < 0) {
	          self._down();
	        } else {
	          self._up();
	        }
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
	   * force the valur to be divisible by step
	   *
	   * @param {number} value
	   */


	  _createClass(PfTouchspin, [{
	    key: '_stepDivisibility',
	    value: function _stepDivisibility(value) {
	      switch (this._forceStepDivisibility) {
	        case 'round':
	          return (Math.round(value / this._step) * this._step).toFixed(this._decimals);
	        case 'floor':
	          return (Math.floor(value / this._step) * this._step).toFixed(this._decimals);
	        case 'ceil':
	          return (Math.ceil(value / this._step) * this._step).toFixed(this._decimals);
	        default:
	          return value;
	      }
	    }

	    /**
	     * check the value before change in value
	     */

	  }, {
	    key: '_checkValue',
	    value: function _checkValue() {
	      var val = void 0,
	          parsedval = void 0,
	          returnval = void 0;

	      val = this.querySelector('input').value;

	      if (this._decimals > 0 && val === '.') {
	        return;
	      }

	      parsedval = parseFloat(val);

	      if (isNaN(parsedval)) {
	        parsedval = 0;
	      }

	      returnval = parsedval;

	      if (parsedval.toString() !== val) {
	        returnval = parsedval;
	      }

	      if (parsedval < this.min) {
	        returnval = this.min;
	      }

	      if (parsedval > this.max) {
	        returnval = this.max;
	      }

	      returnval = this._stepDivisibility(returnval);

	      if (Number(val).toString() !== returnval.toString()) {
	        this.querySelector('input').value = returnval;
	      }
	    }

	    /**
	     * boost the value
	     *
	     * @param {number} value
	     */

	  }, {
	    key: '_boostedStep',
	    value: function _boostedStep(value) {
	      if (!this._booster) {
	        return this._step;
	      }
	      var boosted = Math.pow(2, Math.floor(this.spincount / this._boostat)) * this._step;

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

	      this._checkValue();

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

	      val = parseFloat(val).toFixed(this._decimals);

	      this.querySelector('input').value = val;
	    }

	    /**
	     *  decrement input value
	     */

	  }, {
	    key: '_down',
	    value: function _down() {
	      var val = void 0,
	          boostedStep = void 0;

	      this._checkValue();

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

	      val = parseFloat(val).toFixed(this._decimals);

	      this.querySelector('input').value = val;
	    }

	    /**
	     * Decremental spinner
	     *
	     */

	  }, {
	    key: '_downSpin',
	    value: function _downSpin() {
	      var self = this;
	      this._stop();

	      this.spincount = 0;
	      this._spinning = 'down';

	      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
	      this.dispatchEvent(new CustomEvent('pf-touchspin.startdownspin', {}));

	      this._downDelayTimeout = setTimeout(function () {
	        self._downSpinTimer = setInterval(function () {
	          self.spincount++;
	          self._down();
	        }, self._stepInterval);
	      }, this._stepIntervalDelay);
	    }

	    /**
	     * Incremental spinner
	     */

	  }, {
	    key: '_upSpin',
	    value: function _upSpin() {
	      var self = this;
	      this._stop();

	      this.spincount = 0;
	      this._spinning = 'up';

	      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
	      this.dispatchEvent(new CustomEvent('pf-touchspin.startupspin', {}));

	      this._upDelayTimeout = setTimeout(function () {
	        self._upSpinTimer = setInterval(function () {
	          self.spincount++;
	          self._up();
	        }, self._stepInterval);
	      }, this._stepIntervalDelay);
	    }

	    /**
	     * Stop the spinner
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

	      this.spincount = 0;
	      this._spinning = false;
	    }
	  }]);

	  return PfTouchspin;
	}(HTMLElement);

	window.customElements.define('pf-touchspin', PfTouchspin);

/***/ }

/******/ });