import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";
import AttendanceSummaryCards from "../components/attendance/AttendanceSummaryCards";
import { useAttendanceHistoryQuery, useAttendanceSummaryQuery } from "../query/attendanceQuery";
import AttendanceHistoryTable from "../components/attendance/AttendanceHistoryTable";

function AttendanceManagement() {
    const { data: summaryData, isLoading: summaryLoading, isError: summaryError, } = useAttendanceSummaryQuery();
    const { data: historyData, isLoading: historyLoading, isError: historyError, } = useAttendanceHistoryQuery();
    
    if (summaryLoading || historyLoading) {
        return <div>로딩 중...</div>;
    }

    if (summaryError || historyError) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
    }

    return(
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
                <AttendanceSummaryCards summary={summaryData} />
                <AttendanceHistoryTable history={historyData} />
            </div>    
        </main>
        </>
    )
}

export default AttendanceManagement;