import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import employeeQuery from "../query/employeeQuery.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getemployeeStatusApi } from "../api/employeesApi.js";

function EmployeeManagement() {
    const navigate = useNavigate();

    // (직원 통계)
    const [empStats, setEmpStats] = useState(null);

    useEffect(() => {
        getemployeeStatusApi().then(data => setEmpStats(data))
    }, [])

    // 1. 검색d
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedDeptName, setSelectedDeptName] = useState("");
    const [selectedStatus, setSelectedStatus ]= useState("");
    
    const {
        employees,
        loading,
        totalCount,
        currentPage,
        totalPages,
        pageNumbers,
        startItemNumber,
        endItemNumber,
        changePage,
        goToPrevPage,
        goToNextPage,
        handleSearch // (keyword, deptName) 호출 시 쿼리 자동 재실행
    } = employeeQuery();

    // 2. 검색 실행 핸들러
    const onSearch = () => {
        handleSearch(searchKeyword, selectedDeptName, selectedStatus);
    };

    // 3. 엔터키 지원
    const onKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    };

    const renderTableBody = () => {
        if (loading) return <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</td></tr>;
        if (!employees || employees.length === 0) return <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>검색 결과가 없습니다.</td></tr>;

        return employees.map((emp) => (
            <tr key={emp.employeeId || emp.id}>
                <td className="emp-id" style={{ color: "#3b82f6", fontWeight: "bold" }}>
                    #{emp.employeeNumber}
                </td>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.departmentName || "소속없음"}</td>
                <td>
                    <span className={`status-badge ${emp.status?.toLowerCase()}`}>
                        {emp.status === "ACTIVE" ? '활성' : '비활성'}
                    </span>
                </td>
                <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    <button 
                        className="btn-edit" 
                        onClick={() => navigate(`/employee-edit/${emp.employeeId || emp.id}`)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
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
                        <button className="btn-add-employee" onClick={() => navigate('/employee-create')}>
                            <span className="material-symbols-outlined">person_add</span> 직원 추가
                        </button>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card primary">
                            <p className="stat-label">총 정규직</p>
                            <p className="stat-value">{empStats ? empStats.regularCount : "-"}</p>
                        </div>
                        <div className="stat-card secondary">
                            <p className="stat-label">계약직</p>
                            <p className="stat-value">{empStats ?  empStats.contractCount : "-"}</p>
                        </div>
                        <div className="stat-card tertiary">
                            <p className="stat-label">평균 근속</p>
                            <p className="stat-value">{empStats ? empStats.avgWorkingYears : "-"}</p>
                        </div>
                        <div className="stat-card success">
                            <p className="stat-label">성장률</p>
                            <p className="stat-value">{empStats ? empStats.growthRate : "-"}</p>
                        </div>
                    </div>

                    {/* 검색 바 영역 */}
                    <div className="filter-grid">
                        <div className="search-container">
                            <span className="material-symbols-outlined">search</span>
                            <input 
                                placeholder="직원 이름 또는 ID로 검색..." 
                                type="text" 
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={onKeyDown}
                            />
                        </div>
                        <div className="select-container">
                            <select 
                                value={selectedDeptName} 
                                onChange={(e) => setSelectedDeptName(e.target.value)}
                            >
                                <option value="">모든 부서</option>
                                <option value="인사부 (HR)">인사부 (HR)</option>
                                <option value="엔지니어링">엔지니어링</option>
                                <option value="영업부">영업부</option>
                                <option value="디자인">디자인</option>
                            </select>
                        </div>
                        <div className ="select-container">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value = "">상태: 전체</option>
                                <option value = "ACTIVE">활성</option>
                                <option value = "UNACTIVE">비활성</option>

                            </select>
                        </div>
                        <button className="filter-btn" onClick={onSearch}>검색</button>
                    </div>

                    <div className="table-card">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>사번</th><th>이름</th><th>직책</th><th>부서</th><th>상태</th><th style={{ textAlign: "right" }}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>{renderTableBody()}</tbody>
                            </table>
                        </div>

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
                                <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0}>
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