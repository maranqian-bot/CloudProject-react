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
        currentPage,
        totalPages
    } = useDepartmentList(5);

    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <div className="content-canvas">
                    <div className="page-header">
                        <div className="page-title">
                            <nav className="breadcrumbs">
                                <span>운영 포털</span>
                                <span style={{ color: "var(--outline-variant)" }}>/</span>
                                <span className="active-crumb">부서 관리</span>
                            </nav>
                            <h1>부서 관리</h1>
                            <p>부서를 관리합니다.</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn-dark">
                                <span className="material-symbols-outlined">download</span>
                                엑셀 내보내기
                            </button>

                            <button
                                className="btn-add"
                                onClick={() => (window.location.href = "/department-create")}
                            >
                                <span className="material-symbols-outlined">add</span>
                                부서 추가
                            </button>
                        </div>
                    </div>
                    <section className="table-container">
                        <div className="table-header">
                            <div className="search-bar">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    placeholder="부서명 또는 부서장으로 검색..."
                                />
                            </div>

                            <button className="btn-dark">
                                <span className="material-symbols-outlined">neurology</span>
                                진단 요청하기
                            </button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>코드</th>
                                    <th>부서명</th>
                                    <th>부서장</th>
                                    <th>인원</th>
                                    <th>평균 근속</th>
                                    <th style={{ textAlign: "right" }}>관리</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>데이터를 불러오는 중입니다... ⏳</td></tr>
                                ) : list.length === 0 ? (
                                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>등록된 부서가 없습니다. 텅~ 📭</td></tr>
                                ) : (
                                    list.map((dept) => (
                                        <tr key={dept.deptid}>
                                            <td className="code-cell">{dept.deptCode}</td>
                                            <td className="name-cell">{dept.deptName}</td>
                                            <td>
                                                <div className="manager-cell">
                                                    <div className="avatar-shell">{dept.managerDisplayText.charAt(0)}</div>
                                                    <span>{dept.managerDisplayText}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${dept.status === 'ACTIVE' ? 'status-blue' : 'status-gray'}`}>
                                                    {dept.statusDisplayText}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => (window.location.href = `/department-edit/${dept.deptid}`)}
                                                >
                                                    상세 보기
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="table-footer">
                            <p className="footer-info">{paginationText}</p>
                            <div className="pagination">
                                {/* 이전 버튼 */}
                                <button
                                    className="page-btn"
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>

                                {/* 현재 페이지 표시 */}
                                <button className="page-btn active">{currentPage}</button>

                                {/* 다음 버튼 */}
                                <button
                                    className="page-btn"
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default withPageStyle(DepartmentManagement, "dashboard.css", pageCss);