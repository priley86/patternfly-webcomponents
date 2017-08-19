'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTab = require('pf-tab.template');

var _pfTab2 = _interopRequireDefault(_pfTab);

var _pfTabs = require('pf-tabs.template');

var _pfTabs2 = _interopRequireDefault(_pfTabs);

var _pfTabRowContents = require('pf-tab-row-contents.template');

var _pfTabRowContents2 = _interopRequireDefault(_pfTabRowContents);

var _pfUtils = require('pf-utils.js');

var _pfTab3 = require('pf-tab.component');

var _pfTab4 = _interopRequireDefault(_pfTab3);

require('pf-tab-content.component');

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
          this.mutationObserver.observe(this, { characterData: true, childList: true, attributes: true, subtree: true });
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
        if (mutationRecord.type === 'childList') {
          for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
            handlers.push(['add', mutationRecord.target, 'childList', mutationRecord.addedNodes[i]]);
          }
          for (var _i = 0; _i < mutationRecord.removedNodes.length; _i++) {
            handlers.push(['remove', mutationRecord.target, 'childList', mutationRecord.removedNodes[_i]]);
          }
        }
        if (mutationRecord.type === 'attributes') {
          handlers.push([mutationRecord.attributeName, mutationRecord.target, 'attributes']);
        }
        if (mutationRecord.type === 'characterData') {
          handlers.push([mutationRecord.oldValue, mutationRecord.target, 'characterData']);
        }
      });
      if (handlers.length) {
        requestAnimationFrame(function () {
          var ul = _this2.querySelector('ul');
          handlers.forEach(function (notes) {
            var action = notes[0];
            var target = notes[1];
            var type = notes[2];
            var node = notes[3];

            // if a pf-tab node has been added
            if (node && node.nodeName === 'PF-TAB' && type === 'childList' && action === 'add' && target.nodeName === 'PF-TABS') {
              //add tab
              var tab = _this2._makeTab(node);

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
              ul.insertBefore(tab.tabElement, ul.children[_this2.tabs.length - 1]);
              return;
            }

            // if a pf-tab node has been removed
            if (node && node.nodeName === 'PF-TAB' && type === 'childList' && action === 'remove' && target.nodeName === 'PF-TABS') {
              //remove tab
              var tabIndex = parseInt(node.getAttribute('tab-index'), 10);
              var _tab = _this2.tabs[tabIndex];
              _tab.tabElement.parentNode.removeChild(_tab.tabElement);
              _this2.tabs.splice(tabIndex, 1);

              //we removed the active tab, make the first tab active now instead
              if (_tab.active) {
                _this2._makeActive(_this2.tabs[0]);
              }
              return;
            }

            //if the pf-tab-row-contents have changed, update the contents
            if (_this2.tabRowContents && action === 'remove' && type === 'childList' && target && target.nodeName === 'LI' && _this2.tabRowListItem.contains(node)) {
              _this2.tabRowListItem.removeChild(node);
              return;
            }
            if (_this2.tabRowContents && _this2.tabRowContents.contains(node)) {
              if (action === 'add' && type === 'childList' && target && target.nodeName === 'PF-TAB-ROW-CONTENTS') {
                //if this is an add, we need to transclude the inner dom
                _pfUtils.pfUtil.transcludeChildren(_this2.tabRowContents, _this2.tabRowListItem);
              } else {
                //else just update the inner html (and thus attributes and data)
                _this2.tabRowListItem.innerHTML = _this2.tabRowContents.innerHTML;
              }
              return;
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
      if (!tab.active) {
        this._makeActive(tab);
        [].forEach.call(this.tabs, function (t) {
          if (t.tabIndex !== tab.tabIndex) {
            _this3._makeInactive(t);
          }
        });
      }
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
        _pfUtils.pfUtil.transcludeChildren(this.tabRowContents, li);

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

      _pfUtils.pfUtil.transcludeChildren(pfTab, tabAnchor);

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