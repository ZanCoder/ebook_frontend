import React, { useEffect, useState } from "react";
import { TypeH1 } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmitLogin = (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequest = {
            username: username,
            password: password
        }

        const url = 'http://localhost:8080/api/user/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed!');
                }
            }
        ).then(
            data => {
                const { token } = data;
                localStorage.setItem('token', token);
                navigate('/');
                window.location.reload(); // Reload to update the Navbar
            }
        ).catch(
            error => {
                console.error('Login failed!' + error);
                setError('Tài khoản hoặc mật khẩu không đúng!');
            }
        )
    }

    // Login = Enter
    const handleKeyDownLogin = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmitLogin(event);
        }
    };

    return (
        <div className="container">
            <form className="mb-3 col-md-6 col-12 mx-auto" onSubmit={onSubmitLogin}>
                <h1 className="h3 mb-3 fw-normal mt-2">Vui lòng đăng nhập!</h1>

                <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} onKeyDown={handleKeyDownLogin} />
                    <label className="form-label" htmlFor="form2Example1">Tài khoản</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={handleKeyDownLogin} />
                    <label className="form-label" htmlFor="form2Example2">Mật khẩu</label>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Lưu mật khẩu
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Quên mật khẩu?</a>
                    </div>
                </div>

                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Đăng nhập</button>
                {
                    error && <div style={{ color: 'red' }}>{error}</div>
                }
                <p className="mt-5 mb-3 text-body-secondary">&copy; MDBootstrap</p>

                <div className="text-center">
                    <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                    <p>hoặc đăng nhập với:</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;