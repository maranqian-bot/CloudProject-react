import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/vacation-request-list.css?inline";

import { useVacationRequestList } from "../hooks/useVacationRequestList";

import VacationRequestListHeader from "../components/vacationRequestList/VacationRequestListHeader.jsx";
import VacationRequestListStats from "../components/vacationRequestList/VacationRequestListStats.jsx";
import VacationRequestListTable from "../components/vacationRequestList/VacationRequestListTable.jsx";
import VacationRequestListPagination from "../components/vacationRequestList/VacationRequestListPagination.jsx";
import VacationRequestListPolicyNote from "../components/vacationRequestList/VacationRequestListPolicyNote.jsx";

function VacationRequestList() {
    const vacationRequest = useVacationRequestList();

    return (
        <>
            <Sidebar />
            <Header />

            <main>
                <div className="page-canvas">
                    <VacationRequestListHeader />

                    <VacationRequestListStats
                        pendingCount={vacationRequest.pendingCount}
                        approvedCount={vacationRequest.approvedCount}
                        rejectedCount={vacationRequest.rejectedCount}
                        monthlyVacationCount={vacationRequest.monthlyVacationCount}
                    />

                    <VacationRequestListTable
                        activeType={vacationRequest.activeType}
                        setActiveType={vacationRequest.setActiveType}
                        totalCount={vacationRequest.totalCount}
                        currentPageData={vacationRequest.currentPageData}
                        isLoading={vacationRequest.isLoading}
                        isError={vacationRequest.isError}
                        error={vacationRequest.error}
                        onApprove={vacationRequest.handleApprove}
                        onReject={vacationRequest.handleReject}
                        isApproving={vacationRequest.isApproving}
                        isRejecting={vacationRequest.isRejecting}
                    />

                    <VacationRequestListPagination
                        totalCount={vacationRequest.totalCount}
                        startItemNumber={vacationRequest.startItemNumber}
                        endItemNumber={vacationRequest.endItemNumber}
                        currentPage={vacationRequest.currentPage}
                        totalPages={vacationRequest.totalPages}
                        goToPage={vacationRequest.goToPage}
                        goToPrevPage={vacationRequest.goToPrevPage}
                        goToNextPage={vacationRequest.goToNextPage}
                    />
                </div>

                <VacationRequestListPolicyNote />
            </main>
        </>
    );
}

export default withPageStyle(
    VacationRequestList,
    "vacation-request-list.css",
    pageCss
);