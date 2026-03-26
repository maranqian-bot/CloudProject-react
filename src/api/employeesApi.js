import axiosInstance from "./axiosInstance";

export const getEmployeesApi = async(param) => {
    // 데이터 오면 바로 반환
    const response = await axiosInstance.get("/api/employee");
    return response.data; // data -> content 안쪽의 내용... 스프링에서 보낸 page객체가 들어감
}