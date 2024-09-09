import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: {
          id: actions.id,
          email: actions.email,
          name: actions.name,
        },
      };

    case types.AUTH_SIGN_OUT:
        localStorage.clear();
        return {
            ...state,
            user: undefined,
        };

    default:
      return state;
  }
}
