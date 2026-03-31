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
                                    <th>인원</th>
                                    <th>관리자</th>
                                    <th style={{ textAlign: "right" }}>관리</th>
                                </tr>
                            </thead>

                                <tbody>
                                    {isLoading ? (
                                        // 컬럼 개수에 맞춰 colSpan을 5로 설정
                                        <tr><td colSpan="5" style={{ textAlign: "center", padding: "60px" }}>데이터를 불러오는 중입니다... ⏳</td></tr>
                                    ) : list.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: "center", padding: "60px" }}>등록된 부서가 없습니다... 📭</td></tr>
                                    ) : (
                                        list.map((dept) => (
                                            <tr key={dept.departmentId}>
                                                {/* 부서 코드: 배지 스타일 (ENG-001) */}
                                                <td>
                                                    <span className="code-badge">{dept.deptCode}</span>
                                                </td>

                                                {/* 부서명: 이름 + 하단에 흐린 설명 텍스트 */}
                                                <td>
                                                    <div className="name-container">
                                                        <div className="main-name">{dept.deptName}</div>
                                                        <div className="sub-description">{dept.description || "상세 설명이 없습니다."}</div>
                                                    </div>
                                                </td>

                                                {/* 인원: 이미지처럼 숫자만 깔끔하게 (우선 하드코딩 혹은 0) */}
                                                <td>{dept.employeeCount || 0} 명</td>

                                                {/* 관리자: 아바타 원형 + 이름/직책 정보 */}
                                                <td>
                                                    <div className="manager-info-wrapper">
                                                        <div className="avatar-circle">
                                                            {/* 사번의 첫 글자를 아바타로 사용하거나 아이콘 표시 */}
                                                            {dept.managerId ? dept.managerId.charAt(0) : "?"}
                                                        </div>
                                                        <div className="manager-text-group">
                                                            <div className="manager-name">{dept.managerDisplayText}</div>
                                                            <div className="manager-role">부서 책임자</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* 관리: 이미지에 있던 수정(Edit) 아이콘 버튼 스타일 */}
                                                <td style={{ textAlign: "right" }}>
                                                    <button
                                                        className="action-icon-btn"
                                                        onClick={() => (window.location.href = `/department-edit/${dept.departmentId}`)}
                                                        title="상세 보기"
                                                    >
                                                        <span className="material-symbols-outlined">edit_square</span>
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
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                                        onClick={() => goToPage(pageNum)} // 해당 번호 누르면 이동
                                    >
                                        {pageNum}
                                    </button>
                                ))}

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