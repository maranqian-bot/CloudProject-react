function VacationRequestScheduleSection({
    formData,
    errors,
    onInputChange,
    availableVacationText,
    requestAfterApprovalText,
}) {
    return (
        <div className="schedule-settings">
            <div className="section-title">일정 설정</div>

            <div className="form-card">
                <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label className="label">연차 사용일</label>
                    <div className="input-container">
                        <span className="material-symbols-outlined">
                            calendar_today
                        </span>
                        <input
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={onInputChange}
                        />
                    </div>

                    {errors.startDate && (
                        <p
                            style={{
                                color: "var(--error)",
                                marginTop: "8px",
                                fontSize: "13px",
                            }}
                        >
                            {errors.startDate}
                        </p>
                    )}
                </div>

                <div className="input-group">
                    <label className="label">사용 일수</label>
                    <div className="input-container">
                        <span className="material-symbols-outlined">timer</span>
                        <select
                            name="days"
                            value={formData.days}
                            onChange={onInputChange}
                        >
                            <option value="0.5">0.5일 (반차)</option>
                            <option value="1">1일</option>
                            <option value="2">2일</option>
                            <option value="3">3일</option>
                            <option value="4">4일</option>
                            <option value="5">5일 이상</option>
                        </select>
                    </div>

                    {errors.days && (
                        <p
                            style={{
                                color: "var(--error)",
                                marginTop: "8px",
                                fontSize: "13px",
                            }}
                        >
                            {errors.days}
                        </p>
                    )}
                </div>

                <div className="summary-box">
                    <div className="summary-row">
                        <span className="label">잔여 연차</span>
                        <span className="value">{availableVacationText}</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <p className="hint">{requestAfterApprovalText}</p>
                </div>
            </div>
        </div>
    );
}

export default VacationRequestScheduleSection;