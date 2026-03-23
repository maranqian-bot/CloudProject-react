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
export const getAttendanceSummary = async () => {
    const response = await axiosInstance.get("/attendance/summary");

    return {
        workDays: 22,
        lateCount: 3,
        absentCount: 1,
        attendanceScore: 94.8,
    };
};

// 근태 이력 조회용 api(더미)
// JSON
// {
//     "attendanceId": 1,
//     "workDate": "2023-10-24",
//     "checkInTime": "THU",
//     "chekcOutTime": "08:54",
//     "workMinutes": "18:12",
//     "attendanceStatus": "NORMAL"
// }
export const getAttendancHistory = async () => {
    const response = await axiosInstance.get("/attendance/history");

    return [
    {
      attendanceId: 1,
      date: "2023-10-24",
      checkIn: "08:54",
      checkOut: "18:12",
      workMinutes: 558,
      status: "NORMAL",
    },
    {
      attendanceId: 2,
      date: "2023-10-23",
      checkIn: "09:42",
      checkOut: "18:05",
      workMinutes: 503,
      status: "LATE",
    },
    {
      attendanceId: 3,
      date: "2023-10-22",
      checkIn: "08:50",
      checkOut: "20:30",
      workMinutes: 700,
      status: "OVERTIME",
    },
  ];
}

// 근태 엑셀 다운로드 api
export const downloadAttendanceExcel = async () => {
    const response = await axiosInstance.get("/attendance/export", {
        responseType: "blob", // 파일 형태로 받음
    });

    return response.data;
}