import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = false

const callReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer