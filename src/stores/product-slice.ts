import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { productAPI } from "@/apis/products-api";

type ProductData = {
  data: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: ProductData = {
  data: [],
  status: "idle",
  error: "",
};

export const getProductById = createAsyncThunk("product/getProductById", productAPI.getProductById);
export const addProduct = createAsyncThunk("product/addProduct", productAPI.addProduct);
export const editProduct = createAsyncThunk("product/editProduct", productAPI.editProduct);
export const deleteProduct = createAsyncThunk("product/deleteProduct", productAPI.deleteProduct);

export const productData = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.status = "succeeded";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const { id } = action.payload;
      const index = state.data.findIndex((products) => products.id === id);
      state.data[index] = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const { id } = action.payload;
      const index = state.data.findIndex((product) => product.id === id);
      state.data.splice(index, 1);
      state.status = "succeeded";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectProduct = (state: { product: ProductData }) => state.product.data;
export const productStatus = (state: { product: ProductData }) => state.product.status;
export const productError = (state: { product: ProductData }) => state.product.error;

export default productData.reducer;
