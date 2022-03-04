import { useState, useEffect } from 'react';

import './FileUpload.scss'

interface FileUploadProps {
  file?: any;
  editedbookUrl?: string | null |undefined
}

function FileUpload({ file, editedbookUrl }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>();

  useEffect(()=> {
    if (editedbookUrl) {
      setPreviewUrl(editedbookUrl);
    }
  }, [editedbookUrl])
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPreviewUrl(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="file-upload">
      <div className="file-upload__info">add book cover</div>
      <div className="file-upload__preview">
        {previewUrl && <img src={previewUrl} />}
      </div>
    </div>
  );
}

export default FileUpload;