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

type CustomerEmail = {
  email: string;
};

type ExistingCx = {
  username: string;
  password: string;
};

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

const getCustomerId = async (customerEmail: CustomerEmail) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/customers/getcustomerid`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerEmail),
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

const cxLogin = async (existingcx: ExistingCx) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/customers/cxlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingcx),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      localStorage.setItem("token", json.token);
      const user = JSON.parse(atob(json.token.split(".")[1]));
      console.log(user);
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { newCustomer, getCustomerId, cxLogin };
