import axiosInstance from "./axiosInstance";

export const getVacationRequestList = async ({ page, limit, type }) => {
    try {
        const params = {
            _page: page,
            _limit: limit,
        };

        if (type && type !== "ALL") {
            params.vacationType = type;
        }

        const response = await axiosInstance.get("/vacationRequests", {
            params,
        });

        return {
            items: response.data,
            totalCount: Number(response.headers["x-total-count"] ?? 0),
        };
    } catch (error) {
        console.error("휴가 신청 목록 조회 실패:", error);
        throw error;
    }
};

export const getVacationRequestSummary = async () => {
    try {
        const response = await axiosInstance.get("/vacationRequests");
        const list = response.data;

        let pendingCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;

        const employeeSet = new Set();

        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}`;

        for (const item of list) {
            if (item.status === "PENDING") pendingCount++;
            if (item.status === "APPROVED") approvedCount++;
            if (item.status === "REJECTED") rejectedCount++;

            if (item.startDate?.startsWith(currentMonth)) {
                employeeSet.add(item.employeeId);
            }
        }

        return {
            pendingCount,
            approvedCount,
            rejectedCount,
            monthlyVacationCount: employeeSet.size,
        };
    } catch (error) {
        console.error("휴가 신청 요약 정보 조회 실패:", error);
        throw error;
    }
};

export const approveVacationRequest = async ({ requestId }) => {
    try {
        const response = await axiosInstance.patch(
            `/vacationRequests/${requestId}`,
            {
                status: "APPROVED",
                approvedAt: new Date().toISOString(),
                rejectReason: null,
                approverId: 9001,
                approverName: "김관리",
            }
        );

        return response.data;
    } catch (error) {
        console.error("휴가 신청 승인 실패:", error);
        throw error;
    }
};

export const rejectVacationRequest = async ({ requestId, rejectReason }) => {
    try {
        const response = await axiosInstance.patch(
            `/vacationRequests/${requestId}`,
            {
                status: "REJECTED",
                rejectReason: rejectReason || "반려 처리",
                approvedAt: null,
                approverId: 9001,
                approverName: "김관리",
            }
        );

        return response.data;
    } catch (error) {
        console.error("휴가 신청 반려 실패:", error);
        throw error;
    }
};