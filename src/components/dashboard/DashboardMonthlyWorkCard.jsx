import { DASHBOARD_SEGMENT_COUNT } from "../../utils/dashboardUtils";

function DashboardMonthlyWorkCard({
    workedDays,
    targetWorkDays,
    filledSegmentCount,
}) {
    return (
        <div className="card stat-card">
            <div className="stat-header">
                <div className="stat-icon icon-orange">
                    <span className="material-symbols-outlined">
                        work_history
                    </span>
                </div>

                <div>
                    <p className="stat-title">이번 달 근무</p>
                    <p className="stat-desc">출근 기록 일수</p>
                </div>
            </div>

            <div className="stat-value-box">
                <span className="stat-value">{workedDays}</span>
                <span className="stat-unit">/ {targetWorkDays} 일</span>
            </div>

            <div className="segments">
                {Array.from({ length: DASHBOARD_SEGMENT_COUNT }).map(
                    (_, index) => (
                        <div
                            key={index}
                            // segment 개수는 공통 상수를 사용
                            className={`segment ${
                                index < filledSegmentCount ? "fill" : ""
                            }`}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default DashboardMonthlyWorkCard;