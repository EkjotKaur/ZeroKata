export const initialState = null;

export const reducer = (state, action) => {
    if(action.type === "USER"){
        // console.log(action.payload);
        return action.payload;
    }
    else if(action.type === "REMOV"){
        // console.log(action.payload);
        return initialState;
    }
    return state;
}