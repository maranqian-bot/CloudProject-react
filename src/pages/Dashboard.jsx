import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function Dashboard() {
    return(
        <>
        <Sidebar />
        <Header />
            <main>
            <div className="content-padding">
                <div className="page-header">
                <div className="page-title">
                    <nav className="breadcrumbs">
                    <span>운영 포털</span>
                    <span style={{ color: "var(--outline-variant)" }}>/</span>
                    <span className="active-crumb">대시보드</span>
                    </nav>
                    <h1>반갑습니다, 마커스 님.</h1>
                    <p>
                    오늘은 10월 24일 화요일입니다.{" "}
                    <span style={{ color: "rgb(113, 113, 255)" }}>
                        대기 중인 승인 건이 <span style={{ fontWeight: "bold" }}>3건</span>
                    </span>{" "}
                    있으며 팀원 중{" "}
                    <span style={{ color: "rgb(255, 100, 100)" }}>
                        <span style={{ fontWeight: "bold" }}>1명</span>이 부재중
                    </span>
                    입니다.
                    </p>
                </div>
                </div>
                <div className="dashboard-grid">
                {/* Attendance Card */}
                <div className="card attendance-card">
                    <div>
                    <div className="card-label-row">
                        <span className="card-label">근태 현황</span>
                        <div className="status-badge">
                        <span className="dot" />
                        출근 완료
                        </div>
                    </div>
                    <p className="time-display">
                        09:14<span className="time-ampm">AM</span>
                    </p>
                    <p className="date-sub">2023년 10월 24일</p>
                    </div>
                    <div className="btn-group">
                    <button className="btn btn-disabled">
                        <span className="material-symbols-outlined">login</span>
                        출근하기
                    </button>
                    <button className="btn btn-primary">
                        <span className="material-symbols-outlined">logout</span>
                        퇴근하기
                    </button>
                    </div>
                </div>
                {/* Stats Column */}
                <div className="stats-col">
                    <div className="card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon icon-blue">
                        <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div>
                        <p className="stat-title">연차 휴가</p>
                        <p className="stat-desc">잔여 휴가 일수</p>
                        </div>
                    </div>
                    <div className="stat-value-box">
                        <span className="stat-value" style={{ color: "var(--primary)" }}>
                        12.5
                        </span>
                        <span className="stat-unit">일</span>
                    </div>
                    <div className="stat-bar">
                        <div className="stat-progress" style={{ width: "62.5%" }} />
                    </div>
                    </div>
                    <div className="card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon icon-orange">
                        <span className="material-symbols-outlined">work_history</span>
                        </div>
                        <div>
                        <p className="stat-title">이번 달 근무</p>
                        <p className="stat-desc">출근 기록 일수</p>
                        </div>
                    </div>
                    <div className="stat-value-box">
                        <span className="stat-value">18</span>
                        <span className="stat-unit">/ 22 일</span>
                    </div>
                    <div className="segments">
                        <div className="segment fill" />
                        <div className="segment fill" />
                        <div className="segment fill" />
                        <div className="segment" />
                    </div>
                    </div>
                </div>
                {/* Recent Activity */}
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
                        <tr>
                            <td>2023. 10. 23</td>
                            <td>09:02 AM</td>
                            <td>06:15 PM</td>
                            <td>9시간 13분</td>
                            <td className="align-right">
                            <span className="tag tag-normal">정상</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2023. 10. 20</td>
                            <td>08:55 AM</td>
                            <td>05:40 PM</td>
                            <td>8시간 45분</td>
                            <td className="align-right">
                            <span className="tag tag-normal">정상</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2023. 10. 19</td>
                            <td>09:10 AM</td>
                            <td>07:20 PM</td>
                            <td>10시간 10분</td>
                            <td className="align-right">
                            <span className="tag tag-extra">연장</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2023. 10. 18</td>
                            <td>09:05 AM</td>
                            <td>06:05 PM</td>
                            <td>9시간 00분</td>
                            <td className="align-right">
                            <span className="tag tag-normal">정상</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2023. 10. 18</td>
                            <td>09:05 AM</td>
                            <td>06:05 PM</td>
                            <td>9시간 00분</td>
                            <td className="align-right">
                            <span className="tag tag-normal">정상</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="table-footer">
                        <p className="footer-info">전체 225개의 활동 중 1~5번째 표시 중</p>
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
            </div>
            </main>

            {/* FAB */}
            <button className="fab">
                <span className="material-symbols-outlined">add</span>
            </button>

            </>
    )
}

export default Dashboard;