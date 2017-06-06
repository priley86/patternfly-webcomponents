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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** PF Accordion Component **/
	__webpack_require__(2);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAccordion = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAccordionPanel = __webpack_require__(3);

	var _pfAccordionPanel2 = _interopRequireDefault(_pfAccordionPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * <b>&lt;pf-accordion&gt;</b> element for Patternfly Web Components
	 *
	 * @example {@lang xml}
	 * <pf-accordion>
	 *   <pf-accordion-panel>
	 *     <pf-accordion-heading>
	 *       <h4 class="panel-title">
	 *         <a role="button" data-toggle="collapse" href="#">
	 *           Collapsible Group Item #1
	 *         </a>
	 *       </h4>
	 *     </pf-accordion-heading>
	 *     <pf-accordion-template open>
	 *       <pf-accordion-body>
	 *         Collapse CONTENT 1
	 *       </pf-accordion-body>
	 *     </pf-accordion-template>
	 *   </pf-accordion-panel>
	 *   <pf-accordion-panel class="panel panel-primary">
	 *     <pf-accordion-heading>
	 *       <h4 class="panel-title">
	 *         <a role="button" data-toggle="collapse" href="#">
	 *           Collapsible Group Item #2
	 *         </a>
	 *       </h4>
	 *     </pf-accordion-heading>
	 *     <pf-accordion-template>
	 *       <pf-accordion-body>
	 *         Collapse CONTENT 2
	 *       </pf-accordion-body>
	 *     </pf-accordion-template>
	 *   </pf-accordion-panel>
	 * </pf-accordion>
	 *
	 */
	var PfAccordion = exports.PfAccordion = function (_HTMLElement) {
	  _inherits(PfAccordion, _HTMLElement);

	  function PfAccordion() {
	    _classCallCheck(this, PfAccordion);

	    return _possibleConstructorReturn(this, (PfAccordion.__proto__ || Object.getPrototypeOf(PfAccordion)).apply(this, arguments));
	  }

	  _createClass(PfAccordion, [{
	    key: 'createdCallback',

	    /**
	     * Called when an instance of the element is created
	     */
	    value: function createdCallback() {
	      this._openPanels = [];
	    }

	    /**
	     * Called when an instance was inserted into the document
	     */

	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      var _this2 = this;

	      this.classList.add('panel-group');
	      this.setAttribute('role', 'tablist');
	      this.setAttribute('aria-multiselectable', 'true');

	      var nodes = this.querySelectorAll('pf-accordion-panel > pf-accordion-template');
	      if (nodes) {
	        [].forEach.call(nodes, function (panel) {
	          if (panel._initialized) {
	            if (panel.state === 'shown') {
	              _this2._openPanels.push(panel);
	            }
	          } else {
	            panel.addEventListener('initialized', function () {
	              if (panel.state === 'shown') {
	                _this2._openPanels.push(panel);
	              }
	            });
	          }
	        });
	      }

	      // catch bubbled events
	      this.addEventListener('show.bs.collapse', this._handlePanelShown.bind(this));
	      this.addEventListener('hide.bs.collapse', this._handlePanelHidden.bind(this));

	      this._obeserver = new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutationRecord) {
	          if (mutationRecord.type === 'childList') {
	            // handle dynamic addition of panels
	            for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
	              var node = mutationRecord.addedNodes[i];
	              if (node.nodeName === 'PF-ACCORDION-PANEL') {
	                var panel = node.querySelector('pf-accordion-template');
	                if (panel !== null) {
	                  if (panel.state === 'shown') {
	                    _this2._openPanels.push(panel);
	                  }
	                }
	              }
	            }

	            // handle removal of panels
	            for (var _i = 0; _i < mutationRecord.removedNodes.length; _i++) {
	              var _node = mutationRecord.addedNodes[_i];
	              if (_node instanceof _pfAccordionPanel2.default) {
	                var _panel = _node.querySelector('pf-accordion-template');
	                if (_panel !== null) {
	                  var index = _this2._openPanels.indexOf(_panel);
	                  if (index > -1) {
	                    _this2._openPanels.splice(index, 1);
	                  }
	                }
	              }
	            }
	          }
	        });
	      });

	      this._obeserver.observe(this, { childList: true });
	    }

	    /**
	     * Handle bubbled hide.bs.collapse on accordion
	     * @param {Event} e event
	     * @private
	     */

	  }, {
	    key: '_handlePanelHidden',
	    value: function _handlePanelHidden(e) {
	      var index = this._openPanels.indexOf(e.target);
	      if (index > -1) {
	        this._openPanels.splice(index, 1);
	      }
	    }

	    /**
	     * Handle bubbled show.bs.collapse on accordion
	     * @param {Event} e event
	     * @private
	     */

	  }, {
	    key: '_handlePanelShown',
	    value: function _handlePanelShown(e) {
	      var panel = void 0;
	      while (panel = this._openPanels.shift()) {
	        panel.hide();
	      }
	      this._openPanels.push(e.target);
	    }

	    /**
	     * Called when the element is removed from the DOM
	     */

	  }, {
	    key: 'detachedCallback',
	    value: function detachedCallback() {
	      this._obeserver.disconnect();
	    }
	  }]);

	  return PfAccordion;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-accordion', PfAccordion);
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAccordionPanel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAccordionHeading = __webpack_require__(4);

	var _pfAccordionHeading2 = _interopRequireDefault(_pfAccordionHeading);

	var _pfAccordionTemplate = __webpack_require__(5);

	var _pfAccordionTemplate2 = _interopRequireDefault(_pfAccordionTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
	 *
	 */
	var PfAccordionPanel = exports.PfAccordionPanel = function (_HTMLElement) {
	  _inherits(PfAccordionPanel, _HTMLElement);

	  function PfAccordionPanel() {
	    _classCallCheck(this, PfAccordionPanel);

	    return _possibleConstructorReturn(this, (PfAccordionPanel.__proto__ || Object.getPrototypeOf(PfAccordionPanel)).apply(this, arguments));
	  }

	  _createClass(PfAccordionPanel, [{
	    key: 'createdCallback',

	    /**
	     * Called when an instance of the element is created
	     */
	    value: function createdCallback() {
	      this._initDefaults();
	    }

	    /**
	     * Called when an instance of the element was inserted into the document
	     */

	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      this._setClasses();
	    }

	    /**
	     * Returns a list of attributes on which we are interested to track changes
	     * @returns {String[]}
	     */

	  }, {
	    key: 'attributeChangedCallback',


	    /**
	     * Called when element's attribute value has changed
	     *
	     * @param {string} attrName The attribute name that has changed
	     * @param {string} oldValue The old attribute value
	     * @param {string} newValue The new attribute value
	     */
	    value: function attributeChangedCallback(attrName, oldValue, newValue) {
	      switch (attrName) {
	        case 'open':
	          this.state = this.hasAttribute('open') ? 'shown' : 'hidden';
	          break;
	        case 'class':
	          this._setClasses();
	          break;
	      }
	    }

	    /**
	     * Sets default constants
	     * @private
	     */

	  }, {
	    key: '_initDefaults',
	    value: function _initDefaults() {
	      this._classes = {
	        'context': {
	          'classes': ['panel-default', 'panel-primary', 'panel-warning', 'panel-success', 'panel-danger'],
	          'default': 'panel-default'
	        }
	      };
	    }

	    /**
	     * Sets default classes on the component
	     * @private
	     */

	  }, {
	    key: '_setClasses',
	    value: function _setClasses() {
	      var _this2 = this;

	      // add default class for this component
	      if (!this.classList.contains('panel')) {
	        this.classList.add('panel');
	      }

	      var hasClass = false;
	      this._classes.context.classes.forEach(function (clazz) {
	        hasClass = hasClass || _this2.classList.contains(clazz);
	      });

	      if (!hasClass) {
	        this.classList.add(this._classes.context.default);
	      }
	    }
	  }], [{
	    key: 'observedAttributes',
	    get: function get() {
	      return ['open', 'class'];
	    }
	  }]);

	  return PfAccordionPanel;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-accordion-panel', PfAccordionPanel);
	})();

/***/ },
/* 4 */
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
	 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
	 *
	 */
	var PfAccordionHeading = exports.PfAccordionHeading = function (_HTMLElement) {
	  _inherits(PfAccordionHeading, _HTMLElement);

	  function PfAccordionHeading() {
	    _classCallCheck(this, PfAccordionHeading);

	    return _possibleConstructorReturn(this, (PfAccordionHeading.__proto__ || Object.getPrototypeOf(PfAccordionHeading)).apply(this, arguments));
	  }

	  _createClass(PfAccordionHeading, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      var _this2 = this;

	      this.classList.add('panel-heading');
	      this.setAttribute('role', 'tab');

	      this._target = this.parentElement.querySelector('pf-accordion-template');
	      if (this._target) {
	        if (this._target._initialized) {
	          this._initializeToggle();
	        } else {
	          this._target.addEventListener('initialized', function () {
	            _this2._initializeToggle();
	          });
	        }
	      }
	    }

	    /**
	     * Finds the toggle element and adds appropriate listeners to it.
	     * @private
	     */

	  }, {
	    key: '_initializeToggle',
	    value: function _initializeToggle() {
	      var _this3 = this;

	      this._toggle = this.querySelector('*[data-toggle="collapse"]');
	      this._toggleClickHandler = this._handleToggleClick.bind(this);
	      this._toggle.addEventListener('click', this._toggleClickHandler);

	      if (this._target !== null) {
	        if (this._target.state === 'shown') {
	          this._toggle.classList.remove('collapsed');
	          this._toggle.setAttribute('aria-expanded', 'true');
	        } else {
	          this._toggle.classList.add('collapsed');
	          this._toggle.setAttribute('aria-expanded', 'false');
	        }
	        this._target.addEventListener('show.bs.collapse', function () {
	          _this3._toggle.classList.remove('collapsed');
	          _this3._toggle.setAttribute('aria-expanded', 'true');
	        });
	        this._target.addEventListener('hide.bs.collapse', function () {
	          _this3._toggle.classList.add('collapsed');
	          _this3._toggle.setAttribute('aria-expanded', 'false');
	        });
	      }
	    }

	    /**
	     * Handle click event on the toggle element
	     * @private
	     */

	  }, {
	    key: '_handleToggleClick',
	    value: function _handleToggleClick() {
	      if (this._target) {
	        this._target.toggle();
	      }
	    }
	  }]);

	  return PfAccordionHeading;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-accordion-heading', PfAccordionHeading);
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAccordionTemplate = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAccordionBody = __webpack_require__(6);

	var _pfAccordionBody2 = _interopRequireDefault(_pfAccordionBody);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
	 *
	 * @prop {string} state the state of the panel, 'hidden' or 'shown
	 */
	var PfAccordionTemplate = exports.PfAccordionTemplate = function (_HTMLElement) {
	  _inherits(PfAccordionTemplate, _HTMLElement);

	  function PfAccordionTemplate() {
	    _classCallCheck(this, PfAccordionTemplate);

	    return _possibleConstructorReturn(this, (PfAccordionTemplate.__proto__ || Object.getPrototypeOf(PfAccordionTemplate)).apply(this, arguments));
	  }

	  _createClass(PfAccordionTemplate, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      this.classList.add('panel-collapse');
	      this.classList.add('collapse');
	      this.setAttribute('role', 'tabpanel');

	      if (this.hasAttribute('open')) {
	        this._state = 'shown';
	        this.classList.add('in');
	      } else if (this.classList.contains('in')) {
	        this._state = 'shown';
	        this.setAttribute('open', '');
	      } else {
	        this._state = 'hidden';
	      }
	      this.addEventListener('transitionend', this._handleTransitionEnd);

	      this._initialized = true;
	      this.dispatchEvent(new Event('initialized'));
	    }

	    /**
	     * Called when an instance of the element is created
	     */

	  }, {
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._initialized = false;
	      this._transitioning = false;
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
	      if (attrName === "open") {
	        this.state = this.hasAttribute('open') ? 'shown' : 'hidden';
	      }
	    }

	    /**
	     * Performs a collapse state change action.
	     * Compatibility function for Bootstrap collapse plugin.
	     *
	     * @param {String} state state of the panel
	     */

	  }, {
	    key: 'collapse',
	    value: function collapse(state) {
	      switch (state) {
	        case 'show':
	          this.show();
	          break;
	        case 'hide':
	          this.hide();
	          break;
	        case 'toggle':
	          this.toggle();
	          break;
	      }
	    }

	    /**
	     * Make the panel visible
	     */

	  }, {
	    key: 'show',
	    value: function show() {
	      if (this._state !== 'shown' && !this._transitioning) {
	        this._transitioning = true;
	        this.dispatchEvent(new CustomEvent('show.bs.collapse', {
	          bubbles: true,
	          cancelable: false
	        }));
	        this._state = 'shown';
	        this.classList.remove('collapse');
	        this.classList.add('collapsing');
	        var body = this.querySelector('pf-accordion-body');
	        var maxHeight = body ? body.clientHeight : 0;
	        this.style.height = maxHeight + 'px';
	      }
	    }

	    /**
	     * Hide the panel
	     */

	  }, {
	    key: 'hide',
	    value: function hide() {
	      if (this._state !== 'hidden' && !this._transitioning) {
	        var body = this.querySelector('pf-accordion-body');
	        var maxHeight = body ? body.clientHeight : 0;
	        this._transitioning = true;
	        this.dispatchEvent(new CustomEvent('hide.bs.collapse', {
	          bubbles: true,
	          cancelable: false
	        }));
	        this._state = 'hidden';
	        this.style.height = maxHeight + 'px';

	        var _self = this;

	        // this is necessary for the animation to start properly
	        requestAnimationFrame(function () {
	          _self.classList.add('collapsing');
	          _self.classList.remove('collapse');
	          _self.classList.remove('in');
	          _self.style.height = '0px';
	        });
	      }
	    }

	    /**
	     * Toggle the visiblity of the panel
	     */

	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      if (this._state === 'shown') {
	        this.hide();
	      } else {
	        this.show();
	      }
	    }

	    /**
	     * Handles the transitionend event.
	     * @private
	     */

	  }, {
	    key: '_handleTransitionEnd',
	    value: function _handleTransitionEnd() {
	      if (this._transitioning) {
	        this.classList.remove('collapsing');
	        this.classList.add('collapse');
	        if (this._state === 'shown') {
	          this.classList.add('in');
	          this.dispatchEvent(new CustomEvent('shown.bs.collapse', {
	            bubbles: true
	          }));
	        } else {
	          this.dispatchEvent(new CustomEvent('hidden.bs.collapse', {
	            bubbles: true
	          }));
	        }
	        this.style.height = '';
	        this._transitioning = false;
	      }
	    }

	    /**
	     * Get the display state of the panel
	     *
	     * @returns {string} the display state, either 'shown' or 'hidden'
	     */

	  }, {
	    key: 'state',
	    get: function get() {
	      return this._state;
	    }

	    /**
	     * Set the display state of the panel
	     *
	     * @param {string} value the display state, either 'shown' or 'hidden'
	     */
	    ,
	    set: function set(value) {
	      if (this._state !== value) {
	        switch (value) {
	          case 'shown':
	            this.show();
	            break;
	          case 'hidden':
	            this.hide();
	            break;
	        }
	      }
	    }
	  }]);

	  return PfAccordionTemplate;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-accordion-template', PfAccordionTemplate);
	})();

/***/ },
/* 6 */
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
	 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
	 *
	 */
	var PfAccordionBody = exports.PfAccordionBody = function (_HTMLElement) {
	  _inherits(PfAccordionBody, _HTMLElement);

	  function PfAccordionBody() {
	    _classCallCheck(this, PfAccordionBody);

	    return _possibleConstructorReturn(this, (PfAccordionBody.__proto__ || Object.getPrototypeOf(PfAccordionBody)).apply(this, arguments));
	  }

	  _createClass(PfAccordionBody, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      this.classList.add('panel-body');
	    }
	  }]);

	  return PfAccordionBody;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-accordion-body', PfAccordionBody);
	})();

/***/ }
/******/ ]);