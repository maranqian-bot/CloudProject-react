import { TYPE_TABS } from "../../utils/vacationRequestUtils";

function VacationRequestListFilterTabs({ activeType, setActiveType, totalCount }) {
    return (
        <div className="table-header">
            <div className="tabs">
                {TYPE_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        className={`tab ${activeType === tab.value ? "active" : ""}`}
                        type="button"
                        onClick={() => setActiveType(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <p className="total-count">총 {totalCount}건의 요청</p>
        </div>
    );
}

export default VacationRequestListFilterTabs;