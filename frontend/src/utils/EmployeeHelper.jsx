import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: '90px'
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: '190px'
  },
  {
    name: "Image",
   selector : (row) => row.profileImage ,
    width: '100px'
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: '170px'
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: '140px'
  },

  {
    name: "Salary",
    selector: (row) => row.salary,
    sortable: true,
    width: '140px'
  },
  {
    name: "Action",
    selector: (row) => row.action,
  }
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      return response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
};


export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
employees = response.data.employees
}
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees
};



export const EmployeeButtons = ({ Id, onEmployeeDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) =>{
    const confirm = window.confirm("Do you Want to delete?")
    if(confirm){

    try{
      const response = await axios.delete(`http://localhost:3000/api/employee/${id}`,{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      });


      if (response.data.success) {
        onEmployeeDelete()

      }
    }catch(error){

      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  };


  return (
    <div className="flex space-x-3">
      <button
        className="px-2 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>
      <button className="px-2 py-1 bg-blue-600 text-white rounded"
      onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}

      >
        Edit
      </button>

      <button className="px-3 py-1 bg-red-600 text-white rounded"
      onClick= {() => handleDelete(Id)}
      >Delete</button>

    </div>
  );
};
