import * as React from "react";

interface UseUploadFileProps {
  defaultUploadedFiles?: unknown[];
}

export function useUploadFile({
  defaultUploadedFiles = [],
}: UseUploadFileProps = {}) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<unknown[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {},
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      console.log("Upload from here ...");
      //const res = await uploadFiles(endpoint, {
      //  ...props,
      //  files,
      //  onUploadProgress: ({ file, progress }) => {
      //    setProgresses((prev) => {
      //      return {
      //        ...prev,
      //        [file]: progress,
      //      };
      //    });
      //  },
      //});

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      console.error(err);
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}
