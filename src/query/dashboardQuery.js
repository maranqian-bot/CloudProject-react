import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    checkInAttendance,
    checkOutAttendance,
    getDashboardData,
} from "../api/dashboardApi";

export const DASHBOARD_QUERY_KEYS = {
    DASHBOARD_BASE: ["dashboard"],
    DASHBOARD: ({ employeeNumber, year, month }) => [
        ...DASHBOARD_QUERY_KEYS.DASHBOARD_BASE,
        employeeNumber,
        year,
        month,
    ],
};

export const useDashboardQuery = ({ employeeNumber, year, month, enabled = true }) => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD({ employeeNumber, year, month }),
        queryFn: () => getDashboardData({ employeeNumber, year, month }),
        enabled: enabled && Boolean(employeeNumber) && Boolean(year) && Boolean(month),
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
    return useDashboardMutation(checkInAttendance);
};

export const useCheckOutAttendanceMutation = () => {
    return useDashboardMutation(checkOutAttendance);
};