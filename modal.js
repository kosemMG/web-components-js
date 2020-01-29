class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        :host([opened]) #modal {
          top: 15vh;
        }
        #modal {
          z-index: 100;
          width: 50%;
          position: fixed;
          top: 10vh;
          left: 25%;
          background-color: whitesmoke;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
          display: flex;
          flex-direction: column;
          justify-content:space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }
        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
        ::slotted(h1) {
          font-size: 1.5rem;
          margin: 0;
        }
        #main {
          padding: 1rem;
        }
        #actions {
          border: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        #actions button {
          box-sizing: border-box;
          margin: 0 0.25rem;
          border: 1px solid transparent;
          padding: 0.25rem 0.5rem;
          font-size: 16px;
          color: whitesmoke;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        }
        #actions button:active {
          box-shadow: none;
        }
        #actions button:first-child {
          background-color: #ac666d;
        }
        #actions button:last-child {
          background-color: #177708;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title"></slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Confirm</button>
        </section>
      </div>
    `;
    // const slots = this.shadowRoot.querySelectorAll('slot');
    // slots[1].addEventListener('slotchange', event => console.dir(slots[1].assignedNodes()));

    const cancelButton = this.shadowRoot.getElementById('cancel-btn');
    const confirmButton = this.shadowRoot.getElementById('confirm-btn');
    const backdrop = this.shadowRoot.getElementById('backdrop');
    cancelButton.addEventListener('click', event => this._cancel(event));
    confirmButton.addEventListener('click', () => this._confirm());
    backdrop.addEventListener('click', event => this._cancel(event));
  }

  open() {
    if (!this.hasAttribute('opened')) {
      this.setAttribute('opened', '');
    }
  }

  close() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
  }

  _cancel(event) {
    this.close();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.close();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'opened') {
  //
  //   }
  // }
  //
  // static get observedAttributes() {
  //   return ['opened'];
  // }
}

customElements.define('mg-modal', Modal);
