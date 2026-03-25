import { useMutation } from "@tanstack/react-query"
import { downloadAttendanceExcelApi } from "../api/attendanceApi"


export const useAttendanceExcelDownloadMutation = () => {
    return useMutation({
        mutationFn: async (employeeId) => {
            const blob = await downloadAttendanceExcelApi(employeeId);

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `근태이력_${employeeId}.xlsx`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        }
    });
};