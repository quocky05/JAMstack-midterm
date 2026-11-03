import { atom, map } from 'nanostores';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const isCartOpen = atom<boolean>(false);
export const cartItems = map<Record<string, CartItem>>({});

export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function addToCart(product: { id: string; title: string; price: number; image: string }) {
  const current = cartItems.get();
  const existing = current[product.id];
  
  if (existing) {
    cartItems.setKey(product.id, {
      ...existing,
      quantity: existing.quantity + 1,
    });
  } else {
    cartItems.setKey(product.id, {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }
  openCart();
}

export function removeFromCart(id: string) {
  const current = { ...cartItems.get() };
  delete current[id];
  cartItems.set(current);
}

export function updateQuantity(id: string, delta: number) {
  const current = cartItems.get();
  const existing = current[id];
  if (!existing) return;

  const newQty = existing.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(id);
  } else {
    cartItems.setKey(id, {
      ...existing,
      quantity: newQty,
    });
  }
}

export function clearCart() {
  cartItems.set({});
}
