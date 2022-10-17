import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { liveState} from 'phx-live-state';

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
  channelName: 'stripe_cart:new',
  url: 'ws://localhost:4000/socket',
  shared: true,
  properties: ['cart'],
  events: {
    send: ['checkout'],
    receive: ['checkout_redirect']
  }
})
export class StripeCartElement extends LitElement {
  
  @state()
  cart: Cart | undefined;

  constructor() {
    super();
    this.addEventListener('checkout_redirect', (e: CustomEvent<{checkout_url: string}>) => {
      window.location.href = e.detail.checkout_url;
    });
  }

  render() {
    return html`
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
    `
  }

  checkout(_e: Event) {
    this.dispatchEvent(new CustomEvent('checkout', {detail: {return_url: window.location.href}}))
  }

}

declare global {
  interface HTMLElementEventMap {
    'checkout_redirect': CustomEvent<{checkout_url: string}>;
  }
}