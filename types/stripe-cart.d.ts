import { LitElement } from 'lit';
type CartItem = {
    product: Product;
    quantity: number;
};
type Product = {
    id: string;
    amount: number;
    product: StripeProduct;
};
type StripeProduct = {
    description: string;
    id: string;
    name: string;
    images: string[];
};
type Cart = {
    items: Array<CartItem>;
    total: number;
};
export declare class StripeCartElement extends LitElement {
    cart: Cart | undefined;
    dialog: HTMLElement | undefined;
    constructor();
    itemCount(): import("lit-html").TemplateResult<1> | "";
    expandCart(): void;
    render(): import("lit-html").TemplateResult<1>;
    checkout(_e: Event): void;
}
declare global {
    interface HTMLElementEventMap {
        'checkout_redirect': CustomEvent<{
            checkout_url: string;
        }>;
    }
}
export {};
