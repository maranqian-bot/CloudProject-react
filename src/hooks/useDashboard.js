import { useEffect, useMemo, useState } from "react";
import {
    useDashboardQuery,
    useRecentActivitiesQuery,
} from "../query/dashboardQuery";
import {
    DEFAULT_TARGET_WORK_DAYS,
    formatDate,
    formatTime,
    formatWorkMinutesToHourMinute,
    getAttendanceStatusLabel,
} from "../utils/dashboardUtils";
import { getLoginUser } from "../utils/authStorage";
import { useAttendance } from "./useAttendance";

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
        currentDateLabel: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
        todayLabel: getTodayLabel(date),
    };
};

const getProgressPercent = (value, total) => {
    const safeValue = Math.max(0, Number(value ?? 0));
    const safeTotal = Math.max(0, Number(total ?? 0));

    if (safeTotal <= 0) {
        return 0;
    }

    return Math.min(100, (safeValue / safeTotal) * 100);
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

    const {
        data: dashboardData = null,
        isLoading,
        isError,
        error,
    } = useDashboardQuery({
        enabled: Boolean(employeeNumber),
    });

    const {
        data: recentActivitiesData = {
            items: [],
            totalCount: 0,
            currentPage: 1,
            totalPages: 1,
            pageSize: ITEMS_PER_PAGE,
        },
    } = useRecentActivitiesQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        enabled: Boolean(employeeNumber),
    });

    const attendanceState = useAttendance({ currentDate: now });

    const viewModel = useMemo(() => {
        const summaryDto = dashboardData?.summary ?? {};
        const currentEmployeeDto = dashboardData?.currentEmployee ?? {};
        const historyDto = recentActivitiesData?.items ?? [];

        const clock = getClockViewModel(now);

        const totalCount = Number(recentActivitiesData?.totalCount ?? 0);
        const totalPages = Math.max(
            1,
            Number(recentActivitiesData?.totalPages ?? 1)
        );
        const safeCurrentPage = Number(
            recentActivitiesData?.currentPage ?? currentPage
        );

        const remainingVacationDays = Number(
            currentEmployeeDto.availableVacationDays ?? 0
        );

        const usedVacationDays = Number(summaryDto.usedVacationDays ?? 0);
        const totalVacationDays = remainingVacationDays + usedVacationDays;
        const usedVacationPercent = getProgressPercent(
            usedVacationDays,
            totalVacationDays
        );

        const workedDays = Number(summaryDto.workDays ?? 0);
        const workedDaysPercent = getProgressPercent(
            workedDays,
            DEFAULT_TARGET_WORK_DAYS
        );

        return {
            employeeName:
                currentEmployeeDto.employeeName ?? loginUser?.name ?? "-",
            todayLabel: clock.todayLabel,
            currentTime: clock.currentTime,
            meridiem: clock.meridiem,
            currentDateLabel: clock.currentDateLabel,

            pendingApprovalCount: Number(summaryDto.pendingApprovalCount ?? 0),
            absentTeamMemberCount: Number(summaryDto.absentCount ?? 0),

            remainingVacationDays,
            usedVacationDays,
            totalVacationDays,
            usedVacationPercent,

            workedDays,
            targetWorkDays: DEFAULT_TARGET_WORK_DAYS,
            workedDaysPercent,

            attendanceStatusLabel: attendanceState.attendanceStatusLabel,
            isCheckInDisabled: attendanceState.isCheckInDisabled,
            isCheckOutDisabled: attendanceState.isCheckOutDisabled,

            activities: historyDto.map((item, index) => ({
                id:
                    item.attendanceId ??
                    `${item.workDate ?? "unknown"}-${index}`,
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
                totalCount === 0
                    ? 0
                    : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1,
            endItemNumber:
                totalCount === 0
                    ? 0
                    : Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalCount),
        };
    }, [
        dashboardData,
        recentActivitiesData,
        now,
        currentPage,
        loginUser,
        attendanceState,
    ]);

    useEffect(() => {
        if (currentPage !== viewModel.currentPage) {
            setCurrentPage(viewModel.currentPage);
        }
    }, [currentPage, viewModel.currentPage]);

    const handleCheckIn = attendanceState.handleCheckIn;
    const handleCheckOut = attendanceState.handleCheckOut;

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
        isCheckingIn: attendanceState.isCheckingIn,
        isCheckingOut: attendanceState.isCheckingOut,
        error: !employeeNumber
            ? new Error("로그인 사용자 정보가 없습니다.")
            : error,
    };
};