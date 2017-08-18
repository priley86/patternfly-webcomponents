/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * PfUtil
 * Internal Utility Functions for Patternfly Web Components
 * --------------------------------------------------------------------------
 */

var PfUtil = function () {
  function PfUtil() {
    _classCallCheck(this, PfUtil);

    this.isMSIE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null ? parseFloat(RegExp.$1) : false;
    this.isIE = /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  _createClass(PfUtil, [{
    key: 'addClass',
    value: function addClass(el, c) {
      // where modern browsers fail, use classList
      if (el.classList) {
        el.classList.add(c);
      } else {
        el.className += ' ' + c;
        el.offsetWidth;
      }
    }
  }, {
    key: 'removeClass',
    value: function removeClass(el, c) {
      if (el.classList) {
        el.classList.remove(c);
      } else {
        el.className = el.className.replace(c, '').replace(/^\s+|\s+$/g, '');
      }
    }
  }, {
    key: 'getClosest',
    value: function getClosest(el, s) {
      //el is the element and s the selector of the closest item to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var former = s.charAt(0);
      var latter = s.substr(1);
      for (; el && el !== document; el = el.parentNode) {
        // Get closest match
        if (former === '#') {
          // If selector is an ID
          if (el.id === latter) {
            return el;
          }
        } else if (former === '.') {
          // If selector is a class
          if (new RegExp(latter).test(el.className)) {
            return el;
          }
        } else {
          // we assume other selector is tag name
          if (el.nodeName === s) {
            return el;
          }
        }
      }
      return false;
    }

    // tooltip / popover stuff

  }, {
    key: 'isElementInViewport',
    value: function isElementInViewport(t) {
      // check if this.tooltip is in viewport
      var r = t.getBoundingClientRect();
      return r.top >= 0 && r.left >= 0 && r.bottom <= (window.innerHeight || document.documentElement.clientHeight) && r.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }, {
    key: 'getScroll',
    value: function getScroll() {
      // also Affix and scrollSpy uses it
      return {
        y: window.pageYOffset || document.documentElement.scrollTop,
        x: window.pageXOffset || document.documentElement.scrollLeft
      };
    }
  }, {
    key: 'reflow',
    value: function reflow(el) {
      // force reflow
      return el.offsetHeight;
    }
  }, {
    key: 'once',
    value: function once(el, type, listener, self) {
      var one = function one(e) {
        try {
          listener.call(self, e);
        } finally {
          el.removeEventListener(type, one);
        }
      };

      el.addEventListener(type, one);
    }

    // the following 2 methods were taken from bootstrap.native - Native Javascript for Bootstrap 4
    // https://github.com/thednp/bootstrap.native
    // Copyright (c) 2015 dnp_theme

  }, {
    key: 'getOuterHeight',
    value: function getOuterHeight(child) {
      var childStyle = child && window.getComputedStyle(child),
          btp = /px/.test(childStyle.borderTopWidth) ? Math.round(childStyle.borderTopWidth.replace('px', '')) : 0,
          btb = /px/.test(childStyle.borderBottomWidth) ? Math.round(childStyle.borderBottomWidth.replace('px', '')) : 0,
          mtp = /px/.test(childStyle.marginTop) ? Math.round(childStyle.marginTop.replace('px', '')) : 0,
          mbp = /px/.test(childStyle.marginBottom) ? Math.round(childStyle.marginBottom.replace('px', '')) : 0;
      return child.clientHeight + parseInt(btp) + parseInt(btb) + parseInt(mtp) + parseInt(mbp);
    }
  }, {
    key: 'getMaxHeight',
    value: function getMaxHeight(parent) {
      // get collapse trueHeight and border
      var parentHeight = 0;
      for (var k = 0, ll = parent.children.length; k < ll; k++) {
        parentHeight += parent.children[k].offsetHeight;
      }
      return parentHeight;
    }
  }, {
    key: 'getAttributeOrProperty',
    value: function getAttributeOrProperty(element, attribute) {
      // checks element attributes and then properties
      // React commonly gives us a node with attributes, when Angular adds it as a property
      return element.attributes && element.attributes[attribute] ? element.attributes[attribute].value : element[attribute];
    }
  }]);

  return PfUtil;
}();

var pfUtil = new PfUtil();
exports.pfUtil = pfUtil;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTabContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTabContent = __webpack_require__(11);

var _pfTabContent2 = _interopRequireDefault(_pfTabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tab-content&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 * @prop {string} class the tab ul class
 * @prop {string} contentId the content id which describes this tabs content
 * @prop {string} active whether this tab is currently active
 */
var PfTabContent = exports.PfTabContent = function (_HTMLElement) {
  _inherits(PfTabContent, _HTMLElement);

  _createClass(PfTabContent, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this.firstElementChild.setAttribute('role', 'tabpanel');
      this.firstElementChild.setAttribute('aria-labelledby', this.getAttribute('content-id'));
      this.initialized = true;
      this.dispatchEvent(new CustomEvent('pf-tab-content.initialized', {}));
    }

    /*
     * An instance of the element is created or upgraded
     */

  }]);

  function PfTabContent() {
    _classCallCheck(this, PfTabContent);

    return _possibleConstructorReturn(this, (PfTabContent.__proto__ || Object.getPrototypeOf(PfTabContent)).call(this));
  }

  return PfTabContent;
}(HTMLElement);

window.customElements.define('pf-tab-content', PfTabContent);

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabContentTemplate = "\n<div role=\"tabpanel\"></div>\n";
exports.default = PfTabContentTemplate;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Tabs Component **/
__webpack_require__(5);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTab = __webpack_require__(6);

var _pfTab2 = _interopRequireDefault(_pfTab);

var _pfTabs = __webpack_require__(7);

var _pfTabs2 = _interopRequireDefault(_pfTabs);

var _pfTabRowContents = __webpack_require__(8);

var _pfTabRowContents2 = _interopRequireDefault(_pfTabRowContents);

var _pfUtils = __webpack_require__(0);

var _pfTab3 = __webpack_require__(9);

var _pfTab4 = _interopRequireDefault(_pfTab3);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tabs&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 */
var PfTabs = exports.PfTabs = function (_HTMLElement) {
  _inherits(PfTabs, _HTMLElement);

  _createClass(PfTabs, [{
    key: 'connectedCallback',

    /*
      * Called every time the element is inserted into the DOM
      */
    value: function connectedCallback() {
      if (!this._initialized) {
        this.insertBefore(this._tabsTemplate.content, this.firstChild);

        this._makeTabsFromPfTab();

        this._makeTabRowContents();

        // Add the ul class if specified
        this.querySelector('ul').className = this.attributes['tabs-class'] ? this.attributes['tabs-class'].value : 'nav nav-tabs';

        if (!this.mutationObserver) {
          this.mutationObserver = new MutationObserver(this._handleMutations.bind(this));
          this.mutationObserver.observe(this, { childList: true, attributes: true, subtree: true });
        }

        this.initialized = true;
        this.dispatchEvent(new CustomEvent('pf-tabs.initialized', {}));
      }
    }

    /*
      * Only attributes listed in the observedAttributes property will receive this callback
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
      if (attrName === 'tabs-class' && newValue !== 'ng-isolate-scope') {
        var ul = this.firstElementChild;
        if (ul) {
          ul.className = newValue;
        }
      }
    }

    /*
      * An instance of the element is created or upgraded
      */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['tabs-class'];
    }
  }]);

  function PfTabs() {
    _classCallCheck(this, PfTabs);

    var _this = _possibleConstructorReturn(this, (PfTabs.__proto__ || Object.getPrototypeOf(PfTabs)).call(this));

    _this._tabsTemplate = document.createElement('template');
    _this._tabsTemplate.innerHTML = _pfTabs2.default;

    _this.selectedIndex = null;
    _this.tabs = [];
    _this.tabRowListItem = null;
    return _this;
  }

  /**
   * Handle mutations
   *
   * @param mutations
   * @private
   */


  _createClass(PfTabs, [{
    key: '_handleMutations',
    value: function _handleMutations(mutations) {
      var _this2 = this;

      var handlers = [];
      mutations.forEach(function (mutationRecord) {
        //child dom nodes have been added
        if (mutationRecord.type === 'childList') {
          for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
            handlers.push(['add', mutationRecord.addedNodes[i]]);
          }
          for (var _i = 0; _i < mutationRecord.removedNodes.length; _i++) {
            handlers.push(['remove', mutationRecord.removedNodes[_i]]);
          }
        } else if (mutationRecord.type === 'attributes') {
          //mutationRecord.attributeName contains changed attributes
          //note: we can ignore this for attributes as the v1 spec of custom
          //elements already provides attributeChangedCallback
        }
      });
      if (handlers.length) {
        requestAnimationFrame(function () {
          var ul = _this2.querySelector('ul');
          handlers.forEach(function (notes) {
            var action = notes[0];
            var node = notes[1];
            var tab = void 0;

            // if a pf-tab node has been added or removed
            if (node.nodeName === 'PF-TAB') {
              if (action === 'add') {
                //add tab
                tab = _this2._makeTab(node);

                //if active, deactivate others
                if (tab.active) {
                  [].forEach.call(_this2.tabs, function (t) {
                    if (t.tabIndex !== tab.tabIndex) {
                      _this2._makeInactive(t);
                    }
                  });
                } else {
                  _this2._makeInactive(tab);
                }
                ul.appendChild(tab.tabElement);
              } else {
                //remove tab
                var tabIndex = parseInt(node.attributes['tab-index'], 10);
                tab = _this2.tabs[tabIndex];
                tab.tabElement.parentNode.removeChild(tab.tabElement);
                _this2.tabs.splice(tabIndex, 1);

                //we removed the active tab, make the first tab active now instead
                if (tab.active) {
                  _this2._makeActive(_this2.tabs[0]);
                }
              }
              return;
            }

            //if the pf-tab-row-contents have changed, update the contents
            if (action === 'add' && _this2.tabRowContents && _this2.tabRowContents.contains(node)) {
              _this2.tabRowListItem.innerHTML = _this2.tabRowContents.innerHTML;
              return;
            }

            //if the pf-tab contents have changed, update the tab
            if (action === 'add') {
              for (var i = 0; i < _this2.tabs.length; i++) {
                if (_this2.tabs[i].pfTab.contains(node)) {
                  var tabAnchor = _this2.tabs[i].tabElement.firstElementChild;
                  tabAnchor.innerHTML = node.parentNode.innerHTML;
                }
              }
            }
          });
        });
      }
    }

    /**
     * Sets the active tab programmatically
     * @param {number} tabIndex the tab index
     */

  }, {
    key: 'setActiveTab',
    value: function setActiveTab(tabIndex) {
      var _this3 = this;

      var tab = this.tabs[tabIndex];
      this._makeActive(tab);
      [].forEach.call(this.tabs, function (t) {
        if (t.tabIndex !== tab.tabIndex) {
          _this3._makeInactive(t);
        }
      });
    }

    /**
     * Helper function to create tabs
     *
     * @private
     */

  }, {
    key: '_makeTabsFromPfTab',
    value: function _makeTabsFromPfTab() {
      var _this4 = this;

      var ul = this.querySelector('ul');
      if (this.children && this.children.length) {
        var pfTabs = [].slice.call(this.children).filter(function (node) {
          return node.nodeName === 'PF-TAB';
        });
        var tabActive = false;
        [].forEach.call(pfTabs, function (pfTab, idx) {
          var tab = _this4._makeTab(pfTab);
          ul.appendChild(tab.tabElement);
          if (tab.active) {
            tabActive = true;
            _this4._makeActive(tab);
          }
        });

        if (!tabActive) {
          //if we don't have an active tab specified, make the first tab active by default
          this._makeActive(this.tabs[0]);
        }
      }
    }

    /**
     * Helper function to create tab row contents
     *
     * @private
     */

  }, {
    key: '_makeTabRowContents',
    value: function _makeTabRowContents() {
      this.tabRowContents = this.querySelector('pf-tab-row-contents');

      if (this.tabRowContents) {
        var frag = document.createElement('template');
        frag.innerHTML = _pfTabRowContents2.default;

        // move contents to the tab-row-contents template
        var li = frag.content.firstElementChild;
        li.innerHTML = this.tabRowContents.innerHTML;

        // set the tab row class
        var tabRowClass = _pfUtils.pfUtil.getAttributeOrProperty(this.tabRowContents, 'contents-class');
        li.className = tabRowClass || 'pf-tabrow-contents';
        var ul = this.querySelector('ul');
        ul.appendChild(li);

        this.tabRowListItem = li;
      }
    }

    /**
     * Helper function to create a new tab element from given tab
     *
     * @param pfTab A PfTab element
     * @returns {Object} A new tab object
     * @private
     */

  }, {
    key: '_makeTab',
    value: function _makeTab(pfTab) {
      var _this5 = this;

      var tabIndex = this.tabs.length;
      pfTab.setAttribute('tab-index', tabIndex);

      var frag = document.createElement('template');
      frag.innerHTML = _pfTab2.default;
      var tabElement = frag.content.firstElementChild;
      var tabAnchor = tabElement.firstElementChild;
      tabAnchor.innerHTML = pfTab.innerHTML;

      tabAnchor.onclick = function (e) {
        e.preventDefault();
        _this5._tabClicked(tabElement);
      };

      var tabContentId = _pfUtils.pfUtil.getAttributeOrProperty(pfTab, 'content-id');
      tabAnchor.setAttribute('aria-controls', tabContentId);

      var tabClass = _pfUtils.pfUtil.getAttributeOrProperty(pfTab, 'tab-class');
      if (tabClass) {
        tabElement.className = tabClass;
      }

      var active = pfTab.attributes && pfTab.attributes.active || pfTab.active;
      var tab = {
        tabIndex: tabIndex,
        pfTab: pfTab,
        tabElement: tabElement,
        tabAnchor: tabAnchor,
        tabContentId: tabContentId,
        active: active
      };

      this.tabs.push(tab);
      return tab;
    }

    /**
     * Helper function to make given tab active
     *
     * @param tab A tab object
     * @private
     */

  }, {
    key: '_makeActive',
    value: function _makeActive(tab) {
      tab.active = true;
      tab.tabElement.classList.add('active');
      tab.tabElement.setAttribute('aria-selected', 'true');
      tab.pfTab.setAttribute('active', 'true');

      this.selectedIndex = tab.tabIndex;

      //display tab contents
      var tabContents = document.querySelectorAll('pf-tab-content[content-id="' + tab.tabContentId + '"]');
      [].forEach.call(tabContents, function (tabContent) {
        _pfUtils.pfUtil.addClass(tabContent, 'active');
      });
    }

    /**
     * Helper function to make given tab inactive
     *
     * @param tab a tab object
     * @private
     */

  }, {
    key: '_makeInactive',
    value: function _makeInactive(tab) {
      tab.active = false;
      tab.tabElement.classList.remove('active');
      tab.tabElement.setAttribute('aria-selected', 'false');
      tab.pfTab.removeAttribute('active');

      //hide tab contents
      var tabContents = document.querySelectorAll('pf-tab-content[content-id="' + tab.tabContentId + '"]');
      [].forEach.call(tabContents, function (tabContent) {
        _pfUtils.pfUtil.removeClass(tabContent, 'active');
      });
    }

    /**
     * Helper function to set tab status
     *
     * @param tabElement a pfTab li element
     * @private
     */

  }, {
    key: '_tabClicked',
    value: function _tabClicked(tabElement) {
      var tab = void 0;
      [].forEach.call(this.tabs, function (t) {
        if (t.tabElement === tabElement) {
          tab = t;
        }
      });

      if (tab && !tab.active) {
        this.setActiveTab(tab.tabIndex);
        //dispatch the custom 'tabChanged' event for framework listeners
        this.dispatchEvent(new CustomEvent('pf-tabs.tabChanged', { detail: tab.tabIndex }));
      }
    }
  }]);

  return PfTabs;
}(HTMLElement);

window.customElements.define('pf-tabs', PfTabs);

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabTemplate = "\n<li role=\"presentation\">\n  <a href=\"#\" role=\"tab\" data-toggle=\"tab\"></a>\n</li>\n";
exports.default = PfTabTemplate;

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabsTemplate = "\n<ul role=\"tablist\"></ul>\n";
exports.default = PfTabsTemplate;

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabRowContentsTemplate = "\n<li role=\"section\">\n</li>\n";
exports.default = PfTabRowContentsTemplate;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 * @prop {string} tabClass the tab li class
 * @prop {string} contentId the content id which describes this tabs content
 * @prop {string} active whether this tab is currently active
 */
var PfTab = exports.PfTab = function (_HTMLElement) {
  _inherits(PfTab, _HTMLElement);

  _createClass(PfTab, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this._tabClass = this.getAttribute('tab-class');
      this._contentId = this.getAttribute('content-id');
      this._active = this.getAttribute('active');
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['active'];
    }

    /*
     * An instance of the element is created or upgraded
     */

  }]);

  function PfTab() {
    _classCallCheck(this, PfTab);

    return _possibleConstructorReturn(this, (PfTab.__proto__ || Object.getPrototypeOf(PfTab)).call(this));
  }

  /**
   * Get flag indicating tab is active
   *
   * @returns {boolean} True if tab is active
   */


  _createClass(PfTab, [{
    key: 'active',
    get: function get() {
      return this._active;
    }

    /**
     * Set flag indicating tab is active
     *
     * @param {boolean} value True to set tab active
     */
    ,
    set: function set(value) {
      if (this._active !== value) {
        this._active = value;
        this.setAttribute('active', value);
      }
    }
  }]);

  return PfTab;
}(HTMLElement);

window.customElements.define('pf-tab', PfTab);

/***/ })

/******/ });