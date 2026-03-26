function VacationRequestListHeader() {
    return (
        <div className="page-header">
            <div className="page-title">
                <h2>연차 관리 이력</h2>
                <p>팀원들의 휴가 신청 현황을 검토하고 승인하세요.</p>
            </div>

            <div className="btn-group">
                <button
                    className="btn btn-primary"
                    type="button"
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
    );
}

export default VacationRequestListHeader;