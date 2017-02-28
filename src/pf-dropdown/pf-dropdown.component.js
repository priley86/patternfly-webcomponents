import { default as tmpl } from 'pf-dropdown.template';

/**
 *
 *
 */

export class PfDropdown extends HTMLElement {
  /**
   *
   *
   */
  attachedCallback() {
    this.appendChild(this._template.content);
  }

  /**
   *
   *
   */
  attributeChangedCallback(attrName, oldValue, newValue) {

  }

  /**
   *
   *
   */
  createdCallback() {
    this._template = document.createElement('template');
    this._template.innerHTML = tmp1;
  }

  /**
   *
   *
   */
  toggle() {
    if (/\bdisabled/.test(this.childNodes[0].className)) {
      return;
    }
    this.addEventListener('click', function(event){
      this.classList.toggle('open');
    });
  }

(function () {
  document.registerElement('pf-dropdown', PfDropdown);
}());