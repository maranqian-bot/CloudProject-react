import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/member-edit.css?inline";

function MemberEdit() {
    return (
        <>
            <Sidebar />
            <Header />

            <main className="main-container">
                <section className="content-area">
                    <div className="page-header">
                        <h1 className="page-title">내 정보 수정</h1>
                        <p className="page-subtitle">개인 정보 및 계정 설정을 관리하세요.</p>
                    </div>

                    <div className="settings-card">
                        <div className="profile-upload-section">
                            <div className="profile-image-container">
                                <img
                                    alt="Profile Preview"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNTKZwcRcWlX6scQ0UHKtDcRaMhYmzvv3qjoO05e5u0Ws2WODjXJKObJRWV2LdkiP1bbMa51L5RWys9qg-V0a-hFFZEc1QC3DUGejgSlb16mAj_Tct9wfk_a7MClhbN8FJUndCpWwXD4OC9O6X0-1O9qsfJ8kBHSF7mlmmqKkGxEOSv2qr4XKBvp3wC-6qzcG3gh8RgndQ994FBJ2VmoCgIIQL4JsGvYLmg0O-lfLWqZbALf2togwwLyfEs4Ol-KDGSjJ1v1EO0sED"
                                />
                            </div>

                            <div className="upload-controls">
                                <h3>프로필 사진</h3>
                                <p>JPG 또는 PNG 형식의 이미지를 업로드하세요. (최대 2MB)</p>
                                <div className="btn-group">
                                    <button className="btn-primary btn-sm" type="button">
                                        이미지 업로드
                                    </button>
                                    <button className="btn-outline" type="button">
                                        제거
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label className="label">사번</label>
                                <input
                                    className="input-field"
                                    disabled
                                    type="text"
                                    defaultValue="NP-2024-0512"
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">이름</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    defaultValue="김철수"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">이메일</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    defaultValue="chulsoo.kim@nexuspro.ai"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">입사일</label>
                                <input
                                    className="input-field"
                                    type="date"
                                    defaultValue="2024-03-01"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">부서</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    defaultValue="Technical Solution Team"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">직책</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    defaultValue="Senior Engineer"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">비밀번호</label>
                                <input
                                    className="input-field"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">비밀번호 확인</label>
                                <input
                                    className="input-field"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                        </form>

                        <div className="action-footer">
                            <button
                                className="btn-secondary"
                                type="button"
                                onClick={() => (window.location.href = "/dashboard")}
                            >
                                취소
                            </button>
                            <button className="btn-primary" type="button">
                                저장하기
                            </button>
                        </div>
                    </div>

                    <div className="security-notice">
                        <span className="material-symbols-outlined security-notice-icon">
                            info
                        </span>
                        <div className="security-notice-content">
                            <h4>보안 안내</h4>
                            <p>
                                사번과 일부 인사 정보는 관리자의 승인이 있어야 변경 가능합니다.
                                개인정보 보호를 위해 비밀번호는 3개월마다 변경하는 것을 권장합니다.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default withPageStyle(MemberEdit, "member-edit.css", pageCss);
