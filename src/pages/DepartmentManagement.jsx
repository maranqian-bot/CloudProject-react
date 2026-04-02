import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import { useDepartmentList } from "../hooks/useDepartmentList";
import DepartmentList from "../components/department/DepartmentList.jsx";

function DepartmentManagement() {
    const {
        list,
        isLoading
    } = useDepartmentList(5);

    return (
        <>
            <Sidebar />
            <Header />
            <main>
                {/* 1. 페이지 소개 영역 (Breadcrumbs + Title + Add Button) */}
                <section className="page-intro">
                    <div className="page-title-section">
                        <nav className="breadcrumbs">
                            <span>운영 포털</span>
                            <span className="material-symbols-outlined" style={{ fontSize: "10px" }}>chevron_right</span>
                            <span className="active-crumb">조직 관리</span>
                        </nav>
                        <h1>부서 관리</h1>
                        <p>부서의 경계를 정의하고 리더를 배정하며 전체 조직의 리소스 분포를 모니터링합니다.</p>
                    </div>
                    <button className="btn-add" onClick={() => window.location.href='./department-create'}>
                        <span className="material-symbols-outlined">add</span>
                        부서 추가
                    </button>
                </section>

                {/* 2. 상단 통계 카드 영역 (Stats Row) */}
                <section className="stats-row">
                    <div className="stat-card wide interactive">
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span className="stat-label">전체 부서 수</span>
                                <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>analytics</span>
                            </div>
                            <div className="stat-value">{isLoading? "-" : list.length}</div>
                        </div>
                        <p className="stat-desc">전역에서 활성화된 부서</p>
                    </div>
                    <div className="stat-card narrow" style={{ backgroundColor: "var(--secondary-container)", border: "none" }}>
                        <span className="stat-label" style={{ color: "var(--on-secondary-container)" }}>인원 분포</span>
                        <div>
                            <div className="stat-value" style={{ fontSize: "32px", color: "var(--on-secondary-container)" }}>1,248</div>
                            <div className="progress-container" style={{ background: "rgba(255,255,255,0.3)" }}>
                                <div className="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card narrow">
                        <span className="stat-label">평균 부서 성장률</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", marginTop: "16px" }}>
                            <span className="stat-value" style={{ fontSize: "32px" }}>+14%</span>
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                    </div>
                </section>

                {/* 부서 목록 컴포넌트 연결 */}
                <DepartmentList />

            </main>
        </>
    );
}

export default withPageStyle(DepartmentManagement, "dashboard.css", pageCss);