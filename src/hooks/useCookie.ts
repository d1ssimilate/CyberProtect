type Options = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export const useCookie = () => {
  const setCookie = (
    name: string,
    value: string | number,
    options: Options = {}
  ) => {
    options = {
      path: "/",
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      // @ts-ignore
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  };
  const getCookie = (name: string) => {
    if (typeof document !== "undefined") {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  };
  const clearCookies = (name: string) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
  };
  return { setCookie, getCookie, clearCookies };
};
