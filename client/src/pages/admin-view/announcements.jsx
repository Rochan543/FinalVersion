import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnnouncementsFixed,
  createAnnouncement,
  deleteAnnouncement,
} from "@/store/announcement-slice";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function AdminAnnouncements() {
  const dispatch = useDispatch();

  const { list: announcementList, loading } = useSelector(
    (state) => state.announcement
  );

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  /* ================= FETCH ALL ANNOUNCEMENTS ================= */
  useEffect(() => {
    dispatch(fetchAnnouncementsFixed());
  }, [dispatch]);

  /* ================= CREATE ANNOUNCEMENT ================= */
  function handleSubmit() {
    if (!imageUrl || !formData.title) return;

    dispatch(
      createAnnouncement({
        title: formData.title,
        image: imageUrl,
        message: formData.message,
        isActive: formData.isActive,
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
    ).then(() => {
      setImageFile(null);
      setImageUrl("");
      setFormData({
        title: "",
        message: "",
        isActive: true,
        startDate: "",
        endDate: "",
      });

      dispatch(fetchAnnouncementsFixed());
    });
  }

  /* ================= DELETE ANNOUNCEMENT ================= */
  function handleDelete(id) {
    if (!window.confirm("Delete this announcement?")) return;

    dispatch(deleteAnnouncement(id)).then(() => {
      dispatch(fetchAnnouncementsFixed());
    });
  }

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-extrabold">
        Festival / Sale Announcements
      </h1>

      {/* ================= CREATE SECTION ================= */}
      <div className="bg-white rounded-2xl border p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">
          Create Announcement
        </h2>

        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={imageUrl}
          setUploadedImageUrl={setImageUrl}
          setImageLoadingState={setImageLoading}
          imageLoadingState={imageLoading}
          isCustomStyling
        />

        <input
          type="text"
          placeholder="Announcement Title"
          className="w-full border rounded-lg px-4 py-3 text-lg"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <textarea
          placeholder="Message (optional)"
          className="w-full border rounded-lg px-4 py-3 min-h-[100px]"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded-lg px-4 py-3"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-3"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                endDate: e.target.value,
              })
            }
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                isActive: e.target.checked,
              })
            }
          />
          Active
        </label>

        <Button onClick={handleSubmit} className="w-full text-lg py-6">
          Publish Announcement
        </Button>
      </div>

      {/* ================= LIST SECTION ================= */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Live Announcements
        </h2>

        {announcementList?.length > 0 ? (
          announcementList.map((item) => (
            <div
              key={item._id}
              className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-6 shadow-sm"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="    w-full lg:w-[520px] h-[260px] md:h-[300px] object-cover rounded-2xl"

              />

              {/* CONTENT */}
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                {item.message && (
                  <p className="text-base text-gray-700">
                    {item.message}
                  </p>
                )}

                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-gray-500">
                    📅 {item.startDate} → {item.endDate}
                  </p>
                )}
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item._id)}
                className="self-start text-red-600 hover:text-red-800"
                title="Delete Announcement"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No announcements found
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminAnnouncements;
