import type { iProject } from 'types/iProject';
import type { iImage } from 'types/iImage';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { generateId } from '@utils/generateId';
import { messages } from '@utils/messages';

import { FormBox } from '@components/FormBox';
import { ImageInputs } from '@components/ImageInputs';
import { SubTitleCSS } from '@stylesComponents/Texts';

import { str } from '@services/database/storage';
import { submit } from './utils/submit';
import { ProjectTable } from './ProjectsTable';
import { DialogActions } from '../DialogActions';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const MODULES_R_TEXT = {
  toolbar: [['bold', 'italic', 'underline', 'strike'], [{ align: [] }]],
  clipboard: {
    matchVisual: false,
  },
};
const FORMAT_R_TEXT = ['bold', 'italic', 'underline', 'strike', 'align'];

interface EditDialogProps {
  setOpen: (open: boolean) => void;
  setSlides: React.Dispatch<
    React.SetStateAction<iProject[] | iImage[] | undefined>
  >;
  slides: iProject[] | iImage[];
  projects?: iProject[];
}

export const Form = ({
  setOpen,
  setSlides,
  slides,
  projects,
}: EditDialogProps) => {
  const { pathname } = useRouter();
  const contrastImage: iImage = {
    url: '',
    alt: '',
    is: 'image',
    id: generateId(),
    slideText: '',
  };
  const [slidesToSubmit, setSlidesToSubmit] = useState<iProject[] | iImage[]>(
    slides[0].is === 'project' ? slides : [{ ...contrastImage, ...slides[0] }],
  );

  return (
    <FormBox
      onSubmit={() => {
        const page = pathname.replace('/', '');
        const pageVerify = page.trim().length <= 0 ? 'home' : page;

        const toSubmit =
          slidesToSubmit[0].is === 'project'
            ? slidesToSubmit.map((slide) => slide.id)
            : ({
                alt: slidesToSubmit[0].alt,
                slideText: slidesToSubmit[0].slideText,
                is: 'image',
                id: slidesToSubmit[0].id,
              } as iImage);

        submit(toSubmit, pageVerify)
          .then(async (res) => {
            if (!Array.isArray(toSubmit)) {
              await str
                .in(`pages/${pageVerify}/${pageVerify}`)
                .add((slidesToSubmit[0] as iImage).url as string);
            }
            setSlides(slidesToSubmit);
            alert(`Slide(s) atualizado(s) com sucesso.`);
            setOpen(false);
            return res;
          })
          .catch(() => alert(messages.error.err));
      }}
    >
      <section>
        <SubTitleCSS>Usar uma Imagem destaque:</SubTitleCSS>
        <span style={{ opacity: 0.6 }}>
          para usar uma imagem destaque desmarque todos os projetos primeiro:
        </span>
        <div
          style={{ display: 'flex', marginTop: '1rem' }}
          onChange={(ev) => {
            const target = ev.target as unknown as HTMLInputElement;

            if (slidesToSubmit[0]?.is === 'image') {
              setSlidesToSubmit((prev: any) => {
                const newImage = prev[0];
                newImage[target.id as string] = target.value;
                return [newImage];
              });
            }
          }}
        >
          <ImageInputs
            set={undefined}
            value={
              slidesToSubmit[0].is === 'image'
                ? slidesToSubmit[0]
                : contrastImage
            }
            label="Descrição da imagem"
            disabled={slidesToSubmit[0]?.is === 'project'}
            onPrepareFile={(item) => {
              setSlidesToSubmit((prev: any) => {
                const newImage = prev[0];
                newImage.url = item.getFileEncodeDataURL();
                return [newImage];
              });
            }}
          />
        </div>
        {(slidesToSubmit
          ? slidesToSubmit[0]?.is !== 'project'
          : slides[0]?.is !== 'project') && (
          <div
            style={{
              height: '16rem',
            }}
          >
            <QuillNoSSRWrapper
              modules={MODULES_R_TEXT}
              formats={FORMAT_R_TEXT}
              placeholder="Escreva aqui o que irá aparecer no slide"
              defaultValue={(slides[0] as iImage).slideText}
              onChange={(ev) => {
                setSlidesToSubmit((prev: any) => {
                  const newImage = prev[0];
                  newImage.slideText = ev;
                  return [newImage];
                });
              }}
              style={{
                height: '12rem',
              }}
            />
          </div>
        )}
      </section>
      {projects && (
        <section>
          <SubTitleCSS>Ou selecionar projetos para destaque:</SubTitleCSS>
          <ProjectTable
            slides={slidesToSubmit}
            setSlides={setSlidesToSubmit}
            projects={projects}
          />
        </section>
      )}

      <DialogActions
        onClickCancel={() => {
          if (window.confirm(messages.confirm.cancel)) {
            setOpen(false);
          }
        }}
      />
    </FormBox>
  );
};
