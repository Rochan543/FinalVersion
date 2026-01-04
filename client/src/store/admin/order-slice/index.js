import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

/* ===============================
   GET ALL ORDERS (ADMIN)
================================ */
export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${API_URL}/api/admin/orders/get`,
      { withCredentials: true }
    );
    return response.data;
  }
);

/* ===============================
   GET ORDER DETAILS (ADMIN)
================================ */
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/api/admin/orders/details/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

/* ===============================
   UPDATE ORDER STATUS (ADMIN)
================================ */
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
      { withCredentials: true }
    );
    return response.data;
  }
);

/* ===============================
   DELETE ORDER (ADMIN) ✅ ADDED
================================ */
export const deleteOrderForAdmin = createAsyncThunk(
  "/order/deleteOrderForAdmin",
  async (id) => {
    const response = await axios.delete(
      `${API_URL}/api/admin/orders/delete/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

/* ===============================
   SLICE
================================ */
const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* GET ALL ORDERS */
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      /* GET ORDER DETAILS */
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })

      /* UPDATE ORDER STATUS */
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orderDetails = action.payload.data;
      })

      /* DELETE ORDER */
      .addCase(deleteOrderForAdmin.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.orderList = state.orderList.filter(
          (order) => order._id !== deletedId
        );
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
