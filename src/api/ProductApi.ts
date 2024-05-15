import React from "react";
import Product from "../models/Product";
import { myRequest } from "./Request";

async function getProduct(url: string): Promise<Product[]> {
    const result: Product[] = [];

    // Gọi phương thức request
    const response = await myRequest(url);

    // Lấy ra toàn bộ sản phẩm
    const responseData = response._embedded.products;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            nameProduct: responseData[key].nameProduct,
            descriptionProduct: responseData[key].descriptionProduct,
            creator: responseData[key].creator,
            ISBN: responseData[key].ISBN,
            quantity: responseData[key].quantity,
            priceProduct: responseData[key].priceProduct,
            fixedPrice: responseData[key].fixedPrice,
            average_rating: responseData[key].average_rating
        })
    }

    return result;
}

export async function getAllProducts(): Promise<Product[]> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/products?sort=id,desc';

    return getProduct(url);
}

export async function getNewProduct(): Promise<Product[]> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/products?sort=id,desc&page=0&size=3';

    return getProduct(url);
}

export async function searchProduct(keyword: string, keywordSearchNavbar: string, id: number): Promise<Product[]> {
    // Xác định endpoint
    let url: string = 'http://localhost:8080/products?sort=id,desc&page=0&size=8';
    if (keyword !== '') {
        url = `http://localhost:8080/products/search/findByNameProductContaining?sort=id,desc&page=0&size=8&nameProduct=${keyword}`;
    }

    if (keywordSearchNavbar !== '' && id === 0) {
        url = `http://localhost:8080/products/search/findByNameProductContaining?sort=id,desc&page=0&size=8&nameProduct=${keywordSearchNavbar}`;
    } else if (keywordSearchNavbar === '' && id > 0) {
        url = `http://localhost:8080/products/search/findByBrandList_id?sort=id,desc&page=0&size=8&id=${id}`;
    } else if (keywordSearchNavbar !== '' && id > 0) {
        url = `http://localhost:8080/products/search/findByNameProductContainingAndBrandList_id?sort=id,desc&page=0&size=8&id=${id}&nameProduct=${keywordSearchNavbar}`;
    }

    return getProduct(url);
}

export async function  getProductDetail(id: number): Promise<Product | null> {
    const url = `http://localhost:8080/products/${id}`;

    let result: Product;

    try {
        // Gọi phương thức request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error to connect API.')
        }

        const productData = await response.json();

        if (productData) {
            return {
                id: productData.id,
                nameProduct: productData.nameProduct,
                descriptionProduct: productData.descriptionProduct,
                creator: productData.creator,
                ISBN: productData.ISBN,
                quantity: productData.quantity,
                priceProduct: productData.priceProduct,
                fixedPrice: productData.fixedPrice,
                average_rating: productData.average_rating
            };
        } else {
            throw new Error('No data!')
        }
    } catch (error) {
        console.error("Error" + error);
        return null;
    }
}