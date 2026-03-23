import { formatDate, formatDateOfWeek } from "../../utils/attendanceFormat";
import AttendanceStatusBadge from "./AttendanceStatusBadge";


function AttendanceHistoryTable({ history }) {

  return (
    <div className="table-container">
      <div className="table-header">
        <div>
          <h3>근태 이력</h3>
          <p>현재 정산 주기의 이력 데이터입니다.</p>
        </div>
        <div className="header-actions">
          <button className="btn-dark">
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
            {history?.map((item) => (
              <tr key={item.attendanceId}>
                <td>
                    <div className="date-cell">
                        <span className="date-primary">{formatDate(item.date)}</span>
                        <span className="date-secondary">{formatDateOfWeek(item.date)}</span>
                    </div>
                    {item.date}
                </td>
                <td className="time-cell">{formatTime(item.checkInTime)}</td>
                <td className="time-cell">{formatTime(item.checkOutTime)}</td>
                <td className="time-cell">{formatWorkMinutes(item.workTime)}</td>
                <td className="text-center">
                  <span className="status-badge status-normal">
                    <AttendanceStatusBadge status={item.status}/>
                  </span>
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
            ))}
          </tbody>
        </table>


        <div className="table-footer">
          <p className="footer-info">
            전체 308개의 근태 기록 중 1~5번째 표시 중
          </p>
          <div className="pagination">
            <button className="page-btn">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHistoryTable;
