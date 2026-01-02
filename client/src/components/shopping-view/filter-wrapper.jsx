import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductFilter from "./product-filter";

function FilterWrapper({ filters, handleFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 w-full bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="font-bold">Filters</h2>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
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

      {/* DESKTOP FILTER */}
      <div className="hidden md:block">
        <ProductFilter
          filters={filters}
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
}

export default FilterWrapper;
