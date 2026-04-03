import { useNavigate } from "react-router-dom";
import { useDepartmentSubmit } from "../../hooks/useDepartmentSubmit"; // 🚩 훅 임포트 확인!

const DepartmentForm = ({ departmentId, isEditMode, initialData }) => {
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting } = useDepartmentSubmit();

  const onSubmit = async (e) => {
    e.prevenDefault(); // 페이지 새로고침 방지

    // 폼 데이터를 객체로 변환
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const success = await handleSubmit(departmentId, data, isEditMode);

      if (success) {
        alert("성공적으로 저장되었습니다!");
        navigate("/department-management");
      }
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="card">
      <div className="form-group-grid">
        {/* 부서 코드 */}
        <div className="form-control">
          <label className="label">부서 코드</label>
          <input
            name="deptCode"
            className="input-field"
            defaultValue={initialData?.deptCode}
            placeholder="예: DEPT-001"
            required
          />
        </div>

        {/* 부서명 */}
        <div className="form-control">
          <label className="label">부서명</label>
          <input
            name="deptName"
            className="input-field"
            defaultValue={initialData?.deptName}
            placeholder="부서 이름을 입력하세요"
            required
          />
        </div>
      </div>

      {/* 부서 설명 */}
      <div className="form-control" style={{ marginTop: "16px" }}>
        <label className="label">부서 설명</label>
        <textarea
          name="description"
          className="input-field"
          defaultValue={initialData?.description}
          placeholder="업무 범위를 입력하세요..."
          rows={4}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="form-footer" style={{ marginTop: "24px", display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;