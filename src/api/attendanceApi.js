import axiosInstance from "./axiosInstance"

const getEmployeeId = () => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
        throw new Error("employeeId가 없습니다. 다시 로그인해주세요.");
    }

    return employeeId;
};

export const getAttendanceSummaryApi = async () => {
    try { 
        const employeeId = getEmployeeId();
        const response = await axiosInstance.get(`/api/employees/${employeeId}/attendance/summary`);
        return response.data;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

export const getAttendanceHistoryApi = async (page = 0, size = 5) => {
    try {
        const employeeId = getEmployeeId();
        const response = await axiosInstance.get(`/api/employees/${employeeId}/attendance/history`, 
            {
                params: {
                    page,
                    size,
                },
            }
        );
        return response.data;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const downloadAttendanceExcelApi = async () => {
    try {
        const employeeId = getEmployeeId();
        const response = await axiosInstance.get("/api/employees/{employeeId}/attendance/excel", 
        {
            responseType: "blob", // 파일 형태로 받음  
        });
        return response.data;
    } catch(e) {
        console.error("근태 엑셀 다운로드 실패:", e);
        throw e;
    }
}