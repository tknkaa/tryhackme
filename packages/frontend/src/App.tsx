import { useState } from "react";
import { client } from "./utils/client"

export default function App() {
  const [name, setName] = useState("");
  const handleClick = async () => {
    const { data: index } = await client.get();
    alert(index)
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: res, error } = await client.name.post({
      name: name
    });
    if (error) {
      console.log(error.value)
      return error
    };
    alert(res?.name);
  } 
  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} value={name}/>
        <button type="submit">send your name</button>
      </form>
    </div>
  )
}
