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
    this._button = this.querySelector('.btn');
    this._disabled = /\bdisabled/.test(this._button.className);

    this._button.addEventListener('click', () => {
      this._showDropdown();
    });

    document.addEventListener('click', (event) => {
      //close dropdown if clicked outside menu
      if (event.target !== this && !this.contains(event.target)) {
        this._clearDropdown();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (/input|textarea/.test(event.target.tagName)) {
        return;
      }
      if (this._disabled) {
        return;
      }
      let active = /\bopen/.test(this._button.parentNode.className);

      //check if dropdown is open
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
    let dropdown = this.querySelector('.dropdown');
    if ('ontouchstart' in document.documentElement) {
      let div = document.createElement('div');
      div.classList.add('dropdown-backdrop');
      dropdown.insertBefore(div, this.querySelector('.dropdown-menu'));
      div.addEventListener('click', this._clearDropdown());
    }
  }

  /**
   *Support for accessibility
   *
   * @param {Event} event
   */
  _keyHandler(event) {
    let keycode = event.keyCode ? event.keyCode : event.which;

    // escape key
    if (keycode === 27) {
      this._clearDropdown();
      this._button.focus();
    }

    // up and down key
    if (keycode === 38 || keycode === 40) {

      event.preventDefault();
      event.stopPropagation();

      let menuItem = this.querySelectorAll('.dropdown-menu li:not(.disabled) a');
      // index: guide focus on menu items
      let index = Array.prototype.indexOf.call(menuItem, event.target);

      if (keycode === 38 && index > 0) {
        index--;
      }
      if (keycode === 40 && index < menuItem.length - 1) {
        index++;
      }
      if (!~index) {
        index = 0;
      }
      menuItem[index].focus();
    }
  }
}

(function () {
  document.registerElement('pf-dropdown', PfDropdown);
}());