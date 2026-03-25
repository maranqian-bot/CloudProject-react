

const AttendanceStatusBadge = ({ status }) => {
    const statusMap = {
        NORMAL: { label: "정상", color: "#15803d", bg: "#dcfce7" },
	    LATE: { label: "지각", color: "#b45309", bg: "#fef3c7" },
	    EARLYLEAVE: { label: "조퇴", color: "#b45309", bg: "#fef3c7" },
	    VACATION: { label: "휴가", color: "#374151", bg: "#f3f4f6" },
	    ABSENT: { label: "결근", color: "#b91c1c", bg: "#fee2e2" },
        OVERTIME: { label: "연장 근무", color: "#1d4ed8", bg: "#dbeafe" }
    };


    // 객체에서 key로 값 꺼내기
    const current = statusMap[status] || { label: "-", color: "#374151", bg: "#f3f4f6"}; 

    return (
        <span style={{display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: current.color,
                      backgroundColor: current.bg,
                      }}>
            {current?.label}
        </span>
    )
}

export default AttendanceStatusBadge