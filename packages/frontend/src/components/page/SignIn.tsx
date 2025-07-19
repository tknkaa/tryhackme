import { useActionState } from "react";
import { authClient } from "../../lib/auth-client";

export default function SignIn() {
  const formAction = async (_prev: string | null, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (_ctx) => {
          // show loading
        },
        onSuccess: (_ctx) => {
          // redirect to the dashboard
        },
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
    }
    return null;
  };
  const [_error, action] = useActionState(formAction, null);

  return (
    <div>
      <form action={action}>
        <label>email</label>
        <input name="email" />
        <label>password</label>
        <input name="password" />
      </form>
    </div>
  );
}
