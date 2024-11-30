// import React, { useState, useEffect } from 'react';
// import { getEmployees, deleteEmployee } from '../services/employeeService';

// const EmployeeList = ({ refreshList }) => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchEmployees();
//   }, [page, search,refreshList]);

//   const fetchEmployees = async () => {
//     try {
//       // const { data, totalPages } = await getEmployees(page, search);
//       const response = await getEmployees(page, search);
//       setEmployees(response.employees);
//       setTotalPages(response.totalPages);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteEmployee(id);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Employee List</h2>
//       <input
//         type="text"
//         placeholder="Search employees..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <table border="1">
//         <thead>
//           <tr>
//           <th>Image</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Designation</th>
//             <th>Gender</th>
//             <th>Course</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//   {employees.length > 0 ? (
//     employees.map((employee) => (
//       <tr key={employee.id}>
//         <td>
//                   <img
//                     src={employee.image}
//                     alt={employee.name}
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 </td>
//         <td>{employee.name}</td>
//         <td>{employee.email}</td>
//         <td>{employee.mobile}</td>
//         <td>{employee.designation}</td>
//         <td>{employee.gender}</td>
//         <td>{employee.course.join(', ')}</td>
//         <td>
//           <button onClick={() => handleDelete(employee._id)}>Delete</button>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="7">No employees found.</td>
//     </tr>
//   )}
// </tbody>

//       </table>
//       <div>
//         <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';

const styles = {
  container: {
    padding: '20px',
    width: '100%',
    overflow: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    color: '#2d3748',
    margin: '0'
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
    width: '300px',
    fontSize: '14px',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    borderBottom: '2px solid #e2e8f0'
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#4a5568'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
    padding: '16px'
  },
  pageButton: {
    padding: '8px 16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#4a5568'
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
    cursor: 'not-allowed'
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  noData: {
    textAlign: 'center',
    padding: '24px',
    color: '#4a5568',
    backgroundColor: '#f8fafc'
  }
};

// Add hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .table-row:hover {
    background-color: #f8fafc;
  }
  
  .delete-btn:hover {
    background-color: #DC2626;
  }
  
  .page-btn:hover:not(:disabled) {
    background-color: #357ABD;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 1px #4A90E2;
  }
`;
document.head.appendChild(styleSheet);

const EmployeeList = ({ refreshList }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page, search, refreshList]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(page, search);
      setEmployees(response.employees);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Employee List</h2>
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
          className="search-input"
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="table-row">
                <td style={styles.td}>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    style={styles.profileImage}
                  />
                </td>
                <td style={styles.td}>{employee.name}</td>
                <td style={styles.td}>{employee.email}</td>
                <td style={styles.td}>{employee.mobile}</td>
                <td style={styles.td}>{employee.designation}</td>
                <td style={styles.td}>{employee.gender}</td>
                <td style={styles.td}>{employee.course.join(', ')}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    style={styles.deleteButton}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={styles.noData}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            ...styles.pageButton,
            ...(page === 1 ? styles.disabledButton : {})
          }}
          className="page-btn"
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            ...styles.pageButton,
            ...(page === totalPages ? styles.disabledButton : {})
          }}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;