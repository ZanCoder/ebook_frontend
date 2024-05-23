import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const LoginSuccess = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const userData = jwtDecode(token);

            if (userData) {
                setUsername(userData.sub + '');
            }
        }
    }, [])

    return (
        <div>
            {
                username && <h1>Hello: {username}</h1>
            }
        </div>
    );
}

export default LoginSuccess;