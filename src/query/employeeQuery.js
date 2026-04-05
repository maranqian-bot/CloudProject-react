import { useState } from "react";
import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployeesApi, getEmployeeDetail, putEmployeesApi } from "../api/employeesApi";
import { useNavigate } from "react-router-dom";

const employeeQuery = (id = null) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. 상태 선언
    const [page, setPage] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState(""); // 이름/사번 검색어
    const [selectedDeptName, setSelectedDeptName] = useState(""); // 👈 부서명 검색 조건 추가
    const itemsPerPage = 5;
    const pagesPerGroup = 3;

    // 2. 목록 조회 (검색어, 페이지, 부서명을 모두 queryKey에 포함)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["employee", "list", page, searchKeyword, selectedDeptName], // 👈 selectedDeptName 추가
        queryFn: () => {
            console.log(`목록 호출: 페이지 ${page}, 검색어 "${searchKeyword}", 부서 "${selectedDeptName}"`);
            return getEmployeesApi({ 
                page, 
                size: itemsPerPage, 
                keyword: searchKeyword,
                department: selectedDeptName // 👈 STS4 DTO의 필드명 'department'와 일치시킴
            });
        },
        placeholderData: keepPreviousData,
    });

    // 3. 상세 정보 조회
    const detailQuery = useQuery({
        queryKey: ["employee", "detail", id],
        queryFn: () => getEmployeeDetail(id),
        enabled: !!id
    });

    // 4. 직원 수정 기능
    const mutation = useMutation({
        mutationFn: ({ id, departmentId, reqDto }) => putEmployeesApi(id, departmentId, reqDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] });
            alert("수정되었습니다!");
            navigate("/employee-management");
        },
        onError: (error) => {
            console.error(error);
            alert("에러발생!");
        }
    });

    // 5. 페이징 계산 로직
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

    return {
        // 데이터 및 상태
        employees: data?.content || [],
        employee: detailQuery.data || null,
        loading: isLoading || detailQuery.isLoading,
        isError: isError || detailQuery.isError,
        searchKeyword,
        selectedDeptName, // 👈 현재 선택된 부서명

        // 페이징 정보
        currentPage: currentPageUI,
        totalPages,
        pageNumbers,
        totalCount,
        startPage,
        endPage,
        startItemNumber: totalCount === 0 ? 0 : page * itemsPerPage + 1,
        endItemNumber: Math.min((page + 1) * itemsPerPage, totalCount),
        currentGroup,

        // 수정 기능
        updateEmployee: mutation.mutate,
        updatePending: mutation.isPending,

        // 조작 함수들
        changePage: (pageNum) => setPage(pageNum - 1),
        goToPrevPage: () => setPage((prev) => Math.max(prev - 1, 0)),
        goToNextPage: () => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev)),
        
        // 검색 함수 수정 (이름과 부서명을 동시에 받음)
        handleSearch: (keyword, deptName) => {
            setSearchKeyword(keyword);
            setSelectedDeptName(deptName); // 👈 부서명 업데이트
            setPage(0); // 검색 시 첫 페이지로 리셋
        }
    };
};

export default employeeQuery;