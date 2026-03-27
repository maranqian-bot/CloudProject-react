import { useNavigate } from "react-router-dom";

function VacationManagementHeader() {
    const navigate = useNavigate();

    return (
        <div className="page-header">
            <div className="page-title">
                <div className="breadcrumb">
                    <span>운영 포털</span>
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                    >
                        chevron_right
                    </span>
                    <span>휴가 관리</span>
                </div>

                <h2>휴가 관리</h2>
                <p>현재 사용자의 휴가 관리 메뉴입니다.</p>
            </div>

            <div className="btn-group">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => navigate("/vacation-request")}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                    >
                        add
                    </span>
                    휴가 신청
                </button>
            </div>
        </div>
    );
}

export default VacationManagementHeader;