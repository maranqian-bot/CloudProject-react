import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeManagement from "./pages/EmployeeManagement.jsx";
import EmployeeCreate from "./pages/EmployeeCreate.jsx";
import EmployeeEdit from "./pages/EmployeeEdit.jsx";
import DepartmentManagement from "./pages/DepartmentManagement.jsx";
import DepartmentCreate from "./pages/DepartmentCreate.jsx";
import DepartmentEdit from "./pages/DepartmentEdit.jsx";
import AttendanceManagement from "./pages/AttendanceManagement.jsx";
import VacationManagement from "./pages/VacationManagement.jsx";
import VacationRequest from "./pages/VacationRequest.jsx";
import VacationRequestList from "./pages/VacationRequestList.jsx";
import MemberEdit from "./pages/MemberEdit.jsx";
import Login from "./pages/Login.jsx";
import FindPassword from "./pages/FindPassword.jsx";
import ItContact from "./pages/ItContact.jsx";
import useAuthStore from "./store/authStore.js";
import { useEffect } from "react";

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("loginUser");
    
    if (accessToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("저장된 사용자 정보 파싱 실패: ", error);
        localStorage.removeItem("loginUser");
      }
    }
  }, [setUser]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/employee-create" element={<EmployeeCreate />} />
        <Route path="/employee-edit" element={<EmployeeEdit />} />

        <Route path="/department-management" element={<DepartmentManagement />} />
        <Route path="/department-create" element={<DepartmentCreate />} />
        <Route path="/department-edit/:deptid" element={<DepartmentEdit />} />

        <Route path="/attendance-management" element={<AttendanceManagement />} />

        <Route path="/vacation-management" element={<VacationManagement />} />
        <Route path="/vacation-request" element={<VacationRequest />} />
        <Route path="/vacation-request-list" element={<VacationRequestList />} />

        <Route path="/member-edit" element={<MemberEdit />} />

        <Route path="/login" element={<Login />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/it-contact" element={<ItContact />} /> 
      </Routes>
    </Router>
  );
}

export default App;