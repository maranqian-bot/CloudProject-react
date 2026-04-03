import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-create.css?inline";
import DepartmentForm from "../components/department/DepartmentForm.jsx";

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
                                <DepartmentForm isEditMode={false} />
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
    );
}

export default withPageStyle(DepartmentCreate, "department-create.css", pageCss);
