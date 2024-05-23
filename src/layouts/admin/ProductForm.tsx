import React, { FormEvent, useState } from "react";
import RequireAdmin from "./component/RequireAdmin";

const ProductForm: React.FC = () => {
    const [product, setProduct] = useState({
        id: 0,
        isbn: '',
        nameProduct: '',
        priceProduct: 0,
        fixedPrice: 0,
        description: '',
        quantity: 0,
        creator: '',
        average_rating: 0
    });

    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const url = 'http://localhost:8080/products';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(product)
        }).then(
            response => {
                if (response.ok) {
                    setNotification('Thêm sách thành công!');
                    setProduct({
                        id: 0,
                        isbn: '',
                        nameProduct: '',
                        priceProduct: 0,
                        fixedPrice: 0,
                        description: '',
                        quantity: 0,
                        creator: '',
                        average_rating: 0
                    });
                } else {
                    setError('Lỗi trong quá trình thêm sách!');
                }
            }
        )
    }

    return (
        <div className="container d-flex align-items-center justify-content-center">
            <div className="col-6">
                <h2 className="mt-2">Thêm sách</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input id="id" type="hidden" value={product.id} />
                    <label className="float-start mb-2" htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.isbn}
                        onChange={(event) => setProduct({...product, isbn: event.target.value})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="nameProduct">Tên sách</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.nameProduct}
                        onChange={(event) => setProduct({...product, nameProduct: event.target.value})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="priceProduct">Giá bán</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.priceProduct}
                        onChange={(event) => setProduct({...product, priceProduct: parseFloat(event.target.value)})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="fixedPrice">Giá niêm yết</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.fixedPrice}
                        onChange={(event) => setProduct({...product, fixedPrice: parseFloat(event.target.value)})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="description">Mô tả</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.description}
                        onChange={(event) => setProduct({...product, description: event.target.value})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="quantity">Số lượng</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        onChange={(event) => setProduct({...product, quantity: parseInt(event.target.value)})}
                        required
                    />
                    <label className="float-start mb-2" htmlFor="description">Tên tác giả</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.creator}
                        onChange={(event) => setProduct({...product, creator: event.target.value})}
                        required
                    />

                    {
                        product && <p className="mt-2" style={{color: 'green'}}>{notification}</p>
                    }

                    <button className="btn btn-success mt-2" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

const ProductAdmin = RequireAdmin(ProductForm);
export default ProductAdmin;