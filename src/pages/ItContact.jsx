import { Link } from "react-router-dom";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/it-contact.css?inline";

function ItContact() {
    return (
        <>
            <div className="app-container">
                <div className="main-wrapper">
                    <main className="content-area">
                        <div className="page-header">
                            <h2>IT 지원팀 문의하기</h2>
                            <p>
                                기술적인 문제나 계정 지원이 필요하신가요? 아래 양식을 작성해 주시면
                                담당자가 신속하게 도와드리겠습니다.
                            </p>
                        </div>

                        <div className="grid-layout">
                            <div className="form-section">
                                <div className="form-card">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="label" htmlFor="name">
                                                    이름
                                                </label>
                                                <input
                                                    className="input"
                                                    id="name"
                                                    placeholder="홍길동"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="label" htmlFor="dept">
                                                    부서
                                                </label>
                                                <input
                                                    className="input"
                                                    id="dept"
                                                    placeholder="개발팀 / 인사팀"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="label" htmlFor="contact">
                                                    연락처
                                                </label>
                                                <input
                                                    className="input"
                                                    id="contact"
                                                    placeholder="010-0000-0000"
                                                    type="tel"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="label" htmlFor="email">
                                                    이메일
                                                </label>
                                                <input
                                                    className="input"
                                                    id="email"
                                                    placeholder="example@nexuspro.com"
                                                    type="email"
                                                />
                                            </div>

                                            <div className="form-group full-width">
                                                <label className="label" htmlFor="subject">
                                                    제목
                                                </label>
                                                <input
                                                    className="input"
                                                    id="subject"
                                                    placeholder="요청 사항의 핵심 내용을 입력하세요"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="form-group full-width">
                                                <label className="label" htmlFor="message">
                                                    내용
                                                </label>
                                                <textarea
                                                    className="textarea"
                                                    id="message"
                                                    placeholder="상세한 문제 상황을 입력해 주세요. (예: 시스템 오류 코드, 하드웨어 증상 등)"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button className="btn-submit" type="submit">
                                            <span className="material-symbols-outlined">send</span>
                                            문의하기
                                        </button>

                                        <div className="card-footer">
                                            <Link className="back-link" to="/login">
                                                로그인 화면으로 돌아가기
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="info-cards">
                                <div className="urgent-card">
                                    <h3>긴급 지원</h3>
                                    <p>
                                        시스템 전면 중단 등 업무에 즉각적인 지장이 있는 경우 내선 번호로
                                        바로 연락 주시기 바랍니다.
                                    </p>

                                    <div className="phone-box">
                                        <span className="material-symbols-outlined phone-icon">
                                            phone_in_talk
                                        </span>
                                        <div>
                                            <div className="phone-label">내선 번호</div>
                                            <div className="phone-number">8200-1111</div>
                                        </div>
                                    </div>

                                    <span className="material-symbols-outlined urgent-bg-icon">
                                        engineering
                                    </span>
                                </div>

                                <div className="image-card">
                                    <img
                                        alt="IT Operations"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaYxeEVzAlW_6_QRt0IsWgxXZoSKS_S5z0zWfA0nsMVFE0v8dAzGaVe7kVTVmsXaFPipXqRSeJJfrFGpMG7x7ZyGrg0t4PzTJG1MKYYfK3wtArfMMKCugppKor3NwJu5S073258jkQj4Ate1XaBjDHREA2nNeyiQvHfgcLe4RYuwLTcPI9_DE9IMHllRHMugFNZHhxofxMXRurhCLZpmeFC-5JIEvh515J8CRWimzepZhblqP1KEIQCIGJVvugnN8fMaHamoNKFBJO"
                                    />
                                    <div className="image-overlay">
                                        <div className="image-title">IT Operations Center</div>
                                        <div className="image-subtitle">
                                            평일 09:00 - 18:00 (KST)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default withPageStyle(ItContact, "it-contact.css", pageCss);
