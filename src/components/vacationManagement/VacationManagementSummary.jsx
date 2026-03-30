import { formatVacationDays } from "../../utils/vacationRequestUtils";

function VacationManagementSummary({
    availableVacationDays,
    usedVacationDays,
    pendingApprovalCount,
}) {
    return (
        <section className="dashboard-grid">
            <div className="stat-card wide">
                <p className="stat-label">잔여 휴가</p>
                <div className="stat-value">
                    {formatVacationDays(availableVacationDays)}
                </div>
                <p className="stat-desc">현재 사용자 기준 잔여 휴가</p>
            </div>

            <div className="stat-card wide">
                <p className="stat-label">사용 휴가</p>
                <div className="stat-value">
                    {formatVacationDays(usedVacationDays)}
                </div>
                <p className="stat-desc">현재 회계 연도 기준 사용 휴가</p>
            </div>

            <div className="stat-card narrow">
                <p className="stat-label">승인 대기 중</p>
                <div className="stat-value">{pendingApprovalCount}</div>
                <p className="stat-desc">관리자 검토 대기 건</p>
            </div>
        </section>
    );
}

export default VacationManagementSummary;