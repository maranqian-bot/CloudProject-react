import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-create.css?inline";

function DepartmentCreate() {

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
                                            className="input-field"
                                            placeholder="예: DEPT-001"
                                            type="text"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">부서명</label>
                                        <input
                                            className="input-field"
                                            placeholder="부서 이름을 입력하세요"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">부서장</label>
                                    <div className="search-field-wrapper">
                                        <span className="material-symbols-outlined">person_search</span>
                                        <input
                                            className="input-field"
                                            placeholder="사번 입력"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">부서 설명</label>
                                    <textarea
                                        className="input-field"
                                        placeholder="부서의 주요 역할 및 업무 범위를 상세히 입력하세요..."
                                        rows={4}
                                        defaultValue={""}
                                    />
                                </div>

                                <div className="form-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            window.location.href = "/department-management";
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button className="btn btn-primary">저장하기</button>
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
                        <p>© 2024 Nexus Pro HR Systems. All architectural standards applied.</p>
                    </footer>
                </div>
            </main>

        </>
    )
}

export default withPageStyle(DepartmentCreate, "department-create.css", pageCss);
