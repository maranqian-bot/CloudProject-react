import axiosInstance from "./axiosInstance";

const getMockEndDate = ({ startDate, selectedDays }) => {
    // 임시 mock 규칙: 시작일 기준으로 단순 계산
    if (!startDate || selectedDays <= 1) {
        return startDate;
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.ceil(selectedDays) - 1);

    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const day = String(endDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

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

        list.forEach((item) => {
            if (item.status === "PENDING") pendingCount += 1;
            if (item.status === "APPROVED") approvedCount += 1;
            if (item.status === "REJECTED") rejectedCount += 1;

            if (item.startDate?.startsWith(currentMonth)) {
                employeeSet.add(item.employeeId);
            }
        });

        return {
            pendingCount,
            approvedCount,
            rejectedCount,
            monthlyVacationCount: employeeSet.size,
        };
    } catch (error) {
        console.error("휴가 신청 요약 조회 실패:", error);
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

export const getCurrentEmployee = async () => {
    try {
        // mock 단계에서도 실제 API 호출 형태를 유지
        const response = await axiosInstance.get("/currentEmployee");
        return response.data;
    } catch (error) {
        console.error("현재 신청자 정보 조회 실패:", error);
        throw error;
    }
};

export const createVacationRequest = async ({ currentEmployee, formData }) => {
    try {
        if (!currentEmployee) {
            throw new Error("currentEmployee is required");
        }

        const selectedDays = Number(formData.days);
        const startDate = formData.startDate;

        const reason =
            formData.vacationType === "기타"
                ? formData.reasonDetail.trim()
                : `${formData.vacationType} 신청`;

        const payload = {
            employeeId: currentEmployee.employeeId,
            employeeName: currentEmployee.employeeName,
            position: currentEmployee.position,
            profileImage: currentEmployee.profileImage ?? null,
            deptId: currentEmployee.deptId,
            departmentName: currentEmployee.departmentName,
            vacationType: formData.vacationType,
            startDate,
            endDate: getMockEndDate({
                startDate,
                selectedDays,
            }),
            days: selectedDays,
            reason,
            status: "PENDING",
            approvedAt: null,
            rejectReason: null,
            approverId: null,
            approverName: null,
        };

        const response = await axiosInstance.post("/vacationRequests", payload);

        return response.data;
    } catch (error) {
        console.error("휴가 신청 등록 실패:", error);
        throw error;
    }
};