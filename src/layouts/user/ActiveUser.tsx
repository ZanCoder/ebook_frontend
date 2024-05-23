import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActiveUser() {
    const { email } = useParams();
    const { codeActive } = useParams();
    const [active, setActive] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (email && codeActive) {
            activateUser();
        }
    }, []);

    const activateUser = async () => {
        try {
            const url: string = `http://localhost:8080/api/user/active?email=${email}&codeActive=${codeActive}`;
            const response = await fetch(url, {
                method: 'GET'
            });

            if (response.ok) {
                setActive(true);
            } else {
                setNotification("Không thể kích hoạt tài khoản!");
            }
        } catch (error) {
            console.error("Lỗi khi kích hoạt tài khoản: " + error);
            setNotification("Lỗi khi kích hoạt tài khoản");
        }
    };

    return (
        <div>
            <h1>Thông báo kích hoạt tài khoản:</h1>
            {active ? (
                <p>Tài khoản của bạn đã được kích hoạt thành công!</p>
            ) : (
                <p>{notification}</p>
            )}
        </div>
    );
}

export default ActiveUser;