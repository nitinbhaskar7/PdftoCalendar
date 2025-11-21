'use client';
import useFileContext from '@/components/providers/FileContextProvider';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
const UploadPDF = () => {
  const {files , setFiles} = useFileContext() ;
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };
  return (
    <Dropzone
      maxFiles={10}
      maxSize={1024 * 1024 * 10}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
      accept={{ 'application/pdf': ['.pdf'] }}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
export default UploadPDF;