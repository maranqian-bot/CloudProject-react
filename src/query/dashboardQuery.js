import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    checkIn,
    checkOut,
    getDashboardSummary,
    getRecentActivities,
    getTodayAttendance,
} from "../api/dashboardApi";

export const DASHBOARD_QUERY_KEYS = {
    DASHBOARD_SUMMARY: ["dashboardSummary"],
    TODAY_ATTENDANCE: ["todayAttendance"],
    RECENT_ACTIVITIES_BASE: ["dashboardRecentActivities"],
    RECENT_ACTIVITIES: ({ page, limit }) => [
        ...DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES_BASE,
        page,
        limit,
    ],
};

export const useDashboardSummaryQuery = () => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD_SUMMARY,
        queryFn: getDashboardSummary,
    });
};

export const useTodayAttendanceQuery = () => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.TODAY_ATTENDANCE,
        queryFn: getTodayAttendance,
    });
};

export const useRecentActivitiesQuery = ({ page, limit }) => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES({ page, limit }),
        queryFn: () => getRecentActivities({ page, limit }),
    });
};

const useDashboardMutation = (mutationFn) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD_SUMMARY,
            });

            queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.TODAY_ATTENDANCE,
            });

            queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES_BASE,
            });
        },
    });
};

export const useCheckInMutation = () => {
    return useDashboardMutation(checkIn);
};

export const useCheckOutMutation = () => {
    return useDashboardMutation(checkOut);
};