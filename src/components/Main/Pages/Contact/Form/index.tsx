import { createRef } from 'react';
import { fetcher } from '@services/fetchers';
import { messages } from '@utils/messages';

import { Input } from '@components/Input';
import { FormBox } from '@components/FormBox';
import { Button } from '@components/Buttons/Button';
import { MailSendIcon } from '@stylesComponents/icons/MailSend';

export const Form = () => {
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const messageRef = createRef<HTMLTextAreaElement>();

  function submit() {
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const text = messageRef.current!.value;

    const message = {
      name,
      email,
      message: [
        `<h1><b>CONTATO por ${name} (${email})</b></h1> <br/><br/>`,
        `Mensagem:<br/>${text}`,
      ].toString(),
    };

    fetcher
      .post('/api/email', message)
      .then(() => alert(messages.submit.contact))
      .catch(() => alert(messages.error.err));
  }

  return (
    <FormBox onSubmit={() => submit()}>
      <Input label="Nome" inputReference={nameRef} />
      <Input label="Email" inputReference={emailRef} type="email" />
      <Input
        type="multiline"
        label="Mensagem"
        rows={10}
        inputReference={messageRef}
      />
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
