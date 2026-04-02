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

    const handleSubmit = async (departmentId, formData, isEditMode) => {

            if (isEditMode) {
                await updateMutation.mutateAsync({ departmentId, data: formData });
            } else {
                await createMutation.mutateAsync(formData);
            }
            return true;
        };

    // 삭제 핸들러
    const handleDelete = async (departmentId) => {

                await deleteMutation.mutateAsync(departmentId);
                return true;
            };

    return {
        handleSubmit,
        handleDelete,
        // 현재 저장 중인지 상태 확인 (버튼 비활성화용)
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};