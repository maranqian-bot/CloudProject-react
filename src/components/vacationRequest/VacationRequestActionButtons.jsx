function VacationRequestActionButtons({ isSubmitting, onCancel }) {
    return (
        <div className="actions">
            <button
                className="btn btn-secondary"
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
            >
                취소
            </button>

            <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "신청 중..." : "신청하기"}
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                >
                    send
                </span>
            </button>
        </div>
    );
}

export default VacationRequestActionButtons;