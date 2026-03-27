import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

import { useVacationManagement } from "../hooks/useVacationManagement";

import VacationManagementHeader from "../components/vacationManagement/VacationManagementHeader.jsx";
import VacationManagementSummary from "../components/vacationManagement/VacationManagementSummary.jsx";
import VacationManagementHistorySection from "../components/vacationManagement/VacationManagementHistorySection.jsx";
import VacationManagementPendingSection from "../components/vacationManagement/VacationManagementPendingSection.jsx";

function VacationManagement() {
    const vacationManagementViewModel = useVacationManagement();

    return (
        <>
            <Sidebar />
            <Header />

            <main>
                <div className="page-canvas">
                    <VacationManagementHeader />

                    <VacationManagementSummary
                        availableVacationDays={
                            vacationManagementViewModel.availableVacationDays
                        }
                        usedVacationDays={
                            vacationManagementViewModel.usedVacationDays
                        }
                        pendingApprovalCount={
                            vacationManagementViewModel.pendingApprovalCount
                        }
                    />

                    <div className="dashboard-grid">
                        <div style={{ gridColumn: "span 8" }}>
                            <VacationManagementHistorySection
                                currentPageData={
                                    vacationManagementViewModel.currentPageData
                                }
                                totalCount={
                                    vacationManagementViewModel.myHistoryTotalCount
                                }
                                startItemNumber={
                                    vacationManagementViewModel.startItemNumber
                                }
                                endItemNumber={
                                    vacationManagementViewModel.endItemNumber
                                }
                                currentPage={
                                    vacationManagementViewModel.currentPage
                                }
                                totalPages={
                                    vacationManagementViewModel.totalPages
                                }
                                goToPage={vacationManagementViewModel.goToPage}
                                goToPrevPage={
                                    vacationManagementViewModel.goToPrevPage
                                }
                                goToNextPage={
                                    vacationManagementViewModel.goToNextPage
                                }
                                isLoading={
                                    vacationManagementViewModel.isLoading
                                }
                                isError={vacationManagementViewModel.isError}
                            />
                        </div>

                        <div style={{ gridColumn: "span 4" }}>
                            <VacationManagementPendingSection
                                myPendingApprovals={
                                    vacationManagementViewModel.myPendingApprovals
                                }
                                onApprove={
                                    vacationManagementViewModel.handleApprove
                                }
                                onReject={
                                    vacationManagementViewModel.handleReject
                                }
                                isApproving={
                                    vacationManagementViewModel.isApproving
                                }
                                isRejecting={
                                    vacationManagementViewModel.isRejecting
                                }
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default withPageStyle(
    VacationManagement,
    "dashboard.css",
    pageCss
);