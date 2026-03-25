function VacationRequestPolicyNote() {
    return (
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
    );
}

export default VacationRequestPolicyNote;