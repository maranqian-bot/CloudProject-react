import { useNavigate } from "react-router-dom";
import {
    useCreateVacationRequestMutation,
    useCurrentEmployeeQuery,
} from "../query/vacationQuery";
import { useVacationRequestDerivedState } from "./useVacationRequestDerivedState";
import { useVacationRequestForm } from "./useVacationRequestForm";
import { useVacationRequestSubmit } from "./useVacationRequestSubmit";

export const useVacationRequest = () => {
    const navigate = useNavigate();

    const {
        data: currentEmployee = null,
        isLoading: isCurrentEmployeeLoading,
        isError: isCurrentEmployeeError,
        error: currentEmployeeError,
    } = useCurrentEmployeeQuery();

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
        isCurrentEmployeeError,
        currentEmployeeError,
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