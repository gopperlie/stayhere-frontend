// const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
// import { useEffect, useState } from "react";

// export function Greeting() {
//   const [greeting, setGreeting] = useState(null);

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/api/greeting`)
//       .then((res) => res.json())
//       .then((data) => setGreeting(data.greeting));
//   }, [setGreeting]);

//   if (!greeting) return null;

//   return <h1 className="text-center mb-5">{greeting}</h1>;
// }

import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

interface GreetingResponse {
  greeting: string;
}

export function Greeting() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/greeting`);
        const data: GreetingResponse = await res.json();
        setGreeting(data.greeting);
      } catch (error) {
        console.error("Error fetching greeting:", error);
      }
    };

    fetchGreeting();
  }, []);

  if (!greeting) return null;

  return <h1 className="text-center mb-5">{greeting}</h1>;
}
