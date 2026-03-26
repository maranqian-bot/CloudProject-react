import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getVacationRequestList,
    getVacationRequestSummary,
    approveVacationRequest,
    rejectVacationRequest,
} from "../api/vacationApi";

export const QUERY_KEYS = {
    VACATION_REQUEST_LIST_BASE: ["vacationRequestList"],
    VACATION_REQUEST_LIST: ({ page, type }) => [
        ...QUERY_KEYS.VACATION_REQUEST_LIST_BASE,
        page,
        type,
    ],
    VACATION_REQUEST_SUMMARY: ["vacationRequestSummary"],
};

export const useVacationRequestListQuery = ({ page, limit, type }) => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_REQUEST_LIST({ page, type }),
        queryFn: () => getVacationRequestList({ page, limit, type }),
    });
};

export const useVacationRequestSummaryQuery = () => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_REQUEST_SUMMARY,
        queryFn: getVacationRequestSummary,
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
                queryKey: QUERY_KEYS.VACATION_REQUEST_SUMMARY,
            });
        },
    });
};

export const useApproveVacationRequestMutation = () => {
    return useVacationMutation(approveVacationRequest);
};

export const useRejectVacationRequestMutation = () => {
    return useVacationMutation(rejectVacationRequest);
};