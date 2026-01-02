import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/common/Footer";


/* ---------------------------------------------
   HELPER: CREATE QUERY STRING FROM FILTERS
--------------------------------------------- */
function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }

  return queryParams.join("&");
}

/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */
function ShoppingListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySearchParam = searchParams.get("category");

  /* ---------------------------------------------
     SORT HANDLER
  --------------------------------------------- */
  function handleSort(value) {
    setSort(value);
  }

  /* ---------------------------------------------
     FILTER HANDLER
  --------------------------------------------- */
  function handleFilter(sectionId, option) {
    let updatedFilters = { ...filters };

    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [option];
    } else {
      const index = updatedFilters[sectionId].indexOf(option);
      index === -1
        ? updatedFilters[sectionId].push(option)
        : updatedFilters[sectionId].splice(index, 1);
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  /* ---------------------------------------------
     PRODUCT CLICK → NAVIGATE TO PAGE
  --------------------------------------------- */
  function handleGetProductDetails(productId) {
    navigate(`/shop/product/${productId}`);
  }

  /* ---------------------------------------------
     ADD TO CART
  --------------------------------------------- */
  function handleAddtoCart(productId, totalStock) {
    const items = cartItems.items || [];

    const existingItem = items.find(
      (item) => item.productId === productId
    );

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  }

  /* ---------------------------------------------
     INITIAL LOAD
  --------------------------------------------- */
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  /* ---------------------------------------------
     UPDATE URL WHEN FILTERS CHANGE
  --------------------------------------------- */
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  /* ---------------------------------------------
     FETCH PRODUCTS
  --------------------------------------------- */
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams: sort,
        })
      );
    }
  }, [dispatch, sort, filters]);

  /* ---------------------------------------------
     UI
  --------------------------------------------- */
  return (

  <>
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      {/* FILTER */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      {/* PRODUCT LIST */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length || 0} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList?.length > 0 &&
            productList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
        </div>
      </div>
    </div>
  {/* ✅ FOOTER */}
      <Footer />
 </>
  );
}

export default ShoppingListing;
