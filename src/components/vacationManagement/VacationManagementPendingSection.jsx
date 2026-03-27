import { useNavigate } from "react-router-dom";
import {
    formatDateRange,
    formatVacationDays,
} from "./utils/vacationRequestUtils";

function VacationManagementPendingSection({
    myPendingApprovals,
    onApprove,
    onReject,
    isApproving,
    isRejecting,
}) {
    const navigate = useNavigate();
    const isActionPending = isApproving || isRejecting;

    const handleRejectClick = (requestId) => {
        const rejectReason = window.prompt(
            "반려 사유를 입력하세요.",
            "관리자 반려"
        );

        if (!rejectReason || !rejectReason.trim()) {
            return;
        }

        onReject(requestId, rejectReason.trim());
    };

    return (
        <section className="table-card">
            <div className="table-header">
                <div>
                    <h3>승인 대기열</h3>
                </div>
            </div>

            <div style={{ padding: "24px", display: "grid", gap: "16px" }}>
                {myPendingApprovals.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                        대기 중인 요청이 없습니다.
                    </div>
                ) : (
                    myPendingApprovals.map((item) => (
                        <div key={item.id} className="stat-card">
                            <div style={{ marginBottom: "16px" }}>
                                <p style={{ fontWeight: 700 }}>
                                    {item.employeeName}
                                </p>
                                <p
                                    style={{
                                        color: "var(--on-surface-variant)",
                                        fontSize: "14px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {item.position} · {item.departmentName}
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "8px",
                                    marginBottom: "16px",
                                }}
                            >
                                <div>
                                    <strong>종류</strong> {item.vacationType}
                                </div>
                                <div>
                                    <strong>기간</strong>{" "}
                                    {formatDateRange(
                                        item.startDate,
                                        item.endDate
                                    )}
                                </div>
                                <div>
                                    <strong>일수</strong>{" "}
                                    {formatVacationDays(item.days)}일
                                </div>
                            </div>

                            <div className="btn-group">
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => handleRejectClick(item.id)}
                                    disabled={isActionPending}
                                >
                                    반려
                                </button>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => onApprove(item.id)}
                                    disabled={isActionPending}
                                >
                                    승인
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => navigate("/vacation-request-list")}
                    >
                        모든 요청 보기
                    </button>
                </div>
            </div>
        </section>
    );
}

export default VacationManagementPendingSection;