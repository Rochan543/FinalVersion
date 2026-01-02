import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { SlidersHorizontal } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border shadow-sm sticky top-4">
      
      {/* MOBILE FILTER BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
        <span className="font-bold text-sm">Filters</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <SlidersHorizontal size={16} />
          {mobileOpen ? "Hide" : "Show"}
        </button>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden md:block px-5 py-4 border-b">
        <h2 className="text-xl font-extrabold tracking-wide">Filters</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Refine your selection
        </p>
      </div>

      {/* FILTER BODY */}
      <div
        className={`px-5 py-4 space-y-6 
          ${mobileOpen ? "block" : "hidden"} 
          md:block`}
      >
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
                {keyItem}
              </h3>

              <div className="flex flex-col gap-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-3 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() =>
                        handleFilter(keyItem, option.id)
                      }
                    />
                    <span className="text-sm font-medium">
                      {option.label}
                    </span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator className="opacity-60" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
