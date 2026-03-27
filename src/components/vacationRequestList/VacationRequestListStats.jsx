function VacationRequestListStats({
    pendingCount,
    approvedCount,
    rejectedCount,
    monthlyVacationCount,
}) {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <p className="stat-label">대기</p>
                <div className="stat-value">
                    <span className="stat-number trend-blue">
                        {String(pendingCount).padStart(2, "0")}
                    </span>
                    <span className="stat-trend trend-blue">{pendingCount}건</span>
                </div>
            </div>

            <div className="stat-card">
                <p className="stat-label">승인</p>
                <div className="stat-value">
                    <span className="stat-number">
                        {String(approvedCount).padStart(2, "0")}
                    </span>
                    <span
                        className="stat-trend"
                        style={{ color: "var(--on-surface-variant)" }}
                    >
                        건
                    </span>
                </div>
            </div>

            <div className="stat-card">
                <p className="stat-label">반려</p>
                <div className="stat-value">
                    <span className="stat-number">
                        {String(rejectedCount).padStart(2, "0")}
                    </span>
                    <span
                        className="stat-trend"
                        style={{ color: "var(--on-surface-variant)" }}
                    >
                        건
                    </span>
                </div>
            </div>

            <div className="stat-card">
                <p className="stat-label">이번 달 휴가 인원</p>
                <div className="stat-value">
                    <span className="stat-number">
                        {String(monthlyVacationCount).padStart(2, "0")}
                    </span>
                    <span
                        className="stat-trend"
                        style={{ color: "var(--on-surface-variant)" }}
                    >
                        명
                    </span>
                </div>
            </div>
        </div>
    );
}

export default VacationRequestListStats;