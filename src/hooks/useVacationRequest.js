import { useNavigate } from "react-router-dom";
import {
    useCreateVacationRequestMutation,
    useCurrentEmployeeQuery,
} from "../query/vacationQuery";
import { useVacationRequestDerivedState } from "./useVacationRequestDerivedState";
import { useVacationRequestForm } from "./useVacationRequestForm";
import { useVacationRequestSubmit } from "./useVacationRequestSubmit";
import { getLoginUser } from "../utils/authStorage";

export const useVacationRequest = () => {
    const navigate = useNavigate();
    const loginUser = getLoginUser();
    const employeeNumber = loginUser?.employeeNumber ?? null;
    const currentYear = new Date().getFullYear();

    const {
        data: currentEmployee = null,
        isLoading: isCurrentEmployeeLoading,
        isError: isCurrentEmployeeError,
        error: currentEmployeeError,
    } = useCurrentEmployeeQuery({
        employeeNumber,
        year: currentYear,
    });

    const createVacationRequestMutation = useCreateVacationRequestMutation();

    const {
        formData,
        errors,
        handleInputChange,
        handleVacationTypeChange,
        validateForm,
    } = useVacationRequestForm();

    const {
        selectedDays,
        showOtherReason,
        availableVacationText,
        requestAfterApprovalText,
        availableVacationDays,
    } = useVacationRequestDerivedState({
        formData,
        currentEmployee,
    });

    const { handleSubmit, handleCancel } = useVacationRequestSubmit({
        currentEmployee,
        formData,
        validateForm: () =>
            validateForm({
                selectedDays,
                availableVacationDays,
            }),
        createVacationRequestMutation,
        navigate,
    });

    return {
        formData,
        errors,
        currentEmployee,
        isCurrentEmployeeLoading,
        isCurrentEmployeeError: !employeeNumber || isCurrentEmployeeError,
        currentEmployeeError: !employeeNumber
            ? new Error("로그인 사용자 정보가 없습니다.")
            : currentEmployeeError,
        showOtherReason,
        availableVacationText,
        requestAfterApprovalText,
        handleInputChange,
        handleVacationTypeChange,
        handleSubmit,
        handleCancel,
        isSubmitting: createVacationRequestMutation.isPending,
    };
};