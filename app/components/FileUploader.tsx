import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
}

const FileUploader = ({ onFileChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file: File | null = acceptedFiles[0] || null;
      setFile(file);
      onFileChange(file);
    },
    [onFileChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    maxSize: 15 * 1024 * 1024,
  });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center flex items-center gap-2 uploader-selected-file"
            >
              <img src="/images/pdf.png" alt="PDF icon" className="size-10" />
              <div>
                <p className="text-lg text-gray-700 font-medium truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round(file.size / 1024)} KB
                </p>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={() => setFile(null)}
              >
                <img src="/icons/cross.svg" alt="Delete" className="size-5 " />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <img src="/icons/info.svg" alt="Upload" className="size-20" />
              </div>
              <div>
                <p className="text-lg text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  'n drop
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: .pdf (max. 15MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
