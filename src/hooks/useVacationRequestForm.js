import { useState } from "react";

const INITIAL_FORM_DATA = {
    proxyEmployeeNumber: "",
    vacationType: "",
    reasonDetail: "",
    startDate: "",
    days: 1,
};

const parseNumberValue = (value) => {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const useVacationRequestForm = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const nextValue = name === "days" ? parseNumberValue(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: nextValue,
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
            reasonDetail: value === "ETC" ? prev.reasonDetail : "",
        }));

        setErrors((prev) => ({
            ...prev,
            vacationType: "",
            reasonDetail: "",
        }));
    };

    const validateForm = ({ selectedDays, availableVacationDays }) => {
        const nextErrors = {};

        if (!formData.startDate) {
            nextErrors.startDate = "연차 사용일을 선택해 주세요.";
        }

        if (!formData.vacationType) {
            nextErrors.vacationType = "사유를 선택해 주세요.";
        }

        if (formData.days <= 0) {
            nextErrors.days = "사용 일수는 0보다 커야 합니다.";
        }

        if (selectedDays > availableVacationDays) {
            nextErrors.days = "잔여 연차를 초과하여 신청할 수 없습니다.";
        }

        if (formData.vacationType === "ETC" && !formData.reasonDetail.trim()) {
            nextErrors.reasonDetail = "기타 사유를 입력해 주세요.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    return {
        formData,
        errors,
        handleInputChange,
        handleVacationTypeChange,
        validateForm,
    };
};