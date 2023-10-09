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

export const getAllProducts = createAsyncThunk("products/getAllProducts", productAPI.getAllProducts);

export const productData = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      let no = 1;
      const products = action.payload.map((product: { id: string; no: number }) => {
        // product.id = nanoid() redux || uuidv4() uuid;
        product.no = no++;
        return product;
      });
      state.data = products;
      state.status = "succeeded";
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectProducts = (state: { products: ProductData }) => state.products.data;
export const productsStatus = (state: { products: ProductData }) => state.products.status;
export const productsError = (state: { products: ProductData }) => state.products.error;

export default productData.reducer;
