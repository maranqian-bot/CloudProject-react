import {
    useCheckInAttendanceMutation,
    useCheckOutAttendanceMutation,
    useTodayAttendanceQuery,
} from "../query/dashboardQuery";

import {
    ATTENDANCE_STATUS,
    formatDateToKey,
    formatTimeToKey,
    getAttendanceStatusByWorkMinutes,
    getAttendanceStatusLabel,
    getMinutesFromTime,
} from "../utils/dashboardUtils";

export const useAttendance = ({ currentDate }) => {
    const workDate = formatDateToKey(currentDate);

    const {
        data: todayAttendanceData = {
            workDate: null,
            isCheckedIn: false,
            isCheckedOut: false,
            checkInTime: null,
            checkOutTime: null,
            historyId: null,
        },
    } = useTodayAttendanceQuery({ workDate });

    const checkInMutation = useCheckInAttendanceMutation();
    const checkOutMutation = useCheckOutAttendanceMutation();

    const isCheckedIn = !!todayAttendanceData.checkInTime;
    const isCheckedOut = !!todayAttendanceData.checkOutTime;    

    let attendanceStatus;

    if (!isCheckedIn && !isCheckedOut) {
        attendanceStatus = null;
    } else if (isCheckedIn && !isCheckedOut) {
        attendanceStatus = ATTENDANCE_STATUS.NORMAL;
    } else {
        attendanceStatus = ATTENDANCE_STATUS.OVER_TIME;
    }

    const attendanceStatusLabel = getAttendanceStatusLabel(attendanceStatus);
    const isCheckInDisabled = isCheckedIn;
    const isCheckOutDisabled = !isCheckedIn || isCheckedOut;

    const handleCheckIn = () => {
        if (checkInMutation.isPending || isCheckInDisabled) {
            return;
        }

        const checkInTime = formatTimeToKey(new Date());

        checkInMutation.mutate({
            historyId: todayAttendanceData.historyId,
            workDate,
            checkInTime,
            attendanceStatus: ATTENDANCE_STATUS.NORMAL,
        });
    };

    const handleCheckOut = () => {
        if (checkOutMutation.isPending || isCheckOutDisabled) {
            return;
        }

        const checkOutTime = formatTimeToKey(new Date());

        const workMinutes = Math.max(
            0,
            getMinutesFromTime(checkOutTime) -
                getMinutesFromTime(todayAttendanceData.checkInTime)
        );

        const attendanceStatus =
            getAttendanceStatusByWorkMinutes(workMinutes);

        checkOutMutation.mutate({
            historyId: todayAttendanceData.historyId,
            checkOutTime,
            workMinutes,
            attendanceStatus,
        });
    };

    return {
        attendanceStatusLabel,
        isCheckInDisabled,
        isCheckOutDisabled,
        handleCheckIn,
        handleCheckOut,
        isCheckingIn: checkInMutation.isPending,
        isCheckingOut: checkOutMutation.isPending,
    };
};