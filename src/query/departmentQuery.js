import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDepartmentApi, deleteDepartmentApi, getDepartmentDetailApi, getDepartmentListApi, updateDepartmentApi } from "../api/departmentApi";


// 부서 등록 Mutation
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]); // invalidateQueries: 등록 후 목록 갱신
    },
  });
};

// 부서 목록 조회 Query
export const useDepartment = (page, size) => {
  return useQuery({
    queryKey:["departments", page, size],
    queryFn: () => getDepartmentListApi(page, size),
    keepPreviousData: true,
  });
};

// 부서 상세 조회 Query
export const useDepartmentDetail = (deptid) => {
  return useQuery({
    queryKey:["department", deptid],
    queryFn: () => getDepartmentDetailApi(deptid),
    enabled: !!deptid,   // deptid가 있을 때만 실행
  });
};

// 부서 정보 수정 Mutation
export const useUpdateDepartment = (deptid) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deptData) => updateDepartmentApi(deptid, deptData),
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      queryClient.invalidateQueries("departments", deptid);
    },
  });
};

// 부서 삭제 Mutation
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });
};