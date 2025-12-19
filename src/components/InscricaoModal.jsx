import ExpedicaoInscricaoForm from './ExpedicaoInscricaoForm'

function InscricaoModal({ isOpen, onClose, tipoInscricao, eventoSelecionado, eventosDisponiveis }) {
  const handleSuccess = (formData) => {
    // Formulário enviado com sucesso
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <ExpedicaoInscricaoForm
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={handleSuccess}
      title="Deixe o seu nome na lista"
      description={<>Preencha o formulário para receber<br />novas informações em primeira mão.</>}
      tipoInscricao={tipoInscricao}
      eventoSelecionado={eventoSelecionado}
      eventosDisponiveis={eventosDisponiveis}
    />
  )
}

export default InscricaoModal



