import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Sidebar from "../Sidebar";
import './Create.css';


import DropFileInput from "./drop-file-input/DropFileInput";

const MySwal = withReactContent(Swal);



function Create() {
  const [formData, setFormData] = useState({
    Title: "",
    Nomor: "",
    Requestor: "",
    RequestDate: "",
    RequestTitle: "",
    RequestDetail: "",
    CreateDate: "",
    DueDate: "",
    StatusMemo: "",
    UserApproval1Note: "",  
    UserApproval2Note: "",
    UserApproval1Name: "",
    UserApproval2Name: "",
    // files: []
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [isUploading, setIsUploading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (files) => {
    setSelectedFiles(files);
  };

  // const handleUploadClick = async () => {
  //   setIsUploading(true);

  //   try {
  //     const formDataToSend = new FormData();
  //     for (const file of selectedFiles) {
  //       formDataToSend.append("files", file);
  //     }
  //     for (const key in formData) {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //     const headers = { Authorization: `Bearer ${token}` };
  //     const response = await axios.post("http://10.8.135.84:18080/internal-memo-service/form/add", {headers})
  //       },
  //     });

  //     MySwal.fire("Success!", "File uploaded successfully!", "success");
  //   } catch (error) {
  //     MySwal.fire("Error!", "Error uploading file.", "error");
  //   } finally {
  //     setIsUploading(false);
  //     setUploadProgress(0);
  //   }
  // };




  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVfVVNFUiI6dHJ1ZSwiZXhwIjoxNzE5MjAyNDYxLCJpYXQiOjE3MTkxOTg4NjF9.3KCe4GYQW699jU788BsEfCjA9Z2lB4yZtBszHXHk9wIvjUCe-TnNTBJUIRBCgZHlq_FOot7Ode78y5eN1bbSmQ"; // Replace this with your actual token retrieval mechanism
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    
    console.log("Submitting form with data:", filteredFormData);
    
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the form?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, submit it!",
    });
  
    if (result.isConfirmed) {
      try {
        const formDataToSend = new FormData();
        for (const key in filteredFormData) {
          formDataToSend.append(key, filteredFormData[key]);
        }
        // // Append the selected files to the FormData
        // for (const file of selectedFiles) {
        //   formDataToSend.append("files", file);
        // }
    
        const response = await axios.post("http://10.8.135.84:18080/internal-memo-service/form/add", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/json'
          },
        });
    
        console.log("Response:", response.data);
  
        MySwal.fire("Submitted!", "Your form has been submitted.", "success").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error submitting form:", error.response ? error.response.data : error.message);
        MySwal.fire("Error!", "There was an error submitting the form.", "error");
      }
    }
  };
  


  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const result = await MySwal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to submit the form?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     cancelButtonText: "No, cancel!",
  //     confirmButtonText: "Yes, submit it!",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       // Send formData to backend for processing
        
  //       const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVfVVNFUiI6dHJ1ZSwiZXhwIjoxNzE4OTU2NTcwLCJpYXQiOjE3MTg5NTI5NzB9.CEQveUy0bUmtMrmegjRKdxA0XQga24_KTPeCDhwDMtf3FQyQng4-DWbSRwLvqxda0is6Br0NY2W8X6M_ppj3vA";


  //       const headers = { Authorization: `Bearer ${token}` };

  //       const formDataToSend = new FormData();
  //       for (const key in formData) {
  //         if (formData.hasOwnProperty(key)) {
  //           formDataToSend.append(key, formData[key]);
  //         }
  //       }

  //       const response = await axios.post("http://10.8.135.84:18080/internal-memo-service/form/add", formDataToSend, {headers});
  //       console.log(response.data);
  //       //"/api/upload diubah dengan endpoint yang sudah ada"
  //       MySwal.fire("Submitted!", "Your form has been submitted.", "success");
  //     } catch (error) {
  //       MySwal.fire("Error!", "There was an error submitting the form.", "error");
  //     }
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   

  return (


    // <div className="row">
    //   <div className="col-2">
    //     <Sidebar />
    //   </div>
      
    //   <div className="mt-2 col-10">
    //     <h3 className="text-start mb-3">Create</h3>
    //     <div>
    //       <form className="form-group" onSubmit={handleSubmit}>
    //         {/* Form input fields */}
    //         {Object.keys(formData).map((key) => (
    //           <div className="row text-start mb-3" key={key}>
    //             <label htmlFor={key} className="col-2 col-form-label">
    //               {key}:
    //             </label>
    //             <div className="col-10">
    //               <input
    //                 type={key.includes("Date") ? "date" : "text"}
    //                 className="form-control"
    //                 id={key}
    //                 name={key}
    //                 value={formData[key]}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //           </div>
    //         ))}

    //         <div className="mb-3 text-end p-5">
    //           <button type="submit" className="btn btn-primary">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="row">
           <div className="col-2">
             <Sidebar />
           </div>
    
           <div className="mt-2 col-10">
             <h3 className="text-start mb-3">Create</h3>
             <div className="">
               <form className="form-group" onSubmit={handleSubmit}>

                 <div className="row text-start mb-3">
                 <label htmlFor="Title" className="col-2 col-form-label">
                     Title:
                   </label>
                   <div className="col-10">
                     <input 
                      type="text" 
                      className="form-control" 
                      id="Title" 
                      name="Title" 
                      value={formData.Title} 
                      onChange={handleChange} />
                   </div>
                 </div>

                 <div className="row text-start mb-3">
                 <label htmlFor="Nomor" className="col-2 col-form-label">
                     Nomor:
                   </label>
                   <div className="col-10">
                     <input 
                      type="text" 
                      className="form-control" 
                      id="Nomor" 
                      name="Nomor" 
                      value={formData.Nomor} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="row text-start mb-3">
                   <label htmlFor="Requestor" className="col-2 col-form-label">
                     Requestor:
                   </label>
                   <div className="col-10">
                     <select 
                      className="form-select" 
                      id="Requestor" 
                      name="Requestor" 
                      value={formData.Requestor} 
                      onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="test1">test1</option>
                        {/* Requestor options */}
                     </select>
                  </div>
                 </div>
    
                 <div className="row mb-3 text-start">
                   <label htmlFor="RequestDate" className="col-2 col-form-label">
                     Request Date:
                   </label>
                   <div className="col-10">
                     <input 
                      type="date" 
                      className="form-control" 
                      id="RequestDate" 
                      name="RequestDate" 
                      value={formData.RequestDate} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="mb-3 text-start row">
                   <label htmlFor="RequestTitle" className="col-2 col-form-label">
                     Request Title:
                   </label>
                   <div className="col-10">
                     <input 
                      type="text" 
                      className="form-control" 
                      id="RequestTitle" 
                      name="RequestTitle" 
                      value={formData.RequestTitle} 
                      onChange={handleChange} />
                   </div>
                 </div>

                 <div className="mb-3 text-start row">
                   <label htmlFor="RequestDetail" className="col-2 col-form-label">
                     Request Detail:
                   </label>
                   <div className="col-10">
                     <textarea 
                      type="text" 
                      className="form-control" 
                      id="RequestDetail" 
                      name="RequestDetail" 
                      value={formData.RequestDetail} 
                      onChange={handleChange} />
                   </div>
                 </div>

                 <div className="mb-3 text-start row">
                   <label htmlFor="CreateDate" className="col-2 col-form-label">
                     Create Date:
                   </label>
                   <div className="col-10">
                     <input 
                      type="date" 
                      className="form-control" 
                      id="CreateDate" 
                      name="CreateDate" 
                      value={formData.CreateDate} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="mb-3 text-start row">
                   <label htmlFor="DueDate" className="col-2 col-form-label">
                     Due Date:
                   </label>
                   <div className="col-10">
                     <input 
                      type="date" 
                      className="form-control" 
                      id="DueDate" 
                      name="DueDate" 
                      value={formData.DueDate} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="mb-3 text-start row">
                   <label htmlFor="StatusMemo" className="col-2 col-form-label">
                     Status Memo:
                   </label>
                   <div className="col-10">
                     <select 
                      className="form-select" 
                      id="StatusMemo" 
                      name="StatusMemo" 
                      value={formData.StatusMemo} 
                      onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="test3">test3</option>
                     </select>
                   </div>
                 </div>
                 
                 <div className="mb-3 text-start row">
                   <label htmlFor="UserApproval1Note" className="col-2 col-form-label">
                     User Approval 1 Note:
                   </label>
                   <div className="col-10">
                     <textarea 
                      className="form-control" 
                      id="UserApproval1Note" 
                      name="UserApproval1Note" 
                      value={formData.UserApproval1Note} 
                      onChange={handleChange} />
                   </div>
                 </div>

                 <div className="mb-3 text-start row">
                   <label htmlFor="UserApproval2Note" className="col-2 col-form-label">
                     User Approval 2 Note:
                   </label>
                   <div className="col-10">
                     <textarea 
                      className="form-control" 
                      id="UserApproval2Note" 
                      name="UserApproval2Note" 
                      value={formData.UserApproval2Note} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="mb-3 text-start row">
                   <label htmlFor="UserApproval1Name" className="col-2 col-form-label">
                     User Approval 1 Name:
                   </label>
                   <div className="col-10">
                     <input 
                      type="text" 
                      className="form-control" 
                      id="UserApproval1Name" 
                      name="UserApproval1Name" 
                      value={formData.UserApproval1Name} 
                      onChange={handleChange} />
                   </div>
                 </div>

                 <div className="mb-3 text-start row">
                   <label htmlFor="UserApproval2Name" className="col-2 col-form-label">
                     User Approval 2 Name:
                   </label>
                   <div className="col-10">
                   <input 
                      type="text" 
                      className="form-control" 
                      id="UserApproval2Name" 
                      name="UserApproval2Name" 
                      value={formData.UserApproval2Name} 
                      onChange={handleChange} />
                   </div>
                 </div>
    
                 <div className="container d-flex justify-content-center">
                  <div className="card" style={{ width: "500px", maxWidth: "50%" }}>
                    <DropFileInput onFileChange={handleFileChange} />
                    
                  </div>
                </div>
    
                 <div className="mb-3 text-end p-5">
                   <button className="btn btn-primary" type="submit">
                     Submit
                   </button>
                 </div>
               </form>
             </div>
          </div>
         </div>
  );
}

export default Create;


// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Sidebar from "../Sidebar";
// import "./Create.css";
// import DropFileInput from "./drop-file-input/DropFileInput";

// const MySwal = withReactContent(Swal);

// function Create() {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Requestor: "",
//     RequestDate: "",
//     RequestTitle: "",
//     RequestDetail: "",
//     DueDate: "",
//     DocumentType: "",
//     UserMaker: "",
//     UserApproval1: "",
//     UserApproval2: "",
//   });

//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (files) => {
//     setSelectedFiles(files);
//   };

//   const handleUploadClick = async () => {
//     setIsUploading(true);

//     try {
//       const formDataToSend = new FormData();
//       for (const file of selectedFiles) {
//         formDataToSend.append("files", file);
//       }
//       for (const key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }

//       await axios.post("http://localhost:18080/internal-memo-sevice/form/file-upload", formDataToSend, {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percentCompleted);
//         },
//       });

//       MySwal.fire("Success!", "File uploaded successfully!", "success").then(() => {
//         window.location.reload(); // Refresh the page on success
//       });
//     } catch (error) {
//       MySwal.fire("Error!", "Error uploading file.", "error");
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Submitting form with data:", formData);

//     const result = await MySwal.fire({
//       title: "Are you sure?",
//       text: "Do you want to submit the form?",
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonText: "No, cancel!",
//       confirmButtonText: "Yes, submit it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVfVVNFUiI6dHJ1ZSwiZXhwIjoxNzE4OTU2NTcwLCJpYXQiOjE3MTg5NTI5NzB9.CEQveUy0bUmtMrmegjRKdxA0XQga24_KTPeCDhwDMtf3FQyQng4-DWbSRwLvqxda0is6Br0NY2W8X6M_ppj3vA"; // Replace this with your actual token retrieval mechanism

//         // Send formData to backend for processing
//         await axios.post("http://10.8.135.84:18080/internal-memo-service/form/add", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         MySwal.fire("Submitted!", "Your form has been submitted.", "success").then(() => {
//           window.location.reload(); // Refresh the page on success
//         });
//       } catch (error) {
//         MySwal.fire("Error!", "There was an error submitting the form.", "error");
//       }
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     console.log(`Changing ${name} to ${value}`);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="row">
//       <div className="col-2">
//         <Sidebar />
//       </div>

//       <div className="mt-2 col-10">
//         <h3 className="text-start mb-3">Create</h3>
//         <div className="">
//           <form className="form-group" onSubmit={handleSubmit}>
//             <div className="row text-start mb-3">
//               <label htmlFor="Title" className="col-2 col-form-label">
//                 Title:
//               </label>
//               <div className="col-10">
//                 <input type="text" className="form-control" id="Title" name="Title" value={formData.Title} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="row text-start mb-3">
//               <label htmlFor="Requestor" className="col-2 col-form-label">
//                 Requestor:
//               </label>
//               <div className="col-10">
//                 <select className="form-select" id="Requestor" name="Requestor" value={formData.Requestor} onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="test1">test1</option>
//                   {/* Requestor options */}
//                 </select>
//               </div>
//             </div>

//             <div className="row mb-3 text-start">
//               <label htmlFor="RequestDate" className="col-2 col-form-label">
//                 Request Date:
//               </label>
//               <div className="col-10">
//                 <input type="date" className="form-control" id="RequestDate" name="RequestDate" value={formData.RequestDate} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="RequestTitle" className="col-2 col-form-label">
//                 Request Title:
//               </label>
//               <div className="col-10">
//                 <input type="text" className="form-control" id="RequestTitle" name="RequestTitle" value={formData.RequestTitle} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="DueDate" className="col-2 col-form-label">
//                 Due Date:
//               </label>
//               <div className="col-10">
//                 <input type="date" className="form-control" id="DueDate" name="DueDate" value={formData.DueDate} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="DocumentType" className="col-2 col-form-label">
//                 Document Type:
//               </label>
//               <div className="col-10">
//                 <select className="form-select" id="DocumentType" name="DocumentType" value={formData.DocumentType} onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="BAST">BAST</option>
//                   <option value="Klaim Kesehatan">Klaim Kesehatan</option>
//                   <option value="RO PO">RO PO</option>
//                   <option value="Lain-lain">Lain-lain</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="UserMaker" className="col-2 col-form-label">
//                 User Maker:
//               </label>
//               <div className="col-10">
//                 <select className="form-select" id="UserMaker" name="UserMaker" value={formData.UserMaker} onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="test3">test3</option>
//                   {/* UserMaker options */}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="UserApproval1" className="col-2 col-form-label">
//                 User Approval 1:
//               </label>
//               <div className="col-10">
//                 <select className="form-select" id="UserApproval1" name="UserApproval1" value={formData.UserApproval1} onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="Approve">Approve</option>
//                   <option value="Reject">Reject</option>
//                   {/* UserApproval1 options */}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="UserApproval2" className="col-2 col-form-label">
//                 User Approval 2:
//               </label>
//               <div className="col-10">
//                 <select className="form-select" id="UserApproval2" name="UserApproval2" value={formData.UserApproval2} onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="Approve">Approve</option>
//                   <option value="Reject">Reject</option>
//                   {/* UserApproval2 options */}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-3 text-start row">
//               <label htmlFor="RequestDetail" className="col-2 col-form-label">
//                 Request Detail:
//               </label>
//               <div className="col-10">
//                 <textarea className="form-control" id="RequestDetail" name="RequestDetail" value={formData.RequestDetail} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="container d-flex justify-content-center">
//               <div className="card" style={{ width: "500px", maxWidth: "50%" }}>
//                 <DropFileInput onFileChange={handleFileChange} />
//                 {/* <button className="btn btn-primary mt-4" type="button" onClick={handleUploadClick} disabled={isUploading}>
//                   {isUploading ? Uploading... (${uploadProgress}%) : "Upload"}
//                 </button> */}
//               </div>
//             </div>

//             <div className="mb-3 text-end p-5">
//               <button className="btn btn-primary" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Create;
