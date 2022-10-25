import { html, LitElement } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { liveState } from 'phx-live-state';

type CartItem = {
  product: Product;
  quantity: number;
}

type Product = {
  id: string;
  amount: number;
  product: StripeProduct
}

type StripeProduct = {
  description: string;
  id: string;
  images: string[];
}

type Cart = {
  items: Array<CartItem>;
  total: number;
}

@customElement('stripe-cart')
@liveState({
  // channelName: 'stripe_cart:new',
  url: 'ws://localhost:4000/socket',
  properties: ['cart'],
  provide: {
    scope: window,
    name: 'cartState'
  },
  events: {
    send: ['checkout'],
    receive: ['checkout_redirect']
  }
})
export class StripeCartElement extends LitElement {

  @state()
  _cart: Cart | undefined;

  @state()
  expanded: boolean = false;

  @query('sl-dialog')
  dialog: HTMLElement | undefined;

  public get cart(): Cart | undefined { return this._cart; }
  public set cart(theCart: Cart | undefined) {
    window.localStorage.setItem('stripe-cart', JSON.stringify(theCart));
    this._cart = theCart;
  }

  public get channelName(): string {
    return 'stripe_cart:blah';
  }

  constructor() {
    super();
    this.addEventListener('checkout_redirect', (e: CustomEvent<{ checkout_url: string }>) => {
      window.location.href = e.detail.checkout_url;
    });
  }

  itemCount() {
    return this.cart && this.cart.items && this.cart.items.length > 0 ? html`
      <sl-badge pill>${this.cart.items.length}</sl-badge>
    ` : ``;
  }

  expandCart() {
    this.dialog && (this.dialog as any).show();
  }

  render() {
    return html`
    <sl-dialog>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${this.cart?.items.map(item => html`
          <tr>
            <td>${item.product.product.description}</td>
            <td>${item.quantity}</td>
            <td>${item.product.amount}</td>
          </tr>
          `)}
        </tbody>
      </table>
      <button @click=${this.checkout}>Check out</button>
    </sl-dialog>
    <sl-button @click=${this.expandCart}>
      <sl-icon name="cart" style="font-size: 2em;"></sl-icon>
      ${this.itemCount()}
    </sl-button>
    `;
  }

  checkout(_e: Event) {
    this.dispatchEvent(new CustomEvent('checkout', { detail: { return_url: window.location.href } }))
  }

}

declare global {
  interface HTMLElementEventMap {
    'checkout_redirect': CustomEvent<{ checkout_url: string }>;
  }
}