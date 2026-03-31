import VacationRequestListPagination from "../vacationRequestList/VacationRequestListPagination.jsx";
import {
    formatDateRange,
    formatVacationDays,
    getStatusClass,
    getVacationStatusLabel,
} from "../../utils/vacationRequestUtils";

function VacationManagementHistorySection({
    currentPageData,
    totalCount,
    startItemNumber,
    endItemNumber,
    currentPage,
    totalPages,
    goToPage,
    goToPrevPage,
    goToNextPage,
    isLoading,
    isError,
}) {
    return (
        <section className="table-card">
            <div className="table-header">
                <div>
                    <h3>나의 휴가 이력</h3>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>휴가 종류</th>
                        <th>기간</th>
                        <th>일수</th>
                        <th style={{ textAlign: "right" }}>상태</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan="4"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                데이터를 불러오는 중입니다...
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td
                                colSpan="4"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                데이터를 불러오지 못했습니다.
                            </td>
                        </tr>
                    ) : currentPageData.length === 0 ? (
                        <tr>
                            <td
                                colSpan="4"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                휴가 이력이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        currentPageData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.vacationType}</td>
                                <td>
                                    {formatDateRange(
                                        item.startDate,
                                        item.endDate
                                    )}
                                </td>
                                <td>{formatVacationDays(item.days)}일</td>
                                <td style={{ textAlign: "right" }}>
                                    <span
                                        className={`status-badge ${getStatusClass(item.status)}`}
                                    >
                                        {getVacationStatusLabel(
                                            item.status,
                                            "history"
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {!isLoading && !isError && totalCount > 0 && (
                <VacationRequestListPagination
                    totalCount={totalCount}
                    startItemNumber={startItemNumber}
                    endItemNumber={endItemNumber}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                    goToPrevPage={goToPrevPage}
                    goToNextPage={goToNextPage}
                />
            )}
        </section>
    );
}

export default VacationManagementHistorySection;