function VacationRequestListPagination({
    totalCount,
    startItemNumber,
    endItemNumber,
    currentPage,
    totalPages,
    goToPage,
    goToPrevPage,
    goToNextPage,
}) {
    if (totalPages <= 0) return null;

    return (
        <div className="table-footer">
            <p
                style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--on-surface-variant)",
                }}
            >
                전체 요청 {totalCount}건 중 {startItemNumber}~{endItemNumber}번째 표시 중
            </p>

            <div className="pagination">
                <button
                    className="page-btn"
                    type="button"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                    >
                        chevron_left
                    </span>
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            className={`page-btn ${currentPage === page ? "active" : ""}`}
                            type="button"
                            onClick={() => goToPage(page)}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="page-btn"
                    type="button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                    >
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}

export default VacationRequestListPagination;