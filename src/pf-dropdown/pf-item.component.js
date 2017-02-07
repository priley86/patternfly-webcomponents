import { default as pfItemTemplate } from 'pf-item.template'

/**
 * <b>&lt;pf-dropdown%gt;</b> element for patternfly Web Components
 * 
 * @example {@lang xml}
 * <pf-dropdown label="Dropdown">
 *  <pf-item header = "true">Item 1</pf-item>
 *  <pf-item disable = "true">Item 2</pf-item>
 *  <pf-item divider = "true">Item 3</pf-item>
 * </pf-dropdown>
 * 
 * @prop {string} header true, false
 * @prop {string} disable true, false
 * @prop {string} divider true, false
 */

class PfItem extends HTMLElement {

    /**
     * Called when an instance of element is created
     */
    createdCallback() {
        this._template = document.createElement('template');
        this._template.innerHTML = pfItemTemplate;
    }

    /**
     * Called when elements's attribute value has changed
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    attributeChangedCallback(attrName, oldValue, newValue) {
        
        if (attrName === "header") {
            this._header();
        }
        if (attrName === "disabled") {
            this._disable();
        }
        if (attrName === "divider" && this.getAttribute('divider') === 'true') {
            e.classList.add('divider');
        }
    }

    /**
     * Helper function to declare header
     */
    _header() {
        let e = this.querySelector("li");
        if (this.getAttribute('header') === 'true') {
            e.classList.add('dropdown-header');
        }
        else {
            e.classList.remove('dropdown-header');
        }
    }

    /**
     * Helper function to disable a dropdown item
     */
    _disable(value) {
        let e = this.querySelector('li');
        if (this.getAttribute('disable') === 'true') {
            e.classList.add('disabled');
        }
        else {
            e.classList.remove('disabled');
        }
    }
}

(function () {
    document.registerElement('pf-item', PfItem);
}());