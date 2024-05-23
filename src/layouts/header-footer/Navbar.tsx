import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearchNavbar(tempKeyword);
        }
      };
      
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Ebook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/1">Thể loại 1</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/2">Thể loại 2</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/3">Thể loại 3</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/contact">Liên hệ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/about">Tin tức về chúng tôi</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchNavbarChange} onKeyDown={handleKeyDown} value={tempKeyword} />
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