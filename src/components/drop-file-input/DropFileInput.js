import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import axios from "axios";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ".//flags.css";
import ".//index.css";


const TemplateDemo = () => {
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [totalSize, setTotalSize] = useState(0);

  const maxFileSize = 25 * 1024 * 1024; // 25MB in bytes
  const allowedFileTypes = ["image/*", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  // Example Bearer token obtained from authentication (replace with your actual token)
  const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVfVVNFUiI6dHJ1ZSwiZXhwIjoxNzE5MjAyNDYxLCJpYXQiOjE3MTkxOTg4NjF9.3KCe4GYQW699jU788BsEfCjA9Z2lB4yZtBszHXHk9wIvjUCe-TnNTBJUIRBCgZHlq_FOot7Ode78y5eN1bbSmQ"; // Replace with your actual access token

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize; // Initialize with existing total size
    let files = e.files;

    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        if (!isFileTypeAllowed(files[key].type)) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Invalid file type. Only images, PDFs, and DOCX files are allowed.",
          });
          e.files.splice(key, 1); // Remove invalid file
          return; // Stop processing if invalid file is found
        }

        _totalSize += files[key].size || 0;
      }
    }

    if (_totalSize > maxFileSize) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "File size exceeds the limit of 25MB.",
      });
      setTotalSize(totalSize); // Restore previous total size
      e.originalEvent.preventDefault(); // Prevent file from being added
      return;
    }

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = async () => {
    const files = fileUploadRef.current.getFiles();

    if (files.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No files selected for upload.",
      });
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file); // Ensure 'file' matches the expected key on the server
    });

    try {
      // Configure Axios request with Bearer token in Authorization header
      const response = await axios.post("http://10.8.135.84:18080/internal-memo-service/form/file-upload", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTotalSize(0);

      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
      });

      // Clear file list after upload completes
      fileUploadRef.current.clear();
    } catch (error) {
      console.error("Upload error:", error.response || error.message || error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Failed to upload files: ${error.response?.data?.message || error.message}`,
      });
    }
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / maxFileSize;
    const formattedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <Button type="button" icon="pi pi-cloud-upload" className="custom-upload-btn p-button-success p-button-rounded p-button-outlined" onClick={onTemplateUpload} />
        {cancelButton}
        <div className="flex align-items-center gap-2 ml-auto">
          <span>{formattedValue} / 25 MB</span>
          <ProgressBar value={value * 100} showValue={false} style={{ width: "10rem", height: "12px" }}></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    const fileType = file.type; // Get the file type
    let iconSource = ""; // Initialize icon source

    if (fileType === "application/pdf") {
      iconSource = "assets/pdf.png"; // Path to your PDF icon
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      iconSource = "assets/docx.png"; // Path to your DOCX icon
    } else {
      iconSource = file.objectURL; // Default to image preview
    }

    return (
      <div className="flex align-items-center flex-wrap" style={{ padding: "10px 5px", borderBottom: "1px solid #ccc" }}>
        <div className="flex align-items-center" style={{ width: "100%" }}>
          <Image src={iconSource} alt={file.name} width={100} preview />
          <div className="flex flex-column text-left ml-3">
            <span>{file.name}</span>
            <small>{new Date().toLocaleDateString()}</small>
          </div>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto mt-2 mt-md-0" onClick={() => onTemplateRemove(file, props.onRemove)} />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{
            fontSize: "1.2em",
            color: "var(--text-color-secondary)",
          }}
          className="my-5"
        >
          Drag and Drop PDF/Docx Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const isFileTypeAllowed = (fileType) => {
    return allowedFileTypes.some((type) => fileType.startsWith(type.replace("*", "")));
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="File"
        multiple
        accept={allowedFileTypes.join(",")}
        maxFileSize={maxFileSize}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        customUpload
      />
    </div>
  );
};

export default TemplateDemo;