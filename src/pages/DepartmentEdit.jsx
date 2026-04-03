import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-edit.css?inline";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentFormEdit from "../components/department/DepartmentFormEdit.jsx";
import { useDepartmentDetail } from "../hooks/useDepartmentDetail";

function DepartmentEdit() {

    const { departmentId } = useParams();
    console.log("현재 ID 확인:", departmentId);
    
    const navigate = useNavigate();

    const { department, isLoading, isError, onDelete } = useDepartmentDetail(departmentId);

    const handleDelete = () => {
        if (window.confirm("정말 이 부서를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.")) {
            onDelete(); // 삭제 기능 
            navigate("/department-management");
        }
    };

    if (isLoading) return <div className="loading-state">데이터를 불러오는 중입니다...</div>;
    if (isError) return <div className="error-state">데이터를 불러오는 데 실패했습니다.</div>;


    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <header className="content-header">
                    <div className="breadcrumb">부서 관리 &gt; 상세 정보</div>
                    <h2 className="page-title">{department?.deptName || "부서 정보"}</h2>
                </header>
                {/* 기본 정보 섹션 */}
                <section className="card">
                    <h3 className="section-title">기본 정보 수정</h3>
                    {/* DepartmentFormEdit 컴포넌트 호출*/}
                    <DepartmentFormEdit
                        departmentId={departmentId}
                        isEditMode={true}
                        initialData={department}
                    />
                </section>
                {/* 부서원 목록 섹션 */}
                <section className="card" style={{ marginTop: "24px" }}>
                    <h3 className="section-title">부서원 목록</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>사원 번호</th>
                                    <th>성명</th>
                                    <th>직책</th>
                                    <th>이메일</th>
                                    <th>입사일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>EMP-2023-01</td>
                                    <td style={{ fontWeight: 600 }}>김철수</td>
                                    <td>
                                        <span className="role-badge">본부장</span>
                                    </td>
                                    <td>chulsoo.kim@architect.com</td>
                                    <td>2023.01.15</td>
                                </tr>
                                <tr>
                                    <td>EMP-2023-45</td>
                                    <td style={{ fontWeight: 600 }}>이영희</td>
                                    <td>
                                        <span className="role-badge">수석 엔지니어</span>
                                    </td>
                                    <td>younghee.lee@architect.com</td>
                                    <td>2023.03.01</td>
                                </tr>
                                <tr>
                                    <td>EMP-2024-12</td>
                                    <td style={{ fontWeight: 600 }}>박지민</td>
                                    <td>
                                        <span className="role-badge">매니저</span>
                                    </td>
                                    <td>jimin.park@architect.com</td>
                                    <td>2024.02.10</td>
                                </tr>
                                <tr>
                                    <td>EMP-2024-88</td>
                                    <td style={{ fontWeight: 600 }}>최동훈</td>
                                    <td>
                                        <span className="role-badge">연구원</span>
                                    </td>
                                    <td>dh.choi@architect.com</td>
                                    <td>2024.05.20</td>
                                </tr>
                                <tr>
                                    <td>EMP-2024-88</td>
                                    <td style={{ fontWeight: 600 }}>최동훈</td>
                                    <td>
                                        <span className="role-badge">연구원</span>
                                    </td>
                                    <td>dh.choi@architect.com</td>
                                    <td>2024.05.20</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="table-footer">
                            <p
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "var(--on-surface-variant)"
                                }}
                            >
                                전체 인원 12명 중 1~5번째 표시 중
                            </p>
                            <div className="pagination">
                                <button className="page-btn">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: 16 }}
                                    >
                                        chevron_left
                                    </span>
                                </button>
                                <button className="page-btn active">1</button>
                                <button className="page-btn">2</button>
                                <button className="page-btn">3</button>
                                <button className="page-btn">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: 16 }}
                                    >
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 하단 삭제 버튼 영역 */}
                <footer className="actions-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "flex-start" }}>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>delete</span>
                        부서 삭제
                    </button>
                </footer>
            </main>
        </>
    );
}

export default withPageStyle(DepartmentEdit, "department-edit.css", pageCss);
