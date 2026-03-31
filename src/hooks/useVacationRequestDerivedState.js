const formatVacationDays = (days) => {
    if (Number.isInteger(days)) {
        return `${days}`;
    }

    return `${days}`.replace(/\.0$/, "");
};

const toSafeNumber = (value) => {
    const parsedValue = Number(value);

    // 잘못된 숫자 값 방어 처리
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const useVacationRequestDerivedState = ({
    formData,
    currentEmployee,
}) => {
    const selectedDays = toSafeNumber(formData.days);
    const availableVacationDays = toSafeNumber(
        currentEmployee?.availableVacationDays
    );

    const expectedRemainingVacationDays = Math.max(
        availableVacationDays - selectedDays,
        0
    );

    const availableVacationText = `${formatVacationDays(
        availableVacationDays
    )}일`;

    const requestAfterApprovalText = `* 이번 신청 승인 시 ${formatVacationDays(
        expectedRemainingVacationDays
    )}일이 남게 됩니다.`;

    const showOtherReason = formData.vacationType === "기타";

    return {
        selectedDays,
        availableVacationDays,
        expectedRemainingVacationDays,
        availableVacationText,
        requestAfterApprovalText,
        showOtherReason,
    };
};