import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDepartmentApi, deleteDepartmentApi, getDepartmentDetailApi, getDepartmentListApi, updateDepartmentApi } from "../api/departmentApi";


// 부서 등록 Mutation
export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]); // invalidateQueries: 등록 후 목록 갱신
    },
  });
};

// 부서 목록 조회 Query
export const useDepartmentQuery = (page, size) => {

  return useQuery({
    queryKey:["departments", page, size],
    queryFn: () => getDepartmentListApi(page, size, "departmentId,desc"),
    keepPreviousData: true,
  });
};

// 부서 상세 조회 Query
export const useDepartmentDetailQuery = (departmentId) => {
  return useQuery({
    queryKey:["department", departmentId],
    queryFn: () => getDepartmentDetailApi(departmentId),
    enabled: !!departmentId,   // departmentId가 있을 때만 실행
  });
};

// 부서 정보 수정 Mutation
export const useUpdateDepartmentMutation = () => { 
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ departmentId, data }) => updateDepartmentApi(departmentId, data ), 
    onSuccess: ( responseData , variables) => {
      // 전체 목록 새로고침
      queryClient.invalidateQueries(["departments"]);

      // 특정 부서 상세 데이터 새로고침
      queryClient.invalidateQueries(["department", variables.departmentId]); //캐시 갱신
    },
    onError: (error) => {
      const mag = error.response?.data || "수정 중 오류가 발생했습니다.";
      alert(msg);
    },
    
  });
};

// 부서 삭제 Mutation
export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });
};