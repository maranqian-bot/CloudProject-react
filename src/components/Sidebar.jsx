import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/logout";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-box">
                    <div className="logo-icon">
                        <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <div className="logo-text">
                        <h2>운영 포털</h2>
                        <p>글로벌 HR 시스템</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm">대시보드</span>
                </NavLink>

                <NavLink
                    to="/employee-management"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">group</span>
                    <span className="text-sm">직원 관리</span>
                </NavLink>

                <NavLink
                    to="/department-management"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">domain</span>
                    <span className="text-sm">부서 관리</span>
                </NavLink>

                <NavLink
                    to="/attendance-management"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">event_available</span>
                    <span className="text-sm">근태 관리</span>
                </NavLink>

                <NavLink
                    to="/vacation-management"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">event_busy</span>
                    <span className="text-sm">휴가 관리</span>
                </NavLink>

                <div className="nav-item">
                    <NavLink
                        to="/member-edit"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm">내 정보 수정</span>
                    </NavLink>
                </div>
            </nav>

            <div className="sidebar-footer">
                <NavLink
                    to="/it-contact"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <span className="material-symbols-outlined">help</span>
                    <span className="text-sm">문의 하기</span>
                </NavLink>

                <button type="button" className="nav-link logout" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;