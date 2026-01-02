import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";

/* ================= FETCH ALL REVIEWS ================= */
export const fetchAdminReviews = createAsyncThunk(
  "adminReview/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/reviews`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch reviews");
    }
  }
);

/* ================= APPROVE / REJECT ================= */
export const updateReviewStatus = createAsyncThunk(
  "adminReview/status",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/api/admin/reviews/${id}/status`, { status });
      return { id, status };
    } catch (err) {
      return rejectWithValue("Failed to update status");
    }
  }
);

/* ================= ADMIN REPLY ================= */
export const replyToReview = createAsyncThunk(
  "adminReview/reply",
  async ({ id, reply }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/api/admin/reviews/${id}/reply`, { reply });
      return { id, reply };
    } catch (err) {
      return rejectWithValue("Failed to reply");
    }
  }
);

/* ================= DELETE REVIEW (ADMIN POWER) ================= */
export const deleteReview = createAsyncThunk(
  "adminReview/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/reviews/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete review");
    }
  }
);

/* ================= SLICE ================= */
const adminReviewSlice = createSlice({
  name: "adminReview",
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchAdminReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchAdminReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ---------- STATUS UPDATE ---------- */
      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        const r = state.reviews.find(
          (r) => r._id === action.payload.id
        );
        if (r) r.status = action.payload.status;
      })

      /* ---------- ADMIN REPLY ---------- */
      .addCase(replyToReview.fulfilled, (state, action) => {
        const r = state.reviews.find(
          (r) => r._id === action.payload.id
        );
        if (r) r.adminReply = action.payload.reply;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

export default adminReviewSlice.reducer;
