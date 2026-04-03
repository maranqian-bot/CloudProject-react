import { useAttendanceExcelDownloadMutation } from "../../query/attendanceExcelMutation";
import {
  formatDate,
  formatDateOfWeek,
  formatTime,
  formatWorkMinutes,
} from "../../utils/attendanceFormat";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

function AttendanceHistoryTable({
  history = [],
  totalCount = 0,
  startItemNumber = 0,
  endItemNumber = 0,
  currentPage = 1,
  totalPages = 1,
  pageNumbers = [],
  goToPage,
  goToPrevPage,
  goToNextPage,
}) {

  const employeeId = 1;
  const excelDownloadMutation = useAttendanceExcelDownloadMutation();

  const handleDownloadExcel = () => {
    excelDownloadMutation.mutate(employeeId);
  }
  
  return (
    <div className="table-container">
      <div className="table-header">
        <div>
          <h3>근태 이력</h3>
          <p>현재 정산 주기의 이력 데이터입니다.</p>
        </div>
        <div className="header-actions">
          <button className="btn-dark" onClick={handleDownloadExcel}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              download
            </span>
            엑셀 내보내기
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>출근 시각</th>
              <th>퇴근 시각</th>
              <th>근무 시간</th>
              <th className="text-center">상태</th>
              <th className="text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {history?.length > 0 ? (
              history.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="date-cell">
                      <span className="date-primary">
                        {formatDate(item.workDate)}
                      </span>
                      <span className="date-secondary">
                        {formatDateOfWeek(item.workDate)}
                      </span>
                    </div>
                  </td>

                  <td className="time-cell">{formatTime(item.checkInTime)}</td>
                  <td className="time-cell">{formatTime(item.checkOutTime)}</td>
                  <td className="time-cell">
                    {formatWorkMinutes(item.workMinutes)}
                  </td>

                  <td className="text-center">
                    <AttendanceStatusBadge status={item.attendanceStatus} />
                  </td>

                  <td className="text-right">
                    <button className="btn-icon">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 18 }}
                      >
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  근태 이력이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <p className="footer-info">
            {/* 전체 리스트는 history리스트 length구하면 되지않을까...? */}
            전체 {totalCount}개의 근태 기록 중 {startItemNumber}~{endItemNumber}
            번째 표시 중
          </p>

          <div className="pagination">
            <button
              className="page-btn"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHistoryTable;
