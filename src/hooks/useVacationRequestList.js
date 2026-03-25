import { useEffect, useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useRejectVacationRequestMutation,
    useVacationRequestListQuery,
    useVacationRequestSummaryQuery,
} from "../query/vacationQuery";

export const useVacationRequestList = () => {
    const [activeType, setActiveType] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const {
        data: listData = { items: [], totalCount: 0 },
        isLoading: isListLoading,
        isError: isListError,
        error: listError,
    } = useVacationRequestListQuery({
        page: currentPage,
        limit: itemsPerPage,
        type: activeType,
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
    } = useVacationRequestSummaryQuery();

    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    const viewModel = useMemo(() => {
        const currentPageData = listData.items ?? [];
        const totalCount = listData.totalCount ?? 0;
        const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
        const safeCurrentPage = Math.min(currentPage, totalPages);

        const startItemNumber = totalCount === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
        const endItemNumber = Math.min(safeCurrentPage * itemsPerPage, totalCount);

        return {
            filteredList: currentPageData,
            currentPageData,
            totalCount,
            totalPages,
            safeCurrentPage,
            startItemNumber,
            endItemNumber,
            pendingCount: summaryData.pendingCount,
            approvedCount: summaryData.approvedCount,
            rejectedCount: summaryData.rejectedCount,
            monthlyVacationCount: summaryData.monthlyVacationCount,
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
        setCurrentPage(page);
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, viewModel.totalPages));
    };

    const handleApprove = (requestId) => {
        approveMutation.mutate({ requestId });
    };

    const handleReject = (requestId, rejectReason) => {
        rejectMutation.mutate({
            requestId,
            rejectReason,
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
        isError: isListError || isSummaryError,
        error: listError || summaryError,
        handleApprove,
        handleReject,
        goToPage,
        goToPrevPage,
        goToNextPage,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
};