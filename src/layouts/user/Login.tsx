import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        }

        const url = 'http://localhost:8080/api/user/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
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
                const {token} = data;
                localStorage.setItem('token', token);
                setNotification('Login success!');
            }
        ).catch(
            error => {
                console.error('Login failed!' + error);
                setError('Username or Password invalid!');
            }
        )
    }

    return (
        <div className="container">
            <main className="form-signin w-100 m-auto">
                <form>
                    <h1 className="h3 mb-3 fw-normal mt-2">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control mb-2" id="floatingInput" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="button" onClick={handleLogin}>Sign in</button>
                    {
                        error && <div style={{color: 'red'}}>{error}</div>
                    }
                    {
                        notification && <div style={{color: 'green'}}>{notification}</div>
                    }
                    <p className="mt-5 mb-3 text-body-secondary">&copy; Bootstrap</p>
                </form>
            </main>
        </div>
    );
}

export default Login;