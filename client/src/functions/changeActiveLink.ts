export const changeActiveLink = ( path: string, url: string, dispatch: any ) => {
  if ( url !== path ) {
    dispatch({ type: 'CHANGE_PAGE', data: {
      url: path
    }})
  }
}