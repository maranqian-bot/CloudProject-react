import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/employee-edit.css?inline";
import { useState, useEffect } from "react";
import employeeQuery from "../query/employeeQuery.js";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeEdit() {
    const navigate = useNavigate();
    const { employeeId } = useParams();

    const {
        employee: resDto,
        loading: isLoading,
        isError,
        updateEmployee,
        updatePending,
        // 페이징 관련 (필요 시 UI 하단에 사용)
        currentPage, totalPages, pageNumbers,
        totalCount, startItemNumber, endItemNumber,
        changePage, goToPrevPage, goToNextPage
    } = employeeQuery(employeeId);

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
        // 함수형 업데이트로 상태 손실 방지
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        // 훅에 이미 onSuccess 로직이 있으므로 데이터만 전달하면 끝!
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
                <form onSubmit={handleSubmit} className="container">
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
                                    onClick={() => navigate("/employee-management")} // navigate 사용
                                >
                                    취소
                                </button>

                                <button
                                    className="btn-primary"
                                    type="button"
                                    onClick={() => updateEmployee({
                                        id: employeeId,
                                        departmentId: formData.departmentId,
                                        reqDto: formData
                                    })}
                                    disabled={updatePending} // 저장 중일 때 클릭 방지
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
                                    {/* 사번  : 사번은 수정불가함 */}
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
                                            {/* 이름 */}
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
                                        {/* 이메일 */}
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
                                        {/* 비번 */}
                                        <div className="form-group">
                                            <label className="label-text">비밀번호</label>
                                            <div className="password-container">
                                                <input
                                                    className="input-field"
                                                    type="password"
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
                                                <select
                                                    className="input-field"
                                                    name="departmentId"
                                                    value={formData.departmnetId}
                                                    onChange={handleChange}>
                                                    <option value="">부서를 선택하세요</option>
                                                    <option value="1">인사부 (HR)</option>
                                                    <option value="2">엔지니어링  </option>
                                                    <option value="3">디자인</option>
                                                    <option value="4">영업부</option>
                                                </select>
                                            </div>
                                            {/* 직책 */}
                                            <div className="form-group">
                                                <label className="label-text">직책</label>
                                                <select
                                                    className="input-field"
                                                    id="position"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleChange}>
                                                    <option value="사원">사원</option>
                                                    <option value="대리">대리</option>
                                                    <option value="과장">과장</option>
                                                    <option value="차장">차장</option>
                                                    <option value="부장">부장</option>
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
                                                    onChange={handleChange}
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
                                                    className={`role-btn ${formData.role === "EMPLOYEE" ? "active" : " "}`}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, role: "EMPLOYEE" })}

                                                >
                                                    직원
                                                </button>
                                                <button
                                                    className="role-btn active"
                                                    type="button"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}>
                                                    매니저
                                                </button>
                                                <button
                                                    className="role-btn"
                                                    type="button"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}>
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
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleChange} />
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
                                                {resDto?.attendanceHistory && resDto.attendanceHistory.length > 0 ? (
                                                    resDto.attendanceHistory.map((attendance, index) => (
                                                        <tr key={attendance.attendanceId || index}>
                                                            <td>{attendance.workDate}</td>
                                                            <td>
                                                                {attendance.checkInTime
                                                                    ? attendance.checkInTime.toString().substring(11, 16)
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                {attendance.checkOutTime
                                                                    ? attendance.checkOutTime.toString().substring(11, 16)
                                                                    : "-"}
                                                            </td>
                                                            <td>
                                                                <span className={`status-badge ${attendance.attendanceStatus}`}>
                                                                    {attendance.attendanceStatus === 'NORMAL' ? '정상' :
                                                                        attendance.attendanceStatus === 'LATE' ? '지각' :
                                                                            attendance.attendanceStatus === 'EARLYLEAVE' ? '조퇴' :
                                                                                attendance.attendanceStatus === 'ABSENT' ? '결근' :
                                                                                    attendance.attendanceStatus === 'VACATION' ? '휴가' :
                                                                                        attendance.attendanceStatus === 'OVERTIME' ? '연장근무' : '기타'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        <div className="table-footer">
                                            {/* 1. 하단 정보: 훅에서 가져온 실제 숫자로 연결 */}
                                            <p className="footer-info">
                                                전체 {totalCount}개의 근태 기록 중 {startItemNumber}~{endItemNumber}번째 표시 중
                                            </p>

                                            <div className="pagination">
                                                {/* 2. 이전 버튼: 1페이지일 때 비활성화 */}
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={goToPrevPage}
                                                    disabled={currentPage === 1}
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>

                                                {/* 3. 페이지 번호 리스트: 훅의 pageNumbers를 활용해 자동으로 생성 */}
                                                {pageNumbers.map((number) => (
                                                    <button
                                                        key={number}
                                                        type="button"
                                                        className={`page-btn ${currentPage === number ? "active" : ""}`}
                                                        onClick={() => changePage(number)}
                                                    >
                                                        {number}
                                                    </button>
                                                ))}

                                                {/* 4. 다음 버튼: 마지막 페이지일 때 비활성화 */}
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={goToNextPage}
                                                    disabled={currentPage === totalPages}
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
                                                {resDto?.pendingVacation && resDto.pendingVacation.length > 0 ? (
                                                    resDto.pendingVacation.map((vacation, index) => (
                                                        <tr key={vacation.vacationId || index}>
                                                            <td>
                                                                <div className="leave-type">
                                                                    <span className="main">{vacation.vacationType}</span>
                                                                    {/* 상세 사유는 API 데이터가 있을 경우 출력, 없으면 기본값 */}
                                                                    <span className="sub">{vacation.reason || "정기 휴가"}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {vacation.startDate} ~ {vacation.endDate}
                                                            </td>
                                                            <td style={{ fontWeight: 700 }}>
                                                                {vacation.vacationDays}일
                                                            </td>
                                                            <td>
                                                                <div className="status-dot-container">
                                                                    <span className={`status-dot dot-${vacation.vacationStatus?.toLowerCase()}`}></span>
                                                                    <span className={`text-color-${vacation.vacationStatus?.toLowerCase()}`}>
                                                                        {vacation.vacationStatus === 'APPROVED' ? '승인' :
                                                                            vacation.vacationStatus === 'PENDING' ? '대기' :
                                                                                vacation.vacationStatus === 'REJECTED' ? '반려' : '기타'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" style={{ textAlign: 'center' }}>휴가 신청 내역이 없습니다.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {/* 페이징 영역: employeeQuery 훅의 변수들과 연결 */}
                                        <div className="table-footer">
                                            <p className="footer-info">
                                                전체 {totalCount}개의 휴가 내역 중 {startItemNumber}~{endItemNumber}번째 표시 중
                                            </p>
                                            <div className="pagination">
                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={goToPrevPage}
                                                    disabled={currentPage === 1}
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>

                                                {pageNumbers.map((number) => (
                                                    <button
                                                        key={number}
                                                        className={`page-btn ${currentPage === number ? "active" : ""}`}
                                                        onClick={() => changePage(number)}
                                                    >
                                                        {number}
                                                    </button>
                                                ))}

                                                <button
                                                    className="page-btn"
                                                    type="button"
                                                    onClick={goToNextPage}
                                                    disabled={currentPage === totalPages}
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
                                            {/* 데이터에 따라 게이지 너비 자동 조절 */}
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

                        <footer className="page-footer">
                            <span>마지막 업데이트: 2024년 5월 24일 14:30 (관리자: 이현우)</span>
                            <span>Nexus Pro HR v2.4.0</span>
                        </footer>
                    </div>
                </form>
            </main>
        </>
    )
}

export default withPageStyle(EmployeeEdit, "employee-edit.css", pageCss);
