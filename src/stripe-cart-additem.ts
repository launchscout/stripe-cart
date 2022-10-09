import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('stripe-cart-additem')
export class StripeCartAddItemElement extends LitElement {

  @property({attribute: 'price-id'})
  priceId = '';

  constructor() {
    super();
    this.addEventListener('click', (e) => {
      console.log(`${e} got clicked. should add ${this.priceId} to cart.`);
    });
  }
  render() {
    return html`<slot></slot>`;
  }
}
