// // 직원관리 (employee)
// import { useState , useEffect } from "react";      
// import { getEmployeesApi } from "../api/employeesApi"; // 직원관리 데이터 받아오는 임포트

// // 상태선언 안에 만들거 : 직원상태(목록) , 로딩상태, 에러상태, 페이지 상태(얘는 객체)
// // 맨처음에 띄울거 useEffect에서 만들고, 상태변경함수도 만들기 
// // 위의 모두를 useEmployee 으로 내보냄

// const useEmployee = () => {         // 직원관리 상태 선언

//     const [ employee, setEmployee ] = useState([]); // 직원상태
//     const [ loading, setLoading ] = useState(true); // 로딩상태   +true => 로딩중 의미함.
//     const [ error, setError ] = useState(null); // 에러상태
//     const [ pageInfo, setPageInfo ] = useState(null); // 페이지 상태

//     const fetchEmployee = async(params) => {   // 얘는 뭐더라... 직원관리쪽 데이터 들어오면 실행되는 함수
//         try {
//             // 로딩중이고, 에러 없을 때 , 들어온 값 상태 바꿔주기
//             setLoading(true);
//             setError(null);

//             const data = await getEmployeesApi(params); // 직원관리쪽에서 데이터 받아오면 계쏙 진행
//             setEmployee(data.content || []);  // 직원목록 변경주고,
//             setPageInfo(data)              // 전체응답도 변경하기.

//         } catch (error) {     // 에러 났을 떄
//             console.log("직원목록 로드중 에러 발생했습니다.", error)  // 개발자 도구에서 보이는거
//             setError("에러가 발생해습니다. 다시 시도해주세요")      // 사용자한테 보여줄 에러            

//         } finally {     // 마지막엔 무조건 로딩 종료
//             setLoading(false);
//         }
//     }
    
//     // 페이지 변경주기
//     const changePage = (pageNum) => {
//         fetchEmployee({ page : pageNum , size : 5 });
//     }

//     useEffect(() => {   // 맨처음에 띄워두는거
//         fetchEmployee({page : 0 , size : 5})
//     },[])           // 무한 리렌더링 방지
    
//     return {
//         employee : employee,    // 직원 목록
//         loading : loading ,     // 로딩상태
//         error  : error ,       // 에러
//         pageInfo : pageInfo,    // 페이지 객체    
//         changePage : changePage, // 페이지 변경함수
//         fetchEmployee : fetchEmployee      
//     }
// }

// export default useEmployee;

