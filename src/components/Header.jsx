function Header() {
    return(
        <header className="topbar">
        <div className="topbar-left">
            <h1>Architect Ledger HR</h1>
        </div>
        <div className="topbar-right">
            <button type="button" className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="user-profile">
            <div className="user-info">
                <p className="user-name">마커스 베리티</p>
                <p className="user-role">수석 프로젝트 아키텍트 (팀장)</p>
            </div>
            <img
                alt="Profile"
                className="avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD_l8kevGXJ2LE6GRSotSyLW3KIRZbLy1nJpq7NJjsr7K0rF8Y2ogq8rz04NNvqEA2GMq_YbrDOzgCm7Djdma9586_uDn3mO4fTGshaFAwjYe1XrOpAfnFc5oSsAlvO2QCcI6MHaA-eFwOCl2icVY-RVF9WlvT1OScb2laeY76kAamJF09j045LnHajahYQ-k4imgTpn4qjaZ8P60SJ-Tk2_zXJigpsNghmkdQQaDVQiqmDUJtkIfpB_FKmJJQ1K-e7AOUIbVAx7oi"
            />
            </div>
        </div>
        </header>

    )
}
export default Header;