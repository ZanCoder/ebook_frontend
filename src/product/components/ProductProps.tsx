import React, { useEffect, useState } from "react";
import Product from "../../models/Product";
import { getAllImageByProduct } from "../../api/ImageProductApi";
import ImageProduct from "../../models/ImageProduct";

interface ProductPropsInterface {
    product: Product;
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {
    const productId: number = props.product.id;

    const [listImageProducts, setListImageProducts] = useState<ImageProduct[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getAllImageByProduct(productId).then(
            imageProductData => {
                setListImageProducts(imageProductData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setErrorData(error.message);
            }
        );
    }, [])

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

    let dataImg = "";
    if (listImageProducts[0] && listImageProducts[0].dataImg) {
        dataImg = listImageProducts[0].dataImg;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img src={dataImg} className="card-img-top" alt={props.product.nameProduct} style={{ height: '200px' }} />
                <div className="card-body">
                    <h5 className="card-title">{props.product.nameProduct}</h5>
                    <p className="card-text">{props.product.descriptionProduct}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.product.fixedPrice}</del>
                        </span>
                        <span className="discount-price">
                            <strong>{props.product.priceProduct}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductProps;