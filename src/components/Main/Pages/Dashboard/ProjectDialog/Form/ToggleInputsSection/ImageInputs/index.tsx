import type { iImage } from 'types/iImage';
import type { iTableProject } from 'types/iProject';

import { ImageInputs as ImageInputsComponent } from '@components/ImageInputs';

interface SlideInfoInputsProps {
  i: number;
  listItem: { [key: string]: string };
  itemRemoved?: (id: string) => void;
}
export const ImageInputs = ({
  i,
  listItem,
  itemRemoved,
}: iTableProject['image'] & SlideInfoInputsProps) => {
  return (
    <ImageInputsComponent
      set={undefined}
      label={`Descrição da Imagem ${i}`}
      value={listItem as unknown as iImage}
      onRemoveFile={() => {
        if (itemRemoved) itemRemoved(listItem.id);
      }}
      onPrepareFile={(item) => {
        const newListItem = listItem;
        newListItem.url = item.getFileEncodeDataURL();
      }}
    />
  );
};
