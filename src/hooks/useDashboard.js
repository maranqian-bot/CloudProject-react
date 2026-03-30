import { useState } from "react";
import { DASHBOARD_ITEMS_PER_PAGE } from "../utils/dashboardUtils";
import { useAttendance } from "./useAttendance";
import { useClock } from "./useClock";
import { useDashboardData } from "./useDashboardData";
import { useDashboardPagination } from "./useDashboardPagination";

export const useDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const clock = useClock();

    const dashboardData = useDashboardData({
        currentPage,
        currentYear: clock.currentYear,
    });

    const pagination = useDashboardPagination({
        currentPage,
        setCurrentPage,
        totalCount: dashboardData.totalCount,
        itemsPerPage: DASHBOARD_ITEMS_PER_PAGE,
    });

    const attendance = useAttendance({
        currentDate: clock.now,
    });

    return {
        employeeName: dashboardData.employeeName,
        todayLabel: clock.todayLabel,
        pendingApprovalCount: dashboardData.pendingApprovalCount,
        absentTeamMemberCount: dashboardData.absentTeamMemberCount,
        remainingVacationDays: dashboardData.remainingVacationDays,
        usedVacationDays: dashboardData.usedVacationDays,
        totalVacationDays: dashboardData.totalVacationDays,
        vacationProgressPercent: dashboardData.vacationProgressPercent,
        workedDays: dashboardData.workedDays,
        targetWorkDays: dashboardData.targetWorkDays,

        currentTime: clock.currentTime,
        meridiem: clock.meridiem,
        currentDateLabel: clock.currentDateLabel,

        attendanceStatusLabel: attendance.attendanceStatusLabel,
        isCheckInDisabled: attendance.isCheckInDisabled,
        isCheckOutDisabled: attendance.isCheckOutDisabled,

        activities: dashboardData.activities,
        totalCount: pagination.totalCount,
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        startItemNumber: pagination.startItemNumber,
        endItemNumber: pagination.endItemNumber,
        filledSegmentCount: dashboardData.filledSegmentCount,

        goToPage: pagination.goToPage,
        goToPrevPage: pagination.goToPrevPage,
        goToNextPage: pagination.goToNextPage,
        handleCheckIn: attendance.handleCheckIn,
        handleCheckOut: attendance.handleCheckOut,

        isRecentActivitiesLoading: dashboardData.isRecentActivitiesLoading,
        isRecentActivitiesError: dashboardData.isRecentActivitiesError,
        isCheckingIn: attendance.isCheckingIn,
        isCheckingOut: attendance.isCheckingOut,
    };
};