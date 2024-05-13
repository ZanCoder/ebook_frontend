export async function myRequest(endpoint: string) {
    // Truy vấn đến đường dẫn
    const response = await fetch(endpoint);

    // if response return error
    if (!response.ok) {
        throw new Error(`Không thể truy cập vào ${endpoint}`)
    }

    // if return ok
    return response.json();
}