import { fetcher } from '@services/fetchers';
import { getValue } from '@utils/getValue';
import { messages } from '@utils/messages';

interface Submit {
  telRef: React.RefObject<HTMLInputElement>;
  cepRef: React.RefObject<HTMLInputElement>;
  nameRef: React.RefObject<HTMLInputElement>;
  cityRef: React.RefObject<HTMLInputElement>;
  stateRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  companyRef: React.RefObject<HTMLInputElement>;
  addressRef: React.RefObject<HTMLInputElement>;
  proposalRef: React.RefObject<HTMLTextAreaElement>;
  districtRef: React.RefObject<HTMLTextAreaElement>;
  imagesLinkRef: React.RefObject<HTMLInputElement>;
}

export async function submit({
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
}: Submit) {
  const tel = telRef.current!.value;
  const cep = getValue(cepRef.current?.value);
  const name = nameRef.current!.value;
  const city = cityRef.current!.value;
  const state = stateRef.current!.value;
  const phone = phoneRef.current!.value;
  const email = emailRef.current!.value;
  const company = getValue(companyRef.current?.value);
  const address = addressRef.current!.value;
  const proposal = proposalRef.current!.value;
  const district = districtRef.current!.value;
  const imagesLink = getValue(imagesLinkRef.current?.value);

  const dataSheet = [
    `<h1><b>FICHA TÉCNICA - PROPOSTA DE TERRENO - por ${name} (${email})</b></h1><br/><br/>`,
    `<b>Nome:</b> ${name}<br/>`,
    `<b>Email:</b> ${email}<br/><br/>`,
    cep && `<b>CEP:</b> ${cep}<br/>`,
    `<b>Cidade:</b> ${city}<br/>`,
    `<b>Estado:</b> ${state}<br/>`,
    `<b>Bairro:</b> ${district}<br/>`,
    `<b>Endereço:</b> ${address}<br/><br/>`,
    company && `<b>Empresa:</b> ${company}<br/>`,
    `<b>Telefone:</b> ${tel}<br/>`,
    `<b>Celular:</b> ${phone}<br/><br/>`,
    imagesLink && `<b>Link de Imagens:</b> ${imagesLink}<br/><br/>`,
    `<b>Proposta:</b> ${proposal}`,
  ].join('');

  const message = {
    name,
    email,
    message: dataSheet,
  };

  return fetcher
    .post('/api/email', message)
    .then(() => alert(messages.submit.dataSheets))
    .catch(() => alert(messages.error.err));
}
