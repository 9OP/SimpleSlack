export const getRedirectUri = (): string => {
  return window.location.href.split("/").slice(0, -1).join("/");
};
