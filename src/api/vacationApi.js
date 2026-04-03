import axiosInstance from "./axiosInstance";

const VACATION_REQUEST_STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
};

const toSafeNumber = (value) => {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

const getMockEndDate = ({ startDate, selectedDays }) => {
    const days = Number(selectedDays);

    // 숫자 변환 실패 또는 1일 이하일 경우 시작일 그대로 반환
    if (!startDate || Number.isNaN(days) || days <= 1) {
        return startDate;
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.ceil(days) - 1);

    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const day = String(endDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

/**
 * VacationManagement 페이지 전체 데이터 조회
 * backend:
 * GET /api/vacation-management
 * params:
 * - employeeNumber
 * - approverEmployeeNumber
 * - year
 */
export const getVacationManagementPage = async ({
    employeeNumber,
    approverEmployeeNumber,
    year,
}) => {
    try {
        const response = await axiosInstance.get("/api/vacation-management", {
            params: {
                employeeNumber,
                approverEmployeeNumber,
                year,
            },
        });

        // ApiResponseDTO.success(..., data) 구조 기준
        return response.data.data;
    } catch (error) {
        console.error("휴가 관리 페이지 조회 실패:", error);
        throw error;
    }
};

/**
 * 아래 함수들은 기존 다른 페이지에서 아직 사용할 수 있으므로 우선 유지
 * VacationManagement 페이지에서는 더 이상 사용하지 않음
 */
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
            if (item.status === VACATION_REQUEST_STATUS.PENDING) pendingCount += 1;
            if (item.status === VACATION_REQUEST_STATUS.APPROVED) approvedCount += 1;
            if (item.status === VACATION_REQUEST_STATUS.REJECTED) rejectedCount += 1;

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
                status: VACATION_REQUEST_STATUS.APPROVED,
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
                status: VACATION_REQUEST_STATUS.REJECTED,
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

        if (!formData) {
            throw new Error("formData is required");
        }

        const selectedDays = toSafeNumber(formData.days);
        const startDate = formData.startDate;
        const vacationType = formData.vacationType;
        const reasonDetail = formData.reasonDetail ?? "";

        // 최소 필수값 검증
        if (!startDate) {
            throw new Error("formData.startDate is required");
        }

        if (!vacationType) {
            throw new Error("formData.vacationType is required");
        }

        if (selectedDays <= 0) {
            throw new Error("formData.days must be greater than 0");
        }

        if (vacationType === "기타" && !reasonDetail.trim()) {
            throw new Error("formData.reasonDetail is required");
        }

        const reason =
            vacationType === "기타"
                ? reasonDetail.trim()
                : `${vacationType} 신청`;

        const payload = {
            employeeId: currentEmployee.employeeId,
            employeeName: currentEmployee.employeeName,
            position: currentEmployee.position,
            profileImage: currentEmployee.profileImage ?? null,
            deptId: currentEmployee.deptId,
            departmentName: currentEmployee.departmentName,
            vacationType,
            startDate,
            endDate: getMockEndDate({
                startDate,
                selectedDays,
            }),
            days: selectedDays,
            reason,
            status: VACATION_REQUEST_STATUS.PENDING,
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