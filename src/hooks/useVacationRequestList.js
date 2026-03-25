import { useMemo, useState } from "react";
import {
    useApproveVacationRequestMutation,
    useRejectVacationRequestMutation,
    useVacationRequestListQuery,
} from "../query/vacationQuery";

export const useVacationRequestList = () => {
    const [activeType, setActiveType] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const {
        data: list = [],
        isLoading,
        isError,
        error,
    } = useVacationRequestListQuery(currentPage);

    const approveMutation = useApproveVacationRequestMutation();
    const rejectMutation = useRejectVacationRequestMutation();

    const summary = useMemo(() => {
        let pendingCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;

        const employeeSet = new Set();

        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}`;

        const filteredList =
            activeType === "ALL"
                ? list
                : list.filter((item) => item.vacationType === activeType);

        for (const item of list) {
            if (item.status === "PENDING") pendingCount++;
            if (item.status === "APPROVED") approvedCount++;
            if (item.status === "REJECTED") rejectedCount++;

            if (item.startDate?.startsWith(currentMonth)) {
                employeeSet.add(item.employeeId);
            }
        }

        const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
        const safeCurrentPage = Math.min(currentPage, totalPages);
        const startIndex = (safeCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = filteredList.slice(startIndex, endIndex);

        const startItemNumber = filteredList.length === 0 ? 0 : startIndex + 1;
        const endItemNumber = Math.min(endIndex, filteredList.length);

        return {
            filteredList,
            pendingCount,
            approvedCount,
            rejectedCount,
            monthlyVacationCount: employeeSet.size,
            totalPages,
            currentPageData,
            startItemNumber,
            endItemNumber,
            safeCurrentPage,
        };
    }, [list, activeType, currentPage]);

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
        setCurrentPage((prev) => Math.min(prev + 1, summary.totalPages));
    };

    const handleApprove = (requestId) => {
        approveMutation.mutate({
            requestId,
            page: currentPage,
        });
    };

    const handleReject = (requestId, rejectReason) => {
        rejectMutation.mutate({
            requestId,
            rejectReason,
            page: currentPage,
        });
    };

    return {
        activeType,
        setActiveType: handleChangeType,
        filteredList: summary.filteredList,
        currentPageData: summary.currentPageData,
        currentPage: summary.safeCurrentPage,
        totalPages: summary.totalPages,
        startItemNumber: summary.startItemNumber,
        endItemNumber: summary.endItemNumber,
        pendingCount: summary.pendingCount,
        approvedCount: summary.approvedCount,
        rejectedCount: summary.rejectedCount,
        monthlyVacationCount: summary.monthlyVacationCount,
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