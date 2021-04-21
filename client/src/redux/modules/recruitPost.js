import { recruitPostAPI } from 'api';
import { reduxUtils } from 'utils';

// action type
const LOADING_RECRUIT_POST = 'recruit/LOADING_POST';
const ERROR_RECRUIT_POST = 'recruit/ERROR_POST';
const GET_RECRUIT_POSTS = 'recruit/GET_POSTS';
const CREATE_RECRUIT_POST = 'recruit/CREATE_POST';
const UPDATE_RECRUIT_POST = 'recruit/UPDATE_POST';
const REMOVE_RECRUIT_POST = 'recruit/REMOVE_POST';

// thunk action creator
export const getRecruitPostsAsync = () =>
  reduxUtils.createThunkActionCreator(
    {
      loading: LOADING_RECRUIT_POST,
      type: GET_RECRUIT_POSTS,
      error: ERROR_RECRUIT_POST,
    },
    recruitPostAPI.getAllRecruitPosts
  );
export const createRecruitPostAsync = newPost =>
  reduxUtils.createThunkActionCreator(
    {
      loading: LOADING_RECRUIT_POST,
      type: CREATE_RECRUIT_POST,
      error: ERROR_RECRUIT_POST,
    },
    recruitPostAPI.createRecruitPost,
    [newPost]
  );
export const updateRecruitPostAsync = (id, updatePost) =>
  reduxUtils.createThunkActionCreator(
    {
      loading: LOADING_RECRUIT_POST,
      type: UPDATE_RECRUIT_POST,
      error: ERROR_RECRUIT_POST,
    },
    recruitPostAPI.updateRecruitPost,
    [id, updatePost]
  );
export const removeRecruitPostAsync = id =>
  reduxUtils.createThunkActionCreator(
    {
      loading: LOADING_RECRUIT_POST,
      type: REMOVE_RECRUIT_POST,
      error: ERROR_RECRUIT_POST,
    },
    recruitPostAPI.removeRecruitPost,
    [id]
  );
/*
export const getRecruitPostsAsync = () => async dispatch => {
  dispatch({ type: LOADING_RECRUIT_POST });

  try {
    const payload = await recruitPostAPI.getAllRecruitPosts();

    dispatch({ type: GET_RECRUIT_POSTS, payload });
  } catch (e) {
    dispatch({ type: ERROR_RECRUIT_POST, payload: e });
  }
};
export const createRecruitPost = newPost => async dispatch => {
  dispatch({ type: LOADING_RECRUIT_POST });

  try {
    const payload = await recruitPostAPI.createRecruitPost(newPost);

    dispatch({ type: CREATE_RECRUIT_POST, payload });
  } catch (e) {
    dispatch({ type: ERROR_RECRUIT_POST, payload: e });
  }
};
export const updateRecruitPost = (id, updatePost) => async dispatch => {
  dispatch({ type: LOADING_RECRUIT_POST });

  try {
    const payload = await recruitPostAPI.updateRecruitPost(id, updatePost);

    dispatch({ type: UPDATE_RECRUIT_POST, payload });
  } catch (e) {
    dispatch({ type: ERROR_RECRUIT_POST, payload: e });
  }
};
export const removeRecruitPost = id => async dispatch => {
  dispatch({ type: LOADING_RECRUIT_POST });

  try {
    const payload = await recruitPostAPI.removeRecruitPost(id);

    dispatch({ type: REMOVE_RECRUIT_POST, payload });
  } catch (e) {
    dispatch({ type: ERROR_RECRUIT_POST, payload: e });
  }
};
*/

// reducer
const regularPostReducer = (state = reduxUtils.initialState(), action) => {
  const { type, payload } = action;
  const { data } = state;

  switch (type) {
    case LOADING_RECRUIT_POST:
      return reduxUtils.loadingState(data);
    case ERROR_RECRUIT_POST:
      return reduxUtils.errorState(payload);
    case GET_RECRUIT_POSTS:
      return {
        isLoading: false,
        data: payload,
        error: null,
      };
    case CREATE_RECRUIT_POST:
      return {
        isLoading: false,
        data: [...data, payload],
        error: null,
      };
    case UPDATE_RECRUIT_POST:
      return {
        isLoading: false,
        data: data.map(post => (post.id === payload.id ? payload : post)),
        error: null,
      };
    case REMOVE_RECRUIT_POST:
      return {
        isLoading: false,
        data: data.filter(post => post.id !== payload),
        error: null,
      };
    default:
      return state;
  }
};

export default regularPostReducer;
