const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

interface Customer {
  family_name: string;
  given_name: string;
  email: string;
  nationality: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
}

const newCustomer = async (newCustomer: Customer) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    if (!res.ok) {
      const error = await res.json(); // Check for JSON response first
      throw new Error(error.message || "Failed to create new customer");
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { newCustomer };
