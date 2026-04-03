// 직원 관리

import axiosInstance from "./axiosInstance";

// 조회하기
export const getEmployeesApi = async(params) => {
    // 데이터 오면 바로 반환
    const response = await axiosInstance.get("/api/employees",{params});
    return response.data; // data -> content 안쪽의 내용... 스프링에서 보낸 page객체가 들어감
}

// 게시하기     : axios.get() 매개변수로, 1.경로, 2.데이터객체를 보냄.
export const postEmployeesApi = async(employeeData) => {
    const response = await axiosInstane.post("/api/employee/post" , employeeData);
    return response.data;   // 게시 경로와, 데이터 객체 보내주기
}

// 수정하기     :   sts4 컨트롤러에 맞추어서/       매개변수 : 아이디랑, 요청객체 
export const putEmployeesApi = async(id, reqDto) => {
    const response = await axiosInstance.put(`/api/employee/edit/${id}`, reqDto);
    return response.data;
}