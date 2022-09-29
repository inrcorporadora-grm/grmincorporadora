import type { iImage } from 'types/iImage';
import type { FilePondFile } from 'filepond';
import type { FilePondFilePlugins } from 'types/react-filepond';

import { FilePond } from 'react-filepond';
import { useState } from 'react';
import { Input } from '@components/Input';

interface ImageInputsProps<T> {
  set: T extends undefined
    ? React.Dispatch<React.SetStateAction<iImage>>
    : undefined;
  value: iImage;
  label: string;
  disabled?: boolean;
  onPrepareFile: T;
  onRemoveFile?: () => void;
}

export const ImageInputs = <
  T extends ((file: FilePondFile & FilePondFilePlugins) => void) | undefined,
>({
  set,
  label,
  value,
  disabled,
  onPrepareFile,
  onRemoveFile,
}: ImageInputsProps<T>) => {
  const [files, setFiles] = useState<any>(
    value.url ? [{ source: value.url }] : [],
  );

  return (
    <>
      <div style={{ width: '100%', marginRight: '1rem' }}>
        <FilePond
          required
          files={files}
          onupdatefiles={setFiles}
          credits={false}
          allowFileEncode
          disabled={disabled}
          onremovefile={onRemoveFile}
          onpreparefile={(item) => {
            if (onPrepareFile) onPrepareFile(item);
            else
              set!((prev) => {
                const newImage = prev;
                newImage.url = item.getFileEncodeDataURL();
                return newImage;
              });
          }}
          maxFileSize="10mb"
          acceptedFileTypes={['jpg', 'png', 'webp']}
          allowImagePreview
          labelIdle='Arraste e Solte ou <span class="filepond--label-action">navegue</span'
          server={{
            load: 'https://picsum.photos/200/300',
          }}
        />
      </div>
      <Input
        id="alt"
        type="multiline"
        disabled={disabled}
        label={label}
        defaultValue={value.alt || ''}
        style={{
          overflowY: 'auto',
          marginTop: 0,
          maxHeight: '12.5rem',
        }}
      />
    </>
  );
};
