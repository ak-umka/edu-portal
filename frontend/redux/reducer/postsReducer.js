import {CONFIRMED_GET_POSTS} from "@/redux/action/postsAction";
  
  const initialState = {
      posts:[]
  };
  
  export function postsReducer(state = initialState, action) {
      if(action.type===CONFIRMED_GET_POSTS){
          return{
              ...state,
              posts:action.payload,
          }
      }
    return state;
  }
  