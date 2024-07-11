interface loginPropsType {
  reqType: string;
}

const LoginOrSignup = ({ reqType }: loginPropsType) => {
  return <div>{reqType == "login" ? "Login" : "Signup"}</div>;
};
export default LoginOrSignup;
