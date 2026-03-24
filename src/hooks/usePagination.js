import { useState, useMemo } from "react";

export const usePagination = (data = [], itemsPerPage = 5, pagesPerGroup = 3) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 현재 페이지에 보여줄 데이터
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // 현재 페이지가 속한 페이지 그룹
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  // 현재 그룹의 시작/끝 페이지 번호
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 화면에 보여줄 페이지 번호 배열
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }

  // 현재 화면에서 보여주는 데이터 번호 범위
  const startItemNumber = data.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItemNumber = Math.min(currentPage * itemsPerPage, data.length);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    totalPages,
    currentData,
    pageNumbers,
    startItemNumber,
    endItemNumber,
    goToPage,
    goToPrevPage,
    goToNextPage,
  };
};