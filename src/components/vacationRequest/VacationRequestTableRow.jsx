import {
    getStatusLabel,
    getStatusClass,
    getAvatarText,
    formatDateRange,
    formatDays,
} from "../../utils/vacationRequestUtils";

function VacationRequestTableRow({
    item,
    onApprove,
    onReject,
    isApproving,
    isRejecting,
}) {
    const handleRejectClick = () => {
        const rejectReason = window.prompt(
            "반려 사유를 입력하세요.",
            "관리자 반려"
        );

        if (rejectReason === null) return;

        onReject(item.id, rejectReason.trim() || "관리자 반려");
    };

    return (
        <tr>
            <td>
                <div className="user-cell">
                    <div className="avatar">{getAvatarText(item.employeeName)}</div>
                    <div>
                        <p className="user-name">{item.employeeName}</p>
                        <p className="user-sub">
                            {item.departmentName} · {item.position}
                        </p>
                    </div>
                </div>
            </td>

            <td>
                <span className="type-text">{item.vacationType}</span>
            </td>

            <td>
                <div className="date-info">
                    <p className="date">
                        {formatDateRange(item.startDate, item.endDate)}
                    </p>
                    <p className="duration">{formatDays(item.days)}</p>
                </div>
            </td>

            <td>
                <span className={getStatusClass(item.status)}>
                    {getStatusLabel(item.status)}
                </span>
            </td>

            <td>
                <div className="action-group">
                    <button
                        className="btn-sm btn-approve"
                        type="button"
                        onClick={() => onApprove(item.id)}
                        disabled={isApproving || isRejecting}
                    >
                        승인
                    </button>

                    <button
                        className="btn-sm btn-reject"
                        type="button"
                        onClick={handleRejectClick}
                        disabled={isApproving || isRejecting}
                    >
                        반려
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default VacationRequestTableRow;