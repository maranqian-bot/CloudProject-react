import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-create.css?inline";
import { useDepartmentForm } from "../hooks/useDepartmentForm.js";
import { useDepartmentSubmit } from "../hooks/useDepartmentSubmit.js";

function DepartmentCreate() {

    const { formData, errors, handleInputChange, validateForm } = useDepartmentForm();  // 초기값은 빈 값임.

    const { handleSubmit, isSubmitting } = useDepartmentSubmit();  // 서버 전송 훅

    // 저장 버튼 클릭 시 실행할 함수.
    const onCreate = async () => {
        if (validateForm()) {
            const success = await handleSubmit(null, formData, false);
            if (success) {
                // 등록 성공시 목록화면으로 이동하게끔 구현
                window.location.href = "/department-management";
            }
        }
    };

    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <div className="container">
                    <nav className="breadcrumb">
                        <span>조직 관리</span>
                        <span className="material-symbols-outlined separator">chevron_right</span>
                        <span>부서 관리</span>
                        <span className="material-symbols-outlined separator">chevron_right</span>
                        <span className="active">신규 부서 등록</span>
                    </nav>

                    <h2 className="page-title">신규 부서 등록</h2>
                    <p className="page-subtitle">
                        시스템 내에 새로운 조직 단위를 생성하고 관리 책임을 할당합니다.
                    </p>

                    <div className="content-grid">
                        <div className="form-section">
                            <div className="card">
                                <div className="form-group-grid">
                                    <div className="form-control">
                                        <label className="label">부서 코드</label>
                                        <input
                                            name="deptCode"
                                            className={`input-field ${errors.deptCode ? "error" : ""}`}
                                            placeholder="예: DEPT-001"
                                            type="text"
                                            value={formData.deptCode}
                                            onChange={handleInputChange}
                                        />
                                        {errors.deptCode && <span className="error-msg">{errors.deptCode}</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">부서명</label>
                                        <input
                                            name="deptName"
                                            className={`input-field ${errors.deptName ? "error" : ""}`}
                                            placeholder="부서 이름을 입력하세요"
                                            type="text"
                                            value={formData.deptName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.deptName && <span className="error-msg">{errors.deptName}</span>}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">부서장 (매니저 사번)</label>
                                    <div className="search-field-wrapper">
                                        <span className="material-symbols-outlined">person_search</span>
                                        <input
                                            name="managerId"
                                            className="input-field"
                                            placeholder="사번 입력 (예: 1001)"
                                            type="text"
                                            value={formData.managerId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">부서 설명</label>
                                    <textarea
                                        name="description"
                                        className="input-field"
                                        placeholder="부서의 주요 역할 및 업무 범위를 상세히 입력하세요..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            window.location.href = "/department-management";
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={onCreate} 
                                        disabled={isSubmitting}  // 전송 중엔 버튼 비활성화 시키기
                                    >
                                        {isSubmitting ? "저장 중..." : "저장하기"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="info-sidebar">
                            <div className="info-card">
                                <div className="info-card-header">
                                    <span className="material-symbols-outlined">info</span>
                                    <h3>부서 등록 안내</h3>
                                </div>
                                <ul className="info-list">
                                    <li>
                                        <span className="dot">•</span>
                                        <span>
                                            부서 코드는 고유해야 하며 한 번 등록 시 시스템 추적용으로 사용됩니다.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="dot">•</span>
                                        <span>
                                            부서장은 조직도 상의 결재 라인 구축에 핵심적인 역할을 합니다.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="history-card">
                                <p className="history-title">최근 등록된 부서 (상위 5개)</p>
                                <div className="history-item">
                                    <div className="history-item-info">
                                        <p>AI Lab</p>
                                        <p>TECH-04</p>
                                    </div>
                                    <span className="history-tag">2일 전</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer-meta">
                        <p>© 2026 Nexus Pro HR Systems. All architectural standards applied.</p>
                    </footer>
                </div>
            </main>

        </>
    )
}

export default withPageStyle(DepartmentCreate, "department-create.css", pageCss);
