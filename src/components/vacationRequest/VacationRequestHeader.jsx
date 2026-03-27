function VacationRequestHeader() {
    return (
        <div className="page-header">
            <div className="breadcrumb">
                <span>인사관리</span>
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                >
                    chevron_right
                </span>
                <span>휴가 관리</span>
            </div>
            <h2 className="page-title">휴가 신청</h2>
            <p className="page-desc">
                휴가 신청서를 작성합니다. 정확한 정보를 입력해 주세요.
            </p>
        </div>
    );
}

export default VacationRequestHeader;