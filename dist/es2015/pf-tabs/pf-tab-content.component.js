'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTabContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTabContent = require('pf-tab-content.template');

var _pfTabContent2 = _interopRequireDefault(_pfTabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs>
 *  <pf-tab class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
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