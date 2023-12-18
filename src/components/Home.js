import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductPagination, getProducts } from "../actions/productAction";
import { useAlert } from "react-alert";
import Products from "./products/Products";
import Pagination from "react-js-pagination";
import {
  setPageIndex,
  updateCategory,
  updatePrecio,
  updateRating,
} from "../slices/productPaginationSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const dispatch = useDispatch();
  const [precio, setPrecio] = useState([1, 10000]);

  const { categories } = useSelector((state) => state.category);

  //const { products, loading, error } = useSelector((state) => state.products);

  const {
    products,
    count,
    pageIndex,
    loading,
    error,
    resultByPage,
    search,
    pageSize,
    precioMax,
    precioMin,
    category,
    rating,
  } = useSelector((state) => state.productPagination);
  const alert = useAlert();

  useEffect(() => {
    if (error != null) {
      return alert.error(error);
    }

    dispatch(
      getProductPagination({
        pageIndex: pageIndex,
        pageSize: pageSize,
        search: search,
        precioMax: precioMax,
        precioMin: precioMin,
        categoryId: category,
        rating: rating,
      })
    );
  }, [
    dispatch,
    error,
    alert,
    search,
    pageSize,
    pageIndex,
    precioMax,
    precioMin,
    category,
    rating,
  ]);

  function setCurrentPageNo(pageNumber) {
    dispatch(setPageIndex({ pageIndex: pageNumber }));
  }

  function onChangePrecio(precioEvent) {
    setPrecio(precioEvent);
  }
  function onAfterChange(precioEvent) {
    dispatch(updatePrecio({ precio: precioEvent }));
  }
  function onChangeCategory(category) {
    dispatch(updateCategory({ category: category.id }));
  }
  function onChangeStar(ctg) {
    dispatch(updateRating({ rating: ctg }));
  }

  return (
    <Fragment>
      <MetaData titulo={"Los Mejores Productos Online"} />
      <section id="products" className="container mt-5">
        <div className="row">
          {search ? (
            <Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{ 1: `$1`, 10000: `$10000` }}
                    min={1}
                    max={10000}
                    defaultValue={[1, 10000]}
                    tipFormatter={(value) => `$${value}`}
                    value={precio}
                    tipProps={{ placement: "top", visible: true }}
                    onChange={onChangePrecio}
                    onAfterChange={onAfterChange}
                  />
                </div>
                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Categories</h4>
                  <ul className="pl-0">
                    {categories.map((ctg) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={ctg.id}
                        onClick={() => onChangeCategory(ctg)}
                      >
                        {ctg.nombre}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-5" />
                <div className="mt-5">
                  <h4>Ratings</h4>
                  <ul className="pl-0">
                    {
                    [5, 4, 3, 2, 1].map(star => (
                      <li
                        style={{ cursor:"pointer", listStyleType:"none" }}
                        key={star}
                        onClick={() => onChangeStar(star)}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star*20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  <Products products={products} col={4} loading={loading} />
                </div>
              </div>
            </Fragment>
          ) : (
            <Products products={products} col={4} loading={loading} />
          )}
        </div>
      </section>

      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={pageIndex}
          itemsCountPerPage={pageSize}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={">"}
          prevPageText={"<"}
          firstPageText={"<<"}
          lastPageText={">>"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </Fragment>
  );
};

export default Home;
