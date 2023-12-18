import React, { Fragment } from "react";
import Product from "../product/Product";
import Loader from "../layout/Loader";

const Products = ({ products, col, loading }) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      {products ? (
        products.map((product) => (
          <Product key={product.id} product={product} col={col} />
        ))
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Products;
