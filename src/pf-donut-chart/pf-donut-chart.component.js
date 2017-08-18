import {pfChartUtil} from 'pf-chart-utils.js';

/**
 *
 */

export class PfDonutChart extends HTMLElement {

  /**
   *
   */
  connectedCallback() {
    this._additionalData = this.getAttribute('data') ? JSON.parse(this.getAttribute('data').replace(/'/g, '"')) : {};
    this._width = parseInt(this.getAttribute('width')) ? this.getAttribute('width') : null;
    this._height = parseInt(this.getAttribute('height')) ? this.getAttribute('height') : 171;
    this._legend = this.getAttribute('legend') ? JSON.parse(this.getAttribute('legend').replace(/'/g, '"')) : { show: false };
    this._targetSelector = this.getAttribute('target-selector');
    this._title = this.getAttribute('title') ? this.getAttribute('title') : '';
    this._colors = this.getAttribute('data-colors') ? JSON.parse(this.getAttribute('data-colors').replace(/'/g, '"')) : {};
    this._getData();
    this.prepareData();
    this.tooltip = {
      show: false
    };
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['width', 'height', 'legend', 'target-selector', 'title', 'data'];
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

  /*
   * An instance of the element is created or upgraded
   */
  constructor() {
    super();
  }

  /**
   *
   */
  get width() {
    return this._width;
  }

  /**
   *
   */
  set width(value) {
    if (this._width !== value) {
      this._width = value;
      this.setAttribute('width', value);
    }
  }

  /**
   *
   */
  get height() {
    return this._height;
  }

  /**
   *
   */
  set height(value) {
    if (this._height !== value) {
      this._height = value;
      this.setAttribute('height', value);
    }
  }

  /**
   *
   */
  get legend() {
    return this._legend;
  }

  /**
   *
   */
  set legend(value) {
    this._legend = value;
    this._buildChart();
  }

  /**
   *
   */
  get title() {
    return this._title;
  }

  /**
   *
   */
  set title(value) {
    if (this._title !== value) {
      this._title = value;
      this.setAttribute('title', value);
    }
  }

  /**
   *
   */
  get targetSelector() {
    return this._targetSelector;
  }

  /**
   *
   */
  set targetSelector(value) {
    if (this._targetSelector !== value) {
      this._targetSelector = value;
      this.setAttribute('target-selector', value);
    }
  }

  /**
   * data object
   */
  get data() {
    return this._data;
  }

  /**
   * set data object for c3
   * @param {*} func
   */
  set data(obj) {
    this._data = obj;
    this._buildChart();
  }

  /**
   *
   * @param {*} func
   */
  get colors() {
    return this._colors;
  }

  /**
   *
   * @param {*} func
   */
  set colors(obj) {
    this._colors = obj;
    this._buildChart();
  }

  /**
   *
   */
  get tooltip () {
    return this.tooltip;
  }

  /**
   *
   */
  set tooltip (obj) {
    this._tooltip = obj;
    this._buildChart();
  }

  /**
   *
   */
  _onmouseover() {
    console.log(this.onmouseover());
  }

  _getData () {
    if (this.getAttribute('columns')) {
      this._inputData = JSON.parse(this.getAttribute('columns').replace(/'/g, '"'));
      this._dataFormat = 'columns';
    } else if (this.getAttribute('rows')) {
      this._inputData = JSON.parse(this.getAttribute('rows').replace(/'/g, '"'));
      this._dataFormat = 'rows';
    } else if (this.getAttribute('json')) {
      this._inputData = JSON.parse(this.getAttribute('json').replace(/'/g, '"'));
      this._dataFormat = 'json';
    } else if (this.getAttribute('url')) {
      this._inputData = this.getAttribute('url');
      this._dataFormat = 'url';
    }
  }

  /**
   *
   */
  prepareData() {
    switch (this._dataFormat) {
      case 'column':
        var a = { b: 1};
        var c = { ...a };
        this._data = {
          columns: this._inputData,
          type: 'donut',
          colors: this._colors
        };
        break;

      case 'row':
        this._data = {
          rows: this._inputData,
          type: 'donut',
          colors: this._colors,
          ...this._additionalData
        };
        break;

      case 'json':
        //To Do: find a way to get keys from user
        this._data = {
          json: this._inputData,
          type: 'donut',
          ...this._additionalData
        };
        break;

      case 'url':
        if (/.json/.test(data[1])) {
          this._data = {
            url: this._inputData,
            type: 'donut',
            mimeType: 'json',
            ...this._additionalData
          };
        } else {
          this._data = {
            url: this._inputData,
            type: 'donut',
            ...this._additionalData
          };
        }
        break;
    }
    this._buildChart();
  }

  /**
   *
   */
  prepareChart() {
    let config =  {
      bindto: this._targetSelector,
      data: this._data,
      donut: {
        title: this._title,
        label: {
          show: false
        },
        width: 11
      },
      color: {
        pattern: [
          '#d1d1d1',
          '#0088ce'
        ]
      },
      size: {
        width: this._width,
        height: this._height
      },
      legend: this._legend,
      tooltip: {
        show: this._showTooltip
      }
    };
  }

  /**
   *
   */
  _buildChart() {
    this.donutChart = c3.generate(this.prepareChart());
  }

  /**
   *TO DO: test
   */
  load(obj) {
    this.donutChart.load(obj);
  }

  /**
   *TO DO: test
   */
  unload(obj) {
    this.donutChart.unload(obj);
  }


}

window.customElements.define('pf-donut-chart', PfDonutChart);