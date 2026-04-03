import { useNavigate } from "react-router-dom";
import { useDepartmentSubmit } from "../../hooks/useDepartmentSubmit"; // 🚩 훅 임포트 확인!

const DepartmentFormEdit = ({ departmentId, isEditMode, initialData }) => {
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting } = useDepartmentSubmit();

  const onSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 폼 데이터를 객체로 변환
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const success = await handleSubmit(departmentId, data, isEditMode);

      if (success) {
        alert(isEditMode ? "수정되었습니다!" : "등록되었습니다!");
        navigate("/department-management");
      }
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 부서 코드 */}
      <div className="form-grid">
        <div className="form-group">
          <label>부서 코드</label>
          <input
            name="deptCode"
            defaultValue={initialData?.deptCode}
            placeholder="예: DEPT-001"
            required
            readOnly={isEditMode}
            style={isEditMode ? { backgroundColor: "#f3f4f5", fontWeight: 600 } : {}}
          />
        </div>

        {/* 부서명 */}
        <div className="form-group">
          <label className="label">부서 이름</label>
          <input
            name="deptName"
            defaultValue={initialData?.deptName}
            placeholder="부서 이름을 입력하세요"
            required
          />
        </div>
        {/* 부서장 정보 */}
        <div className="form-group">
          <label>부서장 이름</label>
          <input name="managerName" defaultValue={initialData?.managerName || "미지정"} />
        </div>
        <div className="form-group">
          <label>부서장 사번</label>
          <input name="managerId" defaultValue={initialData?.managerId || "N/A"} />
        </div>
      </div>

      {/* 부서 설명 */}
      <div className="form-group full-width" style={{ marginTop: "16px" }}>
        <label className="label">부서 설명</label>
        <textarea
          name="description"

          defaultValue={initialData?.description}
          placeholder="업무 범위를 입력하세요..."
          rows={4}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="form-footer" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px", marginRight: "4px" }}>save</span>
          {isSubmitting ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentFormEdit;