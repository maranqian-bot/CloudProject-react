export const TYPE_TABS = [
    { label: "전체 목록", value: "ALL" },
    { label: "교육", value: "교육" },
    { label: "병가", value: "병가" },
    { label: "경조사", value: "경조사" },
    { label: "기타", value: "기타" },
];

export const STATUS = {
    PENDING: {
        label: "대기",
        className: "badge badge-pending",
    },
    APPROVED: {
        label: "승인",
        className: "badge badge-approved",
    },
    REJECTED: {
        label: "반려",
        className: "badge badge-rejected",
    },
};

export const getStatusClass = (status) => {
    return STATUS[status]?.className ?? "badge";
};

export const getAvatarText = (employeeName) => {
    if (!employeeName) return "NA";
    return employeeName.slice(0, 2).toUpperCase();
};

const formatDate = (date) => {
    if (typeof date !== "string" || !date.trim()) return "-";
    return date.replaceAll("-", ".");
};

export const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "-";

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (!endDate || startDate === endDate) return formattedStartDate;
    return `${formattedStartDate} - ${formattedEndDate}`;
};

export const formatVacationDays = (days) => {
    if (days === null || days === undefined) return "-";
    return `${days}일`;
};

export const getVacationStatusLabel = (status, mode = "management") => {
    const labels = {
        management: {
            PENDING: "대기",
            APPROVED: "승인",
            REJECTED: "반려",
        },
        history: {
            PENDING: "요청됨",
            APPROVED: "승인됨",
            REJECTED: "반려됨",
        },
    };

    return labels[mode]?.[status] ?? status;
};

export const getStatusLabel = (status) => {
    return getVacationStatusLabel(status, "management");
};