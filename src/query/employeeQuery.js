import { useState, useMemo } from "react";
import { useQuery, keepPreviousData, useMutation, useQueryClient} from "@tanstack/react-query";
import { getEmployeesApi } from "../api/employeesApi";

    const employeeQuery = (departmentId = null) => {

    // 페이지 상태 선언부
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const pagesPerGroup = 3;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["employee", departmentId, page],

        queryFn: () => {
            // 서버로 보낼 파라미터 객체 만들기
            const params = {
                page,
                size: itemsPerPage
            };

            // 부서 ID가 있을 때만 파라미터에 추가 (전체 목록 페이지 배려)
            if (departmentId) {
                params.departmentId = departmentId;
            }

            console.log("호출 시도 - 파라미터:", params);
            return getEmployeesApi(params);  // 수정한 params를 전달!
        },
        placeholderData: keepPreviousData,
        // 부서ID가 없어도(전체 조회) 실행되도록 조건 제거 혹은 수정 (방어로직)
        enabled: true
    });

    // 직원수정 기능 (기존값 바뀔 때마다 갱신)
    const mutation = useMutation({
        // 아이디의 객체 바뀌면 -> 값 갱신해주는 메서드 호출 : putEmployeesApi
        mutationFn : ({id , reqDto}) => {putEmployeesApi(id, reqDto)}, 
        onSuccess : () => {     //  기존 내용물 버리고 새로 채우기
            queryClient.invalidateQueries({queryKey : ["employee"]});
            alert("수정되었습니다!");
        },   
        onError : (error) => {  //  실행 안됐을 떄의 에러
            console.log(error, "수정중 에러가 발생했습니다.");
            alert("에러발생!");
        }       
    });

    // 페이징 처리
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

        // 2. 직원수정 기능 내보내기
        updateEmployee : mutation.mutate,       // 수정실행 버튼.
        updatePending : mutation.isPending,     // 내용 업데이트 중일 떄 추가 동작 막는용도

        // 3. 페이징 관련 정보 (팀원 형식에 맞춤)
        currentPage: currentPageUI,      // 현재 페이지 (1부터)
        totalPages,          // 전체 페이지 수
        pageNumbers,        // [1, 2, 3] 형태의 배열
        totalCount,          // 전체 인원수
        startItemNumber, // 시작 번호
        endItemNumber,     // 끝 번호

        // 4. 이동 함수들
        changePage: changePage,         // 페이지 이동 (클릭)
        goToPrevPage: goToPrevPage,     // 이전페이지 이동
        goToNextPage: goToNextPage      // 다음페이지 이동

    };
};

export default employeeQuery;