import React, { useEffect, useState } from "react";
import Product from "../models/Product";
import ProductProps from "./components/ProductProps";
import { getAllProducts } from "../api/ProductApi";
import Pagination from "../layout/utils/Pagination";

const ListProduct: React.FC = () => {
    const [listBooks, setListBooks] = useState<Product[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Số lượng mục trên mỗi trang, mặc định là 5
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại, mặc định là 1

    useEffect(() => {
        getAllProducts().then(
            productData => {
                setListBooks(productData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setErrorData(error.message);
            }
        );
    }, []);

    // Tính toán totalPage
    const totalPage = Math.ceil(listBooks.length / itemsPerPage);

    // Lấy danh sách sản phẩm cho trang hiện tại
    const indexOfLastItem = itemsPerPage * currentPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listBooks.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        <div className="container">
            <div className="row mt-4 mb-4">
                {currentItems.map((product) => (
                    <ProductProps key={product.id} product={product} />
                ))}
            </div>
            <div className="pagination-container">
                <Pagination
                    thisPage={currentPage}
                    totalPage={totalPage}
                    pagination={paginate}
                />
                <div>
                    <span>Show </span>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                        {[8, 16, 100].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                        <option value={listBooks.length}>{listBooks.length}</option>
                    </select>
                    <span> items per page</span>
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
