import {
    useCheckInMutation,
    useCheckOutMutation,
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

    const checkInMutation = useCheckInMutation();
    const checkOutMutation = useCheckOutMutation();

    const isCheckedIn = Boolean(todayAttendanceData.isCheckedIn);
    const isCheckedOut = Boolean(todayAttendanceData.isCheckedOut);

    const attendanceStatusLabel = getAttendanceStatusLabel({
        isCheckedIn,
        isCheckedOut,
    });

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