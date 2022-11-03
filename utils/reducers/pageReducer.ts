export const enum PageActionType {
    SET_TITLE = 'SET_TITLE',
    SET_DESCRIPTION = 'SET_DESCRIPTION',
  }
  interface PageAction {
    type: PageActionType;
    payload: string;
  }
  interface PageState{
    title:string,
    description:string
  }
const pageReducer = (state:PageState, action:PageAction) => {
    switch (action.type) {
        case "SET_TITLE":
          return {
            ...state,
            title: action.payload
          };
     
        case "SET_DESCRIPTION":
          return {
            ...state,
            description: action.payload
          };
        default:
          throw new Error("Unhandled action");
      }
  };
  export default pageReducer;