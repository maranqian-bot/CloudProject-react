import { useEffect, useMemo, useState } from "react";
import {
    useCheckInMutation,
    useCheckOutMutation,
    useDashboardSummaryQuery,
    useRecentActivitiesQuery,
    useTodayAttendanceQuery,
} from "../query/dashboardQuery";
import {
    DASHBOARD_ITEMS_PER_PAGE,
    DEFAULT_TARGET_WORK_DAYS,
    getAttendanceStatusLabel,
    getCurrentDateLabel,
    getDisplayTime,
    getFilledSegmentCount,
    getKoreanTodayLabel,
    getPaginationState,
    getPendingApprovalCount,
    getRecentActivityItems,
    getUsedVacationDays,
    getVacationProgressPercent,
    toSafeNumber,
} from "../utils/dashboardUtils";

export const useDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [now, setNow] = useState(() => new Date());

    const {
        data: summaryQueryData = {
            summary: {},
            currentEmployee: {},
            vacationRequests: [],
        },
    } = useDashboardSummaryQuery();

    const {
        data: todayAttendanceData = {
            workDate: null,
            isCheckedIn: false,
            isCheckedOut: false,
            checkInTime: null,
            checkOutTime: null,
            historyId: null,
        },
    } = useTodayAttendanceQuery();

    const {
        data: recentActivitiesData = { items: [], totalCount: 0 },
        isLoading: isRecentActivitiesLoading,
        isError: isRecentActivitiesError,
    } = useRecentActivitiesQuery({
        page: currentPage,
        limit: DASHBOARD_ITEMS_PER_PAGE,
    });

    const checkInMutation = useCheckInMutation();
    const checkOutMutation = useCheckOutMutation();

    useEffect(() => {
        const timerId = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            window.clearInterval(timerId);
        };
    }, []);

    const { summary, currentEmployee, vacationRequests } = summaryQueryData;

    const employeeName = currentEmployee?.employeeName ?? "-";
    const todayLabel = getKoreanTodayLabel(now);
    const absentTeamMemberCount = toSafeNumber(summary?.absentCount);
    const remainingVacationDays = toSafeNumber(
        currentEmployee?.availableVacationDays
    );
    const workedDays = toSafeNumber(summary?.workDays);
    const targetWorkDays = DEFAULT_TARGET_WORK_DAYS;
    const currentYear = now.getFullYear();

    const pendingApprovalCount = useMemo(() => {
        return getPendingApprovalCount(vacationRequests);
    }, [vacationRequests]);

    const usedVacationDays = useMemo(() => {
        return getUsedVacationDays({
            vacationRequests,
            employeeId: currentEmployee?.employeeId,
            currentYear,
        });
    }, [vacationRequests, currentEmployee?.employeeId, currentYear]);

    const totalVacationDays = remainingVacationDays + usedVacationDays;

    const vacationProgressPercent = useMemo(() => {
        return getVacationProgressPercent({
            remainingVacationDays,
            usedVacationDays,
        });
    }, [remainingVacationDays, usedVacationDays]);

    const timeViewModel = useMemo(() => {
        const { currentTime, meridiem } = getDisplayTime(now);

        return {
            currentTime,
            meridiem,
            currentDateLabel: getCurrentDateLabel(now),
        };
    }, [now]);

    const attendanceViewModel = useMemo(() => {
        const isCheckedIn = Boolean(todayAttendanceData.isCheckedIn);
        const isCheckedOut = Boolean(todayAttendanceData.isCheckedOut);

        return {
            // 출퇴근 버튼 상태 파생
            attendanceStatusLabel: getAttendanceStatusLabel({
                isCheckedIn,
                isCheckedOut,
            }),
            isCheckInDisabled: isCheckedIn,
            isCheckOutDisabled: !isCheckedIn || isCheckedOut,
        };
    }, [todayAttendanceData]);

    const activityItems = useMemo(() => {
        return getRecentActivityItems(recentActivitiesData.items);
    }, [recentActivitiesData.items]);

    const paginationViewModel = useMemo(() => {
        const totalCount = toSafeNumber(recentActivitiesData.totalCount);

        return {
            totalCount,
            ...getPaginationState({
                currentPage,
                totalCount,
                itemsPerPage: DASHBOARD_ITEMS_PER_PAGE,
            }),
        };
    }, [recentActivitiesData.totalCount, currentPage]);

    useEffect(() => {
        if (currentPage !== paginationViewModel.safeCurrentPage) {
            setCurrentPage(paginationViewModel.safeCurrentPage);
        }
    }, [currentPage, paginationViewModel.safeCurrentPage]);

    const filledSegmentCount = useMemo(() => {
        return getFilledSegmentCount(workedDays, targetWorkDays);
    }, [workedDays, targetWorkDays]);

    const goToPage = (page) => {
        const totalPages = paginationViewModel.totalPages;
        const safePage = Math.min(Math.max(page, 1), totalPages);

        setCurrentPage(safePage);
    };

    const goToPrevPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    const handleCheckIn = () => {
        if (
            checkInMutation.isPending ||
            attendanceViewModel.isCheckInDisabled
        ) {
            return;
        }

        checkInMutation.mutate();
    };

    const handleCheckOut = () => {
        if (
            checkOutMutation.isPending ||
            attendanceViewModel.isCheckOutDisabled
        ) {
            return;
        }

        checkOutMutation.mutate();
    };

    return {
        employeeName,
        todayLabel,
        pendingApprovalCount,
        absentTeamMemberCount,
        remainingVacationDays,
        usedVacationDays,
        totalVacationDays,
        vacationProgressPercent,
        workedDays,
        targetWorkDays,

        currentTime: timeViewModel.currentTime,
        meridiem: timeViewModel.meridiem,
        currentDateLabel: timeViewModel.currentDateLabel,

        attendanceStatusLabel: attendanceViewModel.attendanceStatusLabel,
        isCheckInDisabled: attendanceViewModel.isCheckInDisabled,
        isCheckOutDisabled: attendanceViewModel.isCheckOutDisabled,

        activities: activityItems,
        totalCount: paginationViewModel.totalCount,
        currentPage: paginationViewModel.safeCurrentPage,
        totalPages: paginationViewModel.totalPages,
        startItemNumber: paginationViewModel.startItemNumber,
        endItemNumber: paginationViewModel.endItemNumber,
        filledSegmentCount,

        goToPage,
        goToPrevPage,
        goToNextPage,
        handleCheckIn,
        handleCheckOut,

        isRecentActivitiesLoading,
        isRecentActivitiesError,
        isCheckingIn: checkInMutation.isPending,
        isCheckingOut: checkOutMutation.isPending,
    };
};