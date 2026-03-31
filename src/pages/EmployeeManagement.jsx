import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import employeeQuery from "../query/EmployeeQuery.js";
import { useNavigate } from "react-router-dom";

function EmployeeManagement() {

    const navigate = useNavigate();

    const {
        employee,   // 직원목록 객체
        loading,    // 로딩
        isError,    // 에러났는지 여부
        errorMessage,   //에러메세지
        currentPage,    // 현재페이지
        totalPages,     // 전체 페이지
        pageNumbers,    // 페이지번호 (1,2,3...)
        totalCount,     // 전체직원 수
        startItemNumber,   //  페이지 시작번호 
        endItemNumber,     //   페이지 끝번호
        changePage,         // 클릭할 때 페이지 이동하는거
        goToPrevPage,       // 이전페이지
        goToNextPage        // 다음페이지
    } = employeeQuery();


    const renderTableBody = () => {
        if (loading) return <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>데이터 로딩 중...</td></tr>;
        if (isError) return <tr><td colSpan="6" style={{ textAlign: "center", color: "red", padding: "40px" }}>{errorMessage}</td></tr>;

        return employee.map((emp) => (
            <tr key={emp.id}>
                {/* 사번: #00000 스타일 */}
                <td className="emp-id" style={{ color: "#3b82f6", fontWeight: "bold" }}>
                    #{emp.employeeNumber}
                </td>
                <td>
                    <div className="emp-info">
                        {/* 이름 첫 글자 아바타 */}
                        <div className="emp-avatar bg-blue-light">{emp.name?.charAt(0)}</div>
                        <div className="emp-details">
                            <p style={{ fontWeight: "600" }}>{emp.name}</p>
                            <p style={{ fontSize: "0.85rem", color: "var(--outline-variant)" }}>{emp.email || "이메일 정보 없음"}</p>
                        </div>
                    </div>
                </td>
                {/* 부서 및 직책 */}
                <td className="dept-cell">{emp.deptName || "미배정"}</td>
                <td><span className="badge badge-manager">{emp.position || "사원"}</span></td>
                {/* 상태: 엔티티의 status 필드 활용 */}
                <td>
                    <div className="status-cell">
                        <span className={`status-dot ${emp.status === '활성' ? 'active' : 'inactive'}`}></span>
                        <span className={`status-text ${emp.status === '활성' ? 'active' : 'inactive'}`}>
                            {emp.status}
                        </span>
                    </div>
                </td>
                {/* 관리 버튼: 수정 페이지 이동 */}
                <td className="action-cell">
                    <button className="btn-edit" onClick= { () => navigate(`/edit/${emp.id}`)}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            
            <Sidebar />
            <Header />

            <main>
                <div className="content-padding">
                    {/* 🟧 페이지 제목 및 직원 추가 버튼 */}
                    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div className="page-title">
                            <nav className="breadcrumbs">
                                <span>운영 포털</span>
                                <span style={{ color: "var(--outline-variant)" }}> / </span>
                                <span className="active-crumb">직원 관리</span>
                            </nav>
                            <h1>직원 관리</h1>
                            <p>전체 {totalCount.toLocaleString()}명의 활성 인원 목록입니다.</p>
                        </div>
                        {/* (window.location.href = "/employee-create") */}
                        <button className="btn-add-employee" onClick = { () => navigate(`/employee/create`)}>
                            <span className="material-symbols-outlined">person_add</span> 직원 추가
                        </button>
                    </div>

                    {/* 🟨 통계 카드 섹션 */}
                    <div className="stats-grid">
                        <div className="stat-card primary">
                            <p className="stat-label">총 인원</p>
                            <p className="stat-value">{totalCount.toLocaleString()}</p>
                        </div>
                        <div className="stat-card secondary"><p className="stat-label">계약직</p><p className="stat-value">156</p></div>
                        <div className="stat-card tertiary"><p className="stat-label">평균 근속</p><p className="stat-value">4.2 <span className="stat-unit">년</span></p></div>
                        <div className="stat-card success"><p className="stat-label">성장률</p><p className="stat-value">+12.4%</p></div>
                    </div>

                    {/* 🟩 필터 및 검색 바 */}
                    <div className="filter-grid">
                        <div className="search-container">
                            <span className="material-symbols-outlined">search</span>
                            <input placeholder="직원 이름 또는 ID로 검색..." type="text" />
                        </div>
                        <div className="select-container">
                            <select><option value="">모든 부서</option></select>
                        </div>
                        <button className="filter-btn">검색</button>
                    </div>

                    {/* 🟦 직원 목록 테이블 및 페이징 */}
                    <div className="table-card">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>사번</th><th>이름</th><th>부서</th><th>직책</th><th>상태</th><th style={{ textAlign: "right" }}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>{renderTableBody()}</tbody>
                            </table>
                        </div>

                        {/* 하단 페이지네이션 영역 */}
                        <div className="pagination-container" style={{ display: "flex", justifyContent: "space-between", padding: "20px", alignItems: "center" }}>
                            <div className="pagination-info">Showing {startItemNumber}-{endItemNumber} of {totalCount}</div>
                            <div className="pagination-buttons" style={{ display: "flex", gap: "8px" }}>
                                <button className="page-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                {pageNumbers.map((num) => (
                                    <button
                                        key={num}
                                        className={`page-btn ${currentPage === num ? "active" : ""}`}
                                        onClick={() => changePage(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default withPageStyle(EmployeeManagement, "dashboard.css", pageCss);