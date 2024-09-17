const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
import { useEffect, useState } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/greeting`)
      .then((res) => res.json())
      .then((data) => setGreeting(data.greeting));
  }, [setGreeting]);

  if (!greeting) return null;

  return <h1 className="text-center mb-5">{greeting}</h1>;
}
