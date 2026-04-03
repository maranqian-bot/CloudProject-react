import { useMemo } from "react";
import {
    useCheckInAttendanceMutation,
    useCheckOutAttendanceMutation,
    useDashboardQuery,
} from "../query/dashboardQuery";
import {
    buildDashboardSegments,
    DEFAULT_TARGET_WORK_DAYS,
    formatDate,
    formatTime,
    formatWorkMinutesToHourMinute,
    getAttendanceActionState,
    getAttendanceStatusClass,
    getAttendanceStatusLabel,
} from "../utils/dashboardUtils";
import { getLoginUser } from "../utils/authStorage";

export const useDashboard = () => {
    const loginUser = getLoginUser();
    const employeeNumber = loginUser?.employeeNumber ?? null;

    const now = new Date();
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
        const summaryDto = dashboardData?.summary ?? {
            monthlyWorkDays: 0,
            monthlyWorkMinutes: 0,
            averageWorkMinutes: 0,
            remainingWorkDays: DEFAULT_TARGET_WORK_DAYS,
        };

        const todayAttendanceDto = dashboardData?.todayAttendance ?? {
            workDate: null,
            checkInTime: null,
            checkOutTime: null,
            attendanceStatus: null,
            workMinutes: 0,
        };

        const attendanceActionState = getAttendanceActionState(todayAttendanceDto);

        const summary = {
            monthlyWorkDays: Number(summaryDto.monthlyWorkDays ?? 0),
            monthlyWorkMinutesText: formatWorkMinutesToHourMinute(
                summaryDto.monthlyWorkMinutes
            ),
            averageWorkMinutesText: formatWorkMinutesToHourMinute(
                summaryDto.averageWorkMinutes
            ),
            remainingWorkDays: Number(
                summaryDto.remainingWorkDays ?? DEFAULT_TARGET_WORK_DAYS
            ),
        };

        const attendanceInfo = {
            workDateText: formatDate(todayAttendanceDto.workDate),
            checkInTimeText: formatTime(todayAttendanceDto.checkInTime),
            checkOutTimeText: formatTime(todayAttendanceDto.checkOutTime),
            workMinutesText: formatWorkMinutesToHourMinute(
                todayAttendanceDto.workMinutes
            ),
            statusLabel: getAttendanceStatusLabel(
                todayAttendanceDto.attendanceStatus
            ),
            statusClass: getAttendanceStatusClass(
                todayAttendanceDto.attendanceStatus
            ),
            canCheckIn: attendanceActionState.canCheckIn,
            canCheckOut: attendanceActionState.canCheckOut,
        };

        const history = (dashboardData?.attendanceHistories ?? []).map((item) => ({
            id: item.attendanceId,
            workDateText: formatDate(item.workDate),
            checkInTimeText: formatTime(item.checkInTime),
            checkOutTimeText: formatTime(item.checkOutTime),
            workMinutesText: formatWorkMinutesToHourMinute(item.workMinutes),
            statusLabel: getAttendanceStatusLabel(item.attendanceStatus),
            statusClass: getAttendanceStatusClass(item.attendanceStatus),
        }));

        return {
            summary,
            attendanceInfo,
            history,
            progressSegments: buildDashboardSegments({
                remainingWorkDays: summary.remainingWorkDays,
                targetDays: DEFAULT_TARGET_WORK_DAYS,
            }),
        };
    }, [dashboardData]);

    const handleCheckIn = () => {
        if (checkInMutation.isPending) return;
        if (!viewModel.attendanceInfo.canCheckIn) return;
        checkInMutation.mutate();
    };

    const handleCheckOut = () => {
        if (checkOutMutation.isPending) return;
        if (!viewModel.attendanceInfo.canCheckOut) return;
        checkOutMutation.mutate();
    };

    return {
        loginUser,
        summary: viewModel.summary,
        attendanceInfo: viewModel.attendanceInfo,
        history: viewModel.history,
        progressSegments: viewModel.progressSegments,
        handleCheckIn,
        handleCheckOut,
        isCheckingIn: checkInMutation.isPending,
        isCheckingOut: checkOutMutation.isPending,
        isLoading,
        isError: !employeeNumber || isError,
        error: !employeeNumber ? new Error("로그인 사용자 정보가 없습니다.") : error,
    };
};