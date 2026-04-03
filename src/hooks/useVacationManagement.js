import { useEffect, useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useRejectVacationRequestMutation,
    useVacationManagementQuery,
} from "../query/vacationQuery";
import { getLoginUser } from "../utils/authStorage";

const ITEMS_PER_PAGE = 5;

export const useVacationManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const loginUser = getLoginUser();
    const employeeNumber = loginUser?.employeeNumber ?? null;
    const currentYear = new Date().getFullYear();

    const {
        data: vacationManagementData = null,
        isLoading,
        isError,
        error,
    } = useVacationManagementQuery({
        employeeNumber,
        approverEmployeeNumber: employeeNumber,
        year: currentYear,
    });

    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    const viewModel = useMemo(() => {
        const summary = vacationManagementData?.summary ?? {
            availableVacationDays: 0,
            usedVacationDays: 0,
            pendingApprovalCount: 0,
        };

        const myVacationHistories =
            vacationManagementData?.myVacationHistories ?? [];

        const pendingApprovals =
            vacationManagementData?.pendingApprovals ?? [];

        const totalCount = myVacationHistories.length;
        const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
        const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

        const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        const currentPageData = myVacationHistories.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        const startItemNumber =
            totalCount === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
        const endItemNumber =
            totalCount === 0
                ? 0
                : Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalCount);

        return {
            currentPageData,
            myHistoryTotalCount: totalCount,
            totalPages,
            safeCurrentPage,
            startItemNumber,
            endItemNumber,
            availableVacationDays: summary.availableVacationDays ?? 0,
            usedVacationDays: summary.usedVacationDays ?? 0,
            pendingApprovalCount: summary.pendingApprovalCount ?? 0,
            myPendingApprovals: pendingApprovals,
            hasPendingApprovals: pendingApprovals.length > 0,
        };
    }, [vacationManagementData, currentPage]);

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
        currentEmployee: loginUser,
        currentPageData: viewModel.currentPageData,
        myHistoryTotalCount: viewModel.myHistoryTotalCount,
        currentPage: viewModel.safeCurrentPage,
        totalPages: viewModel.totalPages,
        startItemNumber: viewModel.startItemNumber,
        endItemNumber: viewModel.endItemNumber,
        availableVacationDays: viewModel.availableVacationDays,
        usedVacationDays: viewModel.usedVacationDays,
        pendingApprovalCount: viewModel.pendingApprovalCount,
        myPendingApprovals: viewModel.myPendingApprovals,
        hasPendingApprovals: viewModel.hasPendingApprovals,
        isLoading,
        isError: !employeeNumber || isError,
        error: !employeeNumber ? new Error("로그인 사용자 정보가 없습니다.") : error,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
};