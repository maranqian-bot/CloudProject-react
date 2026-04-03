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

    const handleSubmit = async (departmentId, data, isEditMode) => {

            if (isEditMode) {
                // 수정 시에는 어떤 부서(ID)를 고칠지, 데이터는 객체로 묶어서 전달!
                await updateMutation.mutateAsync({ departmentId, data });
            } else {
                // 등록 시에는 데이터만 전달!
                await createMutation.mutateAsync(data);
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