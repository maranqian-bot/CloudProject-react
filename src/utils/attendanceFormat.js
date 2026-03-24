// 자주 쓰는 가공 함수
// 화면에 예쁘게 보여주기 위한 보조 함수들이 들어감

// 날짜 표시 형식 변환
export const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day =  date.getDate();

    return `${year}년 ${month}월 ${day}일`;
};

// 요일 표시 형식 변환 
export const formatDateOfWeek = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    return days[date.getDay()];
};

// 시각 표시 형식 변환
// ex) 08:24 AM
export const formatTime = (time) => {
    if (!time) return "-";

    let hour, minute;

    try {
        // 1. 문자열일 때
        if (typeof time === "string") {

            // ISO형식일 때 (2026-03-24T09:15:00)
            if (time.includes("T")) {
                const date = new Date(time);
                hour = date.getHours();
                minute = date.getMinutes();
            } else {
                // "HH:mm" "HH:mm:ss"
                const parts = time.split(":");

                if (parts.length < 2) return "-";

                hour = parseInt(parts[0], 10);
                minute = parseInt(parts[1], 10);
            }
        }

        // 2. Date 객체일 경우
        else if (time instanceof Date) {
            hour = time.getHours();
            minute = time.getMinutes();
        } else {
            return "-";
        }

        // 3. 숫자 검증
        if (isNaN(hour) || isNaN(minute)) return "-";

        // 4. AM / PM 변환
        const period = hour >= 12 ? "PM" : "AM";

        let h = hour % 12;
        if (h === 0) h = 12;

        // 5. 분 두 자리 맞추기
        const mm = minute.toString().padStart(2, "0");

        return `${h}:${mm} ${period}`;
         
    } catch (e) {
        return "-";
    }
};

// 분 -> 9시간 18분 변환
export const formatWorkMinutes = (minutes) => {
    if (minutes === null || minutes === undefined) return "-";

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${hour}시간 ${minute}분`;
};

// // 상태값 한글 변환
// export const formatAttendanceStatus = (status) => {
//     switch(status) {
//         case "NORMAL":
//             return "정상";
//         case "LATE":
//             return "지각";
//         case "EARLYLEAVE":
//             return "조퇴";
//         case "VACATION":
//             return "휴가";
//         case "OVERTIME":
//             return "연장 근무";
//         default:
//             return status || "-";
//     }
// };



