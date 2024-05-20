import React, { useEffect, useState } from "react";
import { getAllImageByProduct } from "../../api/ImageProductApi";
import ImageProduct from "../../models/ImageProduct";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageProductComponentInterface {
    id: number;
}

const ImageProductComponent: React.FC<ImageProductComponentInterface> = (props) => {
    const productId: number = props.id;

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

    return (
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showIndicators={true}>
                    {
                        listImageProducts.map((imageModel, index) => (
                            <div key={index}>
                                {
                                    <img src={imageModel.dataImg} style={{ maxWidth: '250px' }} />
                                }
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default ImageProductComponent;