import {useSelector} from "react-redux";

import BreadCrumbs from './BreadCrumbs';
import ProductSpecification from './ProductSpecification';
import styles from './SpecificationBox.module.css';

function SpecificationBox() {
  const {name,specification}= useSelector((state)=>state.product.product);
    return (
        <div className={styles.infoWrapper}>
        <BreadCrumbs link="Product" />
        <header>
          <h2>{name}</h2>
        </header>
        <ProductSpecification specification={specification} />
      </div>
    )
}

export default SpecificationBox
