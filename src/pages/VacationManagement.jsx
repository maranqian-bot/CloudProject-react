import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

function VacationManagement() {
    return (
        <>
            <Sidebar />
            <Header />

            <main>
                <div className="page-header">
                    <div className="page-title">
                        <nav className="breadcrumbs">
                            <span>운영 포털</span>
                            <span style={{ color: "var(--outline-variant)" }}>/</span>
                            <span className="active-crumb">휴가 관리</span>
                        </nav>
                        <h1>휴가 관리</h1>
                        <p>현재 사용자의 휴가 관리 메뉴입니다.</p>
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
                            휴가 신청
                        </button>
                    </div>
                </div>

                <div className="content-container">
                    <section className="summary-grid">
                        <div className="summary-card primary">
                            <span className="material-symbols-outlined bg-icon">
                                calendar_month
                            </span>
                            <p className="card-label">잔여 휴가</p>
                            <h2 className="card-value">12.5</h2>
                            <div className="card-footer">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "14px" }}
                                >
                                    info
                                </span>
                                2024년 12월 31일까지 유효
                            </div>
                        </div>

                        <div className="summary-card neutral">
                            <span className="material-symbols-outlined bg-icon">
                                event_repeat
                            </span>
                            <p className="card-label">사용 휴가</p>
                            <h2 className="card-value">2.5</h2>
                            <div className="card-footer">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "14px" }}
                                >
                                    history
                                </span>
                                현재 회계 연도 기준
                            </div>
                        </div>

                        <div className="summary-card tertiary">
                            <span className="material-symbols-outlined bg-icon">
                                pending_actions
                            </span>
                            <p className="card-label">승인 대기 중</p>
                            <h2 className="card-value">3</h2>
                            <div className="card-footer">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "14px" }}
                                >
                                    timer
                                </span>
                                관리자 검토 대기 중
                            </div>
                        </div>
                    </section>

                    <div className="main-layout">
                        <section>
                            <div className="section-header">
                                <h3 className="section-title">나의 휴가 이력</h3>
                            </div>

                            <div className="table-container">
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
                                        <tr>
                                            <td>
                                                <div className="type-cell">
                                                    <div className="type-icon blue">
                                                        <span
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "14px" }}
                                                        >
                                                            beach_access
                                                        </span>
                                                    </div>
                                                    <span className="type-name">연차 휴가</span>
                                                </div>
                                            </td>
                                            <td>2024년 10월 12일 - 10월 14일</td>
                                            <td className="days-cell">3.0일</td>
                                            <td style={{ textAlign: "right" }}>
                                                <span className="status-badge approved">승인됨</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="type-cell">
                                                    <div className="type-icon red">
                                                        <span
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "14px" }}
                                                        >
                                                            medical_services
                                                        </span>
                                                    </div>
                                                    <span className="type-name">병가</span>
                                                </div>
                                            </td>
                                            <td>2024년 11월 02일 - 11월 02일</td>
                                            <td className="days-cell">1.0일</td>
                                            <td style={{ textAlign: "right" }}>
                                                <span className="status-badge requested">요청됨</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="type-cell">
                                                    <div className="type-icon blue">
                                                        <span
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "14px" }}
                                                        >
                                                            beach_access
                                                        </span>
                                                    </div>
                                                    <span className="type-name">연차 휴가</span>
                                                </div>
                                            </td>
                                            <td>2024년 12월 20일 - 12월 30일</td>
                                            <td className="days-cell">7.0일</td>
                                            <td style={{ textAlign: "right" }}>
                                                <span className="status-badge rejected">반려됨</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="type-cell">
                                                    <div className="type-icon blue">
                                                        <span
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "14px" }}
                                                        >
                                                            beach_access
                                                        </span>
                                                    </div>
                                                    <span className="type-name">연차 휴가</span>
                                                </div>
                                            </td>
                                            <td>2024년 12월 20일 - 12월 30일</td>
                                            <td className="days-cell">7.0일</td>
                                            <td style={{ textAlign: "right" }}>
                                                <span className="status-badge rejected">반려됨</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="type-cell">
                                                    <div className="type-icon blue">
                                                        <span
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "14px" }}
                                                        >
                                                            beach_access
                                                        </span>
                                                    </div>
                                                    <span className="type-name">연차 휴가</span>
                                                </div>
                                            </td>
                                            <td>2024년 12월 20일 - 12월 30일</td>
                                            <td className="days-cell">7.0일</td>
                                            <td style={{ textAlign: "right" }}>
                                                <span className="status-badge rejected">반려됨</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="table-footer">
                                    <p className="footer-info">
                                        전체 17개의 휴가 이력 중 1~5번째 표시 중
                                    </p>
                                    <div className="pagination">
                                        <button className="page-btn" type="button">
                                            <span className="material-symbols-outlined">
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
                                            <span className="material-symbols-outlined">
                                                chevron_right
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div
                                className="section-header"
                                style={{ justifyContent: "flex-start", gap: "8px" }}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{ color: "var(--primary)" }}
                                >
                                    verified_user
                                </span>
                                <h3 className="section-title">승인 대기열</h3>
                            </div>

                            <div className="queue-list">
                                <div className="queue-item">
                                    <div className="team-member">
                                        <img
                                            alt="팀원 사진"
                                            className="team-avatar"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm_K93hoKl4Xlh2UumEz9oLB2VJY6-Z1toLOCL4nDFcrelXQPMX5wrMZ8JPUuKVhMDdv9n4YRaN4INXjJKsEhVjK1DCSeDgNt6cMqPQCuF3njUhWkQn8D-kL4Em0h_eTrS4Koc8rsOtqlIOmbL5vwHdunh922_-EwNZWfNVefeBpX9n8rKAOzbGOYcN-p6RLzX0T6i1dwURt1KnxIwfqrbAC_CSAb-5sQkRZ7lg5dmNJJYxFK0j4RyBDL94XoRnFAxi4Os-cdowpkX"
                                        />
                                        <div>
                                            <p className="member-name">Julian Casablancas</p>
                                            <p className="member-role">주니어 아키텍트</p>
                                        </div>
                                    </div>

                                    <div className="request-details">
                                        <div>
                                            <p className="detail-label">종류</p>
                                            <p className="detail-value">교육 휴가</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p className="detail-label">기간</p>
                                            <p className="detail-value">2일</p>
                                        </div>
                                    </div>

                                    <div className="action-grid">
                                        <button className="btn-reject" type="button">
                                            반려
                                        </button>
                                        <button className="btn-approve" type="button">
                                            승인
                                        </button>
                                    </div>
                                </div>

                                <div className="queue-item">
                                    <div className="team-member">
                                        <img
                                            alt="팀원 사진"
                                            className="team-avatar"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgnF0_jerlKmdAmyhfI0tcGk0-rid2atP-v7pwrqnYMGTLmYTcXoaGy8utyxH9QtcC5y2mZfr3qIdlWU2b-C8hLrnJO3Zd0XQi30Er5Jsoa0olqOH_diuZJOg9IryHFiBtIkfOBu7raGw0dWtUr5EINoIalnjgxslvK18Qjy5T7hbPpUw1mQXu3idwjn3RrFGKI7YqoSj7q8HcbFEXt_Ou1Vo738myXL6RuHoPfDBmlfOyDGB5TI6S_w71a9OajQYSQDkmMB_Yr5pt"
                                        />
                                        <div>
                                            <p className="member-name">Elena Gilbert</p>
                                            <p className="member-role">리드 디자이너</p>
                                        </div>
                                    </div>

                                    <div className="request-details">
                                        <div>
                                            <p className="detail-label">종류</p>
                                            <p className="detail-value">연차 휴가</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p className="detail-label">기간</p>
                                            <p className="detail-value">5일</p>
                                        </div>
                                    </div>

                                    <div className="action-grid">
                                        <button className="btn-reject" type="button">
                                            반려
                                        </button>
                                        <button className="btn-approve" type="button">
                                            승인
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="view-all-btn"
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = "/vacation-request-list")
                                    }
                                >
                                    모든 요청 보기
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withPageStyle(VacationManagement, "dashboard.css", pageCss);