const thanksMessage =
  'Agradecemos sua mensagem, entraremos em contato com você em breve...';

export const messages = {
  error: {
    userCredentials:
      'Senha ou Email incorretos. Por favor insira os dados novamente',
    err: 'Ops... Algo deu errado! Por favor tente novamente mais tarde',
    noneItem: 'Nenhum item selecionado',
  },
  submit: {
    dataSheets: `Sua ficha foi enviada com Sucesso!\n\n${thanksMessage}`,
    contact: `Sua mensagem foi enviada com Sucesso!\n\n${thanksMessage}`,
  },
  confirm: {
    deleteAll: 'Você deseja mesmo deletar os items selecionados?',
    deleteOne: 'Você deseja mesmo deletar o item selecionado?',
    cancel: 'Você deseja mesmo descartar as alterações?',
  },
};
