import axiosInstance from "./axiosInstance";

export const getVacationRequestList = async () => {
    const response = await axiosInstance.get("/vacationRequests");
    return response.data;
};

export const approveVacationRequest = async (requestId) => {
    const response = await axiosInstance.patch(`/vacationRequests/${requestId}`, {
        status: "APPROVED",
        approvedAt: new Date().toISOString(),
        rejectReason: null,
        approverId: 9001,
        approverName: "김관리",
    });

    return response.data;
};

export const rejectVacationRequest = async ({ requestId, rejectReason }) => {
    const response = await axiosInstance.patch(`/vacationRequests/${requestId}`, {
        status: "REJECTED",
        rejectReason: rejectReason || "반려 처리",
        approvedAt: null,
        approverId: 9001,
        approverName: "김관리",
    });

    return response.data;
};