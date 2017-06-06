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