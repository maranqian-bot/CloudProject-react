import { useEffect, useMemo } from "react";
import { getPaginationState, toSafeNumber } from "../utils/dashboardUtils";

export const useDashboardPagination = ({
    currentPage,
    setCurrentPage,
    totalCount,
    itemsPerPage,
}) => {
    const paginationViewModel = useMemo(() => {
        const safeTotalCount = toSafeNumber(totalCount);

        return {
            totalCount: safeTotalCount,
            ...getPaginationState({
                currentPage,
                totalCount: safeTotalCount,
                itemsPerPage,
            }),
        };
    }, [currentPage, totalCount, itemsPerPage]);

    useEffect(() => {
        if (currentPage !== paginationViewModel.safeCurrentPage) {
            setCurrentPage(paginationViewModel.safeCurrentPage);
        }
    }, [currentPage, paginationViewModel.safeCurrentPage, setCurrentPage]);

    const goToPage = (page) => {
        const safePage = Math.min(
            Math.max(page, 1),
            paginationViewModel.totalPages
        );

        setCurrentPage(safePage);
    };

    const goToPrevPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    return {
        totalCount: paginationViewModel.totalCount,
        currentPage: paginationViewModel.safeCurrentPage,
        totalPages: paginationViewModel.totalPages,
        startItemNumber: paginationViewModel.startItemNumber,
        endItemNumber: paginationViewModel.endItemNumber,
        goToPage,
        goToPrevPage,
        goToNextPage,
    };
};