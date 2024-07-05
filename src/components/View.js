// import React from "react";
// import ModalsVD from "../components/Modals/ModalsVD.js";
// import ModalsVE from "../components/Modals/ModalsVE.js";
// import ModalsVV from "../components/Modals/ModalsVV.js";
// import "../components/styling/View.css";

// const View = () => {
//   return (
//     <div className="container">
//       <h3 className="text-start mb-3">View</h3>
//       <div className="card">
//         <div className="card-body p-5">
//           <div className="table-responsive">
//             <table class="table table-bordered  rounded-3 table-striped">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Title</th>
//                   <th scope="col">Requestor</th>
//                   <th scope="col">Request Date</th>
//                   <th scope="col">Request Title</th>
//                   <th scope="col">Request Detail</th>
//                   <th scope="col">Due Date</th>
//                   <th scope="col">User Maker</th>
//                   <th scope="col">User Approval 1</th>
//                   <th scope="col">User Approval 2</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row">1</th>
//                   <td>Mark</td>
//                   <td>Otto</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td className="gap-2">
//                     <ModalsVE />
//                     <ModalsVD />
//                     <ModalsVV />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th scope="row">2</th>
//                   <td>Jacob</td>
//                   <td>Thornton</td>
//                   <td>@fat</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>
//                     <ModalsVE />
//                     <ModalsVD />
//                     <ModalsVV />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th scope="row">3</th>
//                   <td>Larry the Bird</td>
//                   <td>@twitter</td>
//                   <td>@twitter</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>@mdo</td>
//                   <td>
//                     <ModalsVE />
//                     <ModalsVD />
//                     <ModalsVV />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar.jsx";
// import ModalsVD from "../components/Modals/ModalsVD.js";
import ModalsVE from "../components/Modals/ModalsVE.js";
import ModalsVV from "../components/Modals/ModalsVV.js";
import "../components/styling/View.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVfVVNFUiI6dHJ1ZSwiZXhwIjoxNzE5MjA5MTQ1LCJpYXQiOjE3MTkyMDU1NDV9.dbdUKS0sc8XXeEaatuQAs8Nm2JSNhnClmJPIe1agFCJEIxV04yQe-ND3u_xoEs373ZbeTlY-faXiQZ-Ai2vQKg";
const View = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get("http://10.8.135.84:18080/internal-memo-service/form/list", { headers });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const data = {id};
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(`http://10.8.135.84:18080/internal-memo-service/form/delete/`, { headers, data });
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  const removeData = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        console.log(id);
        await deleteData(id);
        fetchData();
        MySwal.fire("Deleted!", "Your item has been deleted.", "success");
      } catch (error) {
        console.error(error);
        MySwal.fire("Error!", "There was an error deleting the item.", "error");
      }
    }
  };

  return (
    <div className="row">
      <div className="col-2">
        <Sidebar/>
      </div>
      <div className="container col-10">
        <h3 className="text-start mb-3">View</h3>
            <div className="table-responsive">
              <table className="table table-bordered  rounded-3 table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Requestor</th>
                    <th scope="col">Request Date</th>
                    <th scope="col">Request Title</th>
                    <th scope="col">Request Detail</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">User Maker</th>
                    <th scope="col">User Approval 1</th>
                    <th scope="col">User Approval 2</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td>1</td>
                    <td>title</td>
                    <td>requestor</td>
                    <td>reqdate</td>
                    <td>Reqtitle</td>
                    <td>reqdet</td>
                    <td>duedua</td>
                    <td>usermaker</td>
                    <td>userapprove</td>
                    <td>userapprove</td>
                    <td className="gap-2">
                        <ModalsVE />
                        <ModalsVD />
                        <ModalsVV />
                      </td>
                  </tr> */}
                  {data.map((item, index) => (
                    <tr key={index}>
                      <th >{item.id}</th>
                      <td>{item.title}</td>
                      <td>{item.requestor}</td>
                      <td>{item.requestDate}</td>
                      <td>{item.requestTitle}</td>
                      <td>{item.requestDetail}</td>
                      <td>{item.dueDate}</td>
                      <td>{item.userMaker}</td>
                      <td>{item.userApproval1}</td>
                      <td>{item.userApproval2}</td>
                      <td className="gap-2">
                        <ModalsVE />
                        {/* <ModalsVD /> */}
                        <button className="btn btn-danger" onClick={()=>removeData(item.id)}>Delete</button>
                        <ModalsVV />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
};

export default View;
