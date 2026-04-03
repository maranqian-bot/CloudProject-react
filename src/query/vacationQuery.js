import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getVacationManagementPage,
    getVacationRequestList,
    getVacationRequestSummary,
    approveVacationRequest,
    rejectVacationRequest,
    getCurrentEmployee,
    createVacationRequest,
} from "../api/vacationApi";

export const QUERY_KEYS = {
    CURRENT_EMPLOYEE: ({ employeeNumber, year }) => [
        "currentEmployee",
        employeeNumber,
        year,
    ],

    VACATION_MANAGEMENT_BASE: ["vacationManagement"],
    VACATION_MANAGEMENT: ({
        employeeNumber,
        approverEmployeeNumber,
        year,
    }) => [
        ...QUERY_KEYS.VACATION_MANAGEMENT_BASE,
        employeeNumber,
        approverEmployeeNumber,
        year,
    ],

    VACATION_REQUEST_LIST_BASE: ["vacationRequestList"],
    VACATION_REQUEST_LIST: ({ page, type }) => [
        ...QUERY_KEYS.VACATION_REQUEST_LIST_BASE,
        page,
        type,
    ],

    VACATION_REQUEST_SUMMARY: ["vacationRequestSummary"],
};

export const useCurrentEmployeeQuery = ({ employeeNumber, year }) => {
    return useQuery({
        queryKey: QUERY_KEYS.CURRENT_EMPLOYEE({ employeeNumber, year }),
        queryFn: () => getCurrentEmployee({ employeeNumber, year }),
        enabled: Boolean(employeeNumber) && Boolean(year),
    });
};

export const useVacationManagementQuery = ({
    employeeNumber,
    approverEmployeeNumber,
    year,
}) => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_MANAGEMENT({
            employeeNumber,
            approverEmployeeNumber,
            year,
        }),
        queryFn: () =>
            getVacationManagementPage({
                employeeNumber,
                approverEmployeeNumber,
                year,
            }),
        enabled:
            Boolean(employeeNumber) &&
            Boolean(approverEmployeeNumber) &&
            Boolean(year),
    });
};

export const useVacationRequestListQuery = ({ page, limit, type, enabled = true }) => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_REQUEST_LIST({ page, type }),
        queryFn: () => getVacationRequestList({ page, limit, type }),
        enabled,
    });
};

export const useVacationRequestSummaryQuery = ({ enabled = true } = {}) => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_REQUEST_SUMMARY,
        queryFn: getVacationRequestSummary,
        enabled,
    });
};

const useVacationMutation = (mutationFn) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.VACATION_REQUEST_LIST_BASE,
            });

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.VACATION_MANAGEMENT_BASE,
            });

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.VACATION_REQUEST_SUMMARY,
            });

            queryClient.invalidateQueries({
                queryKey: ["currentEmployee"],
            });
        },
    });
};

export const useCreateVacationRequestMutation = () => {
    return useVacationMutation(createVacationRequest);
};

export const useApproveVacationRequestMutation = () => {
    return useVacationMutation(approveVacationRequest);
};

export const useRejectVacationRequestMutation = () => {
    return useVacationMutation(rejectVacationRequest);
};