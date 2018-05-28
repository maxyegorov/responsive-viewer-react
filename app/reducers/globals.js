const INITIAL_STATE = {
  language: 'en',
  modalOpen: false,
  modalType: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_LANG':
      return { ...state, language: action.language };
    case 'OPEN_MODAL':
      return { ...state, modalOpen: 'open', modalType: action.modalType };
    case 'BEFORE_CLOSE_MODAL':
      return { ...state, modalOpen: 'closing' };
    case 'CLOSE_MODAL':
      return { ...state, modalOpen: '' };
    default:
      return state;
  }
}
