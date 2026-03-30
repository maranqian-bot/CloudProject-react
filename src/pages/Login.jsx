import { Link, useNavigate } from "react-router-dom";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/login.css?inline";
import useAuthStore from "../store/authStore.js";
import { useLoginMutation } from "../query/loginMutation.js";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();
    const { mutate: loginMutate, isPending } = useLoginMutation();

    const [form, setForm] = useState({
        employeeNumber: "",
        password: "",
        remember: false,
    });

    const [errorMessage, setErrormessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrormessage("");

        if (!form.employeeNumber.trim()) {
            setErrormessage("사번을 입력해주세요.");
            return;
        }
        
        if (!form.password.trim()) {
            setErrormessage("비밀번호를 입력해주세요.");
            return;
        }

        const requestData = {
            employeeNumber: form.employeeNumber,
            password: form.password,
        }

        loginMutate(requestData, {
            onSuccess: (response) => {
                console.log("로그인 응답 전체: ", response);

                const responseData = response?.data?.data ?? response?.data ?? response;

                console.log("토큰 payload: ", responseData);
                
                const accessToken = responseData?.accessToken;
                const refreshToken = responseData?.refreshToken;
            
                const loginUser = {
                    employeeNumber: responseData?.employeeNumber,
                    name: responseData?.name,
                };

                if (!accessToken) {
                    setErrormessage("토큰이 저장되지 않았습니다.");
                    console.error("accessToken 없음: ", responseData);
                    return;
                }

                localStorage.setItem("accessToken", accessToken);

                if (refreshToken) {
                    localStorage.setItem("refreshToken", refreshToken);
                }

                localStorage.setItem("loginUser", JSON.stringify(loginUser));

                setUser(loginUser);
                navigate("/"); 
            },
            onError: (error) => {
                const message = error?.response?.data?.message || "사번 또는 비밀번호를 확인해주세요.";
                setErrormessage(message);
            }
        })
    }
    return (
        <>
            <div className="main-wrapper">
                <div className="login-container">
                    <div className="branding-header">
                        <div className="logo-box">
                            <span
                                className="material-symbols-outlined"
                                data-icon="architecture"
                            >
                                architecture
                            </span>
                        </div>
                        <h1 className="title">Architect Ledger HR</h1>
                        <p className="subtitle">임원 전용 포털 접속</p>
                    </div>

                    <div className="login-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-row">
                                    <label className="label-text" htmlFor="login_id">
                                        로그인 ID
                                    </label>
                                </div>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <span
                                            className="material-symbols-outlined"
                                            data-icon="badge"
                                        >
                                            badge
                                        </span>
                                    </div>
                                    <input
                                        className="form-input"
                                        id="employeeNumber"
                                        name="employeeNumber"
                                        placeholder="사번 입력 (예: EMP-2024-02)"
                                        type="text"
                                        value={form.employeeNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-row">
                                    <label className="label-text" htmlFor="password">
                                        비밀번호
                                    </label>
                                    <Link className="forgot-link" to="/find-password">
                                        분실하셨나요?
                                    </Link>
                                </div>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <span
                                            className="material-symbols-outlined"
                                            data-icon="lock"
                                        >
                                            lock
                                        </span>
                                    </div>
                                    <input
                                        className="form-input"
                                        id="password"
                                        name="password"
                                        placeholder="예: Qwer1234!"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    className="checkbox-input"
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={form.remember}
                                    onChange={handleChange}
                                />
                                <label className="checkbox-label" htmlFor="remember">
                                    로그인 상태 유지
                                </label>
                            </div>

                            {errorMessage && (
                                <p style={{color: "#dc2626",
                                           fontSize: "14px",
                                           marginBottom: "12px",}}>
                                    {errorMessage}
                                </p>
                            )}

                            <button className="login-button" type="submit" disabled={isPending}>
                                <span>{isPending ? "로그인 중..." : "로그인"}</span>
                                <span
                                    className="material-symbols-outlined"
                                    data-icon="arrow_forward"
                                    style={{ fontSize: "1.125rem" }}
                                >
                                    arrow_forward
                                </span>
                            </button>
                        </form>

                        <div className="social-divider">
                            <p className="social-text">또는 소셜 로그인</p>
                            <div>
                                <button className="social-button" type="button">
                                    <svg
                                        className="social-icon"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        ></path>
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        ></path>
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            fill="#FBBC05"
                                        ></path>
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        ></path>
                                    </svg>
                                    <span>Google로 로그인</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="support-text">
                        로그인에 문제가 있나요?{" "}
                        <Link className="support-link" to="/it-contact">
                            IT 지원팀에 문의하기
                        </Link>
                    </p>
                </div>
            </div>

            <footer className="footer">
                <div>
                    <p className="footer-text">
                        © 2024 Architect Ledger HR 시스템. 정밀한 거버넌스.
                    </p>
                </div>
            </footer>

            <div className="bg-decor">
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                <div className="line-decor"></div>
            </div>
        </>
    )
}

export default withPageStyle(Login, "login.css", pageCss);
