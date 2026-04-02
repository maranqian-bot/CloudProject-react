import { useState } from "react";
import { useDepartmentQuery } from "../query/departmentQuery";

export const useDepartmentList = (itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 서버 데이터 모두 가져오기 (list + stats)
  const {
    list,
    stats,
    totalCount,
    totalPages,
    startItemNumber,
    endItemNumber,
    isEmpty,
    isLoading,
    isStatsLoading,
    isError,
    refetch
  } = useDepartmentQuery(
    currentPage - 1, itemsPerPage
  );

  // 페이지 이동 로직 (derivedState 대신 totalPages 직접 사용)
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    list,
    stats,
    totalCount,
    totalPages,
    startItemNumber,
    endItemNumber,
    isEmpty,
    currentPage,
    isLoading,
    isStatsLoading,
    isError,
    refetch,
    goToPage,
    goToPrevPage: () => goToPage(currentPage - 1),
    goToNextPage: () => goToPage(currentPage + 1),
  };
};