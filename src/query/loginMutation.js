import { useMutation } from "@tanstack/react-query"
import { loginApi } from "../api/authApi";


export const useLoginMutation = () => {
    return useMutation({
        mutationFn: loginApi,
    });
};