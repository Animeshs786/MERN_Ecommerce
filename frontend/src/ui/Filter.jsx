import { useDispatch, useSelector } from "react-redux";

import { useGetCategories } from "../features/category/useGetCategories";
import Error from "./Error";
import styles from "./Filter.module.css";
import FilterList from "./FilterList";
import Loader from "./Loader";
import {
  addCategory,
  clearFilter,
  setPrice,
} from "../features/product/productSlice";
import { currencyFormat } from "../utils/helper";
import CustomSlider from "./CustomSlider";
import { useDrawerHandler } from "../hooks/useDrawerHandler";

const price = [
  [0, 1000],
  [1000, 2000],
  [2000, 3000],
  [3000, 4000],
  [4000, 5000],
  [5000, 6000],
  [6000, 7000],
  [7000],
];

function Filter() {
  const { categories, isLoading, error } = useGetCategories();
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.product.category);
  const activePrice = useSelector((state) => state.product.price[0]);
  const drawerHandler = useDrawerHandler();

  const categoryHandler = ({ _id, name }) => {
    if (categoryFilter.some((cat) => cat._id === _id)) return;

    dispatch(addCategory({ _id, name }));
  };

  const priceHandler = (val) => {
    dispatch(setPrice(activePrice === val[0] ? [] : val));
  };

  const clearFilterHandler = () => {
    dispatch(clearFilter());
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.drawerHeader}>
        <h2>Filters</h2>
        <img
          onClick={() => drawerHandler()}
          src="/images/cross-icon1.svg"
          alt="cross-icon"
        />
      </div>
      <div className={styles.header}>
        <h2>Filters</h2>
        <div>
          <button onClick={clearFilterHandler}>Clear Filter</button>
        </div>
      </div>
      <FilterList listName="Category">
        <ul>
          {categories.map((cat, i) => (
            <li onClick={() => categoryHandler(cat)} key={i}>
              {cat.name}
            </li>
          ))}
        </ul>
      </FilterList>
      <FilterList listName="Price">
        <ul>
          {price.map((price, i) => (
            <li
              className={`${price[0] === activePrice ? "active" : ""} `}
              onClick={() => priceHandler(price)}
              key={i}
            >{`${currencyFormat(price[0])} ${
              price[1] ? " - " + currencyFormat(price[1]) : "And Above"
            }
            `}</li>
          ))}
        </ul>
      </FilterList>

      <FilterList listName="Rating">
        <CustomSlider />
      </FilterList>

      <div className={styles.drawerButton}>
        <button onClick={clearFilterHandler}>Clear Filter</button>
      </div>
    </div>
  );
}

export default Filter;
