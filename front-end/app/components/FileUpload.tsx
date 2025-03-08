import React, { useState, useRef } from 'react';

interface FileUploadProps {
  taskId: string;
  onUpload: (file: File) => Promise<boolean>;  // Using the browser's File type here is correct
}

const FileUpload: React.FC<FileUploadProps> = ({ taskId, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSizeMB = 5;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: JPG, PNG, PDF, DOCX`);
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds the ${maxSizeMB}MB limit`);
      return;
    }
    
    try {
      setIsUploading(true);
      setError(null);
      setSuccess(null);
      
      const result = await onUpload(file);
      
      if (result) {
        setSuccess('File uploaded successfully');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError('An error occurred during upload');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Upload File</h3>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-sm">
          {success}
        </div>
      )}
      
      <div className="flex items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        
        {isUploading && (
          <div className="ml-3 animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        )}
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        Allowed files: JPG, PNG, PDF, DOCX (Max: {maxSizeMB}MB)
      </p>
    </div>
  );
};

export default FileUpload;