import { useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useRejectVacationRequestMutation,
    useVacationRequestListQuery,
} from "../query/vacationQuery";

export const useVacationRequestList = () => {
    const [activeType, setActiveType] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지당 표시할 데이터 수
    const itemsPerPage = 5;

    // 휴가 신청 목록 조회
    const {
        data: list = [],
        isLoading,
        isError,
        error,
    } = useVacationRequestListQuery();

    // 승인 / 반려 mutation 호출
    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    // 탭 기준 필터링된 목록
    const filteredList = useMemo(() => {
        if (activeType === "ALL") return list;
        return list.filter((item) => item.vacationType === activeType);
    }, [list, activeType]);

    // 대기 건수 계산
    const pendingCount = useMemo(() => {
        return list.filter((item) => item.status === "PENDING").length;
    }, [list]);

    // 승인 건수 계산
    const approvedCount = useMemo(() => {
        return list.filter((item) => item.status === "APPROVED").length;
    }, [list]);

    // 반려 건수 계산
    const rejectedCount = useMemo(() => {
        return list.filter((item) => item.status === "REJECTED").length;
    }, [list]);

    // 이번 달 휴가 인원 계산
    const monthlyVacationCount = useMemo(() => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}`;

        const employeeSet = new Set(
            list
                .filter((item) => item.startDate?.startsWith(currentMonth))
                .map((item) => item.employeeId)
        );

        return employeeSet.size;
    }, [list]);

    // 전체 페이지 수 계산
    const totalPages = useMemo(() => {
        return Math.ceil(filteredList.length / itemsPerPage) || 1;
    }, [filteredList.length]);

    // 현재 페이지에 표시할 데이터 계산
    const currentPageData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredList.slice(startIndex, endIndex);
    }, [filteredList, currentPage]);

    // 현재 페이지 시작/끝 번호 계산
    const startItemNumber = useMemo(() => {
        if (filteredList.length === 0) return 0;
        return (currentPage - 1) * itemsPerPage + 1;
    }, [filteredList.length, currentPage]);

    const endItemNumber = useMemo(() => {
        return Math.min(currentPage * itemsPerPage, filteredList.length);
    }, [filteredList.length, currentPage]);

    // 탭 변경 시 페이지를 1페이지로 초기화
    const handleChangeType = (type) => {
        setActiveType(type);
        setCurrentPage(1);
    };

    // 특정 페이지로 이동
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // 이전 페이지 이동
    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // 다음 페이지 이동
    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    // 승인 처리
    const handleApprove = (requestId) => {
        approveMutation.mutate(requestId);
    };

    // 반려 처리 - 반려 사유를 페이지에서 전달받음
    const handleReject = (requestId, rejectReason) => {
        rejectMutation.mutate({
            requestId,
            rejectReason,
        });
    };

    return {
        activeType,
        setActiveType: handleChangeType,
        filteredList,
        currentPageData,
        currentPage,
        totalPages,
        startItemNumber,
        endItemNumber,
        pendingCount,
        approvedCount,
        rejectedCount,
        monthlyVacationCount,
        isLoading,
        isError,
        error,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
};