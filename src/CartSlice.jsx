import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        numOfItems: 0 // Number of items
    },

    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItems = state.items.find(item => item.name === name);

            if (existingItems) {
                existingItems.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }

            state.numOfItems += 1;
        },

        removeItem: (state, action) => {
            const { name, quantity } = action.payload;
            state.items = state.items.filter(item => item.name !== name);
            state.numOfItems = state.numOfItems - quantity;

            if (state.numOfItems < 0) {
                state.numOfItems = 0;
            }
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItems = state.items.find(item => item.name === name);

            if (existingItems) {
                const differenceOfQuantity = quantity - existingItems.quantity;
                state.numOfItems = state.numOfItems + differenceOfQuantity;
                existingItems.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
