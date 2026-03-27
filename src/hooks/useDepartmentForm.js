import { useState, useEffect } from "react";

// 초기 데이터 구조 (부서 관리용)
const INITIAL_DEPT_DATA = {
  deptCode: "",
  deptName: "",
  managerId: "",
  description: ""
};

// 부서 관리 폼 훅
export const useDepartmentForm = (initialData) => {
  const [formData, setFormData] = useState(INITIAL_DEPT_DATA);
  const [errors, setErrors] = useState({});

  // 서버에서 데이터가 오면 폼 채우기 (상세조회 시)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // 사용자가 입력할 때 실행
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력하는 순간 해당 필드의 에러 지우기.
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 저장 전 검사 (부서 관리용 유효성 검사)
  const validateForm = () => {
    const nextErrors = {};

    if (!formData.deptCode.trim()) {
      nextErrors.deptCode = "부서 코드는 필수입니다.";
    }
    if (!formData.deptName.trim()) {
      nextErrors.deptName = "부서 이름은 필수입니다.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0; // 에러가 없음 true
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
    setFormData
  };
};