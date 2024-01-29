import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { productSearch } from "../features/product/productSlice";

export const useSearchHandler = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!search) return navigate(`/product`);

    dispatch(productSearch(search.trim()));
    navigate(`/product?search=${search.trim()}`);
  };

  return { setSearch, submitHandler,search };
};
