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
  properties: ['cart']
})
export class StripeCartElement extends LitElement {
  
  @state()
  cart: Cart | undefined;

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
    `
  }

}
