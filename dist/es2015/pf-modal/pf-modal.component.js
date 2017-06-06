'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfModal = require('pf-modal.template');

var _pfModal2 = _interopRequireDefault(_pfModal);

var _pfUtils = require('pf-utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal targetSelector="#btn-toggle-modal" backdrop keyboard></pf-modal>
 *
 * @prop {string} targetSelector Indicating which element will fireup the modal
 * @prop {boolean} backdrop Indicating whether Clicking the backdrop could hide the modal or not
 * @prop {boolean} keyboard Indicating whether clicking the escape key could hide the modal or not
 * @prop {boolean} open Indicating whether or not the modal is opend
 */

var PfModal = exports.PfModal = function (_HTMLElement) {
  _inherits(PfModal, _HTMLElement);

  _createClass(PfModal, [{
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      // When the modal is shown, update keyboard/screen reader behavior.
      if (attrName === 'open' && newValue !== null) {
        this._showModal();
      }
      if (attrName === 'keyboard') {
        if (newValue !== null) {
          this._element.addEventListener('keydown', this._keydownHandler, false);
        } else {
          this._element.removeEventListener('keydown', this._keydownHandler, false);
        }
      }
    }

    /*
     * An instance of the element is created or upgraded
     * We build up the complete DOM tree of web components
     */

  }, {
    key: 'open',


    /*
     * Get the show/hide state of modal
     *
     * @returns {boolean} True if modal is visible
     */
    get: function get() {
      return this.hasAttribute('open');
    }

    /*
     * Set flag indicating modal is shown
     *
     * @param {boolean} val True to set modal visible
     */
    ,
    set: function set(val) {
      if (this.open !== val) {
        if (val) {
          this.setAttribute('open', '');
        } else {
          this._hideModal();
        }
      }
    }

    /*
     * Get the backdrop setting
     *
     * @returns {boolean} True if users are allowed to hide modal on clicking backdrop
     */

  }, {
    key: 'backdrop',
    get: function get() {
      return this.hasAttribute('backdrop');
    }

    /*
     * Set flag indicating clicking backdrop of modal could hide modal
     *
     * @param {boolean} val True to enable backdrop clicking
     */
    ,
    set: function set(val) {
      if (this.backdrop !== val) {
        if (val) {
          this.setAttribute('backdrop', '');
        } else {
          this.removeAttribute('backdrop');
        }
      }
    }

    /*
     * Get the keyboard setting
     *
     * @returns {boolean} True if users are allowed to hide modal when escape key is pressed
     */

  }, {
    key: 'keyboard',
    get: function get() {
      return this.hasAttribute('keyboard');
    }

    /*
     * Set flag indicating pressing escape key could hide modal
     *
     * @param {boolean} val True to enable escape key reaction
     */
    ,
    set: function set(val) {
      if (this.keyboard !== val) {
        if (val) {
          this.setAttribute('keyboard', '');
        } else {
          this.removeAttribute('keyboard');
        }
      }
    }
  }], [{
    key: 'observedAttributes',


    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */
    get: function get() {
      return ['backdrop', 'keyboard', 'open'];
    }
  }]);

  function PfModal() {
    _classCallCheck(this, PfModal);

    // always call super() first in the ctor

    var _this = _possibleConstructorReturn(this, (PfModal.__proto__ || Object.getPrototypeOf(PfModal)).call(this));

    _this._element = _this;
    // Decorate the pf-modal with bootstrap modal style
    _this._element.className = 'modal fade';
    _this._element.setAttribute('tabindex', -1);
    var headerPart = _this._element.querySelector('[modalPart="header"]').innerHTML;
    var bodyPart = _this._element.querySelector('[modalPart="body"]').innerHTML;
    var footerPart = _this._element.querySelector('[modalPart="footer"]').innerHTML;
    _this._element.innerHTML = _pfModal2.default;
    _this._element.querySelector('.modal-header').innerHTML = headerPart;
    _this._element.querySelector('.modal-body').innerHTML = bodyPart;
    _this._element.querySelector('.modal-footer').innerHTML = footerPart;

    _this._target = document.querySelector(_this.getAttribute('targetSelector'));
    _this._dialog = _this._element.querySelector('.modal-dialog');
    _this._mask = null;
    return _this;
  }

  /*
   * Called every time the element is inserted into the DOM
   * So we place event bindings here
   */


  _createClass(PfModal, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._target.addEventListener('click', this.show.bind(this), false);
      this._element.addEventListener('click', this.hide, false);
    }

    /*
     * Show the modal when attribute open is added or property open is enabled
     * @private
     */

  }, {
    key: '_showModal',
    value: function _showModal() {
      _pfUtils.pfUtil.addClass(document.body, 'modal-open');
      this._mask = document.createElement('div');
      this._mask.className = 'modal-backdrop fade';
      document.body.appendChild(this._mask);
      _pfUtils.pfUtil.reflow(this._mask);
      _pfUtils.pfUtil.addClass(this._mask, 'in');
      _pfUtils.pfUtil.reflow(this._element);
      _pfUtils.pfUtil.addClass(this._element, 'in');
      _pfUtils.pfUtil.once(this._dialog, 'transitionend', this._afterShowModal, this);
    }

    /*
     * Show the modal
     * @public
     */

  }, {
    key: 'show',
    value: function show() {
      this._element.dispatchEvent(new CustomEvent('modalShow', { 'detail': { 'relatedTarget': this._target } }));
      if (this.open) {
        return;
      }
      this.open = true;
    }

    /*
     * Callback after modal is shown
     * @private
     */

  }, {
    key: '_afterShowModal',
    value: function _afterShowModal() {
      this._element.focus();
      this._element.dispatchEvent(new CustomEvent('modalShown', { 'detail': { 'relatedTarget': this._target } }));
    }

    /*
     * Hide the modal when attribute open is removed or property open is disabled
     * @private
     */

  }, {
    key: '_hideModal',
    value: function _hideModal() {
      _pfUtils.pfUtil.removeClass(document.body, 'modal-open');
      _pfUtils.pfUtil.removeClass(this._mask, 'in');
      _pfUtils.pfUtil.removeClass(this._element, 'in');
      _pfUtils.pfUtil.once(this._element, 'transitionend', this._afterHideModal, this);
    }

    /*
     * Hide the modal
     * @public
     */

  }, {
    key: 'hide',
    value: function hide(e) {
      if (e) {
        e.preventDefault();
        if (!(_pfUtils.pfUtil.getClosest(e.target, '.pf-hide-modal') || e.target === event.currentTarget && this.backdrop)) {
          return;
        }
      }

      this._element.dispatchEvent(new CustomEvent('modalHide', {}));

      if (!this.open) {
        return;
      }
      this._hideModal();
    }

    /*
     * Callback after the modal is hidden
     * @private
     */

  }, {
    key: '_afterHideModal',
    value: function _afterHideModal() {
      this.removeAttribute('open');
      if (this._mask) {
        this._mask.remove();
        this._mask = null;
      }
      this._element.dispatchEvent(new CustomEvent('modalHidden', {}));
    }

    /*
     * Toggle the visible/invisible state of modal
     * @public
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      return this.open ? this.hide() : this.show();
    }

    /*
     * Handler of keydown event of escape key
     * @private
     */

  }, {
    key: '_keydownHandler',
    value: function _keydownHandler(e) {
      var isEscape = e.key && e.key === 'Escape' || e.keyIdentifier && e.keyIdentifier === 'U+001B' || e.keyCode && e.keyCode === 27;
      if (isEscape && this.open) {
        this.hide();
      }
    }
  }]);

  return PfModal;
}(HTMLElement);

customElements.define('pf-modal', PfModal);