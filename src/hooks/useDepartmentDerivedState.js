import { useMemo } from "react";

// 부서 계산관리 훅
const toSafeNumber = (value) => {
    const parsedValue = Number(value);

    // 숫자가 아닌 값이 들어오면 0으로 바꿔 계산이 멈추지 않게 방어. 
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const useDepartmentDerivedState = (data, currentPage, itemsPerPage) => {
    return useMemo(() => {
        // 기본 데이터 가공 (방어 코드 포함)  
        const totalCount = toSafeNumber(data?.totalElements);  // 0부터 시작
        const totalPages = Math.max(1, toSafeNumber(data?.totalPages));
        const list = data?.content ?? [];

        // 변환된 totalCount를 가지고 페이징 계산
        const startItemNumber = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
        const endItemNumber = Math.min(currentPage * itemsPerPage, totalCount);

        // 컴포넌트에서 "전체 {totalCount}개 중..."이 아닌 훅에서 완성하는 걸로 구현.
        const paginationText = `전체 ${totalCount.toLocaleString()}개 중 ${startItemNumber}~${endItemNumber}번째 표시 중`;
        
        const pageStatusText = `${currentPage} / ${totalPages} 페이지`;

        // 부서 목록 데이터 추가 가공 (예: 부서장이 없으면 '미지정' 텍스트 처리)
        const processedList = list.map(dept => ({
            ...dept,
            managerDisplayText: dept.managerName || "미지정",
            statusDisplayText: dept.status === "ACTIVE" ? "운영중" : "중지"
        }));

        return {
            list: processedList,
            totalCount,
            totalPages,
            startItemNumber,
            endItemNumber,
            paginationText, 
            pageStatusText,
            isEmpty: list.length === 0 // 데이터가 하나도 없는지 체크
        };
    }, [data, currentPage, itemsPerPage]);
};