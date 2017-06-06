'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionPanel = require('pf-accordion-panel.component');

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
              if (node.nodeName === 'pf-accordion-panel') {
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