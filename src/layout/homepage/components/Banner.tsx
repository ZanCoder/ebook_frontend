import React from "react";

function Banner() {
    return (
        <div className="p-5 mb-4 bg-light">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="display-5 fw-bold">
                        "Giải mã tâm hồn, từng trang một."
                    </h3>
                    <p className="">Ebook</p>
                    <button className="btn btn-primary btn-lg text-white">Khám phá sách tại ebook.vn</button>
                </div>
            </div>
        </div>
    );
}

export default Banner;