import React, {useState} from 'react'
import Sidebar from '../Sidebar'
import Swal from 'sweetalert2';


const VerifyMemo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const formRef = React.createRef();

  const handleCancel = () => {
    formRef.current.reset();
  };
  return (
    <>
        <Sidebar/>
        <div className='text-start'>VerifyMemo</div>
        <br/>
        <form ref={formRef}>
            <div className='mb-2'>
                <label>
                    Nomor Surat
                </label>
                <input type="text" className="form-control"/>
            </div>

            <div className='mb-2'>
                <label>Choose file to be verify</label>
                <div class="input-group">
                    <input 
                        type="file" 
                        accept='application/pdf' 
                        className="form-control" 
                        id="inputGroupFile04" 
                        aria-describedby="inputGroupFileAddon04" 
                        aria-label="Upload"
                    />
                </div>
            </div>
            <div className='d-flex text-end justify-content-end'>
                <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
                <button type="button" className="btn btn-primary">Verify</button>
            </div>
        </form>
    </>
  )
}

export default VerifyMemo