const initialUser = {
  user: 'test',
  loggingIn: true,
  loggingOut: false,
  loginErrors: null,
};

export default function user(userState = initialUser, action) {
  switch (action.type) {
    default:
      return userState;
  }
}
