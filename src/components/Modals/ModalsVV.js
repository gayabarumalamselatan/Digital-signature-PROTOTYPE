import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../Login/axios";

function ModalsVV() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState([]);
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
    fetchName();
  },[]);

  const fetchName = async () => {
    try{
      const response = await axios.get("/api/data"); //<- masukkan endpoint untuk nama data
      setName(response.name);
    }catch(error){
      console.error(error);
    }
  }

  const fetchData = async (id) => {
    try{
      const response = await axios.get("/api/data"); //<-- Masukin api/endpoint disini
      setData(response.data);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal className="modal-xl ms-5" show={show} onHide={handleClose} aria-hidden="true">
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>View</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              {name.map(name =>(
                <tr key={name.id}>
                  <th>{name.id}</th>
                </tr>
              ))}
            </thead>
            <tbody>
              
                {data.map(data => (
                  <tr key={data.id}>
                    <td>: {data.id}</td>
                  </tr>
                  
                ))}
              
            </tbody>
          </table>
        </div>


          {/* {data.map((item) => (
            <div>

            </div>
          ))} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalsVV;
