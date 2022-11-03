export const enum BlogActionType {
    SET_TITLE = 'SET_TITLE',
    SET_BODY = 'SET_BODY',
  }
  interface BlogAction {
    type: BlogActionType;
    payload: string;
  }
  interface BlogState{
    title:string,
    body:string
  }
const postReducer = (state:BlogState, action:BlogAction) => {
    switch (action.type) {
        case "SET_TITLE":
          return {
            ...state,
            title: action.payload
          };
     
        case "SET_BODY":
          return {
            ...state,
            body: action.payload
          };
        default:
          throw new Error("Unhandled action");
      }
  };
  export default postReducer;