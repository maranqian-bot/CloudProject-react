

function AttendanceSummaryCards({ summary }) {
    return (
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
                        {summary?.workDays} <span className="stat-unit">일</span>
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
                        {summary?.lateCount} <span className="stat-unit">회</span>
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
                        {summary?.absentCount} <span className="stat-unit">일</span>
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
                    <p className="stat-value">{summary?.attendanceScore}%</p>
                    <p className="stat-label">근태 점수</p>
                    </div>
                </div>
            </div>
    )
    
    
}

export default AttendanceSummaryCards