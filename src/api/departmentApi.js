import axiosInstance from "./axiosInstance";

/**
 * 부서 등록 (POST)
 * @param {Object} deptData - 등록할 부서 정보 (ReqDeptDTO)
 * @returns {Promise<number>} - 생성된 부서 ID(deptid) 반환
 */
export const createDepartmentApi = async (deptData) => {
  try {
    const response = await axiosInstance.post("/api/departments", deptData);
    return response.data;
  } catch (error) {
    console.error("부서 등록 실패 : ", error);
    throw error;
  }
};

/**
 * 부서 전체 목록 조회 (GET)
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지당 항목 수
 * @returns {Promise<Object>} - 페이징된 부서 목록 (Page<ResDeptDTO>)
 */
export const getDepartmentListApi = async (page = 0, size = 5) => {
  try {
    const response = await axiosInstance.get("/api/departments", {
      params: {
        page: page,
        size: size,
        sort: "deptid,desc"  //  최근 등록순 정렬
      },
    });
    // Spring Data Page 객체 그대로 반환 
    return response.data;
  } catch (error) {
    console.error("부서 목록 조회 실패 : ", error);
    throw error;
  }
};

/**
 * 부서 상세 조회 (GET)
 * @param {number} deptid - URL 경로 변수 (PathVariable)로 전달될 부서 ID
 */
export const getDepartmentDetailApi = async (deptid) => {
  try {
    const response = await axiosInstance.get(`/api/departments/${deptid}`);
    return response.data;
  } catch (error) {
    console.error("부서 상세 조회 실패 : ", error);
    throw error;
  }
};

/**
 * 부서 정보 수정 (PUT)
 * @param {number} deptid - URL 경로 변수 (PathVariable)
 * @param {Object} deptData - 수정할 내용 (ReqDeptDTO)
 */
export const updateDepartmentApi = async (deptid, deptData) => {
  try {
    const response = await axiosInstance.put(`/api/departments/${deptid}`, deptData);
    return response.data;
  } catch (error) {
    console.error("부서 수정 실패 : ", error);
    throw error;
  }
};

/**
 * 부서 삭제 (DELETE)
 * @param {number} deptid - URL 경로 변수 (PathVariable)
 */
export const deleteDepartmentApi = async (deptid) => {
  try {
    await axiosInstance.delete(`/api/departments/${deptid}`);
  } catch (error) {
    console.error("부서 삭제 실패:", error);
    throw error;
  }
};
