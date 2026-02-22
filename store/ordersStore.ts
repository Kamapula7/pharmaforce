'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image?: string;
}

export interface Order {
  ref: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
}

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      clearOrders: () => set({ orders: [] }),
    }),
    { name: 'pharmaforce-orders' }
  )
);
