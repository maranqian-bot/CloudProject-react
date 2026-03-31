import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getEmployeesApi } from "../api/employeesApi";

const employeeQuery = () => {
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const pagesPerGroup = 3;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["employee", page],

        queryFn: () => { 
            console.log("호출시도");
            return getEmployeesApi({ page, size: itemsPerPage })
    },
        placeholderData: keepPreviousData,
        
    });

    
    const totalCount = data?.totalElements || 0;    
    const totalPages = data?.totalPages || 0;
    const currentPageUI = page + 1;

    const currentGroup = Math.ceil(currentPageUI / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const startItemNumber = totalCount === 0 ? 0 : page * itemsPerPage + 1;
    const endItemNumber = Math.min((page + 1) * itemsPerPage, totalCount);

    // 이동 함수들
    const changePage = (pageNum) => setPage(pageNum - 1);
    const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 0));
    const goToNextPage = () => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));

    
    return {

        // 1. 데이터 및 기본 상태
        employee: data?.content || [],
        loading: isLoading,
        isError: isError,
        errorMessage: isError ? "데이터를 불러오는 중 에러가 발생했습니다." : null,
        pageInfo: data,

        // 2. 페이징 관련 정보 (팀원 형식에 맞춤)
        currentPage : currentPageUI ,      // 현재 페이지 (1부터)
        totalPages,          // 전체 페이지 수
        pageNumbers,        // [1, 2, 3] 형태의 배열
        totalCount,          // 전체 인원수
        startItemNumber, // 시작 번호
        endItemNumber,     // 끝 번호

        // 3. 이동 함수들
        changePage: changePage,         // 페이지 이동 (클릭)
        goToPrevPage: goToPrevPage,     // 이전페이지 이동
        goToNextPage: goToNextPage      // 다음페이지 이동
    };
};

export default employeeQuery;