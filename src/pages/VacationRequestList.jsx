import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/vacation-request-list.css?inline";

function VacationRequestList() {
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
                                <span className="stat-number trend-blue">12</span>
                                <span className="stat-trend trend-blue">+2 New</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">승인</p>
                            <div className="stat-value">
                                <span className="stat-number">05</span>
                                <span
                                    className="stat-trend"
                                    style={{ color: "var(--on-surface-variant)" }}
                                >
                                    명
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">반려</p>
                            <div className="stat-value">
                                <span className="stat-number">05</span>
                                <span
                                    className="stat-trend"
                                    style={{ color: "var(--on-surface-variant)" }}
                                >
                                    명
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <p className="stat-label">이번 달 휴가 인원</p>
                            <div className="stat-value">
                                <span className="stat-number">05</span>
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
                                <button className="tab active" type="button">
                                    전체 목록
                                </button>
                                <button className="tab" type="button">
                                    교육
                                </button>
                                <button className="tab" type="button">
                                    병가
                                </button>
                                <button className="tab" type="button">
                                    경조사
                                </button>
                                <button className="tab" type="button">
                                    기타
                                </button>
                            </div>
                            <p className="total-count">총 24건의 요청</p>
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
                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div className="avatar">IS</div>
                                            <div>
                                                <p className="user-name">이수진</p>
                                                <p className="user-sub">개발팀 · 선임</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-text">연차 유급 휴가</span>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <p className="date">2024.06.12 - 2024.06.14</p>
                                            <p className="duration">3일간 (평일 기준)</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-pending">대기</span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-approve" type="button">
                                                승인
                                            </button>
                                            <button className="btn-sm btn-reject" type="button">
                                                반려
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div
                                                className="avatar"
                                                style={{
                                                    backgroundColor: "#f1f5f9",
                                                    color: "#64748b",
                                                }}
                                            >
                                                PH
                                            </div>
                                            <div>
                                                <p className="user-name">박현우</p>
                                                <p className="user-sub">디자인팀 · 책임</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-text">오전 반차</span>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <p className="date">2024.06.10</p>
                                            <p className="duration">0.5일</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-approved">승인</span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-approve" type="button">
                                                승인
                                            </button>
                                            <button className="btn-sm btn-reject" type="button">
                                                반려
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div
                                                className="avatar"
                                                style={{
                                                    backgroundColor: "#f1f5f9",
                                                    color: "#64748b",
                                                }}
                                            >
                                                KM
                                            </div>
                                            <div>
                                                <p className="user-name">강민호</p>
                                                <p className="user-sub">기획팀 · 주임</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-text">병가 (기타)</span>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <p className="date">2024.06.07</p>
                                            <p className="duration">1일간</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-rejected">반려</span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-approve" type="button">
                                                승인
                                            </button>
                                            <button className="btn-sm btn-reject" type="button">
                                                반려
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div
                                                className="avatar"
                                                style={{
                                                    backgroundColor: "#f1f5f9",
                                                    color: "#64748b",
                                                }}
                                            >
                                                KM
                                            </div>
                                            <div>
                                                <p className="user-name">강민호</p>
                                                <p className="user-sub">기획팀 · 주임</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-text">병가 (기타)</span>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <p className="date">2024.06.07</p>
                                            <p className="duration">1일간</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-rejected">반려</span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-approve" type="button">
                                                승인
                                            </button>
                                            <button className="btn-sm btn-reject" type="button">
                                                반려
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div className="avatar">CY</div>
                                            <div>
                                                <p className="user-name">최윤아</p>
                                                <p className="user-sub">마케팅팀 · 사원</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-text">경조사 휴가</span>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <p className="date">2024.06.18 - 2024.06.20</p>
                                            <p className="duration">3일간</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-pending">대기</span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-approve" type="button">
                                                승인
                                            </button>
                                            <button className="btn-sm btn-reject" type="button">
                                                반려
                                            </button>
                                        </div>
                                    </td>
                                </tr>
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
                                전체 인원 12명 중 1~5번째 표시 중
                            </p>

                            <div className="pagination">
                                <button className="page-btn" type="button">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "16px" }}
                                    >
                                        chevron_left
                                    </span>
                                </button>
                                <button className="page-btn active" type="button">
                                    1
                                </button>
                                <button className="page-btn" type="button">
                                    2
                                </button>
                                <button className="page-btn" type="button">
                                    3
                                </button>
                                <button className="page-btn" type="button">
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
    )
}

export default withPageStyle(VacationRequestList, "vacation-request-list.css", pageCss);