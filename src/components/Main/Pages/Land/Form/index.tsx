/* eslint-disable no-nonoctal-decimal-escape */

import { useRef, useState } from 'react';

import { Button } from '@components/Buttons/Button';
import { ButtonLink } from '@components/Buttons/ButtonLink';
import { Input } from '@components/Input';
import { FormBox } from '@components/FormBox';

import { MailSendIcon } from '@stylesComponents/icons/MailSend';
import { SubTitleCSS } from '@stylesComponents/Texts';

import { submit } from './utils/submit';

export const Form = () => {
  const [cepField, setCepField] = useState(true);
  const telRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const proposalRef = useRef<HTMLTextAreaElement>(null);
  const districtRef = useRef<HTMLTextAreaElement>(null);
  const imagesLinkRef = useRef<HTMLInputElement>(null);

  return (
    <FormBox
      onSubmit={() => {
        submit({
          telRef,
          cepRef,
          nameRef,
          cityRef,
          stateRef,
          phoneRef,
          emailRef,
          companyRef,
          addressRef,
          proposalRef,
          districtRef,
          imagesLinkRef,
        });
      }}
      style={{
        '& > section > .MuiTextField-root': {
          margin: '0.5rem 0',
        },
      }}
    >
      <section>
        <Input label="Seu Nome" inputReference={nameRef} />
        <Input label="Seu Email" inputReference={emailRef} type="email" />
        <section style={{ display: 'flex' }}>
          <Input
            label="Telefone"
            inputReference={telRef}
            type="tel"
            mask="(99) 9999-9999"
          />
          <Input
            label="Celular"
            inputReference={phoneRef}
            type="tel"
            mask="+55 (99) \99999-9999"
          />
        </section>
        <Input
          label="Empresa"
          inputReference={companyRef}
          type="text"
          required={false}
        />
      </section>
      <section>
        <SubTitleCSS>Informações do terreno</SubTitleCSS>
        <section className="cep" style={{ display: 'flex' }}>
          <Input
            label="Cep"
            inputReference={cepRef}
            mask="99999-999"
            required={cepField}
            disabled={!cepField}
          />
          <ButtonLink active onClick={() => setCepField(!cepField)}>
            {cepField ? 'Não sei meu cep' : 'Eu sei meu cep'}
          </ButtonLink>
        </section>
        <Input
          label="Endereço"
          inputReference={addressRef}
          type="text"
          placeholder="rua, número"
        />
        <Input label="Bairro" inputReference={districtRef} type="text" />

        <section style={{ display: 'flex' }}>
          <Input label="Cidade" inputReference={cityRef} type="text" />
          <Input label="Estado" inputReference={stateRef} type="text" />
        </section>
        <Input
          label="Link das Imagens"
          inputReference={imagesLinkRef}
          type="url"
          required={false}
        />
        <Input
          type="multiline"
          label="Sua proposta"
          rows={10}
          inputReference={proposalRef}
        />
      </section>
      <Button
        type="submit"
        icon={<MailSendIcon />}
        styles={{ alignSelf: 'flex-end' }}
      >
        enviar
      </Button>
    </FormBox>
  );
};
