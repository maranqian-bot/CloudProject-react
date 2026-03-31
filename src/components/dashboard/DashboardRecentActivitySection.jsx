const getTagClassName = (attendanceStatus) => {
    if (attendanceStatus === "OVERTIME") {
        return "tag tag-extra";
    }

    return "tag tag-normal";
};

function DashboardRecentActivitySection({
    activities,
    totalCount,
    startItemNumber,
    endItemNumber,
    currentPage,
    totalPages,
    onPageChange,
    onPrevPage,
    onNextPage,
    isLoading,
    isError,
}) {
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div className="card history-card">
            <div className="history-header">
                <div className="history-title-box">
                    <h3>최근 활동</h3>
                    <p />
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>출근</th>
                            <th>퇴근</th>
                            <th>근무 시간</th>
                            <th className="align-right">상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >
                                    데이터를 불러오는 중입니다...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >
                                    데이터를 불러오지 못했습니다.
                                </td>
                            </tr>
                        ) : activities.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >
                                    최근 활동이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            activities.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.workDate}</td>
                                    <td>{item.checkInTime}</td>
                                    <td>{item.checkOutTime}</td>
                                    <td>{item.workDuration}</td>
                                    <td className="align-right">
                                        <span
                                            className={getTagClassName(
                                                item.attendanceStatus
                                            )}
                                        >
                                            {item.attendanceStatusLabel}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {!isLoading && !isError && totalCount > 0 && (
                    <div className="table-footer">
                        <p className="footer-info">
                            전체 {totalCount}개의 활동 중 {startItemNumber}~
                            {endItemNumber}번째 표시 중
                        </p>

                        <div className="pagination">
                            <button
                                className="page-btn"
                                type="button"
                                onClick={onPrevPage}
                                disabled={currentPage <= 1}
                            >
                                <span className="material-symbols-outlined">
                                    chevron_left
                                </span>
                            </button>

                            {pageNumbers.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`page-btn ${
                                        pageNumber === currentPage
                                            ? "active"
                                            : ""
                                    }`}
                                    type="button"
                                    onClick={() => onPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                className="page-btn"
                                type="button"
                                onClick={onNextPage}
                                disabled={currentPage >= totalPages}
                            >
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardRecentActivitySection;