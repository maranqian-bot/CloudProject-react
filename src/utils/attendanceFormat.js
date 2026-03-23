// 자주 쓰는 가공 함수
// 화면에 예쁘게 보여주기 위한 보조 함수들이 들어감

// 날짜 표시 형식 변환
export const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
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

    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);

    const period = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    return `${h}:${minute} ${period}`;
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



