import { useState } from "react";
import Container from "../../components/ui/Container";
import Confirm from "../../components/singup/ConfirmForm";
import SignUpForm from "../../components/singup/SignUpForm";

export default function SignUp() {
  const [userData, setUserData] = useState({});

  return (
    <Container>
      {!userData.email ? (
        <SignUpForm onUserDataChange={setUserData}></SignUpForm>
      ) : (
        <Confirm userData={userData}></Confirm>
      )}
    </Container>
  );
}
