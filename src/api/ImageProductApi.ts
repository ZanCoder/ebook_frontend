import React from "react";
import { myRequest } from "./Request";
import ImageProduct from "../models/ImageProduct";

async function getImageByProduct(url: string): Promise<ImageProduct[]> {
    const result: ImageProduct[] = [];

    // Gọi phương thức request
    const response = await myRequest(url);

    // Lấy ra toàn bộ sản phẩm
    const responseData = response._embedded.imageProducts;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            title: responseData[key].title,
            linkImg: responseData[key].linkImg,
            dataImg: responseData[key].dataImg,
            isIcon: responseData[key].isIcon,
        })
    }

    return result;
}

export async function getAllImageByProduct(productId: number): Promise<ImageProduct[]> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/products/${productId}/imageProductList`;

    return getImageByProduct(url);
}

export async function getNewImageByProduct(productId: number): Promise<ImageProduct[]> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/products/${productId}/imageProductList?sort=productId,asc&page=0&size=1`;

    return getImageByProduct(url);
}