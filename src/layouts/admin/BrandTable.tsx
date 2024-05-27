import { FormEvent, useEffect, useState } from "react";
import RequireAdmin from "./component/RequireAdmin";
import Brand from "../../models/Brand";
import { getAllBrand } from "../../api/BrandApi";
import BrandPropComponent from "./component/BrandPropComponent";

const BrandTable: React.FC = () => {
    const [brand, setBrand] = useState({
        id: 0,
        nameBrand: ''
    });

    // Get data Brand in Table
    const [brandList, setBrandList] = useState<Brand[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(null);


    useEffect(() => {
        getAllBrand().then(
            brandData => {
                setBrandList(brandData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setErrorData(error.message);
            }
        );
    }, [brandList])

    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const url = 'http://localhost:8080/brands';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(brand)
        }).then(
            response => {
                if (response.ok) {
                    setNotification('Thêm thể loại thành công!');
                    setBrand({
                        id: 0,
                        nameBrand: ''
                    });
                } else {
                    setError('Lỗi trong quá trình thêm thể loại!');
                }
            }
        )
    }

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
            <div className="container d-flex align-items-center justify-content-center">
                <div className="col-6">
                    <h2 className="mt-2">Thêm thể loại</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <input id="id" type="hidden" value={brand.id} />
                        <label className="float-start mb-2" htmlFor="brand">Tên thể loại</label>
                        <input
                            type="text"
                            className="form-control"
                            value={brand.nameBrand}
                            onChange={(event) => setBrand({ ...brand, nameBrand: event.target.value })}
                            required
                        />

                        {
                            brand && <p className="mt-2" style={{ color: 'green' }}>{notification}</p>
                        }

                        <button className="btn btn-success mt-2" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên thể loại</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {
                    brandList.map((brand) => (
                        <BrandPropComponent key={brand.id} brand={brand} />
                    ))
                }
            </table>
        </div>
    );
}

const BrandAdmin = RequireAdmin(BrandTable);
export default BrandAdmin;