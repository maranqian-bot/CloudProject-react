import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

function AttendanceManagement() {
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
                            <span className="active-crumb">근태 관리</span>
                        </nav>
                        <h1>근태 관리</h1>
                        <p>직원들의 근태 관리 메뉴입니다.</p>
                    </div>
                </div>
                <div className="content-canvas">
                    {/* Stats Bento Grid */}
                    <div className="stats-grid">
                        {/* Present Card */}
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box blue">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: '"FILL" 1' }}
                                    >
                                        check_circle
                                    </span>
                                </div>
                                <span className="trend-badge trend-up">+2.4%</span>
                            </div>
                            <div>
                                <p className="stat-value">
                                    22 <span className="stat-unit">일</span>
                                </p>
                                <p className="stat-label">이번 달 출근 일수</p>
                            </div>
                        </div>
                        {/* Late Card */}
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box orange">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: '"FILL" 1' }}
                                    >
                                        schedule
                                    </span>
                                </div>
                                <span className="trend-badge trend-down">-12%</span>
                            </div>
                            <div>
                                <p className="stat-value">
                                    03 <span className="stat-unit">일</span>
                                </p>
                                <p className="stat-label">지각 횟수</p>
                            </div>
                        </div>
                        {/* Absent Card */}
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="icon-box red">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: '"FILL" 1' }}
                                    >
                                        cancel
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="stat-value">
                                    01 <span className="stat-unit">일</span>
                                </p>
                                <p className="stat-label">총 결근 일수</p>
                            </div>
                        </div>
                        {/* Efficiency Card */}
                        <div className="stat-card featured">
                            <div className="stat-header">
                                <div className="icon-box glass">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: '"FILL" 1' }}
                                    >
                                        leaderboard
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="stat-value">94.8%</p>
                                <p className="stat-label">근태 점수</p>
                            </div>
                        </div>
                    </div>
                    {/* Data Table Section */}
                    <div className="table-container">
                        <div className="table-header">
                            <div>
                                <h3>근태 이력</h3>
                                <p>현재 정산 주기의 이력 데이터입니다.</p>
                            </div>
                            <div className="header-actions">
                                <button className="btn-dark">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: 16 }}
                                    >
                                        download
                                    </span>
                                    엑셀 내보내기
                                </button>
                            </div>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>날짜</th>
                                        <th>출근 시각</th>
                                        <th>퇴근 시각</th>
                                        <th>근무 시간</th>
                                        <th className="text-center">상태</th>
                                        <th className="text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2023년 10월 24일</span>
                                                <span className="date-secondary">목요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:54 AM</td>
                                        <td className="time-cell">06:12 PM</td>
                                        <td className="time-cell">9시간 18분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-normal">정상</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: 18 }}
                                                >
                                                    more_vert
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2023년 10월 23일</span>
                                                <span className="date-secondary">수요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">09:42 AM</td>
                                        <td className="time-cell">06:05 PM</td>
                                        <td className="time-cell">8시간 23분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-late">지각</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: 18 }}
                                                >
                                                    more_vert
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2023년 10월 22일</span>
                                                <span className="date-secondary">화요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:50 AM</td>
                                        <td className="time-cell">08:30 PM</td>
                                        <td className="time-cell">11시간 40분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-overtime">연장 근무</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: 18 }}
                                                >
                                                    more_vert
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2023년 10월 21일</span>
                                                <span className="date-secondary">월요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:58 AM</td>
                                        <td className="time-cell">06:00 PM</td>
                                        <td className="time-cell">9시간 02분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-normal">정상</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: 18 }}
                                                >
                                                    more_vert
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="date-cell">
                                                <span className="date-primary">2023년 10월 21일</span>
                                                <span className="date-secondary">월요일</span>
                                            </div>
                                        </td>
                                        <td className="time-cell">08:58 AM</td>
                                        <td className="time-cell">06:00 PM</td>
                                        <td className="time-cell">9시간 02분</td>
                                        <td className="text-center">
                                            <span className="status-badge status-normal">정상</span>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn-icon">
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: 18 }}
                                                >
                                                    more_vert
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="table-footer">
                                <p className="footer-info">
                                    전체 308개의 근태 기록 중 1~5번째 표시 중
                                </p>
                                <div className="pagination">
                                    <button className="page-btn">
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button className="page-btn active">1</button>
                                    <button className="page-btn">2</button>
                                    <button className="page-btn">3</button>
                                    <button className="page-btn">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withPageStyle(AttendanceManagement, "dashboard.css", pageCss);