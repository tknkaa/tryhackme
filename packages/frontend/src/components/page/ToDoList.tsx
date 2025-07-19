import { useActionState } from "react";
import { client } from "../../lib/client";

export default function ToDoList() {
  const formAction = async (_prevErro: string | null, formData: FormData) => {
    //TODO: validation with Zod
    const description = formData.get("description") as string;
    const { data: res, error } = await client.todo.post({
      description,
    });
    if (error) {
      console.log(error);
      return String(error);
    }
    console.log(res);
    return null;
  };
  const [_error, action] = useActionState(formAction, null);
  return (
    <div>
      <form action={action}>
        <label>todo description</label>
        <input name="description" />
        <button type="submit">send todo</button>
      </form>
    </div>
  );
}
