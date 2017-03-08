/**
 * <b>&lt;pf-dropdown&gt;</b> element for Patternfly Web Components
 *
 * <pf-dropdown id="dropdown1"><div class="dropdown">
 *    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdown2" data-toggle="dropdown" aria-haspopup="true"
 *      aria-expanded="false">
 *      Dropdown
 *      <span class="caret"></span>
 *      </button>
 *      <ul class="dropdown-menu">
 *        <li class="dropdown-header">Header</li>
 *        <li><a href="#">Item 1</a></li>
 *        <li><a href="#">Item 2</a></li>
 *        <li class="disabled"><a href="#">Item 3</a></li>
 *        <li><a href="#">Item 4</a></li>
 *        <li class="divider"></li>
 *        <li><a href="#">Item 5</a></li>
 *      </ul>
 *      </div>
 *  </pf-dropdown>
 */

export class PfDropdown extends HTMLElement {

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback() {
    let self = this;
    this._button = this.querySelector('[data-toggle="dropdown"]');
    this._disabled = /\bdisabled/.test(this._button.className);

    this._button.addEventListener('click', () => {
      this._showDropdown();
    });

    document.addEventListener('click', (event) => {
      if (event.target !== this && !this.contains(event.target)) {
        this._clearDropdown();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!/(38|40|27|13)/.test(event.keyCode) || /input|textarea/.test(event.target.tagName)) {
        return;
      }
      if (this._disabled) {
        return;
      }
      let active = /\bopen/.test(this._button.parentNode.className);
      if (active) {
        this._keyHandler(event);
      }
    });
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
   *
   */
  _showDropdown() {
    if (/\bdisabled/.test(this._button.className)) {
      return;
    }
    let active = this._button.parentNode.classList.contains('open');
    if (!active) {
      this._detectTouch();
      this.dispatchEvent(new CustomEvent('show.bs.dropdown', {}));
      this._button.focus();
      this._button.setAttribute('aria-expanded', 'true');
      this._button.parentNode.classList.toggle('open');
      this.dispatchEvent(new CustomEvent('shown.bs.dropdown', {}));
    }
    if (active) {
      this._clearDropdown();
    }
  }
  /**
   * Close the dropdown
   *
   */
  _clearDropdown() {
    let backdrop = this.querySelector('.dropdown-backdrop');
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
    this.dispatchEvent(new CustomEvent('hide.bs.dropdown', {}));
    this._button.setAttribute('aria-expanded', 'false');
    this._button.parentNode.classList.remove('open');
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
      this.insertBefore(div, this.querySelector('.dropdown-menu'));
      div.addEventListener('click', this._clearDropdown());
    }
  }

  /**
   *Support for accessibility
   *
   * @param {Event} event
   */
  _keyHandler(event) {

    event.preventDefault();
    event.stopPropagation();

    if (event.keyCode === 27 || event.keyCode === 13) {
      this._clearDropdown();
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
      let menuItem = this.querySelectorAll('.dropdown-menu li:not(.disabled) a');
      let index = Array.prototype.indexOf.call(menuItem, event.target);

      if (event.keyCode === 38 && index > 0) {
        index--;
      }
      if (event.keyCode === 40 && index < menuItem.length - 1) {
        index++;
      }
      if (!index) {
        index = 0;
      }
      menuItem[index].focus();
    }
  }
}

(function () {
  document.registerElement('pf-dropdown', PfDropdown);
}());