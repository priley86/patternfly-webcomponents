'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordionTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionBody = require('pf-accordion-body.component');

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