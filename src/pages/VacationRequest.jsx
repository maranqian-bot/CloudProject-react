import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/vacation-request.css?inline";
import { useVacationRequest } from "../hooks/useVacationRequest";
import VacationRequestHeader from "../components/vacationRequestList/VacationRequestListHeader.jsx";
import VacationRequestEmployeeCard from "../components/vacationRequest/VacationRequestEmployeeCard";
import VacationRequestReasonSection from "../components/vacationRequest/VacationRequestReasonSection";
import VacationRequestScheduleSection from "../components/vacationRequest/VacationRequestScheduleSection";
import VacationRequestActionButtons from "../components/vacationRequest/VacationRequestActionButtons";

function VacationRequest() {
    const vacationRequest = useVacationRequest();

    return (
        <>
            <Sidebar />
            <Header />

            <main className="main-container">
                <VacationRequestHeader />

                <form onSubmit={vacationRequest.handleSubmit}>
                    <VacationRequestEmployeeCard
                        employee={vacationRequest.currentEmployee}
                        isLoading={vacationRequest.isCurrentEmployeeLoading}
                        isError={vacationRequest.isCurrentEmployeeError}
                        error={vacationRequest.currentEmployeeError}
                    />

                    <div className="form-grid">
                        <VacationRequestReasonSection
                            formData={vacationRequest.formData}
                            errors={vacationRequest.errors}
                            onInputChange={vacationRequest.handleInputChange}
                            onVacationTypeChange={vacationRequest.handleVacationTypeChange}
                            showOtherReason={vacationRequest.showOtherReason}
                        />

                        <VacationRequestScheduleSection
                            formData={vacationRequest.formData}
                            errors={vacationRequest.errors}
                            onInputChange={vacationRequest.handleInputChange}
                            remainingVacationText={vacationRequest.availableVacationText}
                            requestAfterApprovalText={vacationRequest.requestAfterApprovalText}
                        />
                    </div>

                    <VacationRequestActionButtons
                        isSubmitting={vacationRequest.isSubmitting}
                        onCancel={vacationRequest.handleCancel}
                    />
                </form>
            </main>
        </>
    );
}

export default withPageStyle(
    VacationRequest,
    "vacation-request.css",
    pageCss
);