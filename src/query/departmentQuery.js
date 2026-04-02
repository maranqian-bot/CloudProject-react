import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDepartmentApi, deleteDepartmentApi, getDepartmentDetailApi, getDepartmentListApi, updateDepartmentApi, getDepartmentStatsApi } from "../api/departmentApi";
import { useDepartmentDerivedState } from "../hooks/useDepartmentDerivedState";


// 부서 등록 Mutation
export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] }); // invalidateQueries: 등록 후 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["departmentStats"] });
    },
  });
};

// 부서 목록 + 통계 통합 조회 Query
export const useDepartmentQuery = (page, size) => {
  // 목록 쿼리
  const listQuery = useQuery({
    queryKey: ["departments", page, size],
    queryFn: () => getDepartmentListApi(page, size, "departmentId,desc"),
    placeholderData: keepPreviousData,
  });

  // 통계 쿼리 (새로 추가)
  const statsQuery = useQuery({
    queryKey: ["departmentStats"],
    queryFn: getDepartmentStatsApi,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  // 계산관리 훅으로 데이터 합치기
  const derivedState = useDepartmentDerivedState(
    listQuery.data,
    statsQuery.data,
    page,
    size
  );

  return {
    ...derivedState,
    isLoading: listQuery.isLoading || statsQuery.isLoading,
    isStatsLoading: statsQuery.isLoading
  };
};

// 부서 상세 조회 Query
export const useDepartmentDetailQuery = (departmentId) => {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => getDepartmentDetailApi(departmentId),
    enabled: !!departmentId,   // departmentId가 있을 때만 실행
  });
};

// 부서 정보 수정 Mutation
export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ departmentId, data }) => updateDepartmentApi(departmentId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department", variables.departmentId] }); //캐시 갱신
    },
  });
};

// 부서 삭제 Mutation
export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["departmentStats"] }); // 삭제시 통계 다시 계산
    },
  });
};