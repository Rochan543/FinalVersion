import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import ProductFilter from "./product-filter";

function MobileFilter({ filters, handleFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {/* MOBILE FILTER DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 w-full bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="font-bold">Filters</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
              >
                Close
              </button>
            </div>

            <div className="p-4">
              <ProductFilter
                filters={filters}
                handleFilter={handleFilter}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default MobileFilter;
