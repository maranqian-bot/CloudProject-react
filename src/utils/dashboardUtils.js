export const ATTENDANCE_STATUS = {
    NORMAL: "NORMAL",
    EARLYLEAVE: "EARLYLEAVE",
    OVERTIME: "OVERTIME",
};

export const ATTENDANCE_STATUS_LABEL = {
    [ATTENDANCE_STATUS.NORMAL]: "정상",
    [ATTENDANCE_STATUS.EARLYLEAVE]: "조퇴",
    [ATTENDANCE_STATUS.OVERTIME]: "연장",
};

export const DEFAULT_TARGET_WORK_DAYS = 22;
export const DASHBOARD_ITEMS_PER_PAGE = 5;
export const DASHBOARD_SEGMENT_COUNT = 4;

export const toSafeNumber = (value) => {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const formatVacationDays = (days) => {
    if (Number.isInteger(days)) {
        return `${days}`;
    }

    return `${days}`.replace(/\.0$/, "");
};

export const formatDateToKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const formatTimeToKey = (date) => {
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
};

export const getMinutesFromTime = (timeText) => {
    if (!timeText) return 0;

    const [hourText = "0", minuteText = "0"] = String(timeText).split(":");
    const hour = Number(hourText);
    const minute = Number(minuteText);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return 0;
    }

    return hour * 60 + minute;
};

export const getAttendanceStatusByWorkMinutes = (workMinutes) => {
    const safeWorkMinutes = toSafeNumber(workMinutes);

    if (safeWorkMinutes >= 600) {
        return ATTENDANCE_STATUS.OVERTIME;
    }

    if (safeWorkMinutes < 480) {
        return ATTENDANCE_STATUS.EARLYLEAVE;
    }

    return ATTENDANCE_STATUS.NORMAL;
};

export const getAttendanceStatusLabel = ({ isCheckedIn, isCheckedOut }) => {
    if (isCheckedOut) {
        return "퇴근 완료";
    }

    if (isCheckedIn) {
        return "출근 완료";
    }

    return "출근 전";
};

export const getKoreanTodayLabel = (date) => {
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekday}요일`;
};

export const getCurrentDateLabel = (date) => {
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}월 ${String(date.getDate()).padStart(2, "0")}일`;
};

export const getDisplayTime = (date) => {
    const hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const meridiem = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return {
        currentTime: `${String(displayHour).padStart(2, "0")}:${minute}`,
        meridiem,
    };
};

export const formatWorkDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}. ${String(date.getDate()).padStart(2, "0")}`;
};

export const formatTimeToMeridiem = (timeText) => {
    if (!timeText) return "-";

    const [hourText = "0", minuteText = "00"] = String(timeText).split(":");
    const hour = Number(hourText);
    const minute = String(minuteText).padStart(2, "0");

    if (Number.isNaN(hour)) {
        return timeText;
    }

    const meridiem = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${String(displayHour).padStart(2, "0")}:${minute} ${meridiem}`;
};

export const formatWorkMinutes = (minutes) => {
    const safeMinutes = toSafeNumber(minutes);

    if (safeMinutes <= 0) return "-";

    const hour = Math.floor(safeMinutes / 60);
    const minute = safeMinutes % 60;

    return `${hour}시간 ${String(minute).padStart(2, "0")}분`;
};

export const getActivityStatusLabel = (status) => {
    return ATTENDANCE_STATUS_LABEL[status] ?? status;
};

export const mapRecentActivityItem = (item) => {
    return {
        id: item.id,
        workDate: formatWorkDate(item.workDate),
        checkInTime: formatTimeToMeridiem(item.checkInTime),
        checkOutTime: formatTimeToMeridiem(item.checkOutTime),
        workDuration: formatWorkMinutes(item.workMinutes),
        attendanceStatus: item.attendanceStatus,
        attendanceStatusLabel: getActivityStatusLabel(item.attendanceStatus),
    };
};

export const getRecentActivityItems = (items) => {
    return (items ?? []).map(mapRecentActivityItem);
};

export const getPaginationState = ({
    currentPage,
    totalCount,
    itemsPerPage,
}) => {
    const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
    const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

    const startItemNumber =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;

    const endItemNumber = Math.min(safeCurrentPage * itemsPerPage, totalCount);

    return {
        totalPages,
        safeCurrentPage,
        startItemNumber,
        endItemNumber,
    };
};

export const getFilledSegmentCount = (workedDays, targetWorkDays) => {
    if (targetWorkDays <= 0) return 0;

    const ratio = workedDays / targetWorkDays;

    return Math.min(
        DASHBOARD_SEGMENT_COUNT,
        Math.max(0, Math.ceil(ratio * DASHBOARD_SEGMENT_COUNT))
    );
};