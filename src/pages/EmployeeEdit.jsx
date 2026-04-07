import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/employee-edit.css?inline";
import { useState, useEffect } from "react";
import employeeQuery from "../query/employeeQuery.js";
import { useNavigate, useParams } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";

function EmployeeEdit() {
    const navigate = useNavigate();
    const { employeeId } = useParams();

    const [passwordError, setPasswordError] = useState("");
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const {
        employee: resDto,
        attendanceHistory,
        pendingVacation,
        loading: isLoading,
        isError,
        updateEmployee,
        updatePending,
        currentPage, totalPages, pageNumbers,
        totalCount, startItemNumber, endItemNumber,
        changePage, goToPrevPage, goToNextPage
    } = employeeQuery(employeeId);

    const attPage = usePagination(resDto?.attendanceHistory || [], 5, 3);
    const vacPage = usePagination(resDto?.pendingVacation || [], 5, 3);

    const [formData, setFormData] = useState({
        employeeId: "",
        employeeNumber: "",
        name: "",
        email: "",
        password: "",
        departmentId: "",
        departmentName: "",
        position: "",
        hireDate: "",
        retireDate: "",
        role: "",
        status: ""
    });

    useEffect(() => {
        if (resDto) {
            setFormData({
                employeeId: resDto.employeeId || "",
                employeeNumber: resDto.employeeNumber || "",
                name: resDto.name || "",
                email: resDto.email || "",
                password: "",
                departmentId: resDto.departmentId || "",
                departmentName: resDto.departmentName || "",
                position: resDto.position || "",
                hireDate: resDto.hireDate || "",
                retireDate: resDto.retireDate || "",
                role: resDto.role || "",
                status: resDto.status || ""
            });
        }
    }, [resDto]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "password") {
            if (value && !passwordRegex.test(value)) {
                setPasswordError("8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
            } else {
                setPasswordError("");
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();



        // 최종 유효성 검사
        if (formData.password && !passwordRegex.test(formData.password)) {
            alert("비밀번호 형식이 올바르지 않습니다.");
            return; // 함수 종료 (서버 전송 중단)
        }
        updateEmployee({
            id: employeeId,
            departmentId: formData.departmentId,
            reqDto: formData
        });
    };

    return (
        <>
            <Sidebar />
            <Header />

            <main className="content">
                <form onSubmit={handleSubmit}>
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
                                    onClick={() => navigate("/employee-management")}
                                >
                                    취소
                                </button>

                                <button
                                    className="btn-primary"
                                    type="submit"
                                    disabled={updatePending}
                                >
                                    {updatePending ? "저장 중..." : "수정 내용 저장"}
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

                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="label-text">사번</label>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    name="employeeId"
                                                    value={formData.employeeId}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="label-text">이름</label>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label-text">이메일</label>
                                            <input
                                                className="input-field"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="label-text">비밀번호</label>
                                            <div className="password-container">
                                                <input
                                                    className="input-field"
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="새 비밀번호 (8자 이상, 영문/숫자/특수문자)"
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
                                                <select
                                                    className="input-field"
                                                    name="departmentId"
                                                    value={formData.departmentId}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">부서를 선택하세요</option>
                                                    <option value="1">인사부 (HR)</option>
                                                    <option value="2">엔지니어링</option>
                                                    <option value="3">디자인</option>
                                                    <option value="4">영업부</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="label-text">직책</label>
                                                <select
                                                    className="input-field"
                                                    id="position"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleChange}
                                                >
                                                    <option value="사원">사원</option>
                                                    <option value="대리">대리</option>
                                                    <option value="과장">과장</option>
                                                    <option value="차장">차장</option>
                                                    <option value="부장">부장</option>
                                                </select>
                                            </div>
                                        </div>

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
                                            <div className="form-group">
                                                <label className="label-text">퇴사일</label>
                                                <input
                                                    className="input-field"
                                                    type="date"
                                                    name="retireDate"
                                                    value={formData.retireDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="section-card">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <span className="material-symbols-outlined">security</span>
                                            권한 및 상태
                                        </h3>
                                    </div>

                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="label-text">시스템 역할</label>
                                            <p style={{ fontSize: "12px", color: "#5F6368", marginBottom: "12px" }}>
                                                사용자의 접근 권한 범위를 결정합니다.
                                            </p>
                                            <div className="roles-container">
                                                <button
                                                    className={`role-btn ${formData.role === "EMPLOYEE" ? "active" : ""}`}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, role: "EMPLOYEE" })}
                                                >
                                                    직원
                                                </button>
                                                <button
                                                    className={`role-btn ${formData.role === "MANAGER" ? "active" : ""}`}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, role: "MANAGER" })}
                                                >
                                                    매니저
                                                </button>
                                                <button
                                                    className={`role-btn ${formData.role === "ADMIN" ? "active" : ""}`}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, role: "ADMIN" })}
                                                >
                                                    관리자
                                                </button>
                                            </div>
                                        </div>

                                        <div className="status-toggle-row">
                                            <div>
                                                <h4 style={{ fontSize: "14px", fontWeight: 700 }}>계정 활성화 상태</h4>
                                                <p style={{ fontSize: "12px", color: "#5F6368" }}>
                                                    비활성화 시 시스템 접근이 차단됩니다.
                                                </p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <label className="toggle-switch">
                                                    <input
                                                        defaultChecked
                                                        type="checkbox"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleChange}
                                                    />
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
                                            <span className="material-symbols-outlined">history_toggle_off</span>
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
                                                {attPage.currentData && attPage.currentData.length > 0 ? (
                                                    attPage.currentData.map((attendance, index) => (
                                                        <tr key={attendance.attendanceId || index}>
                                                            <td>{attendance.workDate || "-"}</td>
                                                            <td>
                                                                {attendance.checkInTime
                                                                    ? String(attendance.checkInTime).substring(11, 16)
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {attendance.checkOutTime
                                                                    ? String(attendance.checkOutTime).substring(11, 16)
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                <span className={`status-badge ${attendance.attendanceStatus?.toLowerCase()}`}>
                                                                    {attendance.attendanceStatus === "NORMAL" ? "정상" :
                                                                        attendance.attendanceStatus === "LATE" ? "지각" :
                                                                            attendance.attendanceStatus === "EARLYLEAVE" ? "조퇴" :
                                                                                attendance.attendanceStatus === "ABSENT" ? "결근" :
                                                                                    attendance.attendanceStatus === "VACATION" ? "휴가" :
                                                                                        attendance.attendanceStatus === "OVERTIME" ? "연장근무" : "기타"}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                                            근태 기록이 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        <div className="table-footer">
                                            <p className="footer-info">
                                                전체 {resDto?.attendanceHistory?.length || 0}개의 근태 기록 중 {attPage.startItemNumber}~{attPage.endItemNumber}번째 표시 중
                                            </p>
                                            <div className="pagination">
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={attPage.goToPrevPage}
                                                    disabled={attPage.currentPage === 1}
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                {attPage.pageNumbers.map((number) => (
                                                    <button
                                                        key={number}
                                                        type="button"
                                                        className={`page-btn ${attPage.currentPage === number ? "active" : ""}`}
                                                        onClick={() => attPage.goToPage(number)}
                                                    >
                                                        {number}
                                                    </button>
                                                ))}
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={attPage.goToNextPage}
                                                    disabled={attPage.currentPage === attPage.totalPages}
                                                >
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="section-card">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <span className="material-symbols-outlined">event_available</span>
                                            최근 휴가 내역
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
                                                {vacPage.currentData && vacPage.currentData.length > 0 ? (
                                                    vacPage.currentData.map((vacation, index) => (
                                                        <tr key={vacation.vacationId || index}>
                                                            <td>
                                                                {vacation.vacationType === 'ANNUAL' ? '연차' :
                                                                    vacation.vacationType === 'HALF_AM' ? '반차(오전)' :
                                                                        vacation.vacationType === 'HALF_PM' ? '반차(오후)' :
                                                                            vacation.vacationType === 'SICK' ? '병가' :
                                                                                vacation.vacationType === 'EVENT' ? '경조사' :
                                                                                    vacation.vacationType === 'ETC' ? '기타' : vacation.vacationType}
                                                            </td>
                                                            <td>{vacation.startDate} ~ {vacation.endDate}</td>
                                                            <td>{vacation.vacationDays}일</td>
                                                            <td>
                                                                {vacation.vacationStatus === 'PENDING' ? '대기중' :
                                                                    vacation.vacationStatus === 'APPROVED' ? '승인' :
                                                                        vacation.vacationStatus === 'REJECTED' ? '반려' : vacation.vacationStatus}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" style={{ textAlign: "center" }}>
                                                            휴가 신청 내역이 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        <div className="table-footer">
                                            <p className="footer-info">
                                                전체 {resDto?.pendingVacation?.length || 0}개의 내역 중 {vacPage.startItemNumber}~{vacPage.endItemNumber}번째 표시 중
                                            </p>
                                            <div className="pagination">
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={vacPage.goToPrevPage}
                                                    disabled={vacPage.currentPage === 1}
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                {vacPage.pageNumbers.map((number) => (
                                                    <button
                                                        key={number}
                                                        type="button"
                                                        className={`page-btn ${vacPage.currentPage === number ? "active" : ""}`}
                                                        onClick={() => vacPage.goToPage(number)}
                                                    >
                                                        {number}
                                                    </button>
                                                ))}
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={vacPage.goToNextPage}
                                                    disabled={vacPage.currentPage === vacPage.totalPages}
                                                >
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="progress-section">
                                        <div className="progress-info">
                                            <span style={{ color: "#5F6368" }}>
                                                잔여 연차:{" "}
                                                <strong style={{ color: "var(--on-surface)" }}>
                                                    {resDto?.remainingLeaves || 0}일
                                                </strong>{" "}
                                                / {resDto?.totalLeaves || 15}일
                                            </span>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${((resDto?.remainingLeaves || 0) / (resDto?.totalLeaves || 15)) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    </div>

                    <footer className="page-footer">
                        <span>마지막 업데이트: 2024년 5월 24일 14:30 (관리자: 이현우)</span>
                        <span>Nexus Pro HR v2.4.0</span>
                    </footer>
                </form>
            </main>
        </>
    )
}

export default withPageStyle(EmployeeEdit, "employee-edit.css", pageCss);