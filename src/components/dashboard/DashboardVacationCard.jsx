import { formatVacationDays } from "../../utils/dashboardUtils";

function DashboardVacationCard({
    remainingVacationDays,
    usedVacationPercent,
}) {
    return (
        <div className="card stat-card">
            <div className="stat-header">
                <div className="stat-icon icon-blue">
                    <span className="material-symbols-outlined">
                        calendar_month
                    </span>
                </div>

                <div>
                    <p className="stat-title">연차 휴가</p>
                    <p className="stat-desc">잔여 휴가 일수</p>
                </div>
            </div>

            <div className="stat-value-box">
                <span
                    className="stat-value"
                    style={{ color: "var(--primary)" }}
                >
                    {formatVacationDays(remainingVacationDays)}
                </span>
                <span className="stat-unit">일</span>
            </div>

            <div className="stat-bar">
                <div
                    className="stat-progress"
                    style={{ width: `${usedVacationPercent}%` }}
                />
            </div>
        </div>
    );
}

export default DashboardVacationCard;