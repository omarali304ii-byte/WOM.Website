import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow"><span /> 404 / Off route</p>
      <h1>This message did not land.</h1>
      <p>The page you were looking for has moved or no longer exists.</p>
      <Link className="button button-dark" href="/">Return home</Link>
    </main>
  );
}
