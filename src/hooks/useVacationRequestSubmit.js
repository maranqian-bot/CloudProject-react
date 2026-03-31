export const useVacationRequestSubmit = ({
    currentEmployee,
    formData,
    validateForm,
    createVacationRequestMutation,
    navigate,
}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        // 신청자 정보 로딩 전 제출 방지
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
        handleSubmit,
        handleCancel,
    };
};