import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]); // State to hold all employees
  const [empLoading, setEmpLoading] = useState(false); // Loading state
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered employees state

  // Fetching employees from the API
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/employee', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data); // Log the response to verify the data structure

      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++, // Serial number
          dep_name: emp.department ? emp.department.dep_name : 'N/A', // Safely access department name
          name: emp.userId ? emp.userId.name : 'Unknown', // Safely access employee name
          dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : 'N/A', // Format date of birth
          role: emp.userId ? emp.userId.role : 'N/A', // Fetch role from userId
          salary:emp.salary,
          profileImage: emp.userId && emp.userId.profileImage ? (
            <img 
              width={40} 
              className='rounded-full' 
              src={`http://localhost:3000/${emp.userId.profileImage}`} 
              alt="Profile" 
            />
          ) : 'No Image', // Handle profile image
          action: <EmployeeButtons Id={emp._id} onEmployeeDelete={onEmployeeDelete} />, // Action buttons
        }));
        setEmployees(data); // Set the employees
        setFilteredEmployees(data); // Initially set the filtered employees
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  const onEmployeeDelete = () => {
    fetchEmployees(); // Refresh the employee list after deletion
  };

  // Handle search/filter input
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm) // Filter by employee name
    );
    setFilteredEmployees(records); // Update filtered employees based on search
  };

  return (
    <div className="container mx-auto p-5">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-0.5 border rounded w-1/4"
          onChange={handleFilter} // Search employees by name
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        {empLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable 
            columns={columns} 
            data={filteredEmployees} // Use the filtered employees list
            pagination 
          />
        )}
      </div>
    </div>
  );
};

export default List;
