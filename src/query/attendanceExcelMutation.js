import { useMutation } from "@tanstack/react-query"
import { downloadAttendanceExcelApi } from "../api/attendanceApi"


export const useAttendanceExcelDownloadMutation = () => {
    return useMutation({
        mutationFn: async (employeeId) => {
            // 백엔드한테 요청해야 됨
            const blob = await downloadAttendanceExcelApi(employeeId);

            // 파일을 브라우저 안에서 "임시 주소로 바꿔줌"
            const url = window.URL.createObjectURL(blob);
            
            // <a> </a>
            const link = document.createElement("a");

            // <a> 주소 </a>
            link.href = url;
            link.download = `근태이력_${employeeId}.xlsx`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            // 메모리 정리
            window.URL.revokeObjectURL(url);
        }
    });
};