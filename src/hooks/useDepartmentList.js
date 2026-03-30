import { useState } from "react";
import { useDepartmentQuery } from "../query/departmentQuery";
import { useDepartmentDerivedState } from "./useDepartmentDerivedState";

// 부서 관리 통합 훅 (부서 목록)
export const useDepartmentList = (itemsPerPage = 5) => {
  // 현재 페이지 상태 (초기값 1)
  const [currentPage, setCurrentPage] = useState(1);

  //서버 데이터 가져오기 (Spring 0부터 시작하므로 -1)
  const { data, isLoading, isError, refetch } = useDepartmentQuery(
    currentPage - 1, itemsPerPage
  );

  // 복잡한 계산 로직
  const derivedState = useDepartmentDerivedState(data, currentPage, itemsPerPage);

  // 페이지 이동 핸들러
  const goToPage = (page) => {
    if (page >= 1 && page <= derivedState.totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    ...derivedState,
    currentPage,
    isLoading,
    isError,
    refetch,  // 새로고침 (선택)
    goToPage,
    goToPrevPage: () => goToPage(currentPage - 1),
    goToNextPage: () => goToPage(currentPage + 1),
  };
};
