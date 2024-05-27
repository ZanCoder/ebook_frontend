import Brand from "../models/Brand";
import { myRequest } from "./Request";

async function getBrand(url: string): Promise<Brand[]> {
    const result: Brand[] = [];

    // Gọi phương thức request
    const response = await myRequest(url);

    // Lấy ra toàn bộ sản phẩm
    const responseData = response._embedded.brands;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            nameBrand: responseData[key].nameBrand
        })
    }

    return result;
}

export async function getAllBrand(): Promise<Brand[]> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/brands';

    return getBrand(url);
}