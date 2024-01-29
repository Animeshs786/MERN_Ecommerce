import { useSelector, useDispatch } from "react-redux";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { setRating } from "../features/product/productSlice";

const PrettoSlider = styled(Slider)({
  color: "var(--base-blue)",
  height: 7,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 28,
    height: 28,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "var(--base-blue)",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function CustomSlider() {
  const { ratingAverage } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const ratingHandler = (value) => {
    dispatch(setRating(value));
  };
  return (
    <Box sx={{ maxWidthidth: 320 }}>
      <Box />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={ratingAverage}
        max={5}
        value={ratingAverage}
        onChange={(e) => ratingHandler(e.target.value)}
      />
    </Box>
  );
}
