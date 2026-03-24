export const TYPE_TABS = [
    { label: "전체 목록", value: "ALL" },
    { label: "교육", value: "교육" },
    { label: "병가", value: "병가" },
    { label: "경조사", value: "경조사" },
    { label: "기타", value: "기타" },
];

export const STATUS_LABEL_MAP = {
    PENDING: "대기",
    APPROVED: "승인",
    REJECTED: "반려",
};

export const STATUS_CLASS_MAP = {
    PENDING: "badge badge-pending",
    APPROVED: "badge badge-approved",
    REJECTED: "badge badge-rejected",
};

export const getStatusLabel = (status) => {
    return STATUS_LABEL_MAP[status] ?? status;
};

export const getStatusClass = (status) => {
    return STATUS_CLASS_MAP[status] ?? "badge";
};

export const getAvatarText = (employeeName) => {
    if (!employeeName) return "NA";
    return employeeName.slice(0, 2).toUpperCase();
};

const formatDate = (date) => date?.replaceAll("-", ".");

export const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "-";
    if (!endDate || startDate === endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const formatDays = (days) => {
    if (days === null || days === undefined) return "-";
    return `${days}일`;
};