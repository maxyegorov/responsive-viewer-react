const INITIAL_STATE = { 
    language: 'en', 
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TOGGLE_LANG':
            return { ...state, language: action.language };
        default:
            return state;
    }
};