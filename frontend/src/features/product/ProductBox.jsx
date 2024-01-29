import { useSelector, useDispatch } from "react-redux";

import ActiveFilter from "../../ui/ActiveFilter";
import BackBtn from "../../ui/BackBtn";
import CustomPagination from "../../ui/CustomPagination";
import Error from "../../ui/Error";
import Filter from "../../ui/Filter";
import Loader from "../../ui/Loader";
import PageStats from "../../ui/PageStats";
import ProductCard from "../../ui/ProductCard";
import SelectBox from "../../ui/SelectBox";
import styles from "./ProductBox.module.css";
import { useGetProducts } from "./useGetProducts";
import { clearCategory, pageLimit, sort } from "./productSlice";
import NotFound from "../../ui/NotFound";
import { useDrawerHandler } from "../../hooks/useDrawerHandler";
import { setDrawerDirection, setDrawerList } from "../modal/modalSlice";

function ProductBox() {
  const dispatch = useDispatch();
  const drawerHandler = useDrawerHandler();
  const {
    search: searchFilter,
    sort: sortFilter,
    pageLimit: limitFilter,
    price: priceFilter,
    category: categoryFilter,
    currentPage,
    ratingAverage: ratingFilter,
  } = useSelector((state) => state.product);

  const minPrice = priceFilter[0] || 0;
  const maxPrice = priceFilter[1];
  let priceQuery;

  if (maxPrice) {
    priceQuery = `&price[gt]=${minPrice}&price[lt]=${maxPrice}`;
  } else {
    priceQuery = `&price[gt]=${minPrice}`;
  }

  let categoryQuery = "";

  if (categoryFilter.length > 0) {
    categoryFilter.forEach((el) => {
      categoryQuery += `&category=${el._id}`;
    });
  }

  let queryParams;

  if (categoryFilter) {
    queryParams = `?keyward=${searchFilter}&sort=${sortFilter}&limit=${limitFilter}${priceQuery}${categoryQuery}&page=${currentPage}&ratingAverage[gte]=${ratingFilter}`;
  } else {
    queryParams = `?keyward=${searchFilter}&sort=${sortFilter}&limit=${limitFilter}${priceQuery}&page=${currentPage}&ratingAverage[gte]=${ratingFilter}`;
  }

  const { isLoading, error, product, totalResult, result } = useGetProducts(
    queryParams,
    {
      searchFilter,
      sortFilter,
      limitFilter,
      priceFilter,
      currentPage,
      categoryFilter,
      ratingFilter,
    }
  );

  const clearHandler = () => {
    dispatch(clearCategory());
  };

  const sortHandler = (val) => {
    dispatch(sort(val));
  };

  const pageLimitHandler = (val) => {
    dispatch(pageLimit(+val));
  };

  const filterDrawerHandler = () => {
    dispatch(setDrawerList("filterList"));
    dispatch(setDrawerDirection("top"));
    drawerHandler();
  };

  if (isLoading) return <Loader />;

  if (error) return <Error error={error} />;

  return (
    <div className={styles.productBox}>
      <div className={styles.statsWrapper}>
        <div>
          <BackBtn />
        </div>
        <div>
          <div className={styles.listStats}>
            {result > 0 && <PageStats totalResult={totalResult} />}
          </div>
          <div className={styles.selectBoxWrapper}>
            <button
              onClick={() => filterDrawerHandler()}
              className={styles.filterBtn}
            >
              Filter
            </button>
            <SelectBox optionName="Sort By:">
              <select
                value={sortFilter}
                onChange={(e) => sortHandler(e.target.value)}
              >
                <option value="-createdAt">Latest</option>
                <option value="-price">Price</option>
                <option value="-ratingAverage">Rating</option>
              </select>
            </SelectBox>
            <SelectBox optionName="Show:">
              <select
                value={limitFilter.toString()}
                onChange={(e) => pageLimitHandler(e.target.value)}
              >
                <option value="10">10 Per Page</option>
                <option value="20">20 Per Page</option>
                <option value="35">35 Per Page</option>
              </select>
            </SelectBox>
            <div>
              <img src="/images/square-icon.svg" alt="square-icon" />
              <img src="/images/grid-icon.svg" alt="grid-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productContentWrapper}>
        <Filter />
        <div className={styles.contentSection}>
          {/*Selectd filter wrapper */}
          <div className={styles.activeFilter}>
            {categoryFilter.map((cat, i) => (
              <ActiveFilter key={i} filter={cat} />
            ))}
            {categoryFilter.length > 0 && (
              <button onClick={clearHandler}>Clear All</button>
            )}
          </div>

          {/* product listing wrapper */}
          {result > 0 ? (
            <div className={styles.productListingWrapper}>
              {product.map((item, i) => (
                <div key={i} className={styles.cardOuterLayer}>
                  <ProductCard key={i} item={item} />{" "}
                </div>
              ))}
            </div>
          ) : (
            <NotFound>
              <img src="/images/productNotFound.png" alt="not-found-img" />
            </NotFound>
          )}

          {/* pagination Section */}
          <div className={styles.paginationWrapper}>
            {totalResult > limitFilter && (
              <CustomPagination
                totalPage={Math.ceil(totalResult / limitFilter)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
