import { useActionState } from "react";
import { client } from "./utils/client";

export default function App() {
  const handleClick = async () => {
    const { data: index } = await client.get();
    alert(index);
  };
  const formAction = async (_prevError: string | null, formData: FormData) => {
    //TODO: validation with Zod
    const name = formData.get("name") as string;
    const age = Number(formData.get("age"));
    const email = formData.get("email") as string;
    const { data: res, error } = await client.user.post({
      name,
      age,
      email,
    });
    if (error) {
      console.log(error);
      return String(error);
    }
    alert(`Hello, ${res?.name}`);
    return null;
  };
  const [_error, action] = useActionState(formAction, null);
  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <form action={action}>
        <label>name</label>
        <input name="name" />
        <label>age</label>
        <input name="age" type="number" />
        <label>email</label>
        <input name="email" />
        <button type="submit">send your name</button>
      </form>
    </div>
  );
}
