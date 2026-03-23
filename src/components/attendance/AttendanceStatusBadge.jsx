import { useEffect } from "react";


const AttendanceStatusBadge = ({ status }) => {
    const statusMap = {
        NORMAL: { label: "정상" },
	    LATE: { label: "지각" },
	    EARLYLEAVE: { label: "조퇴" },
	    VACATION: { label: "휴가" },
	    OVERTIME: { label: "연장 근무", color: "gray"}
    };


    // 객체에서 key로 값 꺼내기
    const current = statusMap[status] || { label: "-", color: "gray"}; 

    return (
        <span >
            {current?.label}
        </span>
    )
}

export default AttendanceStatusBadge