
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BillUploaderProps {
  onComplete: () => void;
}

const BillUploader: React.FC<BillUploaderProps> = ({ onComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate API call to upload files
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Upload Utility Bills</h3>
        <p className="text-sm text-muted-foreground">
          Upload your last 3 months of utility bills (electricity, water, internet, etc.).
          These help us verify your business stability.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Click to upload bills
            </span>
            <span className="text-xs text-gray-500 block">
              Accepts PDF, JPG, PNG (max 10MB each)
            </span>
          </Label>
          <Input 
            id="file-upload" 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png" 
            onChange={handleFileChange}
            className="hidden" 
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected Files:</h4>
            <div className="divide-y divide-gray-100 rounded-md border border-gray-200">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <FileUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="bg-bizblue-600 hover:bg-bizblue-700 mt-2"
          disabled={files.length === 0 || uploading}
        >
          {uploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Bills
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BillUploader;
