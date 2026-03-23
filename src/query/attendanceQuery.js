import { useQuery } from "@tanstack/react-query"
import { getAttendanceSummaryApi, getAttendancHistoryApi } from "../api/attendanceApi"


// 요약 조회 query
export const useAttendanceSummaryQuery = () => {
    return useQuery({
        queryKey: ["attendanceSummery"],
        queryFn: getAttendanceSummaryApi, 
    });
};

// 이력 조회 query
export const useAttendanceHistoryQuery = () => {
    return useQuery({
        queryKey: ["attendanceHistory"],
        queryFn: getAttendancHistoryApi,
    });
};