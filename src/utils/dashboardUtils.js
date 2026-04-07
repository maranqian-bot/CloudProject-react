export const DEFAULT_TARGET_WORK_DAYS = 22;
export const DASHBOARD_ITEMS_PER_PAGE = 5;
export const DASHBOARD_SEGMENT_COUNT = 4;

export const formatWorkMinutesToHourMinute = (minutes) => {
    const safeMinutes = Number(minutes ?? 0);

    if (!safeMinutes || safeMinutes <= 0) {
        return "0시간 0분";
    }

    const hours = Math.floor(safeMinutes / 60);
    const remainMinutes = safeMinutes % 60;

    return `${hours}시간 ${remainMinutes}분`;
};

export const formatTime = (dateTime) => {
    if (!dateTime) return "-";

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) return "-";

    const hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const meridiem = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${meridiem} ${displayHour}:${minute}`;
};

export const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};

export const formatVacationDays = (days) => {
    const safeDays = Number(days ?? 0);
    if (safeDays <= 0) return "0일";
    return `${Number.isInteger(safeDays) ? safeDays : safeDays.toFixed(1)}일`;
};

export const getAttendanceStatusLabel = (status) => {
    const statusMap = {
        NORMAL: "정상",
        LATE: "지각",
        EARLY_LEAVE: "조퇴",
        OVERTIME: "연장 근무",
        ABSENT: "결근",
        VACATION: "휴가",
    };

    return statusMap[status] ?? status ?? "-";
};

export const getAttendanceStatusClass = (status) => {
    const statusClassMap = {
        NORMAL: "badge badge-approved",
        LATE: "badge badge-rejected",
        EARLY_LEAVE: "badge badge-pending",
        OVERTIME: "badge badge-approved",
        ABSENT: "badge badge-rejected",
        VACATION: "badge",
    };

    return statusClassMap[status] ?? "badge";
};

export const getAttendanceActionState = (attendanceInfo) => {
    const hasCheckIn = Boolean(attendanceInfo?.checkInTime);
    const hasCheckOut = Boolean(attendanceInfo?.checkOutTime);

    if (!hasCheckIn && !hasCheckOut) {
        return {
            canCheckIn: true,
            canCheckOut: false,
        };
    }

    if (hasCheckIn && !hasCheckOut) {
        return {
            canCheckIn: false,
            canCheckOut: true,
        };
    }

    return {
        canCheckIn: false,
        canCheckOut: false,
    };
};

export const buildDashboardSegments = ({
    remainingWorkDays,
    targetDays = DEFAULT_TARGET_WORK_DAYS,
}) => {
    const safeTargetDays = Number(targetDays ?? DEFAULT_TARGET_WORK_DAYS);
    const safeRemainingWorkDays = Math.max(
        0,
        Number(remainingWorkDays ?? safeTargetDays)
    );
    const completedDays = Math.max(safeTargetDays - safeRemainingWorkDays, 0);
    const segmentSize = Math.ceil(safeTargetDays / DASHBOARD_SEGMENT_COUNT);

    return Array.from({ length: DASHBOARD_SEGMENT_COUNT }, (_, index) => {
        const start = index * segmentSize;
        const end = Math.min(start + segmentSize, safeTargetDays);
        const filled = completedDays >= end;

        return {
            index,
            filled,
        };
    });
};