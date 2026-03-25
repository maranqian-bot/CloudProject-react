import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getVacationRequestList,
    approveVacationRequest,
    rejectVacationRequest,
} from "../api/vacationApi";

export const QUERY_KEYS = {
    VACATION_REQUEST_LIST: (page) => ["vacationRequestList", page],
};

export const useVacationRequestListQuery = (page) => {
    return useQuery({
        queryKey: QUERY_KEYS.VACATION_REQUEST_LIST(page),
        queryFn: () => getVacationRequestList(page),
    });
};

const useVacationMutation = (mutationFn) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.VACATION_REQUEST_LIST(variables.page),
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