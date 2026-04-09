import {useCallback, useMemo, useState} from "react";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getEmployeeDetail, getEmployeesApi, putEmployeesApi} from "../api/employeesApi";
import {useNavigate} from "react-router-dom";

const employeeQuery = (id = null, departmentId = null) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedDeptName, setSelectedDeptName] = useState("");
    const itemsPerPage = 5;
    const pagesPerGroup = 3;

    // 1. 목록 조회 (id가 없을 때만 실행)  -> 부서Id 추가
    const listQuery = useQuery({
        queryKey: ["employee", "list", page, searchKeyword, selectedDeptName, departmentId],
        queryFn: () => getEmployeesApi({ page, size: itemsPerPage, keyword: searchKeyword, department: selectedDeptName, departmentId: departmentId }),
        placeholderData: keepPreviousData,
        enabled: !id
    });

    // 2. 상세 정보 조회 (id가 있을 때만 실행)
    const detailQuery = useQuery({
        queryKey: ["employee", "detail", id],
        queryFn: () => getEmployeeDetail(id),
        enabled: !!id,
        staleTime: 0
    });

    // 3. 수정 기능
    const mutation = useMutation({
        mutationFn: ({ id, departmentId, reqDto }) => putEmployeesApi(id, departmentId, reqDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] });
            alert("수정되었습니다!");
            navigate("/employee-management");
        },
        onError: (error) => { console.error(error); alert("에러 발생!"); }
    });

    // 4. [수정됨] 페이징 계산 로직 (목록/상세 대응)
    // 상세 페이지(id 존재)일 경우 상세 데이터 내 리스트 길이를 기준으로 계산
    const totalCount = id
        ? (detailQuery.data?.attendanceHistory?.length || 0)
        : (listQuery.data?.totalElements || 0);

    const totalPages = id
        ? Math.ceil(totalCount / itemsPerPage)
        : (listQuery.data?.totalPages || 0);

    const currentPageUI = page + 1;

    // 페이지 번호 그룹 계산
    const pageNumbers = useMemo(() => {
        const currentGroup = Math.ceil(currentPageUI / pagesPerGroup);
        const startPage = (currentGroup - 1) * pagesPerGroup + 1;
        const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

        const nums = [];
        for (let i = startPage; i <= endPage; i++) { nums.push(i); }
        return nums;
    }, [currentPageUI, totalPages]);

    // 5. [추가] 상세 페이지용 데이터 슬라이싱 (현재 페이지에 보여줄 5개만 추출)
    const attendanceHistory = useMemo(() => {
        const fullHistory = detailQuery.data?.attendanceHistory || [];
        if (!id) return []; // 목록 페이지에선 빈 배열
        const offset = page * itemsPerPage;
        return fullHistory.slice(offset, offset + itemsPerPage);
    }, [detailQuery.data, id, page]);

    // 6. 조작 함수 메모이제이션
    const changePage = useCallback((pageNum) => setPage(pageNum - 1), []);
    const goToPrevPage = useCallback(() => setPage((prev) => Math.max(prev - 1, 0)), []);
    const goToNextPage = useCallback(() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev)), [totalPages]);

    const handleSearch = useCallback((keyword, deptName) => {
        setSearchKeyword(keyword);
        setSelectedDeptName(deptName);
        setPage(0);
    }, []);

    return {
        // 데이터
        employees: listQuery.data?.content || [],
        employee: detailQuery.data || null,

        // 상세 데이터 내부 리스트 (페이징 적용된 결과물)
        attendanceHistory,
        pendingVacation: detailQuery.data?.pendingVacation || [],

        loading: listQuery.isLoading || detailQuery.isLoading,
        isError: listQuery.isError || detailQuery.isError,

        // 페이징/검색 상태
        currentPage: currentPageUI,
        totalPages,
        pageNumbers,
        totalCount,
        startItemNumber: totalCount === 0 ? 0 : page * itemsPerPage + 1,
        endItemNumber: Math.min((page + 1) * itemsPerPage, totalCount),
        handleSearch,
        changePage,
        goToPrevPage,
        goToNextPage,

        // 수정
        updateEmployee: mutation.mutate,
        updatePending: mutation.isPending
    };
};

export default employeeQuery;