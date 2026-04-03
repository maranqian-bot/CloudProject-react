import axiosInstance from "./axiosInstance";

const toSafeNumber = (value) => {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const getVacationManagementPage = async ({
    employeeNumber,
    approverEmployeeNumber,
    year,
}) => {
    const response = await axiosInstance.get("/api/vacation-management", {
        params: {
            employeeNumber,
            approverEmployeeNumber,
            year,
        },
    });

    return response.data.data;
};

export const getVacationRequestList = async ({ page, limit, type }) => {
    const response = await axiosInstance.get("/api/vacation-request-list", {
        params: {
            page,
            size: limit,
            type,
        },
    });

    const responseData = response.data.data;

    return {
        items: responseData.list ?? [],
        totalCount: Number(responseData.totalElements ?? 0),
        totalPages: Number(responseData.totalPages ?? 1),
        currentPage: Number(responseData.currentPage ?? 1),
        pageSize: Number(responseData.pageSize ?? limit ?? 5),
    };
};

export const getVacationRequestSummary = async () => {
    const response = await axiosInstance.get("/api/vacation-request-list/summary");
    return (
        response.data.data ?? {
            pendingCount: 0,
            approvedCount: 0,
            rejectedCount: 0,
            monthlyVacationCount: 0,
        }
    );
};

export const approveVacationRequest = async ({ requestId }) => {
    const response = await axiosInstance.patch(
        `/api/vacation-request-list/${requestId}/approve`
    );

    return response.data.data;
};

export const rejectVacationRequest = async ({ requestId, rejectReason }) => {
    const response = await axiosInstance.patch(
        `/api/vacation-request-list/${requestId}/reject`,
        {
            rejectReason: rejectReason || "반려 처리",
        }
    );

    return response.data.data;
};

export const getCurrentEmployee = async ({ employeeNumber, year }) => {
    const response = await axiosInstance.get(
        `/api/vacation-request/employees/${employeeNumber}`,
        {
            params: { year },
        }
    );

    return response.data.data;
};

export const createVacationRequest = async ({ currentEmployee, formData }) => {
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
    const proxyEmployeeNumber = formData.proxyEmployeeNumber?.trim() ?? "";

    if (!startDate) {
        throw new Error("formData.startDate is required");
    }

    if (!vacationType) {
        throw new Error("formData.vacationType is required");
    }

    if (selectedDays <= 0) {
        throw new Error("formData.days must be greater than 0");
    }

    if (vacationType === "ETC" && !reasonDetail.trim()) {
        throw new Error("formData.reasonDetail is required");
    }

    const payload = {
        employeeNumber: currentEmployee.employeeNumber,
        proxyEmployeeNumber: proxyEmployeeNumber || null,
        vacationType,
        reasonDetail: vacationType === "ETC" ? reasonDetail.trim() : "",
        startDate,
        days: selectedDays,
    };

    const response = await axiosInstance.post("/api/vacation-request", payload);

    return response.data.data;
};