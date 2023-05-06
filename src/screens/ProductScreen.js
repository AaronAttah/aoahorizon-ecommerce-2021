import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
// import data from '../data';
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProducts } from "../actions/productActions";
import { useNavigate } from "react-router-dom";

function ProductScreen(props) {
  //   i left this line for reference sake, donot try to get an id using ==>>  // ID = props.match.params.id ;  // but make use of iported useParams as seen below
  const location = useLocation();
console.log(location);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = id;

  // console.log(productId)
  
  // const loading = useSelector((state) =>state.productDetails.loading)
  // const error = useSelector((state) =>state.productDetails.error)
  // const product = useSelector((state) =>state.productDetails.product)

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // console.log(product)
  // console.log(productDetails)

  const [qty, setQty] = useState(1);

  // if(!product){
  //     return <div> Product Not Found </div>
  // }
  useEffect(() => {
    dispatch(detailsProducts(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    console.log("hey addToCartHandler is working fine");
    navigate(`/cart/${productId}?qty=${qty}`);
    console.log(product.countInStock);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <span class="fa-1x">
            <Link to="/">
              Back to Results
              <i className="fas fa-cog fa-spin "></i>
            </Link>
          </span>

          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>price : ₦{product.price}</li>
                <li>
                  Description: <p> {product.description} </p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price"> ₦{product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[
                                ...Array(parseInt(product.countInStock)).keys(),
                              ].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart{" "}
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
