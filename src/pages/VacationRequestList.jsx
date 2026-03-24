import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/vacation-request-list.css?inline";

import { useVacationRequestList } from "../hooks/useVacationRequestList";
import {
    TYPE_TABS,
    getStatusLabel,
    getStatusClass,
    getAvatarText,
    formatDateRange,
    formatDays,
} from "../utils/vacationRequestUtils";

function VacationRequestList() {
    // 휴가 신청 목록 / 통계 / 페이지네이션 관련 커스텀 훅 호출
    const {
        activeType,
        setActiveType,
        filteredList,
        currentPageData,
        currentPage,
        totalPages,
        startItemNumber,
        endItemNumber,
        pendingCount,
        approvedCount,
        rejectedCount,
        monthlyVacationCount,
        isLoading,
        isError,
        error,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving,
        isRejecting,
    } = useVacationRequestList();

    return (
        <>
            <Sidebar />
            <Header />

            <main>
                <div className="page-canvas">
                    <div className="page-header">
                        <div className="page-title">
                            <h2>연차 관리 이력</h2>
                            <p>팀원들의 휴가 신청 현황을 검토하고 승인하세요.</p>
                        </div>

                        <div className="btn-group">
                            <button
                                className="btn btn-primary"
                                onClick={() => (window.location.href = "/vacation-request")}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "16px" }}
                                >
                                    add
                                </span>
                                대리 신청
                            </button>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <p className="stat-label">대기</p>
                            <div className="stat-value">
                                <span className="stat-number trend-blue">
                                    {String(pendingCount).padStart(2, "0")}
                                </span>
                                <span className="stat-trend trend-blue">{pendingCount}건</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">승인</p>
                            <div className="stat-value">
                                <span className="stat-number">
                                    {String(approvedCount).padStart(2, "0")}
                                </span>
                                <span
                                    className="stat-trend"
                                    style={{ color: "var(--on-surface-variant)" }}
                                >
                                    건
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">반려</p>
                            <div className="stat-value">
                                <span className="stat-number">
                                    {String(rejectedCount).padStart(2, "0")}
                                </span>
                                <span
                                    className="stat-trend"
                                    style={{ color: "var(--on-surface-variant)" }}
                                >
                                    건
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">이번 달 휴가 인원</p>
                            <div className="stat-value">
                                <span className="stat-number">
                                    {String(monthlyVacationCount).padStart(2, "0")}
                                </span>
                                <span
                                    className="stat-trend"
                                    style={{ color: "var(--on-surface-variant)" }}
                                >
                                    명
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <div className="table-header">
                            <div className="tabs">
                                {/* 휴가 유형 탭 렌더링 */}
                                {TYPE_TABS.map((tab) => (
                                    <button
                                        key={tab.value}
                                        className={`tab ${activeType === tab.value ? "active" : ""}`}
                                        type="button"
                                        onClick={() => setActiveType(tab.value)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* 현재 필터링된 전체 요청 건수 표시 */}
                            <p className="total-count">총 {filteredList.length}건의 요청</p>
                        </div>

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
                                {/* 로딩 상태 */}
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
                                    /* 에러 상태 */
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
                                    /* 빈 데이터 상태 */
                                    <tr>
                                        <td
                                            colSpan="5"
                                            style={{ textAlign: "center", padding: "40px" }}
                                        >
                                            신청 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    /* 현재 페이지 데이터 렌더링 */
                                    currentPageData.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="avatar">
                                                        {getAvatarText(item.employeeName)}
                                                    </div>
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
                                                        {formatDateRange(
                                                            item.startDate,
                                                            item.endDate
                                                        )}
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
                                                    {/* 승인 버튼 */}
                                                    <button
                                                        className="btn-sm btn-approve"
                                                        type="button"
                                                        onClick={() => handleApprove(item.id)}
                                                        disabled={isApproving || isRejecting}
                                                    >
                                                        승인
                                                    </button>

                                                    {/* 반려 버튼 */}
                                                    <button
                                                        className="btn-sm btn-reject"
                                                        type="button"
                                                        onClick={() => {
                                                            // 반려 사유 입력창 표시
                                                            const rejectReason = window.prompt(
                                                                "반려 사유를 입력하세요.",
                                                                "관리자 반려"
                                                            );

                                                            // 취소 버튼 클릭 시 종료
                                                            if (rejectReason === null) return;

                                                            // 입력값이 비어 있으면 기본 문구 사용
                                                            handleReject(
                                                                item.id,
                                                                rejectReason.trim() || "관리자 반려"
                                                            );
                                                        }}
                                                        disabled={isApproving || isRejecting}
                                                    >
                                                        반려
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="table-footer">
                            <p
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "var(--on-surface-variant)",
                                }}
                            >
                                전체 요청 {filteredList.length}건 중 {startItemNumber}~
                                {endItemNumber}번째 표시 중
                            </p>

                            <div className="pagination">
                                {/* 이전 페이지 버튼 */}
                                <button
                                    className="page-btn"
                                    type="button"
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "16px" }}
                                    >
                                        chevron_left
                                    </span>
                                </button>

                                {/* 페이지 번호 버튼 */}
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                    (page) => (
                                        <button
                                            key={page}
                                            className={`page-btn ${
                                                currentPage === page ? "active" : ""
                                            }`}
                                            type="button"
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                {/* 다음 페이지 버튼 */}
                                <button
                                    className="page-btn"
                                    type="button"
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "16px" }}
                                    >
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-note">
                    <span className="material-symbols-outlined info-icon">info</span>
                    <div className="info-content">
                        <h3>휴가 관리 정책 안내</h3>
                        <p>
                            신청일로부터 3일 이내에 승인 처리가 되지 않을 경우 관리자에게 알림이
                            발송됩니다. 긴급한 사안은 메신저로 별도 소통 부탁드립니다. 모든
                            휴가 데이터는 인사 기록에 자동 반영됩니다.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default withPageStyle(
    VacationRequestList,
    "vacation-request-list.css",
    pageCss
);