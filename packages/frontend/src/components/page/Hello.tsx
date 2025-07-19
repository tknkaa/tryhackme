import { Link } from "react-router";
export default function Hello() {
  return (
    <div>
      <p>Hello!</p>
      <Link to="signin">sign in</Link>
      <Link to="signup">sign up</Link>
    </div>
  );
}
