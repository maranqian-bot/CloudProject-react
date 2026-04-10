export const DEFAULT_TARGET_WORK_DAYS = 22;
export const DASHBOARD_ITEMS_PER_PAGE = 5;
export const DASHBOARD_SEGMENT_COUNT = 4;

export const ATTENDANCE_STATUS = {
    NORMAL: "NORMAL",
    LATE: "LATE",
    EARLY_LEAVE: "EARLY_LEAVE",
    OVER_TIME: "OVER_TIME",
    ABSENT: "ABSENT",
    VACATION: "VACATION",
};

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

    if (typeof dateTime === "string") {
        const timeOnlyMatch = dateTime.match(/^(\d{2}):(\d{2})(?::\d{2})?$/);

        if (timeOnlyMatch) {
            const hour = Number(timeOnlyMatch[1]);
            const minute = timeOnlyMatch[2];
            const meridiem = hour < 12 ? "오전" : "오후";
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;

            return `${meridiem} ${displayHour}:${minute}`;
        }
    }

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

export const getAttendanceStatusLabel = (status) => {
    const statusMap = {
        NORMAL: "정상",
        LATE: "지각",
        EARLY_LEAVE: "조퇴",
        OVER_TIME: "연장 근무",
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

export const formatVacationDays = (days) => {
    const safeDays = Number(days ?? 0);

    if (Number.isNaN(safeDays)) {
        return "0";
    }

    if (Number.isInteger(safeDays)) {
        return String(safeDays);
    }

    return safeDays.toFixed(1);
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

export const formatDateToKey = (dateValue) => {
    if (!dateValue) return null;

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const formatTimeToKey = (dateValue) => {
    if (!dateValue) return null;

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
};

export const getMinutesFromTime = (timeValue) => {
    if (!timeValue || typeof timeValue !== "string") {
        return 0;
    }

    const [hour, minute] = timeValue.split(":").map(Number);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return 0;
    }

    return hour * 60 + minute;
};

export const getAttendanceStatusByWorkMinutes = (workMinutes) => {
    const safeMinutes = Number(workMinutes ?? 0);

    if (safeMinutes >= 600) {
        return ATTENDANCE_STATUS.OVER_TIME;
    }

    if (safeMinutes < 480) {
        return ATTENDANCE_STATUS.EARLY_LEAVE;
    }

    return ATTENDANCE_STATUS.NORMAL;
};