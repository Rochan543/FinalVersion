import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveAnnouncement } from "@/store/announcement-slice";

function AnnouncementPopup() {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.announcement);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveAnnouncement());
  }, [dispatch]);

  useEffect(() => {
    if (active && !sessionStorage.getItem("announcementClosed")) {
      setOpen(true);
    }
  }, [active]);

  if (!open || !active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-white rounded-xl max-w-lg w-full mx-4">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={() => {
            setOpen(false);
            sessionStorage.setItem("announcementClosed", "true");
          }}
        >
          ✕
        </button>

        <img
          src={active.image}
          alt={active.title}
          className="rounded-xl w-full"
        />
      </div>
    </div>
  );
}

export default AnnouncementPopup;
