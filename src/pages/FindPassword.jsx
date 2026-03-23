import { Link } from "react-router-dom";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/find-password.css?inline";

function FindPassword() {
    return (
        <>
            <header>
                <div className="logo-container">
                    <span className="material-symbols-outlined logo-icon">
                        settings_suggest
                    </span>
                    <h1 className="logo-text">Architect Ledger HR</h1>
                </div>
                <p className="tagline">임원 전용 포털 접속</p>
            </header>

            <main>
                <div className="card-content">
                    <h2>비밀번호를 분실하셨나요?</h2>
                    <p className="description">
                        계정 보안을 위해 본인 인증 후 새로운 비밀번호를 설정해주세요.
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-step">
                            <span className="step-label">Step 01. 이메일 인증</span>
                            <div className="input-group">
                                <label className="floating-label">Email Address</label>
                                <div className="input-with-button">
                                    <input placeholder="example@nexuspro.com" type="email" />
                                    <button className="btn-secondary" type="button">
                                        인증번호 전송
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-step">
                            <span className="step-label">Step 02. 인증번호 확인</span>
                            <div className="input-group">
                                <label className="floating-label">Verification Code</label>
                                <div className="input-with-button">
                                    <div style={{ position: "relative", flexGrow: 1 }}>
                                        <input placeholder="6자리 숫자 입력" type="text" />
                                        <span className="timer">03:00</span>
                                    </div>
                                    <button
                                        className="btn-secondary"
                                        style={{ padding: "0 1.5rem" }}
                                        type="button"
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-step">
                            <span className="step-label">Step 03. 새 비밀번호 설정</span>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.5rem",
                                }}
                            >
                                <div className="input-group">
                                    <label className="floating-label">New Password</label>
                                    <input placeholder="새로운 비밀번호" type="password" />
                                </div>
                                <div className="input-group">
                                    <label className="floating-label">Confirm Password</label>
                                    <input placeholder="새로운 비밀번호 확인" type="password" />
                                </div>
                            </div>
                        </div>

                        <button className="submit-btn" type="submit">
                            비밀번호 변경
                        </button>
                    </form>
                </div>

                <div className="card-footer">
                    <Link className="back-link" to="/login">
                        <span className="material-symbols-outlined">arrow_back</span>
                        로그인 화면으로 돌아가기
                    </Link>
                </div>
            </main>

            <footer className="page-footer">
                <p className="copyright">© 2024 Nexus Pro HR Enterprise</p>
                <div className="footer-links">
                    <a href="#">IT Support</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </footer>
        </>
    )
}

export default withPageStyle(FindPassword, "find-password.css", pageCss);