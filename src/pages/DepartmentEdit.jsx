import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/department-edit.css?inline";

function DepartmentEdit() {
    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <header className="content-header">
                    <div className="breadcrumb">부서 관리 &gt; 상세 정보</div>
                    <h2 className="page-title">기술 전략 본부</h2>
                </header>
                {/* Department Basic Info */}
                <section className="card">
                    <h3 className="section-title">기본 정보</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>부서 코드</label>
                            <input
                                readOnly=""
                                style={{
                                    backgroundColor: "#f3f4f5",
                                    borderColor: "transparent",
                                    fontWeight: 600
                                }}
                                type="text"
                                defaultValue="DEPT-TECH-001"
                            />
                        </div>
                        <div className="form-group">
                            <label>부서 이름</label>
                            <input type="text" defaultValue="기술 전략 본부" />
                        </div>
                        <div className="form-group">
                            <label>부서장 사번</label>
                            <input type="text" defaultValue="EMP-2024-001" />
                        </div>
                        <div className="form-group">
                            <label>부서장 이름</label>
                            <input type="text" defaultValue="김철수" />
                        </div>
                        <div className="form-group full-width">
                            <label>부서 설명</label>
                            <textarea
                                rows={4}
                                defaultValue={
                                    "전사 기술 로드맵 수립 및 핵심 아키텍처 설계를 담당하며, 부서 간 기술 협력을 조율하는 전략 조직입니다."
                                }
                            />
                        </div>
                    </div>
                </section>
                {/* Department Members List */}
                <section className="card">
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
                {/* Functional Buttons */}
                <footer className="actions-footer">
                    <button className="btn btn-danger">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.25rem" }}
                        >
                            delete
                        </span>
                        부서 삭제
                    </button>
                    <div className="button-group">
                        {/* <button
                className="btn btn-secondary"
                onclick="location.href='./department-management.html'"
                >
                취소
                </button> */}
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                window.location.href = "/department-management";
                            }}
                        >
                            취소
                        </button>
                        <button className="btn btn-primary">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "1.25rem" }}
                            >
                                save
                            </span>
                            저장하기
                        </button>
                    </div>
                </footer>
            </main>
        </>
    )
}

export default withPageStyle(DepartmentEdit, "department-edit.css", pageCss);
