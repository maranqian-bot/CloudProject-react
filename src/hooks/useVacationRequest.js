import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateVacationRequestMutation,
    useCurrentEmployeeQuery,
} from "../query/vacationQuery";

const INITIAL_FORM_DATA = {
    proxyEmployeeNumber: "",
    vacationType: "기타",
    reasonDetail: "",
    startDate: "",
    days: "1",
};

const formatVacationDays = (days) => {
    if (Number.isInteger(days)) {
        return `${days}`;
    }

    return `${days}`.replace(/\.0$/, "");
};

export const useVacationRequest = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const {
        data: currentEmployee = null,
        isLoading: isCurrentEmployeeLoading,
        isError: isCurrentEmployeeError,
        error: currentEmployeeError,
    } = useCurrentEmployeeQuery();

    const createVacationRequestMutation = useCreateVacationRequestMutation();

    const selectedDays = useMemo(() => {
        return Number(formData.days || 0);
    }, [formData.days]);

    // mock 데이터와 이후 실제 응답 필드명이 아직 완전히 통일되지 않아 임시로 두 필드명을 모두 대응
    const availableVacationDays = Number(
        currentEmployee?.remainingVacationDays ??
            currentEmployee?.availableVacationDays ??
            0
    );

    const remainingVacationDays = useMemo(() => {
        const remaining = availableVacationDays - selectedDays;
        return Math.max(remaining, 0);
    }, [availableVacationDays, selectedDays]);

    const availableVacationText = useMemo(() => {
        return `${formatVacationDays(availableVacationDays)}일`;
    }, [availableVacationDays]);

    const requestAfterApprovalText = useMemo(() => {
        return `* 이번 신청 승인 시 ${formatVacationDays(remainingVacationDays)}일이 남게 됩니다.`;
    }, [remainingVacationDays]);

    const showOtherReason = formData.vacationType === "기타";

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleVacationTypeChange = (event) => {
        const { value } = event.target;

        setFormData((prev) => ({
            ...prev,
            vacationType: value,
            reasonDetail: value === "기타" ? prev.reasonDetail : "",
        }));

        setErrors((prev) => ({
            ...prev,
            vacationType: "",
            reasonDetail: "",
        }));
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!formData.startDate) {
            nextErrors.startDate = "연차 사용일을 선택해 주세요.";
        }

        if (!formData.vacationType) {
            nextErrors.vacationType = "사유를 선택해 주세요.";
        }

        if (!formData.days) {
            nextErrors.days = "사용 일수를 선택해 주세요.";
        }

        if (selectedDays <= 0) {
            nextErrors.days = "사용 일수는 0보다 커야 합니다.";
        }

        if (selectedDays > availableVacationDays) {
            nextErrors.days = "잔여 연차를 초과하여 신청할 수 없습니다.";
        }

        if (formData.vacationType === "기타" && !formData.reasonDetail.trim()) {
            nextErrors.reasonDetail = "기타 사유를 입력해 주세요.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 신청자 정보가 아직 없으면 제출을 막고 안내
        if (!currentEmployee) {
            alert("신청자 정보를 불러온 뒤 다시 시도해 주세요.");
            return;
        }

        if (!validateForm()) {
            return;
        }

        createVacationRequestMutation.mutate(
            {
                currentEmployee,
                formData,
            },
            {
                onSuccess: () => {
                    alert("휴가 신청이 완료되었습니다.");
                    navigate("/vacation-management");
                },
            }
        );
    };

    const handleCancel = () => {
        navigate("/vacation-management");
    };

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