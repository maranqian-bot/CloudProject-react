import { useState } from "react";

// 부서 관리 통합 훅 (부서 목록)

export const useDepartmentList = (initialSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(initialSize);
}
