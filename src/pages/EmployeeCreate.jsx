import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/employee-create.css?inline";
import { postEmployeesApi } from "../api/employeesApi.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function EmployeeCreate() {
    // 입력값 상태관리 
    const [formData, setFormData] = useState({
        employeeNumber: "",
        name: "",
        deptName: "",
        position: "",
        email: "",
        status: "활성",
        password: "",
        departmentId: "",    // (숫자타입!! 아래에서 변환해주었음.)부서 기본키
        hireDate: "",  // 입사일
        role : "EMPLOYEE",   // 시스템 역할

    });

    // 기존값 무효화하고, 최신값 반영 
    const queryClient = useQueryClient();
    // 경로 이동하기
    const navigate = useNavigate();

    // 데이터 저장
    const { mutate, isLoading } = useMutation({       // mutate로 데이터 저장하기 시도.
        mutationFn: postEmployeesApi,      // 데이터를 저장하는 함수이름.
        onSuccess: () => {
            alert("직원이 성공적으로 등록되었습니다.");    // 저장 알림 띄우기
            queryClient.invalidateQueries({ queryKey: ["employees", "list"] }); // 추가 된 데이터 반영.
            navigate("/employee-management");
        },
        onError: (error) => {
            alert("직원 등록에 실패했습니다." + error.message);  //에러 메세지 띄워주기.
        }
    });


    const handleChange = (e) => {           // 상태변경함수를 입력이 들어올 떄에 실행
        const { name, value } = e.target;
        const updatedValue = name === "departmentId" ? Number(value) : value; // deptId는 숫자로 변환
        setFormData({
            ...formData,            // 입력받지 않은건 기존값으로 유지.
            [name]: updatedValue   // 입력으로 받은 것만 갱신해줌.
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData); //    현재값으로 확정.   
        // employeeApi에, postEmployeesApi의 매개변수로 formData를 전달
    }

    const handleStatusChange = (e) => {
        const isActive = e.target.checked; // 체크박스 상태 (true/false)
        setFormData({
            ...formData,
            status: isActive ? "ACTIVE" : "INACTIVE" // 체크되면 ACTIVE, 아니면 INACTIVE
        });
    };




    return (
        <>
            <Sidebar />
            <Header />

            <main className="main-content">
                <div className="form-container">
                    <div className="editorial-header">
                        <nav className="breadcrumb">
                            <span>직원 관리</span>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                                chevron_right
                            </span>
                            <span className="active">신규 직원 등록</span>
                        </nav>
                        <h1 className="page-title">신규 직원 등록</h1>
                        <p className="page-description">
                            시스템에 새로운 직원을 등록합니다. 모든 필수 정보를 정확하게 입력해
                            주세요.
                        </p>
                    </div>
                    <div className="card">
                        {/* handleSubmit() : 현재값으로 저장 확정 */}
                        <form onSubmit={handleSubmit}>
                            {/* Section: 기본 정보 */}
                            <div className="form-section">
                                <h2 className="section-title">기본 정보</h2>
                                <div className="form-grid">
                                    {/* 정보 입력 공간 */}
                                    <div className="form-group" >
                                        <label className="label">
                                            사번 <span className="required">*</span>
                                        </label>
                                        {/* 사번 입력공간 */}
                                        <input
                                            className="input"
                                            name="employeeNumber"
                                            value={formData.employeeNumber}
                                            onChange={handleChange}
                                            placeholder="예: Emp-2024-001"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            이름 <span className="required">*</span>
                                        </label>
                                        {/* 이름입력공간 */}
                                        <input
                                            className="input"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="이름 입력하기"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            이메일 <span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="영어@~~ 로 입력"
                                            type="email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">
                                            비밀번호<span className="required">*</span>
                                        </label>
                                        <input
                                            className="input"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder=" 예시 ) @12!s"
                                            type="password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                             {/* Section: 소속 및 직책 */}
                            <div className="form-section">
                                <h2 className="section-title">소속 및 직책</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="label">부서 <span className="required">*</span></label>
                                        <select
                                            className="select"
                                            name="departmentId"
                                            value={formData.departentId}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">부서 선택</option>
                                            <option value="1">인사부 (HR)</option>
                                            <option value="2">엔지니어링</option>
                                            <option value="3">디자인</option>
                                            <option value="4">영업부</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">직책 <span className="required">*</span></label>
                                        <input
                                            className="input"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            placeholder="예: 시니어 매니저"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">입사일 <span className="required">*</span></label>
                                        <input
                                            className="input"
                                            type="date"
                                            name="hireDate"
                                            value={formData.hireDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: 권한 및 상태 */}
                            <div className="form-section">
                                <h2 className="section-title">권한 및 상태</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="label">시스템 역할 <span className="required">*</span></label>
                                        <div className="radio-group" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                            {['EMPLOYEE', 'MANAGER', 'ADMIN'].map(role => (
                                                <label key={role} className="radio-label">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value={role}
                                                        checked={formData.role === role}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {role}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">현재 상태</label>
                                        <div className="status-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.status === "ACTIVE"}
                                                    onChange={handleStatusChange}
                                                />
                                                <span className="slider" />
                                            </label>
                                            <span className="status-text">
                                                {formData.status === "ACTIVE" ? "재직 중 (ACTIVE)" : "퇴사/비활성 (INACTIVE)"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "30px" }}>
                                <button className="btn btn-ghost" type="button" onClick={() => navigate("/employee/management/")}>
                                    취소
                                </button>
                                <button type="submit" className="btn-primary" disabled={isLoading}>
                                    {isLoading ? "등록 중..." : "직원 등록 완료"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="footer-hint">시스템에 등록된 모든 데이터는 안전하게 보호됩니다.</p>
                </div>
            </main>
        </>
    );
}

export default withPageStyle(EmployeeCreate, "employee-create.css", pageCss);