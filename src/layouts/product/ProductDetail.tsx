import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "../../models/Product";
import { getProductDetail } from "../../api/ProductApi";
import ImageProductComponent from "./components/ImageProductComponent";
import FeedbackComponent from "./components/FeedbackComponent";
import renderRating from "../utils/Stars";
import formatNumber from "../utils/FormatNumber";
import axios from "axios";

const ProductDetail: React.FC = () => {
    // Get id product to Url
    const { id } = useParams();

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
    const [quantity, setQuantity] = useState(1);
    const [addToCartMessage, setAddToCartMessage] = useState<string | null>(null);

    const increaseQuantity = () => {
        const existingQuantity = (product && product.quantity ? product.quantity : 0);

        if (quantity < existingQuantity) {
            setQuantity(quantity + 1);
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        const existingQuantity = (product && product.quantity ? product.quantity : 0);

        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= existingQuantity) {
            setQuantity(newQuantity);
        }
    }

    const handleBuyNow = () => {

    }

    const handleAddToCart = () => {
        axios
        .post('http://localhost:8080/api/cart/add', {
            userId: 1,
            productId: idNumber,
        })
        .then((response) => {
            setAddToCartMessage('Đã thêm sản phẩm vào giỏ hàng thành công.');
        })
        .catch((error) => {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            setAddToCartMessage('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
        });
    }

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
                            <h4>{renderRating(product?.average_rating ? product?.average_rating : 0)}</h4>
                            <div className="price row">
                                <span className="original-price col-6 text-end">
                                    <del>Giá: {formatNumber(product?.fixedPrice)} đ</del>
                                </span>
                                <span className="discount-price col-6 text-start">
                                    <strong>Giá khuyến mãi: {formatNumber(product?.priceProduct)} đ</strong>
                                </span>
                            </div>
                            <hr />
                            <span>Mô tả: {product?.descriptionProduct}</span>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">Tồn kho: {product?.quantity}</div>
                                <div className="mb-2">Số lượng</div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={decreaseQuantity}>-</button>
                                    <input className="form-control text-center" type="number" onChange={handleQuantityChange} value={quantity} />
                                    <button className="btn btn-outline-secondary ms-2" onClick={increaseQuantity}>+</button>
                                </div>
                                {
                                    product?.priceProduct && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h4>{formatNumber(quantity * product.priceProduct)}đ</h4>
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleBuyNow}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                                    {addToCartMessage && <div className="mt-2" style={{ color: "red" }}>{addToCartMessage}</div>}
                                </div>
                            </div>
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