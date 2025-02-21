import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import request from "./request";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await request.Catalog.list();
    }
)

export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async (productId) => {
        return await request.Catalog.details(productId);
    }
)

const prooductsAdapter = createEntityAdapter<IProduct>();

const initialState = prooductsAdapter.getInitialState({
    status: "idle"
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            prooductsAdapter.setAll(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "pendingFetchProductById";
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            prooductsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "idle";
        });
    })
})