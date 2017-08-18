/**
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 * @prop {string} tabClass the tab li class
 * @prop {string} contentId the content id which describes this tabs content
 * @prop {string} active whether this tab is currently active
 */
export class PfTab extends HTMLElement {
  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback() {
    this._tabClass = this.getAttribute('tab-class');
    this._contentId = this.getAttribute('content-id');
    this._active = this.getAttribute('active');
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['active'];
  }

  /*
   * An instance of the element is created or upgraded
   */
  constructor() {
    super();
  }

  /**
   * Get flag indicating tab is active
   *
   * @returns {boolean} True if tab is active
   */
  get active() {
    return this._active;
  }

  /**
   * Set flag indicating tab is active
   *
   * @param {boolean} value True to set tab active
   */
  set active(value) {
    if (this._active !== value) {
      this._active = value;
      this.setAttribute('active', value);
    }
  }
}

window.customElements.define('pf-tab', PfTab);