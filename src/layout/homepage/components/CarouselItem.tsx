import React, { useEffect, useState } from "react";
import Product from "../../../models/Product";
import ImageProduct from "../../../models/ImageProduct";
import { getNewImageByProduct } from "../../../api/ImageProductApi";

interface CarouselItemInterface {
    product: Product;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
    const productId: number = props.product.id;

    const [listImageProducts, setListImageProducts] = useState<ImageProduct[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getNewImageByProduct(productId).then(
            imageNewProductData => {
                setListImageProducts(imageNewProductData);
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
        <div className="row align-items-center">
            <div className="col-5">
                <img src={dataImg} className="float-end" alt="img-banner" style={{ width: '150px' }} />
            </div>
            <div className="col-5">
                <h5>{props.product.nameProduct}</h5>
                <p>{props.product.descriptionProduct}</p>
            </div>
        </div>
    );
}

export default CarouselItem;