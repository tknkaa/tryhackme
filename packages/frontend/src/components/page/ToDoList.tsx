import { useActionState } from "react";
import { client } from "../../lib/client";
import { authClient } from "../../lib/auth-client";
import { redirect } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ToDoList() {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["todo"],
    queryFn: () => client.todo.get(),
  });

  const mutation = useMutation({
    mutationFn: (description: string) => client.todo.post({ description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const { data: session } = authClient.useSession();
  if (!session) {
    redirect("/");
  }
  const formAction = async (_prevErro: string | null, formData: FormData) => {
    //TODO: validation with Zod
    const description = formData.get("description") as string;
    const { data: res, error } = await mutation.mutateAsync(description);
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
      {!isPending && (
        <ul>
          {data?.data?.map((todo) => (
            <li>{todo.description}</li>
          ))}
        </ul>
      )}
      <div>Hello {session?.user.name}</div>
      <form action={action}>
        <label>todo description</label>
        <input name="description" />
        <button type="submit">send todo</button>
      </form>
    </div>
  );
}
