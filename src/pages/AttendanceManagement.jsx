import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";
import AttendanceSummaryCards from "../components/attendance/AttendanceSummaryCards";
import {
  useAttendanceHistoryQuery,
  useAttendanceSummaryQuery,
} from "../query/attendanceQuery";
import AttendanceHistoryTable from "../components/attendance/AttendanceHistoryTable";
import { usePagination } from "../hooks/usePagination.js";

function AttendanceManagement() {
  // TODO : 백엔드 구현 후 query 호출해야 됨
  //      : 백엔드 구현할 때 CORS 설정해줘야 됨
  //      : - 페이징 처리 해야 됨(3페이지씩 5행씩 보여줌)
  //      : 엑셀 내보내기 기능 구현해야 됨
  //      : 상태뱃지 스타일 적용 해야 됨
  //      : 근태 관리 상승률과 하락률 계산해서 적용해야 됨 (시간남으면..)

  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useAttendanceSummaryQuery();

  const {
    data: historyData = [],
    isLoading: historyLoading,
    isError: historyError,
  } = useAttendanceHistoryQuery();

  // 페이지 훅 호출
  const {
    currentPage,
    totalPages,
    pageNumbers,
    startItemNumber,
    endItemNumber,
    goToPage,
    goToPrevPage,
    goToNextPage,
  } = usePagination(historyData, 5, 3);

  if (summaryLoading || historyLoading) {
    return <div>로딩 중...</div>;
  }
  if (summaryError || historyError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <div className="page-header">
          <div className="page-title">
            <nav className="breadcrumbs">
              <span>운영 포털</span>
              <span style={{ color: "var(--outline-variant)" }}>/</span>
              <span className="active-crumb">근태 관리</span>
            </nav>
            <h1>근태 관리</h1>
            <p>직원들의 근태 관리 메뉴입니다.</p>
          </div>
        </div>
        <div className="content-canvas">
          <AttendanceSummaryCards summary={summaryData || {}} />
          <AttendanceHistoryTable
            history={historyData}
            totalCount={historyData.length}
            startItemNumber={startItemNumber}
            endItemNumber={endItemNumber}
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            goToPage={goToPage}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            onExcelExport={() => console.log("엑셀 내보내기")}
          />
        </div>
      </main>
    </>
  );
}

export default withPageStyle(AttendanceManagement, "dashboard.css", pageCss);
