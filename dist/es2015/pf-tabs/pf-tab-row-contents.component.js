'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tab-row-contents&gt;</b> element for Patternfly Web Components
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
 * @prop {string} contentsClass the tab row contents class
 */
var PfTabRowContents = exports.PfTabRowContents = function (_HTMLElement) {
  _inherits(PfTabRowContents, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfTabRowContents() {
    _classCallCheck(this, PfTabRowContents);

    return _possibleConstructorReturn(this, (PfTabRowContents.__proto__ || Object.getPrototypeOf(PfTabRowContents)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfTabRowContents, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._contentsClass = this.getAttribute('contents-class');
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
      if (attrName === 'contents-class' && newValue !== 'ng-isolate-scope') {
        //the last li within the tabs ul
        var li = this.parentNode.firstElementChild.lastElementChild;
        if (li) {
          li.className = newValue;
        }
      }
    }

    /**
     * Get tab row contents class
     *
     * @returns {string} contents class
     */

  }, {
    key: 'contentsClass',
    get: function get() {
      return this._contentsClass;
    }

    /**
     * Set tab row contents class
     *
     * @param {string} value contents class
     */
    ,
    set: function set(value) {
      if (this._contentsClass !== value) {
        this._contentsClass = value;
        this.setAttribute('contents-class', value);
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['contents-class'];
    }
  }]);

  return PfTabRowContents;
}(HTMLElement);

window.customElements.define('pf-tab-row-conents', PfTab);