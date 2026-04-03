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
        <div className="card monthly-work-card">
            <div className="card-label-row">
                <span className="card-label">이번 달 근무 현황</span>
            </div>

            <div className="work-summary-row">
                <p className="work-summary-value">
                    {workedDays}
                    <span className="work-summary-unit">일</span>
                </p>
                <p className="work-summary-target">
                    / {targetWorkDays}일
                </p>
            </div>

            <div className="work-progress-segments">
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className={`progress-segment ${
                            segment.filled ? "filled" : ""
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardMonthlyWorkCard;