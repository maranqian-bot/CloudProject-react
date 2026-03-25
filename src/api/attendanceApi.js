import axiosInstance from "./axiosInstance"

// 여기에서는 서버 통신만 하는 게 좋음 ui로직 xxxx

// 근태 요약 조회용 api



// JSON
// {
//     "workDays": 22,
//     "lateCount": 3,
//     "absentCount": 1,
//     "attendanceScore": 94.8
// }
export const getAttendanceSummaryApi = async () => {
    try { // ${employeeId} 수정 예정
        const response = await axiosInstance.get(`/api/employees/1/attendance/summary`);
        return response.data;
    } catch(e) {
        console.error(e);
        return null;
    }
};

// 근태 이력 조회용 api(더미)
// JSON
// {
//     "attendanceId": 1,
//     "workDate": "2023-10-24",
//     "checkInTime": "09:00",
//     "chekcOutTime": "18:30",
//     "workMinutes": 570,
//     "attendanceStatus": "NORMAL"
// }
export const getAttendanceHistoryApi = async () => {
    try {
        const response = await axiosInstance.get(`/api/employees/1/attendance/history`);
        return response.data;
    } catch(e) {
        console.error(e);
        return null;
    }
}

// 근태 엑셀 다운로드 api
export const downloadAttendanceExcelApi = async () => {
    try {
        const response = await axiosInstance.get("/attendance/export", {
            responseType: "blob", // 파일 형태로 받음
        });
        return response.data;
    } catch(e) {
        console.error(e);
        return null;
    }
}