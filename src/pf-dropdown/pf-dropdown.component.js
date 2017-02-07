import { default as pfDropdownTemplate } from "pf-dropdown.template"
import PfItem from "pf-item.component"

/**
 * <b>&lt;pf-dropdown%gt;</b> element for patternfly Web Components
 * 
 * @example {@lang xml}
 * <pf-dropdown label="Dropdown">
 *  <pf-item>Item 1</pf-item>
 *  <pf-item>Item 2</pf-item>
 *  <pf-item>Item 3</pf-item>
 * </pf-dropdown>
 * 
 * @prop {string} label (default: Dropdown)
 * @prop {string} vertical-align top, bottom (default: right)
 * @prop {string} horizontal-align right, left (default: left)
 */

class PfDropdown extends HTMLElement {
    /**
     * Called when an instance was inserted into the document 
     */
    attachedCallback() {

        this._appendItemInDropdown();

        if (!this.mutationObserver) {
            this.mutationObserver = new MutationObserver(this._nodeMutations.bind(this));
            this.mutationObserver.observe(this, { childList: true });
        }
    }

    /**
     * Called when elements's attribute value has changed
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'label':
                this._label(newValue);
                break;
            case 'vertical-align':
                this._Vertical();
                break;
            case 'horizontal-align':
                this._horizontal();
                break;
            default:
                break;
        }
    }

    /**
     * Called when an instance of element is created
     */
    createdCallback() {
        this._dropdownTemplate = document.createElement('template');
        this._dropdownTemplate.innerHTML = pfDropdownTemplate;
    }

    /**
     * Helper function to set the Label of dropdown
     * 
     * @param {string} newValue the new value of label
     */
    _label(newValue) {
        let button = this._getNode('button');
        let text = document.createTextNode(newValue)
        button.childNodes[0].parentNode.removeChild(button.childNodes[0])
        button.insertBefore(text, button.childNodes[0]);
    }

    /**
     * Helper function to set the vertical position
     *
     */
    _vertical() {
        let div = this._getNode('div');
        if (this.getAttribute('vertical-align') === 'top') {

            div.classList.add('dropup');
            div.classList.remove('dropdown');
        }
        if (this.getAttribute('vertical-align') === 'bottom') {
            div.classList.add('dropdown');
            div.classList.remove('dropup');
        }
    }
    /**
     * Helper function to set the horizontal position
     * 
     */
    _horizontal() {
        let ul = this._getNode('ul');
        if (this.getAttribute('horizontal-align') === 'right') {
            ul.classList.add('dropdown-menu-right');
        }
        if (this.getAttribute('horizontal-align') === 'left') {
            if (ul.classList.contains('dropdown-menu.right')) {
                ul.classList.remove('dropdown-menu-right');
                ul.classList.add('dropdown-menu-left');
            }
        }
    }

    /**
     * Helper function to handle mutations
     * 
     * @param mutations
     * @private
     */
    _nodeMutations(mutations) {
        let self = this;
        let ul = self._getNode('ul');
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                for (i = 0; i < mutation.addedNodes.length; i++) {
                    ul.appendChild(mutation.addedNodes[i])
                }
                for (i = 0; i < mutation.removedNodes.length; i++) {
                    let node = mutation.removedNodes[i];
                    node.parentNode.removeChild(node);
                }
            }
        });

        /**
         * Helper function to append all items in dropdown
         * 
         * @private
         */
        _appendItemInDropdown(){
            let self = this;
            let ul = self._getNode('ul')
            let pfItems = self.querySelectorAll('pf-item');
            [].forEach.call(pfItems, function (pfItem) {
                ul.appendChild(pfItem);
            }.bind(this));

        }

        /**
         * Get Node from a given Selector
         * 
         * @param {string} selector
         * @returns {Element}
         * @private
         */
        _getNode(selector){
            e1 = this.querySelector(selector);
            if (e1 == null) {
                e1 = this._dropdownTemplate.content.querySelector(selector);
            }
            return e1
        }
    }

(function () {
    document.registerElement('pf-dropdown', PfDropdown);
}());