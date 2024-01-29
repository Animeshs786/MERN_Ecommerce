import ProductBanner from "./ProductBanner";
import ProductList from "./ProductList";

function ProductRow() {
  return (
    <>
      <ProductBanner />
      <ProductList length={5} />
    </>
  );
}

export default ProductRow;
