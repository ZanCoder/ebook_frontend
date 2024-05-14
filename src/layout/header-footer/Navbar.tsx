import React, { ChangeEvent, useState } from "react";

interface NavBarInterface {
    keywordSearchNavbar: string;
    setSearchNavbar: (keywordSearchNavbar: string) => void;
}

function Navbar( {keywordSearchNavbar, setSearchNavbar}: NavBarInterface) {
    const [tempKeyword, setTempKeyword] = useState('');

    const onSearchNavbarChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempKeyword(e.target.value);
    }

    const handleSearch = () => {
        setSearchNavbar(tempKeyword);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Ebook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Thể loại 1</a></li>
                                <li><a className="dropdown-item" href="#">Thể loại 2</a></li>
                                <li><a className="dropdown-item" href="#">Thể loại 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Liên hệ</a>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchNavbarChange} value={tempKeyword} />
                        <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                    </div>
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="fas fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="fas fa-user"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;