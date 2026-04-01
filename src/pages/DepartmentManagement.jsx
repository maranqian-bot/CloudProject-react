import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import { useDepartmentList } from "../hooks/useDepartmentList";

function DepartmentManagement() {
    const {
        list,
        paginationText,
        isLoading,
        goToNextPage,
        goToPrevPage,
        goToPage,
        currentPage,
        totalPages
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
                            <div className="stat-value">{list.length}</div>
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

                {/* 3. 테이블 카드 영역 (Table Card) */}
                <section className="table-card">
                    <div className="table-header">
                        <div className="search-box">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--on-surface-variant)" }}>search</span>
                            <input placeholder="부서 필터링..." type="text" />
                        </div>
                        <div className="header-actions">
                            <button className="btn-dark">
                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>download</span>
                                엑셀 내보내기
                            </button>
                        </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: "32px" }}>부서 코드</th>
                                    <th>부서명</th>
                                    <th>인원</th>
                                    <th>관리자</th>
                                    <th style={{ textAlign: "right", paddingRight: "32px" }}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "60px" }}>데이터를 불러오는 중입니다...</td></tr>
                                ) : (
                                    list.map((dept) => (
                                        <tr key={dept.departmentId}>
                                            <td style={{ paddingLeft: "32px" }}><span className="dept-code">{dept.deptCode}</span></td>
                                            <td>
                                                <div className="dept-info-name">{dept.deptName}</div>
                                                <div className="dept-info-sub">{dept.description || "주요 업무 미설정"}</div>
                                            </td>
                                            <td>
                                                <div className="count-group">
                                                    <span style={{ fontSize: "14px", fontWeight: "500" }}>{dept.employeeCount || 0}</span>
                                                    <div className="avatar-stack">
                                                        <div className="avatar-more">+{dept.employeeCount || 0}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="manager-cell">
                                                    <div className="initial-box">
                                                        {dept.managerName ? dept.managerName.substring(0, 2).toUpperCase() : "??"}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: "14px", fontWeight: "600" }}>
                                                            {dept.managerName || "미지정"} ({dept.managerId || "N/A"})
                                                        </div>
                                                        <div style={{ fontSize: "10px", color: "var(--on-surface-variant)" }}>
                                                            {dept.managerJobTitle || "부서 책임자"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="action-cell">
                                                <button className="btn-edit" onClick={() => window.location.href=`/department-edit/${dept.departmentId}`}>
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-footer">
                        <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--on-surface-variant)" }}>
                            {paginationText}
                        </p>
                        <div className="pagination">
                            <button className="page-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_left</span>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button key={pageNum} className={`page-btn ${currentPage === pageNum ? "active" : ""}`} onClick={() => goToPage(pageNum)}>
                                    {pageNum}
                                </button>
                            ))}
                            <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default withPageStyle(DepartmentManagement, "dashboard.css", pageCss);