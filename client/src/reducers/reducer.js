export const titleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_WITH_TITLE':
            return action.payload;
        case 'SEARCH_TITLE_RESET':
            return { title: '' };
        default:
            return state;
    }
}