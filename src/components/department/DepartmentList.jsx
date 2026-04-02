import { useDepartmentList } from "../../hooks/useDepartmentList"


const DepartmentList = () => {
  const {
    list, totalCount, startItemNumber, endItemNumber, currentPage, totalPages, isLoading,
    goToPage, goToPrevPage, goToNextPage
  } = useDepartmentList(5);

  if (isLoading) return <div>로딩 중...</div>;

  // 문자열 조합은 여기서 처리!
  const paginationText = `전체 ${totalCount.toLocaleString()}개 중 ${startItemNumber}~${endItemNumber}번째 표시 중`;
  const pageStatusText = `${currentPage} / ${totalPages} 페이지`;

  return (
    <section className="table-card">
      <div className="table-header">
        <div className="search-box">
          <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--on-surface-variant)" }}>search</span>
          <input placeholder="부서 필터링..." type="text" />
        </div>

      </div>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th style={{ paddingLeft: "32px" }}>부서 코드</th>
              <th>부서명</th>
              <th>인원</th>
              <th>관리자</th>
              <th style={{ textAlign: "right", paddingRight: "32px" }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "60px" }}>데이터를 불러오는 중입니다...</td></tr>
            ) : (
              list.map((dept) => (
                <tr key={dept.departmentId}>
                  <td style={{ paddingLeft: "32px" }}><span className="dept-code">{dept.deptCode}</span></td>
                  <td>
                    <div className="dept-info-name">{dept.deptName}</div>
                    <div className="dept-info-sub">{dept.description || "주요 업무 미설정"}</div>
                  </td>
                  <td>
                    <div className="count-group">
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>{dept.employeeCount || 0}</span>
                      <div className="avatar-stack">
                        <div className="avatar-more">+{dept.employeeCount || 0}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="manager-cell" style={{ gap: "0px" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>
                          {dept.managerName || "미지정"} ({dept.managerId || "N/A"})
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--on-surface-variant)" }}>
                          {dept.managerJobTitle || "부서 책임자"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="action-cell">
                    <button className="btn-edit" onClick={() => window.location.href = `/department-edit/${dept.departmentId}`}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="footer-info"> {/* 왼쪽: 전체 개수 정보 */}
          <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--on-surface-variant)" }}>
            {paginationText}
          </p>
          {/* 추가: 현재 페이지 상태 표시 */}
          <span style={{ fontSize: "11px", color: "var(--on-surface-variant)", marginLeft: "8px" }}>
            ({pageStatusText})
          </span>
        </div>
        <div className="pagination">
          <button className="page-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button key={pageNum} className={`page-btn ${currentPage === pageNum ? "active" : ""}`} onClick={() => goToPage(pageNum)}>
              {pageNum}
            </button>
          ))}
          <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  )

};

export default DepartmentList;