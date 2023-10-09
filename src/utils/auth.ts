import Cookie from "js-cookie";
import { v4 as token } from "uuid";

export const auth = {
  isAuthenticated: () => {
    if (Cookie.get("token")) {
      return true;
    }
    return false;
  },
  storeCookie: (email: string, password: string) => {
    let id = Number(Cookie.get("id")) + 1 || 1;
    Cookie.set("id", `${id}`);
    Cookie.set(`email_${id}`, email);
    Cookie.set(`password_${id}`, password);
    Cookie.set(`token`, token());
  },
  logout: () => {
    Cookie.remove("token");
  },
};
