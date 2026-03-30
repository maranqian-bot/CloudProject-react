import axiosInstance from "./axiosInstance";
import {
    ATTENDANCE_STATUS,
    getAttendanceStatusByWorkMinutes,
} from "../utils/dashboardUtils";

const getTodayDateString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getCurrentTimeString = () => {
    const now = new Date();

    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
};

const getMinutesFromTime = (timeText) => {
    if (!timeText) return 0;

    const [hourText = "0", minuteText = "0"] = String(timeText).split(":");
    const hour = Number(hourText);
    const minute = Number(minuteText);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return 0;
    }

    return hour * 60 + minute;
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

    const response = await axiosInstance.get("/history", {
        params: {
            workDate: today,
        },
    });

    const todayHistory = response.data?.[0] ?? null;

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

    const response = await axiosInstance.get("/history", {
        params: {
            workDate: today,
        },
    });

    const todayHistory = response.data?.[0] ?? null;

    if (todayHistory?.checkInTime) {
        return todayHistory;
    }

    if (todayHistory?.id) {
        const patchResponse = await axiosInstance.patch(
            `/history/${todayHistory.id}`,
            {
                // 출근 시간만 반영
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

    const response = await axiosInstance.get("/history", {
        params: {
            workDate: today,
        },
    });

    const todayHistory = response.data?.[0] ?? null;

    if (!todayHistory?.id || !todayHistory?.checkInTime) {
        throw new Error("checkIn record is required before checkOut");
    }

    if (todayHistory.checkOutTime) {
        return todayHistory;
    }

    const workMinutes = Math.max(
        0,
        getMinutesFromTime(currentTime) -
            getMinutesFromTime(todayHistory.checkInTime)
    );

    // 근무 시간 기준 상태 계산은 utils 로 분리
    const attendanceStatus = getAttendanceStatusByWorkMinutes(workMinutes);

    const patchResponse = await axiosInstance.patch(
        `/history/${todayHistory.id}`,
        {
            checkOutTime: currentTime,
            workMinutes,
            attendanceStatus,
        }
    );

    return patchResponse.data;
};