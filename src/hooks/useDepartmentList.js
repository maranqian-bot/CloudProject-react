import { useState } from "react";
import { useDepartmentQuery } from "../query/departmentQuery";
import { useDepartmentDerivedState } from "./useDepartmentDerivedState";

export const useDepartmentList = (itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 서버 데이터 가져오기
  const { data, isLoading, isError, refetch } = useDepartmentQuery(
    currentPage - 1, itemsPerPage
  );

  // 계산 로직 (여기서 totalCount, startItemNumber 계산함)
  const derivedState = useDepartmentDerivedState(data, currentPage, itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= derivedState.totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    ...derivedState, // 숫자 데이터들이 들어있음
    currentPage,
    isLoading,
    isError,
    refetch,
    goToPage,
    goToPrevPage: () => goToPage(currentPage - 1),
    goToNextPage: () => goToPage(currentPage + 1),
  };
};