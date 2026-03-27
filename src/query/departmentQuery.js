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
    queryFn: () => getDepartmentListApi(page, size),
    keepPreviousData: true,
  });
};

// 부서 상세 조회 Query
export const useDepartmentDetailQuery = (deptid) => {
  return useQuery({
    queryKey:["department", deptid],
    queryFn: () => getDepartmentDetailApi(deptid),
    enabled: !!deptid,   // deptid가 있을 때만 실행
  });
};

// 부서 정보 수정 Mutation
export const useUpdateDepartmentMutation = () => { 
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deptid, data }) => updateDepartmentApi(deptid, data), 
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["departments"]);
      queryClient.invalidateQueries(["department", variables.deptid]); //캐시 갱신
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