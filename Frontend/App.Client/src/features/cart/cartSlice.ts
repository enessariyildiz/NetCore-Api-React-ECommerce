import request from "../../api/request";
import { Cart } from "../../model/ICart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
}

export const addItemToCart = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await request.Cart.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteItemFromCart = createAsyncThunk<Cart, { productId: number, quantity?: number, key?: string }>(
    "cart/deleteItemFromCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await request.Cart.deleteItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
);

export const getCart = createAsyncThunk<Cart>(
    "cart/getcart",
    async (_, thunkAPI) => {
        try {
            return await request.Cart.get();

        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.dats })
        }
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });

        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            console.log(action);
            state.cart = action.payload;
            state.status = "idle";
        });

        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            console.log(action);
            state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(getCart.rejected, (_, action) => {
            console.log(action.payload);

        });
    }
})

export const { setCart, clearCart } = cartSlice.actions;