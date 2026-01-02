import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";


/* ================= FETCH ALL ANNOUNCEMENTS (ADMIN - OLD) ================= */

export const fetchAnnouncements = createAsyncThunk(
  "announcement/fetchAll",
  async () => {
    const res = await axios.get(
      `${API_URL}/api/admin/announcement`,
      { withCredentials: true }
    );
    return res.data.data;
  }
);

/* ================= FETCH ALL ANNOUNCEMENTS (ADMIN - FIXED PATH) ================= */

export const fetchAnnouncementsFixed = createAsyncThunk(
  "announcement/fetchAllFixed",
  async () => {
    const res = await axios.get(
      `${API_URL}/api/admin/announcement/all`,
      { withCredentials: true }
    );
    return res.data.data;
  }
);

/* ================= FETCH ACTIVE ANNOUNCEMENT (USER) ================= */

export const fetchActiveAnnouncement = createAsyncThunk(
  "announcement/fetchActive",
  async () => {
    const res = await axios.get(
      `${API_URL}/api/admin/announcement/active`,
      { withCredentials: true }
    );
    return res.data.data;
  }
);

/* ================= CREATE ANNOUNCEMENT ================= */

export const createAnnouncement = createAsyncThunk(
  "announcement/create",
  async ({ title, image }) => {
    const res = await axios.post(
      `${API_URL}/api/admin/announcement/add`,
      { title, image },
      { withCredentials: true }
    );
    return res.data.data;
  }
);

/* ================= DELETE ANNOUNCEMENT ================= */

export const deleteAnnouncement = createAsyncThunk(
  "announcement/delete",
  async (id) => {
    await axios.delete(
      `${API_URL}/api/admin/announcement/${id}`,
      { withCredentials: true }
    );
    return id;
  }
);

/* ================= SLICE ================= */

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    list: [],
    active: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder

      /* ---------- FETCH ALL (OLD) ---------- */
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state) => {
        state.loading = false;
      })

      /* ---------- FETCH ALL (FIXED) ---------- */
      .addCase(fetchAnnouncementsFixed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnnouncementsFixed.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnnouncementsFixed.rejected, (state) => {
        state.loading = false;
      })

      /* ---------- FETCH ACTIVE ---------- */
      .addCase(fetchActiveAnnouncement.fulfilled, (state, action) => {
        state.active = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.active = action.payload;
        state.list.unshift(action.payload);
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item._id !== action.payload
        );
        if (state.active?._id === action.payload) {
          state.active = null;
        }
      });
  },
});

export default announcementSlice.reducer;
