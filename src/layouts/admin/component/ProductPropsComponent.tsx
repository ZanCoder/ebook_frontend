import Product from "../../../models/Product";

interface ProductProps {
    product: Product;
}

const ProductListComponent: React.FC<ProductProps> = (props) => {

    return (
        <tbody>
            <tr>
                <th scope="row">{props.product.id}</th>
                <td>{props.product.isbn}</td>
                <td>{props.product.nameProduct}</td>
                <td>{props.product.descriptionProduct}</td>
                <td>{props.product.fixedPrice}</td>
                <td>{props.product.priceProduct}</td>
                <td>{props.product.quantity}</td>
                <td>{props.product.creator}</td>
                <td>{props.product.average_rating}</td>
                <td><button className="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
    );
}

export default ProductListComponent;