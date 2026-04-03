import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    checkIn,
    checkOut,
    getDashboardSummary,
} from "../api/dashboardApi";

export const DASHBOARD_QUERY_KEYS = {
    DASHBOARD_BASE: ["dashboard"],
    DASHBOARD: ["dashboard", "summary"],
};

export const useDashboardQuery = ({ enabled = true }) => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD,
        queryFn: getDashboardSummary,
        enabled,
    });
};

const useDashboardMutation = (mutationFn) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD_BASE,
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