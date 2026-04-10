import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    checkIn,
    checkOut,
    getDashboardSummary,
    getTodayAttendance,
    getRecentActivities,
} from "../api/dashboardApi";

export const DASHBOARD_QUERY_KEYS = {
    DASHBOARD_BASE: ["dashboard"],
    DASHBOARD: ["dashboard", "summary"],
    TODAY_ATTENDANCE: ["dashboard", "today-attendance"],
    RECENT_ACTIVITIES: ["dashboard", "recent-activities"],
};

export const useDashboardQuery = ({ enabled = true }) => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD,
        queryFn: getDashboardSummary,
        enabled,
    });
};

export const useTodayAttendanceQuery = ({ workDate } = {}) => {
    return useQuery({
        queryKey: [...DASHBOARD_QUERY_KEYS.TODAY_ATTENDANCE, workDate],
        queryFn: getTodayAttendance,
        enabled: true,
    });
};

export const useRecentActivitiesQuery = ({ page, limit, enabled = true }) => {
    return useQuery({
        queryKey: [...DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES, page, limit],
        queryFn: () => getRecentActivities({ page, limit }),
        enabled,
    });
};

const useDashboardMutation = (mutationFn) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD,
            });

            await queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.TODAY_ATTENDANCE,
            });

            await queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES,
            });

            await queryClient.refetchQueries({
                queryKey: DASHBOARD_QUERY_KEYS.TODAY_ATTENDANCE,
            });

            await queryClient.refetchQueries({
                queryKey: DASHBOARD_QUERY_KEYS.RECENT_ACTIVITIES,
            });
        },
    });
};

export const useCheckInAttendanceMutation = () => {
    return useDashboardMutation(checkIn);
};

export const useCheckOutAttendanceMutation = () => {
    return useDashboardMutation(checkOut);
};