import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  console.log("pageNumber", pageNumber);
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product, index) => (
              <Col key={index} sm="12" md="6" lg="4" xl="3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
