import { useMemo } from "react";
import {
    useDashboardSummaryQuery,
    useRecentActivitiesQuery,
} from "../query/dashboardQuery";
import {
    DASHBOARD_ITEMS_PER_PAGE,
    DEFAULT_TARGET_WORK_DAYS,
    getFilledSegmentCount,
    getRecentActivityItems,
    toSafeNumber,
} from "../utils/dashboardUtils";

const getPendingApprovalCount = (vacationRequests) => {
    return (vacationRequests ?? []).filter((item) => item.status === "PENDING")
        .length;
};

const getUsedVacationDays = ({
    vacationRequests,
    employeeId,
    currentYear,
}) => {
    return (vacationRequests ?? [])
        .filter(
            (item) =>
                item.employeeId === employeeId &&
                item.status === "APPROVED" &&
                item.startDate
        )
        .filter((item) => {
            const startDate = new Date(item.startDate);

            if (Number.isNaN(startDate.getTime())) {
                return false;
            }

            return startDate.getFullYear() === currentYear;
        })
        .reduce((acc, item) => acc + toSafeNumber(item.days), 0);
};

const getVacationProgressPercent = ({
    remainingVacationDays,
    usedVacationDays,
}) => {
    const totalVacationDays = remainingVacationDays + usedVacationDays;

    if (totalVacationDays <= 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.max(0, (remainingVacationDays / totalVacationDays) * 100)
    );
};

export const useDashboardData = ({ currentPage, currentYear }) => {
    const {
        data: summaryQueryData = {
            summary: {},
            currentEmployee: {},
            vacationRequests: [],
        },
    } = useDashboardSummaryQuery();

    const {
        data: recentActivitiesData = { items: [], totalCount: 0 },
        isLoading: isRecentActivitiesLoading,
        isError: isRecentActivitiesError,
    } = useRecentActivitiesQuery({
        page: currentPage,
        limit: DASHBOARD_ITEMS_PER_PAGE,
    });

    const { summary, currentEmployee, vacationRequests } = summaryQueryData;

    const employeeName = currentEmployee?.employeeName ?? "-";
    const absentTeamMemberCount = toSafeNumber(summary?.absentCount);
    const remainingVacationDays = toSafeNumber(
        currentEmployee?.availableVacationDays
    );
    const workedDays = toSafeNumber(summary?.workDays);
    const targetWorkDays = DEFAULT_TARGET_WORK_DAYS;

    const pendingApprovalCount = useMemo(() => {
        return getPendingApprovalCount(vacationRequests);
    }, [vacationRequests]);

    const usedVacationDays = useMemo(() => {
        return getUsedVacationDays({
            vacationRequests,
            employeeId: currentEmployee?.employeeId,
            currentYear,
        });
    }, [vacationRequests, currentEmployee?.employeeId, currentYear]);

    const totalVacationDays = remainingVacationDays + usedVacationDays;

    const vacationProgressPercent = useMemo(() => {
        return getVacationProgressPercent({
            remainingVacationDays,
            usedVacationDays,
        });
    }, [remainingVacationDays, usedVacationDays]);

    const activities = useMemo(() => {
        return getRecentActivityItems(recentActivitiesData.items);
    }, [recentActivitiesData.items]);

    const filledSegmentCount = useMemo(() => {
        return getFilledSegmentCount(workedDays, targetWorkDays);
    }, [workedDays, targetWorkDays]);

    return {
        employeeName,
        pendingApprovalCount,
        absentTeamMemberCount,
        remainingVacationDays,
        usedVacationDays,
        totalVacationDays,
        vacationProgressPercent,
        workedDays,
        targetWorkDays,
        filledSegmentCount,
        activities,
        totalCount: recentActivitiesData.totalCount,
        isRecentActivitiesLoading,
        isRecentActivitiesError,
    };
};