import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-edit.css?inline";
import {useNavigate, useParams} from "react-router-dom";
import {useDepartmentDetail} from "../hooks/useDepartmentDetail";
import DepartmentFormEdit from "../components/department/DepartmentFormEdit.jsx";
import employeeQuery from "../query/employeeQuery.js";

function DepartmentEdit() {

    const {departmentId} = useParams();
    console.log("현재 ID 확인:", departmentId);

    const {
        employees,     // 실제 직원 목록 배열
        totalCount,      // 전체 인원수
        pageNumbers,     // [1, 2, 3] 형태의 페이지 번호 배열
        currentPage,     // 현재 페이지 번호
        changePage,      // 페이지 클릭 함수
        goToPrevPage,    // 이전 버튼 함수
        goToNextPage,    // 다음 버튼 함수
        startItemNumber, // 시작 번호 (예: 1)
        endItemNumber,   // 끝 번호 (예: 5)
        loading          // 로딩 상태
    } = employeeQuery(null, departmentId);


    const navigate = useNavigate();
    const {department, isLoading, isError, onDelete} = useDepartmentDetail(departmentId);

    const handleDelete = () => {
        if (window.confirm("정말 이 부서를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.")) {
            onDelete(); // 삭제 기능 
            navigate("/department-management");
        }
    };

    if (isLoading) return <div className="loading-state">데이터를 불러오는 중입니다...</div>;
    if (isError) return <div className="error-state">데이터를 불러오는 데 실패했습니다.</div>;


    return (<>
        <Sidebar/>
        <Header/>
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
            <section className="card" style={{marginTop: "24px"}}>
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
                        {loading ? (
                            // 데이터를 가져오는 중일 때 보여줄 화면
                            <tr>
                                <td colSpan="5" style={{textAlign: "center", padding: "40px"}}>
                                    직원 목록을 불러오는 중입니다...
                                </td>
                            </tr>
                        ) : employees && employees.length > 0 ? (
                            employees.map((member) => (
                                <tr key={member.employeeId}>

                                    {/* 사번 -  엔티티 필드명과 일치 확인*/}
                                    <td>{member.employeeNumber}</td>

                                    {/* 이름 */}
                                    <td style={{fontWeight: 600}}>{member.name}</td>
                                    <td>
                                        {/* 직책 배지 스타일 적용 */}
                                        <span className={`role-badge ${member.position?.toLowerCase()}`}>
                                        {member.position}
                                    </span>
                                    </td>
                                    <td>{member.email}</td>
                                    {/* 이메일 */}
                                    <td>{member.hireDate}</td>
                                    {/* 입사일 */}
                                </tr>))) : (<tr>
                                <td colSpan="5" style={{textAlign: "center", padding: "40px"}}>
                                    현재 소속된 부서원이 없습니다.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="table-footer">
                        <p className="footer-info">
                            전체 인원 {totalCount}명 중 {startItemNumber}-{endItemNumber}번째 표시 중
                        </p>

                        <div className="pagination">
                            {/* 이전 버튼: 클릭시 goToPrevPage 호출, 1페이지면 비활성화 */}
                            <button
                                className="page-btn"
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                            >
                                    <span className="material-symbols-outlined" style={{fontSize: 16}}>
                                        chevron_left
                                    </span>
                            </button>

                            {/* 숫자 버튼: 훅에서 준 pageNumbers 배열을 돌려서 동적으로 생성 */}
                            {pageNumbers.map((num) => (
                                <button
                                    key={num}
                                    className={`page-btn ${currentPage === num ? 'active' : ''}`}
                                    onClick={() => changePage(num)}
                                >
                                    {num}
                                </button>
                            ))}

                            {/* 다음 버튼: 클릭 시 goToNextPage 호출, 마지막 페이지면 비활성화 */}
                            <button
                                className="page-btn"
                                onClick={goToNextPage}
                                disabled={currentPage === pageNumbers.length}
                            >
                                <span className="material-symbols-outlined" style={{fontSize: 16}}>
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 하단 삭제 버튼 영역 */}
            <footer className="actions-footer"
                    style={{marginTop: "24px", display: "flex", justifyContent: "flex-start"}}>
                <button className="btn btn-danger" onClick={handleDelete}>
                    <span className="material-symbols-outlined" style={{fontSize: "1.25rem"}}>delete</span>
                    부서 삭제
                </button>
            </footer>
        </main>
    </>);
}

export default withPageStyle(DepartmentEdit, "department-edit.css", pageCss);
