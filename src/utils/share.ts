interface ShareParams {
  socialMedia: "vk" | "telegram" | "whatsapp";
  text: string;
  pathname: string;
}

export function ShareTo(params: ShareParams) {
  const link = {
    telegram: () =>
      `https://telegram.me/share/url?url=${params.pathname}&text=${String(params.text)}`,
    vk: () => `https://vk.com/share.php?url=${params.pathname}`,
    whatsapp: () => `https://api.whatsapp.com/send?text=${params.text}/api/`,
  };
  return window.open(link[params.socialMedia](), "_blank");
}
