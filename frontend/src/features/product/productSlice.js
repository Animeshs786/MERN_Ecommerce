const initialState = {
  product: {},
  category: [],
  price: [],
  search: "",
  pageLimit: 10,
  currentPage: 1,
  ratingAverage: 0,
  sort: "-createdAt",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "product/createProduct":
      return { ...state, product: action.payload };
    case "filter/addCategory":
      return { ...state, category: [...state.category, action.payload] };
    case "filter/removeCategory":
      return {
        ...state,
        category: state.category.filter((cat) => cat._id !== action.payload),
      };
    case "filter/clearCategory":
      return {
        ...state,
        category: [],
      };
    case "filter/sort":
      return {
        ...state,
        sort: action.payload,
      };
    case "filter/pageLimit":
      return {
        ...state,
        pageLimit: action.payload,
      };
    case "filter/setCurrentPage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "filter/setPrice":
      return { ...state, price: [...action.payload] };
    case "filter/productSearch":
      return { ...state, search: action.payload };
    case "filter/setRating":
      return { ...state, ratingAverage: action.payload };
    case "filter/clearFilter":
      return {
        ...state,
        category: [],
        price: [],
        ratingAverage: 0,
      };
    default:
      return state;
  }
};

export default productReducer;

export const createProduct = (product) => {
  return { type: "product/createProduct", payload: product };
};

export const addCategory = (category) => {
  return { type: "filter/addCategory", payload: category };
};

export const removeCategory = (id) => {
  return { type: "filter/removeCategory", payload: id };
};

export const clearCategory = () => {
  return { type: "filter/clearCategory" };
};

export const sort = (val) => {
  return { type: "filter/sort", payload: val };
};

export const setRating = (val) => {
  return { type: "filter/setRating", payload: val };
};

export const pageLimit = (val) => {
  return { type: "filter/pageLimit", payload: val };
};

export const setCurrentPage = (val) => {
  return { type: "filter/setCurrentPage", payload: val };
};

export const setPrice = (price) => {
  return { type: "filter/setPrice", payload: price };
};

export const productSearch = (search) => {
  return { type: "filter/productSearch", payload: search };
};

export const clearFilter = () => {
  return { type: "filter/clearFilter" };
};
