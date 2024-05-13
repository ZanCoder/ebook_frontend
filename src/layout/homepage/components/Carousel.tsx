import React, { useEffect, useState } from "react";
import { getNewProduct } from "../../../api/ProductApi";
import Product from "../../../models/Product";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {
    const [listBooks, setListBooks] = useState<Product[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getNewProduct().then(
            productNewData => {
                setListBooks(productNewData);
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
        <div>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <CarouselItem key={0} product={listBooks[0]} />
                    </div>
                    <div className="carousel-item">
                        <CarouselItem key={1} product={listBooks[1]} />
                    </div>
                    <div className="carousel-item">
                        <CarouselItem key={2} product={listBooks[2]} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;