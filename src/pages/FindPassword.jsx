import { Link, useNavigate } from "react-router-dom";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/find-password.css?inline";
import { useEffect, useState } from "react";
import {
    resetPasswordApi,
    sendVerificationCodeApi,
    verifyCodeApi,
} from "../api/passwordResetApi";

function FindPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isCodeSent || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCodeSent, timeLeft]);

  const formatTime = (seconds) => {
    const minute = String(Math.floor(seconds / 60)).padStart(2, "0");
    const second = String(seconds % 60).padStart(2, "0");
    return `${minute}:${second}`;
  };

  const handleSendCode = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const result = await sendVerificationCodeApi(email);
      console.log("send-code success:", result);

      alert(result.message || "인증번호가 전송되었습니다.");
      setIsCodeSent(true);
      setIsVerified(false);
      setTimeLeft(180);
      setVerificationCode("");
    } catch (error) {
        console.error("send-code error:", error);
        console.error("response:", error.response);
        console.error("data:", error.response?.data);
        
      const errorMessage =
        error.response?.data?.message || "인증번호 전송에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!verificationCode.trim()) {
      alert("인증코드를 입력해주세요.");
      return;
    }

    if (timeLeft <= 0) {
      alert("인증시간이 만료되었습니다. 인증번호를 다시 전송해주세요.");
      return;
    }

    try {
      setLoading(true);

      const result = await verifyCodeApi(email, verificationCode);

      alert(result.message || "이메일 인증이 완료되었습니다.");
      setIsVerified(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "인증코드 확인에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    if (!newPassword.trim()) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }

    if (!confirmPassword.trim()) {
      alert("새 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      const result = await resetPasswordApi(email, newPassword);

      alert(result.message || "비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "비밀번호 변경에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={(e) => {
                    e.preventDefault();
                    handleResetPassword();
                }}
          >
            <div className="form-step">
              <span className="step-label">Step 01. 이메일 인증</span>
              <div className="input-group">
                <label className="floating-label">Email Address</label>
                <div className="input-with-button">
                  <input 
                    placeholder="example@nexuspro.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <button 
                    className="btn-secondary" 
                    type="button"
                    onClick={handleSendCode}
                    disabled={loading}
                >
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
                    <input 
                        placeholder="6자리 숫자 입력" 
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        disabled={!isCodeSent || loading} 
                    />
                    {isCodeSent && timeLeft > 0 && (
                        <span className="timer">{formatTime(timeLeft)}</span>
                    )}
                  </div>
                  <button
                    className="btn-secondary"
                    style={{ padding: "0 1.5rem" }}
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!isCodeSent || loading}
                  >
                    확인
                  </button>
                </div>
                {isVerified && (
                    <p style={{ marginTop: "0.5rem", color: "#2f9e44", fontSize: "0.9rem" }}>
                        이메일 인증이 완료되었습니다.
                    </p>
                )}
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
                  <input 
                    placeholder="새로운 비밀번호" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!isVerified || loading}
                />
                </div>
                <div className="input-group">
                  <label className="floating-label">Confirm Password</label>
                  <input 
                    placeholder="새로운 비밀번호 확인" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!isVerified || loading}
                />
                </div>
              </div>
            </div>

            <button 
                className="submit-btn" 
                type="submit"
                disabled={!isVerified || loading}
            >
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
  );
}

export default withPageStyle(FindPassword, "find-password.css", pageCss);
