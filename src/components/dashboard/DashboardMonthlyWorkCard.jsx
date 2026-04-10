function DashboardMonthlyWorkCard({
    workedDays,
    targetWorkDays,
}) {
    const safeWorkedDays = Math.max(0, Number(workedDays ?? 0));
    const safeTargetWorkDays = Math.max(1, Number(targetWorkDays ?? 1));
    const segmentCount = 4;
    const segmentUnit = safeTargetWorkDays / segmentCount;

    const segments = Array.from({ length: segmentCount }, (_, index) => {
        const segmentStart = index * segmentUnit;
        const segmentEnd = segmentStart + segmentUnit;

        let fillPercent = 0;

        if (safeWorkedDays >= segmentEnd) {
            fillPercent = 100;
        } else if (safeWorkedDays > segmentStart) {
            fillPercent =
                ((safeWorkedDays - segmentStart) / segmentUnit) * 100;
        }

        return {
            id: index,
            fillPercent: Math.max(0, Math.min(100, fillPercent)),
        };
    });

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
                        className="segment"
                        style={{
                            background: `linear-gradient(
                                to right,
                                var(--primary) 0%,
                                var(--primary) ${segment.fillPercent}%,
                                var(--surface-container-high) ${segment.fillPercent}%,
                                var(--surface-container-high) 100%
                            )`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardMonthlyWorkCard;