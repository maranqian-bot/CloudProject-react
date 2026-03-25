import axiosInstance from "./axiosInstance";

export const getVacationRequestList = async (page) => {
    try {
        const response = await axiosInstance.get("/vacationRequests", {
            params: {
                _page: page,
                _limit: 10,
            },
        });

        return response.data;
    } catch (error) {
        console.error("휴가 신청 목록 조회 실패:", error);
        throw error;
    }
};

export const approveVacationRequest = async ({ requestId }) => {
    try {
        const response = await axiosInstance.patch(`/vacationRequests/${requestId}`, {
            status: "APPROVED",
            approvedAt: new Date().toISOString(),
            rejectReason: null,
            approverId: 9001,
            approverName: "김관리",
        });

        return response.data;
    } catch (error) {
        console.error("휴가 신청 승인 실패:", error);
        throw error;
    }
};

export const rejectVacationRequest = async ({ requestId, rejectReason }) => {
    try {
        const response = await axiosInstance.patch(`/vacationRequests/${requestId}`, {
            status: "REJECTED",
            rejectReason: rejectReason || "반려 처리",
            approvedAt: null,
            approverId: 9001,
            approverName: "김관리",
        });

        return response.data;
    } catch (error) {
        console.error("휴가 신청 반려 실패:", error);
        throw error;
    }
};