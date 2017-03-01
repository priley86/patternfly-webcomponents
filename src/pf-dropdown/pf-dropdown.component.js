/**
 *
 *
 */

export class PfDropdown extends HTMLElement {

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback() {
    let self = this;
    let button = this.querySelector('[data-toggle="dropdown"]');
    button.addEventListener('click', function () {
      self._showDropdown();
    });
    document.addEventListener('click', function (event) {
      if (event.target !== self && !self.contains(event.target)) {
        self._clearDropdown(button);
      }
    });
    //this._detectTouch();
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {

  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback() {

  }

  /**
   *Toggle the dropdown
   */
  toggle() {
    this._showDropdown();
  }

  /**
   * Open the dropdown
   */
  _showDropdown() {
    let button = this.querySelector('[data-toggle="dropdown"]');
    if (/\bdisabled/.test(button.className)) {
      return;
    }
    let active = this.classList.contains('open');
    if (!active) {
      this._detectTouch();
      this.dispatchEvent(new CustomEvent('show.bs.dropdown', {}));
      button.setAttribute('aria-expanded', 'true');
      this.classList.toggle('open');
      this.dispatchEvent(new CustomEvent('shown.bs.dropdown', {}));
    }
    if (active) {
      this._clearDropdown(button);
    }
  }

  /**
   * Close the dropdown
   *
   * @param {HTMLElement} value the button element
   */
  _clearDropdown(button) {
    //let backdrop = this.querySelector('.dropdown-backdrop');
    //backdrop.parentNode.removeChild(backdrop);
    this.dispatchEvent(new CustomEvent('hide.bs.dropdown', {}));
    button.setAttribute('aria-expanded', 'false');
    this.classList.remove('open');
    this.dispatchEvent(new CustomEvent('hidden.bs.dropdown', {}));
  }

  /**
   * Support for phone browser
   *
   */
  _detectTouch() {
    if ('ontouchstart' in document.documentElement) {
      let div = document.createElement('div');
      div.classList.add('dropdown-backdrop');
      self.insertBefore(div, this.childNodes[0]);
      div.addEventListener('click', this._clearDropdown);
    }
  }
}

(function () {
  document.registerElement('pf-dropdown', PfDropdown);
}());