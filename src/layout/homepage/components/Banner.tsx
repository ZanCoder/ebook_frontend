import React from "react";

function Banner() {
    return (
        <div className="p-5 mb-4 bg-light">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={require('./../../../images/books/banner1.jpg')} className="d-block w-100" alt="img-banner1" />
                        </div>
                        <div className="carousel-item">
                            <img src={require('./../../../images/books/banner2.jpg')} className="d-block w-100" alt="img-banner2" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Banner;