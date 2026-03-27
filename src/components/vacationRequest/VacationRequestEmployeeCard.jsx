import { useMemo } from "react";

const FALLBACK_PROFILE_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCAt3E8zHwCOKjDMy6gasEIdPuaiDygljwLV2Rhg1kpbETWdk41H6NPD9O_zgeeHAvWPJYrvvmEysAw4nxAZK9j0ylq94uBvAoLjYMeV9ICjxWMefkzw439mVlay0WnxxVz26zPcpNbDtPma0WPtuOX3vaKSR9FdYzvXRYoSiApUQsEPc9fZGxOFVOFvmJO6W7uCq6nMF0A_ftXo6IiqF7lhCSgrSTwXDkMHv_oIeO8RX8Hr7EsgKySUH69HvIRERmSFo6NVzL0geOl";

const formatHireDate = (hireDate) => {
    if (!hireDate) return "-";

    const date = new Date(hireDate);

    if (Number.isNaN(date.getTime())) {
        return hireDate;
    }

    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}월 ${String(date.getDate()).padStart(2, "0")}일`;
};

function VacationRequestEmployeeCard({
    employee,
    isLoading,
    isError,
    error,
}) {
    const employeeInfo = useMemo(() => {
        return {
            employeeNumber: isLoading
                ? "불러오는 중..."
                : employee?.employeeNumber ?? "-",
            employeeName: isLoading
                ? "불러오는 중..."
                : employee?.employeeName ?? "-",
            position: isLoading ? "불러오는 중..." : employee?.position ?? "-",
            departmentName: isLoading
                ? "불러오는 중..."
                : employee?.departmentName ?? "-",
            hireDate: isLoading
                ? "불러오는 중..."
                : formatHireDate(employee?.hireDate),
            profileImage: employee?.profileImage ?? FALLBACK_PROFILE_IMAGE,
        };
    }, [employee, isLoading]);

    return (
        <>
            <div className="section-title">대상자 정보</div>

            <div className="form-card employee-info-layout">
                <div className="profile-upload">
                    <img
                        alt={`${employeeInfo.employeeName} 프로필 이미지`}
                        className="profile-img-large"
                        src={employeeInfo.profileImage}
                    />

                    <div className="input-group" style={{ width: "100%" }}>
                        <label className="label">사번</label>
                        <div
                            className="input-container"
                            style={{
                                background: "white",
                                border: "1px solid var(--border-color)",
                            }}
                        >
                            <input
                                type="text"
                                value={employeeInfo.employeeNumber}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="fields-grid">
                    <div className="input-group">
                        <label className="label">이름</label>
                        <div className="input-container">
                            <input
                                type="text"
                                value={employeeInfo.employeeName}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">직책</label>
                        <div className="input-container">
                            <input
                                type="text"
                                value={employeeInfo.position}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">부서</label>
                        <div className="input-container">
                            <input
                                type="text"
                                value={employeeInfo.departmentName}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">입사일</label>
                        <div className="input-container">
                            <input
                                type="text"
                                value={employeeInfo.hireDate}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isError && (
                <p
                    style={{
                        color: "var(--error)",
                        marginTop: "12px",
                        fontSize: "13px",
                    }}
                >
                    신청자 정보를 불러오지 못했습니다.
                </p>
            )}
        </>
    );
}

export default VacationRequestEmployeeCard;