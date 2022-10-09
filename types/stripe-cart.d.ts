import { LitElement } from 'lit';
declare type CartItem = {
    product: Product;
    quantity: number;
};
declare type Product = {
    id: string;
    amount: number;
    product: StripeProduct;
};
declare type StripeProduct = {
    description: string;
    id: string;
    images: string[];
};
declare type Cart = {
    items: Array<CartItem>;
    total: number;
};
export declare class StripeCartElement extends LitElement {
    cart: Cart | undefined;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
