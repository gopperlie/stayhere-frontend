const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

type user = {
  username: string;
  password: string;
};

type CustomerUser = {
  email: string;
  password: string;
};

const signin = async (user: user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admins/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
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

const customerSignup = async (CustomerUser: CustomerUser) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/customers/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CustomerUser),
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

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

const signout = () => {
  localStorage.removeItem("token");
};

export { signin, signout, getUser, customerSignup };
