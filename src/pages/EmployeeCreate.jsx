import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/employee-create.css?inline";

function EmployeeCreate() {
    return (
        <>
            <Sidebar />
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <div className="editorial-header">
                        <nav className="breadcrumb">
                            <span>직원 관리</span>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                                chevron_right
                            </span>
                            <span className="active">신규 직원 등록</span>
                        </nav>
                        <h1 className="page-title">신규 직원 등록</h1>
                        <p className="page-description">
                            시스템에 새로운 직원을 등록합니다. 모든 필수 정보를 정확하게 입력해
                            주세요.
                        </p>
                    </div>
                    <div className="card">
                        <form>
                            {/* Section: 기본 정보 */}
                            <div className="form-section">
                                <h2 className="section-title">기본 정보</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="label">
                                            사번 <span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            placeholder="예: EMP-2024-001"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            이름 <span className="required">*</span>
                                        </label>
                                        <input className="input" placeholder="홍길동" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            이메일 <span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            placeholder="email@nexuspro.com"
                                            type="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            비밀번호<span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            placeholder="q@T12ty!"
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Section: 소속 및 직책 */}
                            <div className="form-section">
                                <h2 className="section-title">소속 및 직책</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="label">
                                            부서 <span className="required">*</span>
                                        </label>
                                        <select className="select">
                                            <option value="">부서 선택</option>
                                            <option value="hr">인사부 (HR)</option>
                                            <option value="eng">엔지니어링</option>
                                            <option value="design">디자인</option>
                                            <option value="sales">영업부</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            직책 <span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            placeholder="예: 시니어 매니저"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            입사일 <span className="required">*</span>
                                        </label>
                                        <input className="input" type="date" />
                                    </div>
                                </div>
                            </div>
                            {/* Section: 권한 및 상태 */}
                            <div className="form-section">
                                <h2 className="section-title">권한 및 상태</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="label">시스템 역할</label>
                                        <div className="option-group">
                                            <label className="radio-label">
                                                <input
                                                    defaultChecked=""
                                                    className="radio-input"
                                                    name="role"
                                                    type="radio"
                                                />
                                                일반 직원 (EMPLOYEE)
                                            </label>
                                            <label className="radio-label">
                                                <input className="radio-input" name="role" type="radio" />
                                                매니저 (MANAGER)
                                            </label>
                                            <label className="radio-label">
                                                <input className="radio-input" name="role" type="radio" />
                                                관리자 (ADMIN)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">현재 상태</label>
                                        <div className="status-toggle-container">
                                            <label className="toggle-switch">
                                                <input defaultChecked="" type="checkbox" />
                                                <span className="slider" />
                                            </label>
                                            <span className="status-text">재직 중 (ACTIVE)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={() => {
                                        window.location.href = "/employee-management";
                                    }}
                                >
                                    취소
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="footer-hint">
                        시스템에 등록된 모든 데이터는 개인정보 처리방침에 따라 안전하게
                        보호됩니다.
                    </p>
                </div>
            </main>

        </>
    )
}

export default withPageStyle(EmployeeCreate, "employee-create.css", pageCss);
