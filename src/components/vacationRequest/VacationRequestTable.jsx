import VacationRequestFilterTabs from "./VacationRequestFilterTabs";
import VacationRequestTableRow from "./VacationRequestTableRow";

function VacationRequestTable({
    activeType,
    setActiveType,
    totalCount,
    currentPageData,
    isLoading,
    isError,
    error,
    onApprove,
    onReject,
    isApproving,
    isRejecting,
}) {
    return (
        <div className="table-container">
            <VacationRequestFilterTabs
                activeType={activeType}
                setActiveType={setActiveType}
                totalCount={totalCount}
            />

            <table>
                <thead>
                    <tr>
                        <th>신청자</th>
                        <th>휴가 유형</th>
                        <th>기간 및 일정</th>
                        <th>상태</th>
                        <th style={{ textAlign: "right" }}>관리</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan="5"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                데이터를 불러오는 중입니다...
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td
                                colSpan="5"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                데이터를 불러오지 못했습니다.
                                {error?.message ? ` (${error.message})` : ""}
                            </td>
                        </tr>
                    ) : currentPageData.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                style={{ textAlign: "center", padding: "40px" }}
                            >
                                신청 내역이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        currentPageData.map((item) => (
                            <VacationRequestTableRow
                                key={item.id}
                                item={item}
                                onApprove={onApprove}
                                onReject={onReject}
                                isApproving={isApproving}
                                isRejecting={isRejecting}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default VacationRequestTable;