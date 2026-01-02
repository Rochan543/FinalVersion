import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";

/* ================= ADD SUBSCRIBER ================= */

export const addSubscriber = createAsyncThunk(
  "subscriber/add",
  async (email) => {
    const res = await axios.post(
      `${API_URL}/api/admin/subscribers/add`,
      { email }
    );
    return res.data.data; // return saved subscriber
  }
);

/* ================= FETCH SUBSCRIBERS ================= */

export const fetchSubscribers = createAsyncThunk(
  "subscriber/fetchAll",
  async () => {
    const res = await axios.get(
      `${API_URL}/api/admin/subscribers/list`
    );
    return res.data.data;
  }
);

/* ================= DELETE SUBSCRIBER ================= */

export const deleteSubscriber = createAsyncThunk(
  "subscriber/delete",
  async (id) => {
    await axios.delete(`${API_URL}/api/admin/subscribers/${id}`);
    return id;
  }
);

/* ================= SLICE ================= */

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      /* -------- FETCH -------- */
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      /* -------- ADD -------- */
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      /* -------- DELETE (ADDED, NO EXISTING CODE TOUCHED) -------- */
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (sub) => sub._id !== action.payload
        );
      });
  },
});

export default subscriberSlice.reducer;
