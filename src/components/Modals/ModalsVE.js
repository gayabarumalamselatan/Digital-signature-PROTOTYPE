import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalShow from "./ModalShowDoc";

function ModalsVE() {
  const [showModal, setShowModal] = useState(false);
  const [dokumen, setDokumen] = useState([]);

  useEffect(()=>{
    fetchDokumen();
  },[]);

  // fungs untuk manggil dokumen
  const fetchDokumen = async () => {
    try{
      const response = await axios.get("api.data");
      setDokumen(response.data);
    }catch(error){
      console.error(error);
    }
  }

  const MySwal = withReactContent(Swal)

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [show, setShow] = useState(false);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sigCanvas = useRef(null);
  const [fileHyperlink, setFileHyperlink] = useState(""); // New state for hyperlink

  const [formData, setFormData] = useState({
    Title: "",
    Requestor: "",
    RequestDate: "",
    RequestTitle: "",
    RequestDetail: "",
    DueDate: "",
    UserMaker: "",
    UserApproval1: "",
    UserApproval2: "",
    FileName: "",
    Status: "",
    Note: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        // Send formData to backend for processing
        const response = await axios.post("http://localhost:8080/api/submit", formData);
        //"/api/upload diubah dengan endpoint yang sudah ada"
        MySwal.fire("Submitted!", "Your form has been submitted.", "success");
        handleClose();
      } catch (error) {
        MySwal.fire("Error!", "There was an error submitting the form.", "error");
      }
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Update the hyperlink based on FileName (after validation)
    if (name === "FileName") {
      try {
        const response = await axios.post("/your-api-endpoint/validate-file", { FileName: value }); // Use await here
        if (response.data.isValid) {
          setFileHyperlink(response.data.hyperlink);
        } else {
          setFileHyperlink("");
          // Optionally: Display an error message to the user about the invalid file
        }
      } catch (error) {
        console.error("Error validating file:", error);
        setFileHyperlink("");
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal className="modal-xl ms-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={handleSubmit}>
            {/* ... (input fields) */}
            <div className="mb-3 col-4">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input type="text" className="form-control" id="Title" name="Title" value={formData.Title} onChange={handleChange} />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="Requestor" className="form-label">
                Requestor
              </label>
              <select className="form-select col-4" id="Requestor" name="Requestor" value={formData.Requestor} onChange={handleChange}>
                <option value="">Select an option</option>
                {/* ... (opsi Requestor) */}
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="RequestDate" className="form-label">
                Request Date
              </label>
              <input type="date" className="form-control" id="RequestDate" name="RequestDate" value={formData.RequestDate} onChange={handleChange} />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="RequestTitle" className="form-label">
                Request Title
              </label>
              <input
                type="text"
                className="form-control"
                id="RequestTitle"
                name="RequestTitle"
                value={formData.RequestTitle}
                onChange={handleChange} // Tambahkan event onChange
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="DueDate" className="form-label">
                Due Date
              </label>
              <input type="date" className="form-control" id="DueDate" name="DueDate" value={formData.DueDate} onChange={handleChange} />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="UserMaker" className="form-label">
                User Maker
              </label>
              <select className="form-select col-4" id="UserMaker" name="UserMaker" value={formData.UserMaker} onChange={handleChange}>
                <option value="">Select an option</option>
                {/* ... (opsi UserMaker) */}
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="UserApproval1" className="form-label">
                User Approval Pertama
              </label>
              <select className="form-select col-4" id="UserApproval1" name="UserApproval1" value={formData.UserApproval1} onChange={handleChange}>
                <option value="...">Select an option</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
                {/* ... (opsi UserApproval1) */}
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="UserApproval2" className="form-label">
                User Approval Kedua
              </label>
              <select className="form-select col-4" id="UserApproval2" name="UserApproval2" value={formData.UserApproval2} onChange={handleChange}>
                <option value="Select an option">Select an option</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
                {/* ... (opsi UserApproval2) */}
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="RequestDetail" className="form-label">
                Request Detail
              </label>
              <textarea
                className="form-control"
                id="RequestDetail"
                name="RequestDetail"
                value={formData.RequestDetail}
                onChange={handleChange} // Tambahkan event onChange
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="FileName" className="form-label">
                File Name
              </label>
              {/* <input type="text" className="form-control" id="FileName" name="FileName" value={formData.FileName} onChange={handleChange} />
              {fileHyperlink && (
                <a href={fileHyperlink} target="_blank" rel="noopener noreferrer">
                  {fileHyperlink}
                </a>
              )} */}
              <ul>
                <li>
                  <a href="#" onClick={handleOpenModal}>
                    DokumenBAST
                  </a>
                  <ModalShow show={showModal} handleClose={handleCloseModal} />
                </li>
              </ul>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select className="form-select col-4" id="Status" name="Status" value={formData.Status} onChange={handleChange}>
                <option value="Select an option">Select an option</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="Note" className="form-label">
                Note
              </label>
              <textarea
                className="form-control"
                id="Note"
                name="Note"
                value={formData.Note}
                onChange={handleChange} // Tambahkan event onChange
              />
            </div>
           
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalsVE;
