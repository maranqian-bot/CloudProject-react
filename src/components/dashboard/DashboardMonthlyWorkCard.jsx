function DashboardMonthlyWorkCard({
    workedDays,
    targetWorkDays,
    filledSegmentCount,
}) {
    const segments = Array.from({ length: 4 }, (_, index) => ({
        id: index,
        filled: index < filledSegmentCount,
    }));

    return (
        <div className="card stat-card">
            <div className="stat-header">
                <div className="stat-icon icon-orange">
                    <span className="material-symbols-outlined">work_history</span>
                </div>

                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div className="stat-title">이번 달 근무</div>
                    <div className="stat-desc">출근 기록 일수</div>
                </div>
            </div>

            <div className="stat-value-box">
                <span className="stat-value">{workedDays}</span>
                <span className="stat-unit">/ {targetWorkDays}일</span>
            </div>

            <div className="segments">
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className={`segment ${segment.filled ? "fill" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardMonthlyWorkCard;