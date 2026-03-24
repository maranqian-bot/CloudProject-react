import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getVacationRequestList,
    approveVacationRequest,
    rejectVacationRequest,
} from "../api/vacationApi";

export const useVacationRequestListQuery = () => {
    return useQuery({
        queryKey: ["vacationRequestList"],
        queryFn: getVacationRequestList,
    });
};

export const useApproveVacationRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveVacationRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vacationRequestList"] });
        },
    });
};

export const useRejectVacationRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectVacationRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vacationRequestList"] });
        },
    });
};