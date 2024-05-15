import React from "react";
import { myRequest } from "./Request";
import Feedback from "../models/Feedback";

async function getAllFeedback(url: string): Promise<Feedback[]> {
    const result: Feedback[] = [];

    // Gọi phương thức request
    const response = await myRequest(url);

    // Lấy ra toàn bộ sản phẩm
    const responseData = response._embedded.feedbacks;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            vote: responseData[key].vote,
            textFeedback: responseData[key].textFeedback,
        })
    }

    return result;
}

export async function getAllFeedbackByProduct(productId: number): Promise<Feedback[]> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/products/${productId}/feedbackList`;

    return getAllFeedback(url);
}

export async function getFeedbackByProduct(productId: number): Promise<Feedback[]> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/products/${productId}/feedbackList?sort=productId,asc&page=0&size=1`;

    return getAllFeedback(url);
}