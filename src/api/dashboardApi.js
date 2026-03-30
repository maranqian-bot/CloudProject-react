import axiosInstance from "./axiosInstance";
import {
    ATTENDANCE_STATUS,
    canCheckIn,
    canCheckOut,
    getAttendanceStatusByWorkMinutes,
    getCurrentTimeString,
    getMinutesFromTime,
    getTodayDateString,
    hasCheckedOut,
} from "../utils/dashboardUtils";

const fetchTodayHistory = async (workDate) => {
    const response = await axiosInstance.get("/history", {
        params: {
            workDate,
        },
    });

    return response.data?.[0] ?? null;
};

export const getDashboardSummary = async () => {
    const [summaryResponse, currentEmployeeResponse, vacationRequestsResponse] =
        await Promise.all([
            axiosInstance.get("/summary"),
            axiosInstance.get("/currentEmployee"),
            axiosInstance.get("/vacationRequests"),
        ]);

    return {
        summary: summaryResponse.data?.[0] ?? {},
        currentEmployee: currentEmployeeResponse.data ?? {},
        vacationRequests: vacationRequestsResponse.data ?? [],
    };
};

export const getTodayAttendance = async () => {
    const today = getTodayDateString();
    const todayHistory = await fetchTodayHistory(today);

    return {
        workDate: today,
        isCheckedIn: Boolean(todayHistory?.checkInTime),
        isCheckedOut: Boolean(todayHistory?.checkOutTime),
        checkInTime: todayHistory?.checkInTime ?? null,
        checkOutTime: todayHistory?.checkOutTime ?? null,
        historyId: todayHistory?.id ?? null,
    };
};

export const getRecentActivities = async ({ page, limit }) => {
    const response = await axiosInstance.get("/history", {
        params: {
            _sort: "workDate",
            _order: "desc",
            _page: page,
            _limit: limit,
        },
    });

    return {
        items: response.data ?? [],
        totalCount: Number(response.headers["x-total-count"] ?? 0),
    };
};

export const checkIn = async () => {
    const today = getTodayDateString();
    const currentTime = getCurrentTimeString();
    const todayHistory = await fetchTodayHistory(today);

    if (!canCheckIn(todayHistory)) {
        return todayHistory;
    }

    if (todayHistory?.id) {
        const patchResponse = await axiosInstance.patch(
            `/history/${todayHistory.id}`,
            {
                // 출근 시간 반영
                checkInTime: currentTime,
                attendanceStatus: ATTENDANCE_STATUS.NORMAL,
            }
        );

        return patchResponse.data;
    }

    const createResponse = await axiosInstance.post("/history", {
        workDate: today,
        checkInTime: currentTime,
        checkOutTime: null,
        workMinutes: null,
        attendanceStatus: ATTENDANCE_STATUS.NORMAL,
    });

    return createResponse.data;
};

export const checkOut = async () => {
    const today = getTodayDateString();
    const currentTime = getCurrentTimeString();
    const todayHistory = await fetchTodayHistory(today);

    if (!canCheckOut(todayHistory)) {
        throw new Error("checkIn record is required before checkOut");
    }

    if (hasCheckedOut(todayHistory)) {
        return todayHistory;
    }

    const workMinutes = Math.max(
        0,
        getMinutesFromTime(currentTime) -
            getMinutesFromTime(todayHistory.checkInTime)
    );

    const attendanceStatus = getAttendanceStatusByWorkMinutes(workMinutes);

    const patchResponse = await axiosInstance.patch(
        `/history/${todayHistory.id}`,
        {
            // 퇴근 처리 데이터 반영
            checkOutTime: currentTime,
            workMinutes,
            attendanceStatus,
        }
    );

    return patchResponse.data;
};