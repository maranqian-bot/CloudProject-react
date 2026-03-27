import { useDepartmentDetailQuery } from "../query/departmentQuery";
import { useDepartmentForm } from "./useDepartmentForm";
import { useDepartmentSubmit } from "./useDepartmentSubmit";

// Query, Form, Submit 통합(관리)훅
export const useDepartmentDetail = (deptid) => {
  // 상세 정보 조회
  const { data: detail, isLoading, isError } = useDepartmentDetailQuery(deptid);

  // 입력값 관리 (검증 로직 포함)
  const { formData, errors, handleInputChange, validateForm } = useDepartmentForm(detail);

  // 서버 전송 로직(수정/ 삭제)
  const { handleSubmit, handleDelete, isSubmitting } = useDepartmentSubmit();

  // 수정 버튼 클릭시 실행할 함수 종류
  const onUpdate = async() => {
    if (validateForm()) {
      await handleSubmit(deptid, formData, true);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isError,
    isSubmitting,
    isDeleting,
    handleInputChange,
    onUpdate,
    onDelete: () => handleDelete(deptid)
  };
};