import { 
    useCreateDepartmentMutation, 
    useUpdateDepartmentMutation, 
    useDeleteDepartmentMutation 
} from "../query/departmentQuery";

// 서버 전송 훅
export const useDepartmentSubmit = () => {
    // React Query의 Mutation 기능들 가져오기
    const createMutation = useCreateDepartmentMutation();
    const updateMutation = useUpdateDepartmentMutation();
    const deleteMutation = useDeleteDepartmentMutation();

    // 추가/수정 핸들러
    const handleSubmit = async (departmentId, formData, isEditMode) => {
        try {
            if (isEditMode) {
                // 수정 모드
                await updateMutation.mutateAsync({ departmentId, data: formData });
                alert("부서 정보가 성공적으로 수정되었습니다!");
            } else {
                // 추가 모드
                await createMutation.mutateAsync(formData);
                alert("새로운 부서가 등록되었습니다!");
            }
            return true;
        } catch (error) {
            console.error("전송 실패:", error);
            alert("저장 중 오류가 발생했습니다.");
            return false;
        }
    };

    // 삭제 핸들러
    const handleDelete = async (departmentId) => {
        if (window.confirm("정말로 이 부서를 삭제하시겠습니까?")) {
            try {
                await deleteMutation.mutateAsync(departmentId);
                alert("부서가 삭제되었습니다.");
                return true;
            } catch (error) {
                alert("삭제 중 오류가 발생했습니다.");
                return false;
            }
        }
        return false;
    };

    return {
        handleSubmit,
        handleDelete,
        // 현재 저장 중인지 상태 확인 (버튼 비활성화용)
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};