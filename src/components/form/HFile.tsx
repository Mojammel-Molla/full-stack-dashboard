import { FolderOpenDot, Image, Trash2 } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type TTFileProps = {
  name: string;
  label?: string;
  value?: string;
  onChange: (file: File | null) => void;
};

const File = ({ name, label, onChange, value }: TTFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    (value as string) ?? null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];

    if (!selectedFile) return;

    const isValidFileType = ['image/jpeg', 'image/png'].includes(
      selectedFile.type
    );
    const isValidFileSize = selectedFile.size <= 1024 * 1024; // 1 MB

    if (!isValidFileType) {
      setErrorMessage('Only JPG and PNG formats are allowed.');

      return;
    }

    if (!isValidFileSize) {
      setErrorMessage('File size should not exceed 1 MB.');

      return;
    }

    setErrorMessage(null); // Clear any previous error

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    setFile(selectedFile);
  };

  const deleteFile = () => {
    setFile(null);
    setPreviewImage(null);

    // Reset the input value to allow re-uploading the same file
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileName = (name: string) => {
    const fileNameParts = name.split('.');
    const extension = fileNameParts.pop();
    const fileName = fileNameParts.join('.');

    return fileName.length > 10
      ? `${fileName.slice(0, 10)}...${extension}`
      : `${fileName}.${extension}`;
  };

  useEffect(() => {
    onChange(file);
  }, [file, onChange]);

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base text-athens-gray-800" htmlFor={name}>
          {label}
        </label>
      )}
      <label
        className="flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all hover:bg-athens-gray-50/10"
        htmlFor={name}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
          <FolderOpenDot className="size-5 text-athens-gray-500" />
        </div>
        <div>
          <h5 className="font-semibold text-athens-gray-600">
            Upload Your Files
          </h5>
          <small className="text-sm text-athens-gray-400">
            Click to browse JPG or PNG formats.
          </small>
        </div>
      </label>
      <input
        ref={inputRef}
        className="hidden"
        id={name}
        name={name}
        type="file"
        onChange={handleFileUpload}
      />

      {errorMessage && <p className="text-sm">{errorMessage}</p>}

      {((file && !errorMessage) || previewImage) && (
        <div className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
            <Image className="size-4 text-athens-gray-800" />
          </div>
          <div>
            {file?.name ? (
              <h6 className="!text-sm">{formatFileName(file.name)}</h6>
            ) : previewImage ? (
              <h6 className="!text-sm">
                {(previewImage?.length as number) > 40
                  ? previewImage?.slice(0, 40)+'...'+previewImage?.slice(-4)
                  : previewImage}
              </h6>
            ) : null}
            {file?.size && (
              <p className="!text-xs !text-athens-gray-500">
                {(Number(file?.size ?? 0) / 1024 / 1024).toFixed(2)}MB
              </p>
            )}
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button onClick={deleteFile}>
              <Trash2 className="size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HFile = ({ name, label }: { name: string; label?: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <File
          label={label}
          name={name}
          value={value as string}
          onChange={onChange}
        />
      )}
    />
  );
};

export default HFile;
