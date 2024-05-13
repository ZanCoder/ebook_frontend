import React from "react";

function Carousel() {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <img src={('./../../../images/books/products/product-book1.png')} className="float-end" alt="img-banner" style={{width: '150px'}} />
                            </div>
                            <div className="col-5">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <img src={('./../../../images/books/products/product-book2.png')} className="float-end" alt="img-banner" style={{width: '150px'}} />
                            </div>
                            <div className="col-5">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <img src={('./../../../images/books/products/product-book3.png')} className="float-end" alt="img-banner" style={{width: '150px'}} />
                            </div>
                            <div className="col-5">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
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