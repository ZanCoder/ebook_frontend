import React, { FormEvent, useEffect, useState } from "react";
import RequireAdmin from "./component/RequireAdmin";
import Product from "../../models/Product";
import ProductListComponent from "./component/ProductPropsComponent";
import { getAllProducts } from "../../api/ProductApi";
import Brand from "../../models/Brand";
import { getAllBrand } from "../../api/BrandApi";

const ProductForm: React.FC = () => {
    const [product, setProduct] = useState({
        id: 0,
        brandList: [] as Brand[],
        isbn: '',
        nameProduct: '',
        priceProduct: 0,
        fixedPrice: 0,
        descriptionProduct: '',
        quantity: 0,
        creator: '',
        average_rating: 0
    });

    // Get data Product in Table
    const [productList, setProductList] = useState<Product[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        getAllProducts().then(
            productData => {
                setProductList(productData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setErrorData(error.message);
            }
        );
    }, [productList])

    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const url = 'http://localhost:8080/products';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        }).then(
            response => {
                if (response.ok) {
                    setNotification('Thêm sách thành công!');
                    setProduct({
                        id: 0,
                        brandList: [] as Brand[],
                        isbn: '',
                        nameProduct: '',
                        priceProduct: 0,
                        fixedPrice: 0,
                        descriptionProduct: '',
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

    const deleteProduct = (ProductId: number) => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/products/${ProductId}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setProductList(productList.filter((product) => product.id !== ProductId));
                    setNotification('Xóa sản phẩm thành công!');
                } else {
                    setError('Lỗi trong quá trình xóa sản phẩm!');
                }
            })
            .catch(error => {
                setError('Lỗi kết nối đến server!');
            });
    }

    return (
        <div className="container">
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
                            onChange={(event) => setProduct({ ...product, isbn: event.target.value })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="nameProduct">Tên sách</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.nameProduct}
                            onChange={(event) => setProduct({ ...product, nameProduct: event.target.value })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="priceProduct">Giá bán</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.priceProduct}
                            onChange={(event) => setProduct({ ...product, priceProduct: parseFloat(event.target.value) })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="fixedPrice">Giá niêm yết</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.fixedPrice}
                            onChange={(event) => setProduct({ ...product, fixedPrice: parseFloat(event.target.value) })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="description">Mô tả</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.descriptionProduct}
                            onChange={(event) => setProduct({ ...product, descriptionProduct: event.target.value })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="quantity">Số lượng</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.quantity}
                            onChange={(event) => setProduct({ ...product, quantity: parseInt(event.target.value) })}
                            required
                        />
                        <label className="float-start mb-2" htmlFor="description">Tên tác giả</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.creator}
                            onChange={(event) => setProduct({ ...product, creator: event.target.value })}
                            required
                        />

                        {
                            product && <p className="mt-2" style={{ color: 'green' }}>{notification}</p>
                        }

                        <button className="btn btn-success mt-2" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Giá niêm yết</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Đánh giá</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {
                    productList.map((product) => (
                        <ProductListComponent key={product.id} product={product} onDelete={deleteProduct} />
                    ))
                }
            </table>
        </div>
    );
}

const ProductAdmin = RequireAdmin(ProductForm);
export default ProductAdmin;