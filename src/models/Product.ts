import Brand from "./Brand";

class Product {
    id: number;
    nameProduct?: string; // syntax ?: có thể null
    descriptionProduct?: string;
    creator?: string;
    isbn?: string;
    quantity?: number;
    priceProduct?: number;
    fixedPrice?: number;
    average_rating?: number;
    brandList: Brand[];

    constructor(id: number,
        brandList: Brand[],
        nameProduct?: string,
        descriptionProduct?: string,
        creator?: string,
        isbn?: string,
        quantity?: number,
        priceProduct?: number,
        fixedPrice?: number,
        average_rating?: number) {
            this.id = id;
            this.nameProduct = nameProduct;
            this.descriptionProduct = descriptionProduct;
            this.creator = creator;
            this.isbn = isbn;
            this.quantity = quantity;
            this.priceProduct = priceProduct;
            this.fixedPrice = fixedPrice;
            this.average_rating = average_rating;
            this.brandList = brandList;
    }
}

export default Product;