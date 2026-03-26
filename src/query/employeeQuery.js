import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getEmployeesApi } from "../api/employeesApi";

// useQuery로 관리할거 : 직원목록, 에러, 로딩
// 내가 만들거 : 페이지만.
// 페이지 변할 떄 데이터를 조회해 와야함 (getEmployeesApi) 
// useEffect 대신하는거 : keepPreviousData

const employeeQuery = () => {
    const [page, setPage] = useState(0); //  페이지만 직접 관리
    const { data, isLoading, isError, error } = useQuery({    // 나머지는 useQuery에 맡김
        queryKey: ["employee", page],  // employee쪽에서 받은거 page변경 잇으면 함수 실행
        queryFn: () => getEmployeesApi({ page, size: 5 }), // 페이지 변경점 받는곳
        placeholderData: keepPreviousData,  // 변경중에 이전값 띄우는 역할
    })

    // 여기서부터는 queryFn() 동작하고 잇는거니깐 페이지 변경 함수 만들어주기
    // 외부에서 호출하게된다.
    const changePage = (pageNum) => {      // PageNum로 받은 값으로, 페이지 변경.
        setPage(pageNum)
    }

    return {
        employee: data?.content || [],  // 직원 목록 내보내거나, 빈배열 반환
        loading: isLoading,    // 로딩스위치
        isError: isError, // 에러 true || false
        error: isError ? "에러발생!!" : null,
        pageInfo : data, // 전체 데이터(객체)
        changePage, // 페이지 변경함수
        currentPage: page // 현재 페이지
    };
};

export default employeeQuery;