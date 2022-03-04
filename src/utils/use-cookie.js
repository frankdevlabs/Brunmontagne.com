import { useState } from "react";

const isBrowser = typeof window !== "undefined";

const setCookie = (name, value, options) => {
  if (!isBrowser) return;

  if (
    Array.isArray(value) ||
    Object.prototype.toString.call(value) === "[object Object]"
  ) {
    value = JSON.stringify(value);
  }

  let cookie = `${name}=${value}`;

  const optionsWithDefaults = {
    expires: 0,
    domain: process.env.GATSBY_COOKIE_DOMAIN || "localhost",
    path: "/",
    secure: true,
    httpOnly: false,
    maxAge: 15552000,
    sameSite: "strict",
    ...options,
  };

  if (optionsWithDefaults.expires) {
    const date = new Date();
    date.setTime(date.getTime() + 1000 * optionsWithDefaults.expires);
    cookie += `; Expires=${date.toUTCString()}`;
  }

  if (optionsWithDefaults.path) {
    cookie += `; Path=${optionsWithDefaults.path}`;
  }

  if (optionsWithDefaults.domain) {
    cookie += `; Domain=${optionsWithDefaults.domain}`;
  }

  if (optionsWithDefaults.maxAge) {
    cookie += `; Max-Age=${optionsWithDefaults.maxAge}`;
  }

  if (optionsWithDefaults.sameSite) {
    cookie += `; SameSite=${optionsWithDefaults.sameSite}`;
  }

  if (optionsWithDefaults.secure) {
    cookie += "; Secure";
  }

  if (optionsWithDefaults.httpOnly) {
    cookie += "; HttpOnly";
  }

  document.cookie = cookie;
};

const getCookie = (name, initialValue = "") => {
  const cookies = isBrowser ? document.cookie.split("; ") : [""];
  /*
      This statement returns the value of a cookie in case there's a cookie with the 'name'.
            OR
      If no cookie has been saved as of yet, it will return the default initialValue.
  */
  return cookies[0] !== ""
    ? cookies.reduce((r, v) => {
        const _name = v.slice(0, v.indexOf("="));
        let value = _name === name ? v.slice(v.indexOf("=") + 1) : r;
        // The below if statement ensures Objects are returned accordingly (instead of String).
        if (
          typeof value !== "object" &&
          isNaN(parseInt(value)) &&
          value !== "" &&
          /^[\],:{}\s]*$/.test(
            value
              .replace(/\\["\\\/bfnrtu]/g, "@")
              .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        )
          value = JSON.parse(value);
        // The below if statement ensures Numbers are returned as 'Number' type (instead of String).
        if (typeof value === "string") {
          value = !isNaN(parseInt(value)) ? parseInt(value) : value;
        }
        /* The below if statement allows the return of 0 in case 'let value = 0', which is a falsy value.
      This is required for the functioning of our cookiebanner (cookie-notice and layout components). */
        if (value === undefined) {
          return initialValue;
        }
        return value;
      }, "")
    : initialValue;
};

export default function useCookie(name, initialValue) {
  const [item, setItem] = useState(() => {
    return getCookie(name, initialValue);
  });

  const updateItem = (value, options) => {
    setItem(value);
    setCookie(name, value, options);
  };

  return [item, updateItem];
}
