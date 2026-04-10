import axiosInstance from "./axiosInstance";

export const getDashboardSummary = async () => {
    const response = await axiosInstance.get("/api/dashboard");

    const data = response.data?.data ?? {};

    return {
        summary: data.summary ?? {},
        currentEmployee: data.currentEmployee ?? {},
        vacationRequests: data.vacationRequests ?? [],
    };
};

export const getTodayAttendance = async () => {
    const response = await axiosInstance.get("/api/dashboard/attendance/today");

    return response.data?.data ?? {
        workDate: null,
        isCheckedIn: false,
        isCheckedOut: false,
        checkInTime: null,
        checkOutTime: null,
        historyId: null,
    };
};

export const getRecentActivities = async ({ page, limit }) => {
    const response = await axiosInstance.get("/api/dashboard/attendance/history", {
        params: {
            page,
            size: limit,
        },
    });

    const data = response.data?.data ?? {};

    return {
        items: data.items ?? [],
        totalCount: Number(data.totalCount ?? 0),
        currentPage: Number(data.currentPage ?? page ?? 1),
        totalPages: Number(data.totalPages ?? 0),
        pageSize: Number(data.pageSize ?? limit ?? 5),
    };
};

export const checkIn = async () => {
    const response = await axiosInstance.post("/api/dashboard/attendance/check-in");

    return response.data?.data ?? null;
};

export const checkOut = async ({ historyId }) => {
    if (!historyId) {
        throw new Error("historyId is required for checkOut");
    }

    const response = await axiosInstance.patch(
        `/api/dashboard/attendance/${historyId}/check-out`
    );

    return response.data?.data ?? null;
};