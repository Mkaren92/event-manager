import { signIn, signUp, confirmSignUp, signOut } from "aws-amplify/auth";

export const useSignIn = () => {
  const signInUser = async (emailValue, passwordValue) => {
    try {
      const { isSignedIn } = await signIn({
        username: emailValue,
        password: passwordValue,
      });
      return isSignedIn;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return signInUser;
};

export const useSignUp = () => {
  const signUpUser = async (
    emailValue,
    passwordValue,
    nameValue,
    familiNameValue
  ) => {
    try {
      const { userId } = await signUp({
        username: emailValue,
        password: passwordValue,
        options: {
          userAttributes: {
            email: emailValue,
            name: nameValue,
            family_name: familiNameValue,
          },
          autoSignIn: true,
        },
      });
      return userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return signUpUser;
};

export const useSignUpConfirm = () => {
  const signUpConfirm = async (username, codeValue) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username,
        confirmationCode: codeValue,
      });

      return isSignUpComplete;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return signUpConfirm;
};

export const useSignOut = () => {
  const execSignOut = async () => {
    try {
      await signOut();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return execSignOut;
};
