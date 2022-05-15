import {CONFIRMED_GET_POSTS, CONFIRMED_GET_POST} from "@/redux/action/postsAction";
  
  const initialState = {
      posts:[],
      post:{
        id: "",
        title: "",
        content: "",
        photo: "",
        creator: "",
        createdAt: "",
        comment: [],
      }
  };
  
  export function postsReducer(state = initialState, action) {
      if(action.type===CONFIRMED_GET_POSTS){
          return{
              ...state,
              posts:action.payload,
          }
      }
      if(action.type===CONFIRMED_GET_POST){
          return{
              ...state,
              post:action.payload,
          }
      }
    return state;
  }
  