import { useState } from "react";
import SignInForm from "./SigninForm";

const SignIn = (props) => {
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const loadUsers = async () => {
    const url =
      "https://orcalotest-default-rtdb.firebaseio.com/LoggedInEmails.json";
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Something went Wrong!");
    }
    const data = await res.json();
    const loadedUsers = [];
    for (const key in data) {
      loadedUsers.push({
        id: key,
        email: data[key]?.email,
        password: data[key]?.password,
        isAdmin: data[key]?.isAdmin,
      });
    }

    const matchUser = loadedUsers.filter(
      (user) => user.email === userEmail && user.password === userPassword
    );
    props.setUserExist(matchUser);
  };
  return (
    <SignInForm
      setUserPassword={setUserPassword}
      setUserEmail={setUserEmail}
      loadUsers={loadUsers}
      userExist={props.userExist}
    />
  );
};

export default SignIn;
