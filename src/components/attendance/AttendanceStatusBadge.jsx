

const AttendanceStatusBadge = ({ status }) => {
    const statusMap = {
        NORMAL: { label: "출근", color: "blue" },
	    LATE: { label: "지각", color: "red" },
	    EARLYLEAVE: { label: "조퇴", color: "yellow" },
	    VACATION: { label: "휴가" },
	    OVERTIME: { label: "연장 근무" }
    }
}