import { useEffect, useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useCurrentEmployeeQuery,
    useRejectVacationRequestMutation,
    useVacationRequestListQuery,
} from "./query/vacationQuery";

const ALL_ITEMS_LIMIT = 999;
const ITEMS_PER_PAGE = 5;

const getDateTime = (dateString) => {
    if (!dateString) return 0;

    const time = new Date(dateString).getTime();
    return Number.isNaN(time) ? 0 : time;
};

const isCurrentYearDate = (dateString) => {
    if (!dateString) return false;

    const targetDate = new Date(dateString);
    if (Number.isNaN(targetDate.getTime())) return false;

    const now = new Date();
    return targetDate.getFullYear() === now.getFullYear();
};

export const useVacationManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: currentEmployee = null,
        isLoading: isCurrentEmployeeLoading,
        isError: isCurrentEmployeeError,
        error: currentEmployeeError,
    } = useCurrentEmployeeQuery();

    // 전체 데이터를 조회한 뒤, 내 신청 이력 영역은 프론트에서 페이지네이션 처리
    const {
        data: requestListData = { items: [], totalCount: 0 },
        isLoading: isRequestListLoading,
        isError: isRequestListError,
        error: requestListError,
    } = useVacationRequestListQuery({
        page: 1,
        limit: ALL_ITEMS_LIMIT,
        type: "ALL",
    });

    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    const viewModel = useMemo(() => {
        const allRequests = requestListData.items ?? [];

        const myHistory = currentEmployee
            ? allRequests
                .filter(
                    (item) => item.employeeId === currentEmployee.employeeId
                )
                .sort(
                    (a, b) =>
                        getDateTime(b.startDate) - getDateTime(a.startDate)
                )
            : [];

        const myPendingApprovals = currentEmployee
            ? allRequests
                .filter(
                    (item) =>
                        item.status === "PENDING" &&
                        item.approverId === currentEmployee.employeeId
                )
                .sort(
                    (a, b) =>
                        getDateTime(b.startDate) - getDateTime(a.startDate)
                )
            : [];

        const totalCount = myHistory.length;
        const totalPages = Math.max(
            1,
            Math.ceil(totalCount / ITEMS_PER_PAGE)
        );
        const safeCurrentPage = Math.min(
            Math.max(currentPage, 1),
            totalPages
        );

        const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        const currentPageData = myHistory.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        const startItemNumber =
            totalCount === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
        const endItemNumber = Math.min(
            safeCurrentPage * ITEMS_PER_PAGE,
            totalCount
        );

        // 사용 휴가는 startDate 기준으로 연도 계산
        const usedVacationDays = myHistory
            .filter(
                (item) =>
                    item.status === "APPROVED" &&
                    isCurrentYearDate(item.startDate)
            )
            .reduce((acc, item) => acc + Number(item.days || 0), 0);

        return {
            currentPageData,
            myHistoryTotalCount: totalCount,
            totalPages,
            safeCurrentPage,
            startItemNumber,
            endItemNumber,
            remainingVacationDays: currentEmployee?.remainingVacationDays ?? 0,
            usedVacationDays,
            pendingApprovalCount: myPendingApprovals.length,
            myPendingApprovals,
            hasPendingApprovals: myPendingApprovals.length > 0,
        };
    }, [requestListData.items, currentEmployee, currentPage, ITEMS_PER_PAGE]);

    useEffect(() => {
        if (currentPage !== viewModel.safeCurrentPage) {
            setCurrentPage(viewModel.safeCurrentPage);
        }
    }, [currentPage, viewModel.safeCurrentPage]);

    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(page, 1), viewModel.totalPages);
        setCurrentPage(nextPage);
    };

    const goToPrevPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    const handleApprove = (requestId) => {
        if (approveMutation.isPending) return;

        approveMutation.mutate({ requestId });
    };

    const handleReject = (requestId, rejectReason) => {
        if (rejectMutation.isPending) return;
        if (!rejectReason || !rejectReason.trim()) return;

        rejectMutation.mutate({
            requestId,
            rejectReason: rejectReason.trim(),
        });
    };

    return {
        currentEmployee,
        currentPageData: viewModel.currentPageData,
        myHistoryTotalCount: viewModel.myHistoryTotalCount,
        currentPage: viewModel.safeCurrentPage,
        totalPages: viewModel.totalPages,
        startItemNumber: viewModel.startItemNumber,
        endItemNumber: viewModel.endItemNumber,
        remainingVacationDays: viewModel.remainingVacationDays,
        usedVacationDays: viewModel.usedVacationDays,
        pendingApprovalCount: viewModel.pendingApprovalCount,
        myPendingApprovals: viewModel.myPendingApprovals,
        hasPendingApprovals: viewModel.hasPendingApprovals,
        isLoading: isCurrentEmployeeLoading || isRequestListLoading,
        isError: isCurrentEmployeeError || isRequestListError,
        error: currentEmployeeError || requestListError,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
};