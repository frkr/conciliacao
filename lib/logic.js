/**
* Fazer uma movimentacao
* @param {conciliacao.Movimento} movimento - movimento a ser processado
* @transaction
*/
async function novaMovimentacao(movimento) {
  if ( !( movimento.participante in movimento.carteira.participantes ) ) {
    movimento.carteira.participantes.push(movimento.participante);
  }
  
  if (movimento.tipo === 'DEBITO') {
    movimento.carteira.saldo = movimento.carteira.saldo - movimento.valor;
  } else {
    movimento.carteira.saldo = movimento.carteira.saldo + movimento.valor;
  }
  
  const carteiraAtual = await getAssetRegistry('conciliacao.Carteira');
  const movEvent = getFactory().newEvent('conciliacao', 'Movimentacao');
  movEvent.carteira = movimento.carteira;
  emit(movEvent);

  await carteiraAtual.update(movimento.carteira);
}
