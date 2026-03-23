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

function App() {
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
        <Route path="/department-edit" element={<DepartmentEdit />} />

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