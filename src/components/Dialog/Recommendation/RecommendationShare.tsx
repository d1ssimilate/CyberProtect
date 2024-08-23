import { isMobile } from "react-device-detect";
import { TRecommendationRequestData } from "../../../api/entities/recommendation/recommendation.types";
import { useToast } from "../../../hooks/useToast";
import { ShareTo } from "../../../utils/share";
import { Button } from "../../UI/Button/Button";
import { Menu } from "primereact/menu";
import { useRef } from "react";

export const RecommendationShare = ({
  data,
}: {
  data: TRecommendationRequestData;
}) => {
  const domain = location.protocol + "//" + location.host;
  const device = isMobile ? "mobile" : "desktop";
  const menu = useRef(null);

  const items = [
    {
      label: "Социальные сети",
      items: [
        {
          label: "Вконтакте",
          command: () =>
            ShareTo({
              socialMedia: "vk",
              pathname: `${domain}/?recommendation=${data.id}`,
              text: data.title + "\n\n" + data.description,
            }),
        },
        {
          label: "Telegram",
          command: () =>
            ShareTo({
              socialMedia: "telegram",
              pathname: `${domain}/?recommendation=${data.id}`,
              text: data.title + "\n\n" + data.description,
            }),
        },
        {
          label: "Whatsapp",
          command: () =>
            ShareTo({
              socialMedia: "whatsapp",
              pathname: `${domain}/?recommendation=${data.id}`,
              text: data.title + "\n\n" + data.description,
            }),
        },
      ],
    },
  ];
  const actionType = {
    desktop: () => {
      window.navigator.clipboard.writeText(
        `${domain}/?recommendation=${data.id}`
      );
      useToast(true, " Cсылка скопирована!");
    },
    mobile: (e: React.MouseEvent<HTMLElement>) =>
      //@ts-ignore
      menu.current ? menu.current.toggle(e) : null,
  };

  const action = actionType[device];

  return (
    <>
      <Menu
        className="popup-menu"
        model={items}
        popup
        ref={menu}
        color="black"
      />
      <Button onClick={action} variant="blue">
        {device == "mobile" ? "Поделиться" : "Скопировать"}
      </Button>
    </>
  );
};
