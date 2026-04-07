import axiosInstance from "./axiosInstance";

export const getDashboardData = async () => {
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

export const getTodayHistory = async ({ workDate }) => {
    const response = await axiosInstance.get("/history", {
        params: {
            workDate,
        },
    });

    return response.data?.[0] ?? null;
};

export const getTodayAttendance = async ({ workDate }) => {
    const todayHistory = await getTodayHistory({ workDate });

    return {
        workDate,
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

export const checkInAttendance = async ({
    historyId,
    workDate,
    checkInTime,
    attendanceStatus,
}) => {
    if (historyId) {
        const response = await axiosInstance.patch(`/history/${historyId}`, {
            // 출근 시간 반영
            checkInTime,
            attendanceStatus,
        });

        return response.data;
    }

    const response = await axiosInstance.post("/history", {
        workDate,
        checkInTime,
        checkOutTime: null,
        workMinutes: null,
        attendanceStatus,
    });

    return response.data;
};

export const checkOutAttendance = async ({
    historyId,
    checkOutTime,
    workMinutes,
    attendanceStatus,
}) => {
    const response = await axiosInstance.patch(`/history/${historyId}`, {
        // 퇴근 처리 데이터 반영
        checkOutTime,
        workMinutes,
        attendanceStatus,
    });

    return response.data;
};