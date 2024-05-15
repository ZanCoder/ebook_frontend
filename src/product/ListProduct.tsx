import React, { ChangeEvent, useEffect, useState } from "react";
import Product from "../models/Product";
import ProductProps from "./components/ProductProps";
import { getAllProducts, searchProduct } from "../api/ProductApi";
import Pagination from "../layout/utils/Pagination";

interface ListProductInterface {
    keyword: string;
    setKeyword: (keyword: string) => void;

    keywordSearchNavbar: string;

    // Mã thể loại
    id: number;
}

function ListProduct({ keyword, setKeyword, keywordSearchNavbar, id }: ListProductInterface) {
    const [listBooks, setListBooks] = useState<Product[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Số lượng mục trên mỗi trang, mặc định là 5
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại, mặc định là 1

    useEffect(() => {
        if (keyword === '' && id === 0) {
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
        } else {
            searchProduct(keyword, keywordSearchNavbar, id).then(
                productData => {
                    setListBooks(productData);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setErrorData(error.message);
                }
            );
        }
    }, [keyword, id]);

    // Search on Navbar
    useEffect(() => {
        if (keywordSearchNavbar === '' && id === 0) {
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
        } else {
            searchProduct(keyword, keywordSearchNavbar, id).then(
                productData => {
                    setListBooks(productData);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setErrorData(error.message);
                }
            );
        }
    }, [keywordSearchNavbar, id]);

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

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    if (currentItems.length === 0) {
        return (
            <div className="container">
            <div className="row mt-4 mb-4">
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" className="form-control" placeholder="Search..." aria-label="search" aria-describedby="addon-wrapping" onChange={onSearchInputChange} value={keyword} />
                </div>
                <hr />
                <h1>Không tìm thấy dữ theo yêu cầu.</h1>
            </div>
        </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" className="form-control" placeholder="Search..." aria-label="search" aria-describedby="addon-wrapping" onChange={onSearchInputChange} value={keyword} />
                </div>

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
