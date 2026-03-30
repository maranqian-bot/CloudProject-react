function DashboardHeader({
    employeeName,
    todayLabel,
    pendingApprovalCount,
    absentTeamMemberCount,
}) {
    return (
        <div className="page-header">
            <div className="page-title">
                <nav className="breadcrumbs">
                    <span>운영 포털</span>
                    <span style={{ color: "var(--outline-variant)" }}>/</span>
                    <span className="active-crumb">대시보드</span>
                </nav>

                <h1>반갑습니다, {employeeName} 님.</h1>

                <p>
                    오늘은 {todayLabel}입니다.{" "}
                    <span style={{ color: "rgb(113, 113, 255)" }}>
                        대기 중인 승인 건이{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {pendingApprovalCount}건
                        </span>
                    </span>{" "}
                    있으며 팀원 중{" "}
                    <span style={{ color: "rgb(255, 100, 100)" }}>
                        <span style={{ fontWeight: "bold" }}>
                            {absentTeamMemberCount}명
                        </span>
                        이 부재중
                    </span>
                    입니다.
                </p>
            </div>
        </div>
    );
}

export default DashboardHeader;