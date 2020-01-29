class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer = null;
    this._tooltipIcon = null;
    this._tooltipText = 'Some default tooltip-text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
        }
        :host(.important) {
          background-color: #ccc;
          padding: 0.15rem;
        }
        div {
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
        }
        .icon {
          background-color: green;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Some default</slot>
      <span class="icon">?</span>
`;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', () => this._showTooltip());
    this._tooltipIcon.addEventListener('mouseleave', () => this._hideTooltip());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  // disconnectedCallback() {
  //   this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
  //   this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  // }

  static get observedAttributes() {
    return ['text'];
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this._tooltipContainer.remove();
  }
}

customElements.define('mg-tooltip', Tooltip);
