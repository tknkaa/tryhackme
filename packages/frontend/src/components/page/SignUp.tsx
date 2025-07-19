import { useActionState } from "react";
import { authClient } from "../../lib/auth-client";
import { Navigate } from "react-router";

export default function SignUp() {
  const formAction = async (_prev: string | null, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
    if (error) {
      alert(error);
      return String(error.message);
    }
    if (data) {
      // redirect
      console.log(data);
    }
    return null;
  };
  const [error, action] = useActionState(formAction, "init");
  if (!error) return <Navigate replace to="/todo" />;

  return (
    <div>
      <form action={action}>
        <label>email</label>
        <input name="email" />
        <label>password</label>
        <input name="password" type="password" />
        <label>name</label>
        <input name="name" />
        <button type="submit">sign up</button>
      </form>
    </div>
  );
}
