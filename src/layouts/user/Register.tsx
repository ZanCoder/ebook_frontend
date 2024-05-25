import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);

    const navigate = useNavigate();

    // Show password
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Biến báo lỗi
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [notification, setNotification] = useState('');

    // Xử lý thông tin 
    const handleSubmit = async (event: React.FormEvent) => {
        // Clear any previous error messages
        setErrorUsername('');
        setErrorPassword('');
        setErrorRePassword('');
        setErrorEmail('');

        // Tránh click liên tục
        event.preventDefault();

        // Kiểm tra các điều kiện và gán kết quả vào biến
        const isUsernameValid = !await existsUsername(username);
        const isEmailValid = !await existsEmail(email);
        const isPasswordValid = !existsPassword(password);
        const isRePasswordValid = !existsRePassword(rePassword);

        // Kiểm tra tất cả điều kiện
        if (isUsernameValid && isEmailValid && isPasswordValid && isRePasswordValid) {

            const base64Avatar = avatar ? await getBase64(avatar) : null;

            try {
                const url = 'http://localhost:8080/api/user/register';
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        fullName: fullName,
                        active: 0,
                        codeActive: "",
                        avatar: base64Avatar
                    })
                });

                if (response.ok) {
                    setNotification("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                } else {
                    setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
                }
            } catch (error) {
                setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
            }
        }
    }

    ///////////////////// KIỂM TRA USERNAME //////////////////////////////////
    const existsUsername = async (username: string) => {
        // endpoint
        const url = `http://localhost:8080/users/search/existsByUsername?username=${username}`;

        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === 'true') {
                setErrorUsername("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập: " + error);
            return false;
        }
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setUsername(event.target.value);

        // Kiểm tra có bị trùng lặp không?
        setErrorUsername('');

        // Kiểm tra sự tồn tại
        return existsUsername(event.target.value);
    }

    ///////////////////// KIỂM TRA PASSWORD //////////////////////////////////
    const existsPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/

        if (!passwordRegex.test(password)) {
            setErrorPassword("Mật khẩu ít nhất phải có 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt!");
            return true;
        } else {
            setErrorPassword('');
            return false;
        }
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setPassword(event.target.value);

        // Kiểm tra có bị trùng lặp không?
        setErrorPassword('');

        // Kiểm tra sự tồn tại
        return existsPassword(event.target.value);
    }

    ///////////////////// KIỂM TRA REPASSWORD //////////////////////////////////
    const existsRePassword = (rePassword: string) => {
        if (rePassword !== password) {
            setErrorRePassword("Mật khẩu không trùng khớp!");
            return true;
        } else {
            setErrorRePassword('');
            return false;
        }
    }

    const handleRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setRePassword(event.target.value);

        // Kiểm tra có bị trùng lặp không?
        setErrorRePassword('');

        // Kiểm tra sự tồn tại
        return existsRePassword(event.target.value);
    }

    //////////////////// KIỂM TRA EMAIL /////////////////////////////////////////////////
    const existsEmail = async (email: string) => {
        // endpoint
        const url = `http://localhost:8080/users/search/existsByEmail?email=${email}`;

        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === 'true') {
                setErrorEmail("Địa chỉ email đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra địa chỉ email!: " + error);
            return false;
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setEmail(event.target.value);

        // Kiểm tra có bị trùng lặp không?
        setErrorEmail('');

        // Kiểm tra sự tồn tại
        return existsEmail(event.target.value);
    }

    /////////////////////////////////////////////////////
    // Convert file to base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = error => reject(error);
        })
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setAvatar(file);
        }
    }

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form action="" onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên đăng nhập:</label>
                        <input id="username" type="text" className="form-control" onChange={handleUsernameChange} value={username} />
                        <div style={{ color: "red" }}>
                            {errorUsername}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu:</label>
                        <div className="password-input-container">
                            <input id="password" type={showPassword ? 'text' : 'password'} className="form-control" onChange={handlePasswordChange} value={password} />
                            <button type="button" onClick={toggleShowPassword} className="toggle-password-button">
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div style={{ color: "red" }}>
                            {errorPassword}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rePassword" className="form-label">Nhập lại mật khẩu:</label>
                        <div className="password-input-container">
                            <input id="rePassword" type={showPassword ? 'text' : 'password'} className="form-control" onChange={handleRePasswordChange} value={rePassword} />
                            <button type="button" onClick={toggleShowPassword} className="toggle-password-button">
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div style={{ color: "red" }}>
                            {errorRePassword}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Địa chỉ email:</label>
                        <input id="email" type="text" className="form-control" onChange={handleEmailChange} value={email} />
                        <div style={{ color: "red" }}>
                            {errorEmail}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Nhập Họ và Tên:</label>
                        <input id="fullName" type="text" className="form-control" onChange={(event) => setFullName(event.target.value) } value={fullName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar:</label>
                        <input id="avatar" type="file" className="form-control" accept="images/*" onChange={handleAvatarChange} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Đăng ký
                        </button>
                        <div style={{ color: "green" }}>
                            <h4>{notification}</h4>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;