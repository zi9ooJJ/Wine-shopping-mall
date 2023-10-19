const commonErrors = {
  authenticationError: `Authentication Error`,
  authorizationError: `Authorization Error`,
  inputError: `Input Error`,

  argumentError: `Argument Error`,
  businessError: `Business Error`,
  configError: `Config Error`,
  databaseError: `DB Error`,
  fatalError: `Fatal Error`,
  objectCreationError: `Object Creation Error`,
  resourceNotFoundError: `Resource Not Found Error`,
  resourceDuplicationError: `Resource Duplication Error`,
  remoteStorageError: `Remote Storage Error`,
  requestValidationError: `Request Validation Error`,

  authControllerPostUserError: `authController postUser Error`,
  authControllerGetAuthUserError: `authController getAuthUser Error`,
  authControllerGetUserError: `authController getUser Error`,
  authControllerGetUsersError: `authController getUsers Error`,
  authServiceCreateUserError: `authService createUser Error`,
  authServiceGetUserError: `authService getUser Error`,
  authServiceGetAdminError: `authService getAdmin Error`,
  authServiceGetUsersError: `authService getUsers Error`,
  authDAOCreateError: `authDAO create Error`,
  authDAOFindOneError: `authDAO findOne Error`,
  authDAOFindManyError: `authDAO findMany Error`,

  userControllerPutUserError: `userController putUser Error`,
  userControllerDeleteUserError: `userController deleteUser Error`,
  userControllerDeleteUsersError: `userController deleteUsers Error`,
  userServiceUpdateUserError: `userService updateUser Error`,
  userServiceDeleteUserError: `userService deleteUser Error`,
  userServiceDeleteUsersError: `userService deleteUsers Error`,
  userDAOUpdateOneError: `userDAO updateOne Error`,
  userDAODeleteOneError: `userDAO deleteOne Error`,
  userDAODeleteManyError: `userDAO deleteMany Error`,

  tokenExpiredError: "Token Expired Error",
  tokenInvalidError: "Token Invalid Error",
  tokenNotFoundError: "Token Not Found Error",
  tokenNotVerifiedError: "Token Not Verified Error",
  checkTokenError: "checkToken Error",
  createTokenError: "createToken Error",

  logInInValidError: "Log In Invalid Error",
};

module.exports = commonErrors;
