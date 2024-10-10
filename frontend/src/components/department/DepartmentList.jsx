import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]); // State to hold all departments
  const [depLoading, setDepLoading] = useState(false); // Loading state
  const [filterDepartments, setFilterDepartments] = useState([]); // Filtered departments state

  // Fetch departments from API
  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1, // Serial number for the department
          dep_name: dep.dep_name, // Department name
          action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} /> // Action buttons
        }));
        setDepartments(data); // Set the departments
        setFilterDepartments(data); // Initially set the filtered departments
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  // Delete department function
  const onDepartmentDelete =  () => {
   fetchDepartments()
  
  };

  // Handle search/filter input
  const handleFilter = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterDepartments(records); // Update filtered departments based on search
  };

  useEffect(() => {
    fetchDepartments(); // Fetch departments on component mount
  }, []);

  return (
    <>
      {depLoading ? 
        <div>Loading ....</div>
      : 
        <div className="container mx-auto p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="px-4 py-0.5 border rounded w-1/4"
              onChange={handleFilter} // Use handleFilter function for searching
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filterDepartments} pagination/> {/* Use filtered departments */}
          </div>
        </div>
      }
    </>
  );
};

export default DepartmentList;
