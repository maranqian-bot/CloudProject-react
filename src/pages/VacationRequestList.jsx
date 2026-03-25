import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/vacation-request-list.css?inline";

import { useVacationRequestList } from "../hooks/useVacationRequestList";

import VacationRequestHeader from "../components/vacationRequest/VacationRequestHeader";
import VacationRequestStats from "../components/vacationRequest/VacationRequestStats";
import VacationRequestTable from "../components/vacationRequest/VacationRequestTable";
import VacationRequestPagination from "../components/vacationRequest/VacationRequestPagination";
import VacationRequestPolicyNote from "../components/vacationRequest/VacationRequestPolicyNote";

function VacationRequestList() {
    const vacationRequest = useVacationRequestList();

    return (
        <>
            <Sidebar />
            <Header />

            <main>
                <div className="page-canvas">
                    <VacationRequestHeader />

                    <VacationRequestStats
                        pendingCount={vacationRequest.pendingCount}
                        approvedCount={vacationRequest.approvedCount}
                        rejectedCount={vacationRequest.rejectedCount}
                        monthlyVacationCount={vacationRequest.monthlyVacationCount}
                    />

                    <VacationRequestTable
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

                    <VacationRequestPagination
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

                <VacationRequestPolicyNote />
            </main>
        </>
    );
}

export default withPageStyle(
    VacationRequestList,
    "vacation-request-list.css",
    pageCss
);