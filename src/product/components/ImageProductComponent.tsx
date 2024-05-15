import React, { useEffect, useState } from "react";
import { getAllImageByProduct } from "../../api/ImageProductApi";
import ImageProduct from "../../models/ImageProduct";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

interface ImageProductComponentInterface {
    id: number;
}

const ImageProductComponent: React.FC<ImageProductComponentInterface> = (props) => {
    const productId: number = props.id;

    const [listImageProducts, setListImageProducts] = useState<ImageProduct[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);
    const [thisImageProduct, setThisImageProduct] = useState<ImageProduct | null>(null);

    const imagePick = (imageModel: ImageProduct) => {
        setThisImageProduct(imageModel);
    }

    useEffect(() => {
        getAllImageByProduct(productId).then(
            imageProductData => {
                setListImageProducts(imageProductData);

                if (imageProductData.length > 0) {
                    setThisImageProduct(imageProductData[0]);
                }

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

    // let dataImg = "";
    // if (listImageProducts[0] && listImageProducts[0].dataImg) {
    //     dataImg = listImageProducts[0].dataImg;
    // }

    return (
        <div className="row">
            <div className="mb-3">
                {
                    thisImageProduct && <img src={thisImageProduct.dataImg} style={{ width: '350px' }} alt="" />
                }
            </div>
            <div className="row">
                {
                    listImageProducts.map((imageModel, index) => (
                        <div className="col-3" key={index} onClick={() => imagePick(imageModel)}>
                            {
                                imageModel && <img src={imageModel.dataImg} style={{ width: '80px' }} />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ImageProductComponent;