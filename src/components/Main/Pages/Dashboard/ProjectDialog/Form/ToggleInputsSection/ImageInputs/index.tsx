import type { iImage } from 'types/iImage';
import type { iTableProject } from 'types/iProject';

import { ImageInputs as ImageInputsComponent } from '@components/ImageInputs';

interface SlideInfoInputsProps {
  i: number;
  listItem: { [key: string]: string };
}
export const ImageInputs = ({
  i,
  listItem,
}: iTableProject['image'] & SlideInfoInputsProps) => {
  return (
    <ImageInputsComponent
      set={undefined}
      label={`Descrição da Imagem ${i}`}
      value={listItem as unknown as iImage}
      onPrepareFile={(item) => {
        const newListItem = listItem;
        newListItem.url = item.getFileEncodeDataURL();
      }}
    />
  );
};
