import { useState, useEffect } from 'react';

import './FileUpload.scss'

function FileUpload({ file }: any) {
  const [previewUrl, setPreviewUrl] = useState<string | null>();

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