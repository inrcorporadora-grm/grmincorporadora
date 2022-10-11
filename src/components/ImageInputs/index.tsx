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
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onPrepareFile: T;
  onRemoveFile?: () => void;
  onInput?: (ev: React.SyntheticEvent<HTMLInputElement, Event>) => void;
}

export const ImageInputs = <
  T extends ((file: FilePondFile & FilePondFilePlugins) => void) | undefined,
>({
  set,
  label,
  value,
  onInput,
  disabled,
  required,
  onPrepareFile,
  onRemoveFile,
}: ImageInputsProps<T>) => {
  const [files, setFiles] = useState<any>(
    value.url ? [{ source: value.url }] : [],
  );

  return (
    <>
      <div style={{ width: '100%', marginRight: label ? '1rem' : 0 }}>
        <FilePond
          required={required === undefined ? true : required}
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
          maxFileSize="2mb"
          acceptedFileTypes={['webp']}
          allowImagePreview
          labelIdle='Arraste e Solte ou <span class="filepond--label-action">navegue</span'
          server={{
            load: 'https://picsum.photos/200/300',
          }}
        />
      </div>
      {label && (
        <Input
          id="alt"
          type="multiline"
          disabled={disabled}
          label={label}
          defaultValue={value.alt || ''}
          onInput={onInput}
          style={{
            overflowY: 'auto',
            marginTop: 0,
            maxHeight: '12.5rem',
          }}
        />
      )}
    </>
  );
};
