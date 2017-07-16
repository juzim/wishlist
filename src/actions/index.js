export const INITIALIZE = 'INITIALIZE'
export const FILTER_USER = 'FILTER_USER'

export const initialize = dispatch => {
  return {}
}

export const filterUser = user => {
  return {
    type: FILTER_USER,
    user
  }
}
