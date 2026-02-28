declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fire(event: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

export function gtagViewItem(item: {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
}) {
  fire('view_item', {
    currency: 'EUR',
    value: item.price,
    items: [{
      item_id: item.id,
      item_name: item.name,
      item_brand: item.brand,
      item_category: item.category,
      price: item.price,
    }],
  });
}

export function gtagAddToCart(item: {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
}) {
  fire('add_to_cart', {
    currency: 'EUR',
    value: item.price * (item.quantity ?? 1),
    items: [{
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity ?? 1,
    }],
  });
}

export function gtagRemoveFromCart(item: {
  id: string;
  name: string;
  price: number;
}) {
  fire('remove_from_cart', {
    currency: 'EUR',
    value: item.price,
    items: [{
      item_id: item.id,
      item_name: item.name,
      price: item.price,
    }],
  });
}

export function gtagBeginCheckout(items: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}[], total: number) {
  fire('begin_checkout', {
    currency: 'EUR',
    value: total,
    items: items.map(i => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
}

export function gtagPurchase(orderRef: string, total: number, items: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}[]) {
  fire('purchase', {
    transaction_id: orderRef,
    currency: 'EUR',
    value: total,
    items: items.map(i => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
}
