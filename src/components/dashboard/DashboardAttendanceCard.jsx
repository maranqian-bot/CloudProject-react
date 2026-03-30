function DashboardAttendanceCard({
    currentTime,
    meridiem,
    currentDateLabel,
    attendanceStatusLabel,
    isCheckInDisabled,
    isCheckOutDisabled,
    onCheckIn,
    onCheckOut,
    isCheckingIn,
    isCheckingOut,
}) {
    return (
        <div className="card attendance-card">
            <div>
                <div className="card-label-row">
                    <span className="card-label">근태 현황</span>

                    <div className="status-badge">
                        <span className="dot" />
                        {attendanceStatusLabel}
                    </div>
                </div>

                <p className="time-display">
                    {currentTime}
                    {meridiem && <span className="time-ampm">{meridiem}</span>}
                </p>

                <p className="date-sub">{currentDateLabel}</p>
            </div>

            <div className="btn-group">
                <button
                    className={`btn ${
                        isCheckInDisabled ? "btn-disabled" : "btn-primary"
                    }`}
                    type="button"
                    onClick={onCheckIn}
                    disabled={isCheckInDisabled || isCheckingIn}
                >
                    <span className="material-symbols-outlined">login</span>
                    {isCheckingIn ? "처리 중..." : "출근하기"}
                </button>

                <button
                    className={`btn ${
                        isCheckOutDisabled ? "btn-disabled" : "btn-primary"
                    }`}
                    type="button"
                    onClick={onCheckOut}
                    disabled={isCheckOutDisabled || isCheckingOut}
                >
                    <span className="material-symbols-outlined">logout</span>
                    {isCheckingOut ? "처리 중..." : "퇴근하기"}
                </button>
            </div>
        </div>
    );
}

export default DashboardAttendanceCard;