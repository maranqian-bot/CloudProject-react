import { useEffect, useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useRejectVacationRequestMutation,
    useVacationRequestListQuery,
    useVacationRequestSummaryQuery,
} from "../query/vacationQuery";
import { getLoginUser } from "../utils/authStorage";

export const useVacationRequestList = () => {
    const [activeType, setActiveType] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const loginUser = getLoginUser();
    const hasLoginUser = Boolean(loginUser?.employeeNumber);

    const itemsPerPage = 5;

    const {
        data: listData = {
            items: [],
            totalCount: 0,
            totalPages: 1,
            currentPage: 1,
            pageSize: itemsPerPage,
        },
        isLoading: isListLoading,
        isError: isListError,
        error: listError,
    } = useVacationRequestListQuery({
        page: currentPage,
        limit: itemsPerPage,
        type: activeType,
        enabled: hasLoginUser,
    });

    const {
        data: summaryData = {
            pendingCount: 0,
            approvedCount: 0,
            rejectedCount: 0,
            monthlyVacationCount: 0,
        },
        isLoading: isSummaryLoading,
        isError: isSummaryError,
        error: summaryError,
    } = useVacationRequestSummaryQuery({
        enabled: hasLoginUser,
    });

    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    const viewModel = useMemo(() => {
        const currentPageData = listData.items ?? [];
        const totalCount = listData.totalCount ?? 0;
        const totalPages = Math.max(1, listData.totalPages ?? 1);
        const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

        const startItemNumber =
            totalCount === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
        const endItemNumber =
            totalCount === 0
                ? 0
                : Math.min(safeCurrentPage * itemsPerPage, totalCount);

        return {
            filteredList: currentPageData,
            currentPageData,
            totalCount,
            totalPages,
            safeCurrentPage,
            startItemNumber,
            endItemNumber,
            pendingCount: summaryData.pendingCount ?? 0,
            approvedCount: summaryData.approvedCount ?? 0,
            rejectedCount: summaryData.rejectedCount ?? 0,
            monthlyVacationCount: summaryData.monthlyVacationCount ?? 0,
        };
    }, [listData, summaryData, currentPage]);

    useEffect(() => {
        if (currentPage !== viewModel.safeCurrentPage) {
            setCurrentPage(viewModel.safeCurrentPage);
        }
    }, [currentPage, viewModel.safeCurrentPage]);

    const handleChangeType = (type) => {
        setActiveType(type);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(page, 1), viewModel.totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, viewModel.totalPages));
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
        activeType,
        setActiveType: handleChangeType,
        filteredList: viewModel.filteredList,
        currentPageData: viewModel.currentPageData,
        totalCount: viewModel.totalCount,
        currentPage: viewModel.safeCurrentPage,
        totalPages: viewModel.totalPages,
        startItemNumber: viewModel.startItemNumber,
        endItemNumber: viewModel.endItemNumber,
        pendingCount: viewModel.pendingCount,
        approvedCount: viewModel.approvedCount,
        rejectedCount: viewModel.rejectedCount,
        monthlyVacationCount: viewModel.monthlyVacationCount,
        isLoading: isListLoading || isSummaryLoading,
        isError: !hasLoginUser || isListError || isSummaryError,
        error: !hasLoginUser
            ? new Error("로그인 사용자 정보가 없습니다.")
            : listError || summaryError,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
};