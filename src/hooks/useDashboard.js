import { useEffect, useMemo, useState } from "react";
import {
    useCheckInAttendanceMutation,
    useCheckOutAttendanceMutation,
    useDashboardQuery,
} from "../query/dashboardQuery";
import {
    DEFAULT_TARGET_WORK_DAYS,
    formatDate,
    formatTime,
    formatWorkMinutesToHourMinute,
    getAttendanceActionState,
    getAttendanceStatusLabel,
} from "../utils/dashboardUtils";
import { getLoginUser } from "../utils/authStorage";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const ITEMS_PER_PAGE = 5;

const getTodayLabel = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = WEEKDAY_LABELS[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
};

const getClockViewModel = (date) => {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const meridiem = hours < 12 ? "AM" : "PM";
    const displayHour = String(hours % 12 === 0 ? 12 : hours % 12).padStart(
        2,
        "0"
    );

    return {
        currentTime: `${displayHour}:${minutes}`,
        meridiem,
        currentDateLabel: formatDate(date),
        todayLabel: getTodayLabel(date),
    };
};

const getFilledSegmentCount = (remainingWorkDays, targetWorkDays) => {
    const safeTarget = Number(targetWorkDays ?? DEFAULT_TARGET_WORK_DAYS);
    const safeRemaining = Math.max(0, Number(remainingWorkDays ?? safeTarget));
    const completedDays = Math.max(safeTarget - safeRemaining, 0);
    const segmentSize = Math.ceil(safeTarget / 4);

    return Math.min(4, Math.floor(completedDays / segmentSize));
};

export const useDashboard = () => {
    const [now, setNow] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const loginUser = getLoginUser();
    const employeeNumber = loginUser?.employeeNumber ?? null;

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const {
        data: dashboardData = null,
        isLoading,
        isError,
        error,
    } = useDashboardQuery({
        employeeNumber,
        year: currentYear,
        month: currentMonth,
        enabled: Boolean(employeeNumber),
    });

    const checkInMutation = useCheckInAttendanceMutation();
    const checkOutMutation = useCheckOutAttendanceMutation();

    const viewModel = useMemo(() => {
        const summaryDto = dashboardData?.summary ?? {};
        const todayAttendanceDto = dashboardData?.todayAttendance ?? {};
        const historyDto = dashboardData?.attendanceHistories ?? [];

        const clock = getClockViewModel(now);
        const actionState = getAttendanceActionState(todayAttendanceDto);

        const totalCount = historyDto.length;
        const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
        const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

        const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        const pagedActivities = historyDto.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        return {
            employeeName: loginUser?.name ?? "-",
            todayLabel: clock.todayLabel,
            currentTime: clock.currentTime,
            meridiem: clock.meridiem,
            currentDateLabel: clock.currentDateLabel,

            pendingApprovalCount: Number(summaryDto.pendingApprovalCount ?? 0),
            absentTeamMemberCount: Number(
                summaryDto.absentTeamMemberCount ?? 0
            ),

            remainingVacationDays: Number(
                summaryDto.remainingVacationDays ?? 0
            ),
            vacationProgressPercent: Number(
                summaryDto.vacationProgressPercent ?? 0
            ),

            workedDays: Number(summaryDto.monthlyWorkDays ?? 0),
            targetWorkDays: DEFAULT_TARGET_WORK_DAYS,
            filledSegmentCount: getFilledSegmentCount(
                summaryDto.remainingWorkDays,
                DEFAULT_TARGET_WORK_DAYS
            ),

            attendanceStatusLabel: getAttendanceStatusLabel(
                todayAttendanceDto.attendanceStatus
            ),
            isCheckInDisabled: !actionState.canCheckIn,
            isCheckOutDisabled: !actionState.canCheckOut,

            activities: pagedActivities.map((item) => ({
                id: item.attendanceId,
                workDateText: formatDate(item.workDate),
                checkInTimeText: formatTime(item.checkInTime),
                checkOutTimeText: formatTime(item.checkOutTime),
                workMinutesText: formatWorkMinutesToHourMinute(item.workMinutes),
                statusLabel: getAttendanceStatusLabel(item.attendanceStatus),
                statusClass:
                    item.attendanceStatus === "OVERTIME"
                        ? "tag tag-extra"
                        : "tag tag-normal",
            })),

            totalCount,
            currentPage: safeCurrentPage,
            totalPages,
            startItemNumber:
                totalCount === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1,
            endItemNumber:
                totalCount === 0
                    ? 0
                    : Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalCount),
        };
    }, [dashboardData, now, currentPage, loginUser]);

    useEffect(() => {
        if (currentPage !== viewModel.currentPage) {
            setCurrentPage(viewModel.currentPage);
        }
    }, [currentPage, viewModel.currentPage]);

    const handleCheckIn = () => {
        if (checkInMutation.isPending) return;
        if (viewModel.isCheckInDisabled) return;
        checkInMutation.mutate();
    };

    const handleCheckOut = () => {
        if (checkOutMutation.isPending) return;
        if (viewModel.isCheckOutDisabled) return;
        checkOutMutation.mutate();
    };

    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(page, 1), viewModel.totalPages);
        setCurrentPage(nextPage);
    };

    const goToPrevPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    return {
        ...viewModel,
        handleCheckIn,
        handleCheckOut,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isRecentActivitiesLoading: isLoading,
        isRecentActivitiesError: !employeeNumber || isError,
        isCheckingIn: checkInMutation.isPending,
        isCheckingOut: checkOutMutation.isPending,
        error: !employeeNumber ? new Error("로그인 사용자 정보가 없습니다.") : error,
    };
};