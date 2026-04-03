import React from "react";   // 혹시 몰라 입력....
import { useNavigate } from "react-router-dom";
import { useDepartmentSubmit } from "../../hooks/useDepartmentSubmit"; // 🚩 훅 임포트 확인!

const DepartmentForm = ({ departmentId, isEditMode, initialData }) => {
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
    <div className="form-section">
        <form onSubmit={onSubmit}>

          {/* 부서 코드 */}
          <div className="form-group">
            <div className="form-co"> 
              <label className="label">부서 코드</label>
              <input
                className="input-field"
                name="deptCode"
                defaultValue={initialData?.deptCode}
                placeholder="예: DEPT-001"
                required
                readOnly={isEditMode}
                style={isEditMode ? { backgroundColor: "#f3f4f5", cursor: "not-allowed" } : {}}
              />
            </div>

            {/* 부서 이름 */}
            <div className="form-cont"> 
              <label className="label">부서명</label>
              <input
                className="input-field"
                name="deptName"
                defaultValue={initialData?.deptName}
                placeholder="부서 이름을 입력하세요"
                required
              />
            </div>
          </div>

          {/* 부서장 이름 & 사번 */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            <div className="form-co">
              <label className="label">부서장 이름</label>
              <div className="search-field-wrapper">
                <span className="material-symbols-outlined">person</span>
                <input
                  className="input-field"
                  name="managerName"
                  defaultValue={initialData?.managerName}
                  placeholder="성함 입력"
                  required
                />
              </div>
            </div>
            <div className="form-co">
              <label className="label">부서장 사번</label>
              <div className="search-field-wrapper">
                <span className="material-symbols-outlined">person_search</span>
                <input
                  className="input-field"
                  name="managerId"
                  defaultValue={initialData?.managerId}
                  placeholder="사번 입력"
                  required
                />
              </div>
            </div>
          </div>

          {/* 부서 설명 */}
          <div className="form-control" style={{ marginTop: "20px" }}>
            <label className="label">부서 설명</label>
            <textarea
              className="input-field"
              name="description"
              defaultValue={initialData?.description}
              placeholder="부서의 주요 역할 및 업무 범위를 상세히 입력하세요..."
              rows={4}
            />
          </div>

          {/* 버튼 영역 */}
          <div className="form-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default DepartmentForm;