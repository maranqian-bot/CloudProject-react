import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

import { useDashboard } from "../hooks/useDashboard";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import DashboardAttendanceCard from "../components/dashboard/DashboardAttendanceCard.jsx";
import DashboardVacationCard from "../components/dashboard/DashboardVacationCard.jsx";
import DashboardMonthlyWorkCard from "../components/dashboard/DashboardMonthlyWorkCard.jsx";
import DashboardRecentActivitySection from "../components/dashboard/DashboardRecentActivitySection.jsx";

function Dashboard() {
    const dashboard = useDashboard();

    return (
        <>
            <Sidebar />
            <Header />

            <div className="main-dashboard">
                <div className="content-padding">
                    <DashboardHeader
                        employeeName={dashboard.employeeName}
                        todayLabel={dashboard.todayLabel}
                        pendingApprovalCount={dashboard.pendingApprovalCount}
                        absentTeamMemberCount={dashboard.absentTeamMemberCount}
                    />

                    <div className="dashboard-grid">
                        <DashboardAttendanceCard
                            currentTime={dashboard.currentTime}
                            meridiem={dashboard.meridiem}
                            currentDateLabel={dashboard.currentDateLabel}
                            attendanceStatusLabel={
                                dashboard.attendanceStatusLabel
                            }
                            isCheckInDisabled={dashboard.isCheckInDisabled}
                            isCheckOutDisabled={dashboard.isCheckOutDisabled}
                            onCheckIn={dashboard.handleCheckIn}
                            onCheckOut={dashboard.handleCheckOut}
                            isCheckingIn={dashboard.isCheckingIn}
                            isCheckingOut={dashboard.isCheckingOut}
                        />

                        <div className="stats-col">
                            <DashboardVacationCard
                                remainingVacationDays={
                                    dashboard.remainingVacationDays
                                }
                                progressPercent={
                                    dashboard.vacationProgressPercent
                                }
                            />

                            <DashboardMonthlyWorkCard
                                workedDays={dashboard.workedDays}
                                targetWorkDays={dashboard.targetWorkDays}
                                filledSegmentCount={
                                    dashboard.filledSegmentCount
                                }
                            />
                        </div>

                        <DashboardRecentActivitySection
                            activities={dashboard.activities}
                            totalCount={dashboard.totalCount}
                            startItemNumber={dashboard.startItemNumber}
                            endItemNumber={dashboard.endItemNumber}
                            currentPage={dashboard.currentPage}
                            totalPages={dashboard.totalPages}
                            onPageChange={dashboard.goToPage}
                            onPrevPage={dashboard.goToPrevPage}
                            onNextPage={dashboard.goToNextPage}
                            isLoading={dashboard.isRecentActivitiesLoading}
                            isError={dashboard.isRecentActivitiesError}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default withPageStyle(Dashboard, "dashboard.css", pageCss);