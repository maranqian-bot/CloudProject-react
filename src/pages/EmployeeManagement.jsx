import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import withPageStyle from "../utils/withPageStyle.jsx";
import pageCss from "../styles/dashboard.css?inline";

function EmployeeManagement() {
    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <div className="content-padding">
                    <div className="page-header">
                        <div className="page-title">
                            <nav className="breadcrumbs">
                                <span>운영 포털</span>
                                <span style={{ color: "var(--outline-variant)" }}>/</span>
                                <span className="active-crumb">직원 관리</span>
                            </nav>
                            <h1>직원 관리</h1>
                            <p>전 세계 사업부의 1,248명 활성 인원 목록입니다.</p>
                        </div>

                        <button
                            className="btn-add-employee"
                            onClick={() => (window.location.href = "/employee-create")}
                        >
                            <span className="material-symbols-outlined">person_add</span>
                            직원 추가
                        </button>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card primary">
                            <p className="stat-label">총 정규직</p>
                            <p className="stat-value">1,092</p>
                        </div>
                        <div className="stat-card secondary">
                            <p className="stat-label">계약직</p>
                            <p className="stat-value">156</p>
                        </div>
                        <div className="stat-card tertiary">
                            <p className="stat-label">평균 근속 연수</p>
                            <p className="stat-value">
                                4.2 <span className="stat-unit">년</span>
                            </p>
                        </div>
                        <div className="stat-card success">
                            <p className="stat-label">성장률 (3분기)</p>
                            <p className="stat-value">+12.4%</p>
                        </div>
                    </div>

                    <div className="filter-grid">
                        <div className="search-container">
                            <span
                                className="material-symbols-outlined"
                                style={{ color: "var(--on-surface-variant)" }}
                            >
                                search
                            </span>
                            <input
                                placeholder="직원 이름 또는 ID로 검색..."
                                type="text"
                            />
                        </div>

                        <div className="select-container">
                            <select>
                                <option value="">모든 부서</option>
                                <option value="engineering">엔지니어링</option>
                                <option value="design">디자인</option>
                                <option value="operations">운영</option>
                                <option value="finance">재무</option>
                            </select>
                        </div>

                        <div className="select-container">
                            <select>
                                <option value="">상태: 전체</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                            </select>
                        </div>

                        <div className="filter-btn">
                            <span className="emp-details">검색</span>
                        </div>
                    </div>

                    <div className="table-card">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>사번</th>
                                        <th>이름</th>
                                        <th>부서</th>
                                        <th>직책</th>
                                        <th>상태</th>
                                        <th style={{ textAlign: "right" }}>관리</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="emp-id">#78224</td>
                                        <td>
                                            <div className="emp-info">
                                                <div className="emp-avatar bg-blue-light">JS</div>
                                                <div className="emp-details">
                                                    <p>Julianne Sterling</p>
                                                    <p>j.sterling@ledger.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="dept-cell">건축 및 기획</td>
                                        <td>
                                            <span className="badge badge-manager">매니저</span>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <span className="status-dot active"></span>
                                                <span className="status-text active">활성</span>
                                            </div>
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => (window.location.href = "/employee-edit")}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="emp-id">#78225</td>
                                        <td>
                                            <div className="emp-info">
                                                <div className="emp-avatar bg-slate-light">MK</div>
                                                <div className="emp-details">
                                                    <p>Marcus Kael</p>
                                                    <p>m.kael@ledger.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="dept-cell">구조 엔지니어링</td>
                                        <td>
                                            <span className="badge badge-admin">관리자</span>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <span className="status-dot active"></span>
                                                <span className="status-text active">활성</span>
                                            </div>
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => (window.location.href = "/employee-edit")}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="emp-id">#78229</td>
                                        <td>
                                            <div className="emp-info">
                                                <div className="emp-avatar bg-blue-light">LT</div>
                                                <div className="emp-details">
                                                    <p>Lana Tesh</p>
                                                    <p>l.tesh@ledger.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="dept-cell">인테리어 디자인</td>
                                        <td>
                                            <span className="badge badge-staff">직원</span>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <span className="status-dot inactive"></span>
                                                <span className="status-text inactive">비활성</span>
                                            </div>
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => (window.location.href = "/employee-edit")}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="emp-id">#78234</td>
                                        <td>
                                            <div className="emp-info">
                                                <div className="emp-avatar bg-tertiary-light">DV</div>
                                                <div className="emp-details">
                                                    <p>Dorian Vance</p>
                                                    <p>d.vance@ledger.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="dept-cell">기업 재무</td>
                                        <td>
                                            <span className="badge badge-staff">직원</span>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <span className="status-dot active"></span>
                                                <span className="status-text active">활성</span>
                                            </div>
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => (window.location.href = "/employee-edit")}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="emp-id">#78241</td>
                                        <td>
                                            <div className="emp-info">
                                                <div className="emp-avatar bg-primary-fade">RB</div>
                                                <div className="emp-details">
                                                    <p>Reese Blackwood</p>
                                                    <p>r.blackwood@ledger.io</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="dept-cell">시스템 엔지니어링</td>
                                        <td>
                                            <span className="badge badge-manager">매니저</span>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <span className="status-dot active"></span>
                                                <span className="status-text active">활성</span>
                                            </div>
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="btn-edit"
                                                onClick={() => (window.location.href = "/employee-edit")}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="table-footer">
                            <p className="footer-info">전체 1,248명 중 1~5번째 직원 표시 중</p>
                            <div className="pagination">
                                <button className="page-btn">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="page-btn active">1</button>
                                <button className="page-btn">2</button>
                                <button className="page-btn">3</button>
                                <button className="page-btn">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withPageStyle(EmployeeManagement, "dashboard.css", pageCss);
