

const AttendanceStatusBadge = ({ status }) => {
    const statusMap = {
        NORMAL: { label: "출근", color: "blue" },
	    LATE: { label: "지각", color: "red" },
	    EARLYLEAVE: { label: "조퇴", color: "yellow" },
	    VACATION: { label: "휴가", color: "gray"},
	    OVERTIME: { label: "연장 근무", color: "blue" }
    };

    // 객체에서 key로 값 꺼내기
    const current = statusMap[status]; 

    return (
        <span style={{ color: current.color }}>
            {current.label}
        </span>
    )
}

export default AttendanceStatusBadge