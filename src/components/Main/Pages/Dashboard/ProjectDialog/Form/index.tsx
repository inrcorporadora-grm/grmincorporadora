/* eslint-disable react/no-unstable-nested-components */
import type { iImage } from 'types/iImage';
import type { iProject, iTableProject } from 'types/iProject';

import { useState } from 'react';
import { generateId } from '@utils/generateId';
import { messages } from '@utils/messages';

import { FormBox } from '@components/FormBox';

import { str } from '@services/database/storage';
import { getProjectImages } from '@utils/getProjectImages';
import { DialogActions } from '../DialogActions';
import { PrincipalInfosSection } from './PrincipalInfosSection';
import { ToggleInputsSection } from './ToggleInputsSection';
import { InfoInputs } from './ToggleInputsSection/InfoInputs';
import { DataSheetInputs } from './ToggleInputsSection/DataSheetInputs';
import { ImageInputs } from './ToggleInputsSection/ImageInputs';

import { submit } from './utils/submit';
import { createSubmitForm } from './utils/createSubmitForm';

interface FormProps<T> {
  type: 'add' | 'edit';
  title: string;
  setOpen: (open: boolean) => void;
  setProjects: React.Dispatch<
    React.SetStateAction<
      (T extends iTableProject ? T[] : iProject[]) | undefined
    >
  >;
  project?: T;
}

export const Form = <T extends iTableProject | undefined>({
  type,
  setProjects,
  setOpen,
  title,
  project,
}: FormProps<T>) => {
  const [address, setAddress] = useState(project?.address || '');
  const [city, setCity] = useState(project?.locale.split('/')[0] || '');
  const [dimensions, setDimensions] = useState(project?.dimensions || '');
  const [localeType, setLocaleType] = useState(project?.name.localeType || '');
  const [description, setDescription] = useState(project?.description || '');
  const [state, setState] = useState(project?.locale.split('/')[1] || '');
  const [name, setName] = useState(project?.name.name || '');
  const [video, setVideo] = useState(project?.video || '');
  const [projectStatus, setProjectStatus] = useState<string>(
    project?.status || 'new',
  );
  const [image, setImage] = useState<iImage>(
    project?.image || {
      is: 'image',
      alt: '',
      url: '',
      id: generateId(),
    },
  );

  const [infos, setInfos] = useState<iTableProject['infos']>([]);
  const [deletedImagesIds, setDeletedImagesIds] = useState<string[]>([]);
  const [gallery, setGallery] = useState<iTableProject['gallery']>([]);
  const [plans, setPlans] = useState<iTableProject['plans']>([]);
  const [dataSheets, setDataSheets] = useState<iTableProject['dataSheets']>([]);
  const [illustrative, setIllustrative] = useState<
    iTableProject['illustrative']
  >([]);

  return (
    <FormBox
      onSubmit={async () => {
        const { imagesSubmit, projectSubmit } = createSubmitForm(
          {
            address,
            city,
            dataSheets,
            description,
            dimensions,
            gallery,
            illustrative,
            infos,
            video,
            localeType,
            name,
            plans,
            projectStatus,
            state,
            contrastImage: image,
          },
          project,
          type,
        );

        submit(projectSubmit, type)
          .then(async (res) => {
            if (deletedImagesIds.length) {
              await Promise.all(
                deletedImagesIds.map(async (imageToDelete) => {
                  // if the image exists in the project remove then
                  if (JSON.stringify(res).includes(imageToDelete)) {
                    await str.in(`projects/${res.id}/${imageToDelete}`).del();
                  }
                  return imageToDelete;
                }),
              );
            }
            await Promise.all(
              Object.entries(imagesSubmit).map(async ([, value]) => {
                if (Array.isArray(value)) {
                  await Promise.all(
                    value.map(async (img) => {
                      await str.in(img?.path(res.id)).add(img?.img as string);
                      return img;
                    }),
                  );
                } else {
                  await str
                    .in(value?.path(res.id) as string)
                    .add(value?.img as string);
                }
              }),
            );
            return res;
          })
          .then(async (res) => {
            await getProjectImages(res).then((projectRes) => {
              setProjects((prev) => {
                if (type === 'edit') {
                  const newRows = [...prev!];
                  const index = newRows.findIndex((row) => row.id === res.id);
                  newRows[index] = { ...projectRes, tableName: res.name.name };
                  return newRows;
                }

                const newProject = { ...projectRes, tableName: res.name.name };
                return [...prev!, newProject] as any;
              });
              alert(`Processo: ${title}. Foi realizado com sucesso.`);
              setOpen(false);
            });
            return res;
          })
          .catch(() => alert(messages.error.err));
      }}
      style={{
        '& h2:first-of-type': {
          margin: '4rem 0 0',
        },
        '& > section .MuiTextField-root': { marginRight: '1rem' },
      }}
    >
      <PrincipalInfosSection
        inputsReference={{
          video: { value: video, set: setVideo },
          image: { value: image, set: setImage },
          address: { value: address, set: setAddress },
          city: { value: city, set: setCity },
          dimensions: { value: dimensions, set: setDimensions },
          localeType: { value: localeType, set: setLocaleType },
          name: { value: name, set: setName },
          projectStatus: { value: projectStatus, set: setProjectStatus },
          state: { value: state, set: setState },
          description: { value: description, set: setDescription },
        }}
      />
      <ToggleInputsSection
        title="Ficha Técnica"
        setListProp={setDataSheets}
        tableListItem={project?.dataSheets}
        inputsShowed={(inputsShowedProps) => (
          <DataSheetInputs {...inputsShowedProps} />
        )}
      />
      <ToggleInputsSection
        max={2}
        min={1}
        title="Informações dos Slides"
        tableListItem={project?.infos}
        setListProp={setInfos}
        inputsShowed={(inputsShowedProps) => (
          <InfoInputs {...inputsShowedProps} />
        )}
      />
      <ToggleInputsSection
        title="Plantas"
        setListProp={setPlans}
        tableListItem={project?.plans}
        onItemDelete={(id) =>
          setDeletedImagesIds((prev) => [...prev, `plans/${id}`])
        }
        inputsShowed={(inputsShowedProps) => (
          <ImageInputs
            {...inputsShowedProps}
            itemRemoved={(id) =>
              setDeletedImagesIds((prev) => [...prev, `plans/${id}`])
            }
          />
        )}
      />
      <ToggleInputsSection
        title="Ilustrações"
        setListProp={setIllustrative}
        tableListItem={project?.illustrative}
        onItemDelete={(id) =>
          setDeletedImagesIds((prev) => [...prev, `plans/${id}`])
        }
        inputsShowed={(inputsShowedProps) => (
          <ImageInputs
            {...inputsShowedProps}
            itemRemoved={(id) =>
              setDeletedImagesIds((prev) => [...prev, `illustrative/${id}`])
            }
          />
        )}
      />
      <ToggleInputsSection
        title="Galeria"
        setListProp={setGallery}
        tableListItem={project?.gallery}
        onItemDelete={(id) =>
          setDeletedImagesIds((prev) => [...prev, `plans/${id}`])
        }
        inputsShowed={(inputsShowedProps) => (
          <ImageInputs
            {...inputsShowedProps}
            itemRemoved={(id) =>
              setDeletedImagesIds((prev) => [...prev, `gallery/${id}`])
            }
          />
        )}
      />
      <DialogActions
        type={type}
        onClickCancel={() => {
          if (window.confirm(messages.confirm.cancel)) {
            setOpen(false);
          }
        }}
      />
    </FormBox>
  );
};
