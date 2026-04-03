function VacationRequestReasonSection({
    formData,
    errors,
    onInputChange,
    onVacationTypeChange,
    showOtherReason,
}) {
    return (
        <div className="request-details">
            <div className="section-title">신청 및 사유</div>

            <div className="form-card form-card-detail">
                <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label className="label">
                        대리 신청자 사번 (없을 경우 빈칸으로 제출하세요.)
                    </label>
                    <div className="input-container">
                        <span className="material-symbols-outlined">badge</span>
                        <input
                            name="proxyEmployeeNumber"
                            placeholder="대리인 사번 입력"
                            type="text"
                            value={formData.proxyEmployeeNumber}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label className="label">사유 선택</label>
                    <div className="input-container">
                        <span className="material-symbols-outlined">category</span>
                        <select
                            id="reason-select"
                            name="vacationType"
                            value={formData.vacationType}
                            onChange={onVacationTypeChange}
                        >
                            <option value="">선택</option>
                            <option value="ANNUAL">연차</option>
                            <option value="SICK">병가</option>
                            <option value="EVENT">경조사</option>
                            <option value="ETC">기타</option>
                        </select>
                    </div>

                    {errors.vacationType && (
                        <p
                            style={{
                                color: "var(--error)",
                                marginTop: "8px",
                                fontSize: "13px",
                            }}
                        >
                            {errors.vacationType}
                        </p>
                    )}
                </div>

                <div
                    className={`input-group ${showOtherReason ? "" : "hidden"}`}
                    id="other-reason-group"
                >
                    <label className="label">
                        기타 사유 (기타 선택 시 작성하세요.)
                    </label>
                    <div className="input-container">
                        <span className="material-symbols-outlined">edit_note</span>
                        <input
                            name="reasonDetail"
                            placeholder="상세 사유를 입력하세요"
                            type="text"
                            value={formData.reasonDetail}
                            onChange={onInputChange}
                        />
                    </div>

                    {errors.reasonDetail && (
                        <p
                            style={{
                                color: "var(--error)",
                                marginTop: "8px",
                                fontSize: "13px",
                            }}
                        >
                            {errors.reasonDetail}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VacationRequestReasonSection;