import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function DepartmentManagement() {
    return (
        <>
        <Sidebar />
        <Header />
        <main>
            <div className="content-canvas">
            <div className="page-header">
                <div>
                <div className="breadcrumbs">조직 관리 / 부서 관리</div>
                <h1 className="page-title">부서 관리</h1>
                </div>

                <div className="header-actions">
                <button className="btn-dark">
                    <span className="material-symbols-outlined">download</span>
                    엑셀 내보내기
                </button>

                <button
                    className="btn-add"
                    onClick={() => (window.location.href = "/department-create")}
                >
                    <span className="material-symbols-outlined">add</span>
                    부서 추가
                </button>
                </div>
            </div>

            <section className="table-container">
                <div className="table-header">
                <div className="search-bar">
                    <span className="material-symbols-outlined">search</span>
                    <input
                    type="text"
                    placeholder="부서명 또는 부서장으로 검색..."
                    />
                </div>

                <button className="btn-dark">
                    <span className="material-symbols-outlined">neurology</span>
                    진단 요청하기
                </button>
                </div>

                <table>
                <thead>
                    <tr>
                    <th>코드</th>
                    <th>부서명</th>
                    <th>부서장</th>
                    <th>인원</th>
                    <th>평균 근속</th>
                    <th style={{ textAlign: "right" }}>관리</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    <td className="code-cell">FIN-001</td>
                    <td className="name-cell">재무전략본부</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">J</div>
                        <span>제임스 카터</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-blue">32명</span>
                    </td>
                    <td>4.8년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>

                    <tr>
                    <td className="code-cell">HR-015</td>
                    <td className="name-cell">인사혁신실</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">A</div>
                        <span>아멜리아 레이</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-violet">18명</span>
                    </td>
                    <td>3.6년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>

                    <tr>
                    <td className="code-cell">MKT-042</td>
                    <td className="name-cell">성장 및 전략</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">E</div>
                        <span>엘레나 룬드</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-green">+85</span>
                    </td>
                    <td>5.1년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>

                    <tr>
                    <td className="code-cell">MKT-042</td>
                    <td className="name-cell">성장 및 전략</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">E</div>
                        <span>엘레나 룬드</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-green">+85</span>
                    </td>
                    <td>5.1년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>

                    <tr>
                    <td className="code-cell">MKT-042</td>
                    <td className="name-cell">성장 및 전략</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">E</div>
                        <span>엘레나 룬드</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-green">+85</span>
                    </td>
                    <td>5.1년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>

                    <tr>
                    <td className="code-cell">MKT-042</td>
                    <td className="name-cell">성장 및 전략</td>
                    <td>
                        <div className="manager-cell">
                        <div className="avatar-shell">E</div>
                        <span>엘레나 룬드</span>
                        </div>
                    </td>
                    <td>
                        <span className="status-badge status-green">+85</span>
                    </td>
                    <td>5.1년</td>
                    <td style={{ textAlign: "right" }}>
                        <button
                        className="btn-edit"
                        onClick={() => (window.location.href = "/department-edit")}
                        >
                        상세 보기
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>

                <div className="pagination">
                <button className="page-btn">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
                </div>
            </section>
            </div>
        </main>
        </>
    );
}

export default DepartmentManagement;