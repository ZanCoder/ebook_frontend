import Brand from "../../../models/Brand";

interface BrandProps {
    brand: Brand;
}

const BrandPropComponent: React.FC<BrandProps> = (props) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{props.brand.id}</th>
                <td>{props.brand.nameBrand}</td>
                <td><button className="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
    );
}

export default BrandPropComponent;