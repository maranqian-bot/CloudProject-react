import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/employee-edit.css?inline";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import employeeQuery from "../query/employeeQuery.js";

function EmployeeEdit() {                   // 직원수정 메서드

    const {
        // 1. 데이터 및 기본 상태   ( 왼쪽: 실제데이터, 오른쪽: 별명 ) 
        employee: reqDto,       // 수정요청 온 데이터
        loading: isLoading,     // 로딩중(true)
        isError,                // 에러 났는지? (true or false)
        pageInfo: data,         // 가장 큰 저장소

        // 2. 직원수정 기능 내보내기

        updateEmployee,      // 수정실행 버튼.
        updatePending,      // 내용 업데이트 중일 떄 추가 동작 막는용도

        // 3. 페이징 관련 정보 (팀원 형식에 맞춤)

        currentPage: currentPageUI,     // 현재 페이지 (1부터)
        totalPages,                     // 전체 페이지 수
        pageNumbers,                    // [1, 2, 3] 형태의 배열
        totalCount,                     // 전체 인원수
        startItemNumber,                // 시작 번호
        endItemNumber,                  // 끝 번호

        // 4. 이동 함수들
        changePage: changePage,         // 페이지 이동 (클릭)
        goToPrevPage: goToPrevPage,     // 이전페이지 이동
        goToNextPage: goToNextPage      // 다음페이지   이동
    } = employeeQuery();

    const [formData, setFormData] = useState({
        employeeId: "", // 직원 Id
        employeeNumber: "",    // 직원사번 
        name: "",              // 이름 
        email: "",             // 이메일
        password: "",          // 비밀번호
        departmentId: "",      // 부서 Id
        position: "",          // 직책
        hireDate: "",          // 입사일
        retireDate: "",        // 퇴사일
        role: "",              // 시스템 역할
        status: ""             // 상태

    });  // 입력으로 저장하게 될 것 : formData

    const handleChange = (e) => {      // 입력칸과의 연동을 위한 함수 : handleChange()
        const { name, value } = e.target // 입력란에서, name과 value만 가져오기
        setFormData({
            ...formData,            // 입력 외에는 기본 값 유지...
            [name]: value          // 입력이 들어온 태그에 대해서만 변경점 적용
        });
    };

    // -  formData를 확정시킴. setFormData로. 
    const handleSubmit = (e) => {    //  저장 확정시키기 : handleSubmit
        if (e) e.preventDefault();
        // 수정을 확정하면.. 수정 쿼리가 가야하지않을까?
        updateEmployee({
            id: formData.employeeId,
            reqDto: formData
        })       // handleChange가 관리하고 있던 현재값을 최종반영
    }

    // 에러 메세지 전달
    const errorMessage = isError ? "수정 중 오류가 발생했습니다." : null;

    return (

        <>
            <Sidebar />
            <Header />

            <main className="content">
                <div className="container">
                    <div className="page-header">
                        <div>
                            <nav className="breadcrumb">
                                직원 관리 / <span className="active">상세 정보</span>
                            </nav>
                            <h2 className="page-title">직원 상세 정보</h2>
                        </div>

                        <div className="action-buttons">
                            <button
                                className="btn-outline"
                                type="button"
                                onClick={() => window.location.href = "/employee-management"}
                            >
                                취소
                            </button>
                            <button className="btn-primary"
                                type="button"
                                onClick={handleSubmit}        // 저장기능 연결
                                disabled={isLoading}          // 로딩중일 때 클릭 막기
                            >
                                수정 내용 저장
                            </button>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="column">
                            <section className="section-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="material-symbols-outlined">badge</span>
                                        기본 정보
                                    </h3>
                                </div>
                                {/* 사번  : 사번은 수정불가함 */}
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="label-text">사번</label>
                                            <input
                                                className="input-field"
                                                disabled
                                                type="text"
                                                defaultValue="EMP-2024-001"
                                                name="employeeId"
                                                value={formData.employeeId}
                                            />
                                        </div>
                                        {/* 이름 */}
                                        <div className="form-group">
                                            <label className="label-text">이름</label>
                                            <input
                                                className="input-field"
                                                type="text"
                                                defaultValue="김서연"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* 이메일 */}
                                    <div className="form-group">
                                        <label className="label-text">이메일</label>
                                        <input
                                            className="input-field"
                                            type="email"
                                            defaultValue="seoyeon.kim@nexuspro.com"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* 비번 */}
                                    <div className="form-group">
                                        <label className="label-text">비밀번호</label>
                                        <div className="password-container">
                                            <input
                                                className="input-field"
                                                type="password"
                                                defaultValue="********"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <button className="password-toggle" type="button">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    visibility
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="label-text">부서</label>
                                            <select className="input-field"
                                                defaultValue="제품 기획팀"
                                                name="">
                                                <option>인사팀</option>
                                                <option>제품 기획팀</option>
                                                <option>개발 1본부</option>
                                                <option>마케팅부</option>
                                            </select>
                                        </div>
                                        {/* 직책 */}
                                        <div className="form-group">
                                            <label className="label-text">직책</label>
                                            <select className="input-field"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleChange}>
                                                <option value="사원">사원</option>
                                                <option value="대리">대리</option>
                                                <option value="과장">과장</option>
                                                <option value="차장">차장</option>
                                                <option valeu="부장">부장</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* 입사일 */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="label-text">입사일</label>
                                            <input
                                                className="input-field"
                                                type="date"
                                                name="hireDate"
                                                value={formData.hireDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {/* 퇴사일 */}
                                        <div className="form-group">
                                            <label className="label-text">퇴사일</label>
                                            <input
                                                className="input-field"
                                                type="date"
                                                name="retireDate"
                                                value={formData.retireDate}
                                                onChagne={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="section-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span
                                            className="material-symbols-outlined">security</span>
                                        권한 및 상태
                                    </h3>
                                </div>
                                {/* 시스템역할  */}
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="label-text">시스템 역할</label>
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#5F6368",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            사용자의 접근 권한 범위를 결정합니다.
                                        </p>

                                        <div className="roles-container">
                                            <button
                                                className="role-btn"
                                                type="button"
                                                name="role"
                                                value={formData.role}
                                                onChagne={handleChange}>
                                                직원
                                            </button>
                                            <button
                                                className="role-btn active"
                                                type="button"
                                                name="role"
                                                value={formData.role}
                                                onChagne={handleChange}>
                                                매니저
                                            </button>
                                            <button 
                                                className="role-btn"
                                                type="button"
                                                name = "role"
                                                value = {formData.role}
                                                onChagne = {handleChange}>
                                                관리자
                                            </button>
                                        </div>
                                    </div>

                                    <div className="status-toggle-row">
                                        <div>
                                            <h4 style={{ fontSize: "14px", fontWeight: 700 }}>
                                                계정 활성화 상태
                                            </h4>
                                            <p style={{ fontSize: "12px", color: "#5F6368" }}>
                                                비활성화 시 시스템 접근이 차단됩니다.
                                            </p>
                                        </div>
                                        {/* 상태 입력란 */}
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <label className="toggle-switch">
                                                <input 
                                                    defaultChecked type="checkbox"
                                                    name = "status"
                                                    value = {formData.status}
                                                    onChagne = {handleChange} />
                                                <span className="slider"></span>
                                            </label>
                                            <span className="status-label">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="column">
                            <section className="section-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="material-symbols-outlined">
                                            history_toggle_off
                                        </span>
                                        근태 기록
                                    </h3>
                                </div>

                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>날짜</th>
                                                <th>출근</th>
                                                <th>퇴근</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>2024.05.24 (금)</td>
                                                <td>08:52</td>
                                                <td>18:05</td>
                                                <td>
                                                    <span className="badge badge-present">정상</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>2024.05.23 (목)</td>
                                                <td>09:15</td>
                                                <td>18:30</td>
                                                <td>
                                                    <span className="badge badge-late">지각</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>2024.05.22 (수)</td>
                                                <td>08:48</td>
                                                <td>18:10</td>
                                                <td>
                                                    <span className="badge badge-present">정상</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>2024.05.21 (화)</td>
                                                <td>08:55</td>
                                                <td>19:20</td>
                                                <td>
                                                    <span className="badge badge-present">정상</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="table-footer">
                                        <p className="footer-info">
                                            전체 308개의 근태 기록 중 1~3번째 표시 중
                                        </p>
                                        <div className="pagination">
                                            <button className="page-btn" type="button">
                                                <span className="material-symbols-outlined">
                                                    chevron_left
                                                </span>
                                            </button>
                                            <button className="page-btn active" type="button">
                                                1
                                            </button>
                                            <button className="page-btn" type="button">
                                                2
                                            </button>
                                            <button className="page-btn" type="button">
                                                3
                                            </button>
                                            <button className="page-btn" type="button">
                                                <span className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="section-card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <span className="material-symbols-outlined">
                                            event_available
                                        </span>
                                        최근 휴가 신청 내역
                                    </h3>
                                </div>

                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>휴가 종류</th>
                                                <th>기간</th>
                                                <th>일수</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="leave-type">
                                                        <span className="main">연차</span>
                                                        <span className="sub">정기 휴가</span>
                                                    </div>
                                                </td>
                                                <td>2024.06.10 ~ 2024.06.12</td>
                                                <td style={{ fontWeight: 700 }}>3일</td>
                                                <td>
                                                    <div className="status-dot-container">
                                                        <span className="status-dot dot-approved"></span>
                                                        <span className="text-color-approved">승인</span>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="leave-type">
                                                        <span className="main">반차 (오후)</span>
                                                        <span className="sub">개인 용무</span>
                                                    </div>
                                                </td>
                                                <td>2024.05.02 (목)</td>
                                                <td style={{ fontWeight: 700 }}>0.5일</td>
                                                <td>
                                                    <div className="status-dot-container">
                                                        <span className="status-dot dot-approved"></span>
                                                        <span className="text-color-approved">승인</span>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="leave-type">
                                                        <span className="main">경조휴가</span>
                                                        <span className="sub">결혼식 참석</span>
                                                    </div>
                                                </td>
                                                <td>2024.04.12 (금)</td>
                                                <td style={{ fontWeight: 700 }}>1일</td>
                                                <td>
                                                    <div className="status-dot-container">
                                                        <span className="status-dot dot-rejected"></span>
                                                        <span className="text-color-rejected">반려</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="table-footer">
                                        <p className="footer-info">
                                            전체 308개의 근태 기록 중 1~3번째 표시 중
                                        </p>
                                        <div className="pagination">
                                            <button className="page-btn" type="button">
                                                <span className="material-symbols-outlined">
                                                    chevron_left
                                                </span>
                                            </button>
                                            <button className="page-btn active" type="button">
                                                1
                                            </button>
                                            <button className="page-btn" type="button">
                                                2
                                            </button>
                                            <button className="page-btn" type="button">
                                                3
                                            </button>
                                            <button className="page-btn" type="button">
                                                <span className="material-symbols-outlined">
                                                    chevron_right
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress-section">
                                    <div className="progress-info">
                                        <span style={{ color: "#5F6368" }}>
                                            잔여 연차:{" "}
                                            <strong style={{ color: "var(--on-surface)" }}>
                                                12.5일
                                            </strong>{" "}
                                            / 15일
                                        </span>
                                    </div>

                                    <div className="progress-bar-container">
                                        <div className="progress-bar"></div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <footer className="page-footer">
                        <span>마지막 업데이트: 2024년 5월 24일 14:30 (관리자: 이현우)</span>
                        <span>Nexus Pro HR v2.4.0</span>
                    </footer>
                </div>
            </main>
        </>
    )
}

export default withPageStyle(EmployeeEdit, "employee-edit.css", pageCss);
