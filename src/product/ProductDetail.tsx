import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "../models/Product";
import { getProductDetail } from "../api/ProductApi";
import ImageProductComponent from "./components/ImageProductComponent";
import FeedbackComponent from "./components/FeedbackComponent";

const ProductDetail: React.FC = () => {
    // Get id product to Url
    const {id} = useParams();

    let idNumber = 0;

    try {
        idNumber = parseInt(id + '');

        if (Number.isNaN(idNumber)) {
            idNumber = 0;
        }
    } catch (error) {
        idNumber = 0;
        console.error("Error" + error);
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getProductDetail(idNumber).then(
            product => {
                setProduct(product);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setErrorData(error.message);
                setLoadingData(false);
            }
        )
    }, [id])

    if (loadingData) {
        return (
            <div>
                <h1>Loading....!</h1>
            </div>
        );
    }

    if (errorData) {
        return (
            <div>
                <h1>Error: {errorData}</h1>
            </div>
        );
    }
    
    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <ImageProductComponent id={idNumber} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <p>Tác giả: {product?.creator}</p>
                            <h2>{product?.nameProduct}</h2>
                            <h4>{product?.average_rating}</h4>
                            <h4>{product?.priceProduct}</h4>
                            <hr />
                            <span>Mô tả: {product?.descriptionProduct}</span>
                        </div>
                        <div className="col-4">
                            Phần đặt hàng
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <FeedbackComponent id={idNumber} />
            </div>

            <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Sản phẩm có liên quan</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src={""} alt={product?.nameProduct} />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">{product?.nameProduct}</h5>
                                    ${product?.fixedPrice} - ${product?.priceProduct}
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Xem chi tiết</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default ProductDetail;