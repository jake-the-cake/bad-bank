export const handleAccountChange = ( event: any ) => {
  event.preventDefault()
  const changedInput = ( event.target as HTMLSelectElement )
  let inputName = 'to'
  switch ( changedInput.id ) {
    case 'to':
      inputName = 'from'
      break
    default:
      break
  }
  if ( changedInput.value !== ctx.user.details.id ) {
    ( document.getElementById( inputName ) as HTMLSelectElement ).value = ctx.user.details.id
  }
}