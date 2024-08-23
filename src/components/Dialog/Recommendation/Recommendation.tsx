import { Fragment, useContext, useEffect, useRef } from "react";
import styles from "./Recommendations.module.scss";
import { DialogContext } from "../../Providers/DialogProvier/DialogProvider";
import { TRecommendationRequestData } from "../../../api/entities/recommendation/recommendation.types";
import { url } from "../../../api/instance";
import { Image } from "primereact/image";
import { Link } from "@tanstack/react-router";
import { useCookie } from "../../../hooks/useCookie";
import { recommendationApiService } from "../../../api/entities/recommendation/recommendation.api";
import { useMutation } from "@tanstack/react-query";
import { isMobile } from "react-device-detect";
import { Button } from "../../UI/Button/Button";
import { useToast } from "../../../hooks/useToast";
import { share } from "../../../utils/share";
import { Menu } from "primereact/menu";

export function RecommendationDialog() {
  const { data: ContextData } = useContext(DialogContext);
  const data = ContextData as TRecommendationRequestData;
  const { getCookie } = useCookie();
  const accessToken = getCookie("accessToken");
  const menu = useRef(null);
  const items = [
    {
      label: 'Социальный сети',
      items: [
          {
              label: 'Вконтакте',
              command: () => share('vk', data.description)
          },
          {
              label: 'Telegram',
              command: () => share('telegram', data.description)
          },
          {
            label: 'Whatsapp',
            command: () => share('whatsapp', data.description)
        },
      ]
  }
  ]

  const { mutate } = useMutation({
    mutationFn: () =>
      recommendationApiService.postRecommendationCreateView(data.id),
  });

  useEffect(() => {
    if (accessToken && data) {
      mutate();
    }
  }, [accessToken, data]);

  const showButton = (data: TRecommendationRequestData) => {

    const device = isMobile ? 'mobile' : 'desktop';
  
    const actionType = {
      desktop: () => {
        window.navigator.clipboard.writeText(data.title + '\n\n' + data.description);
        useToast(true,' Текст скопирован!');
      },
      mobile: (e) => menu.current.toggle(e),
    }
  
    const action = actionType[device];

    return (
      <Button onClick={action} variant="blue">
        {device == 'mobile' ? 'Поделиться' : 'Скопировать'}
      </Button>
    );
  };

  return (
    <div className={styles.content}>
      <p className={styles.description}>
        {data.description}
      </p>
      {data.attachments &&
        data.attachments.map((item, idx) => {
          const fileUrl = `${url}${item.url}`;
          return (
            <Fragment key={idx}>
              {item.type === "image" ? (
                <Image
                  className={styles.img}
                  preview={true}
                  alt={item.label}
                  src={fileUrl}
                />
              ) : item.type === "video" ? (
                <video src={fileUrl} controls />
              ) : (
                <span style={{ color: "var(--deep-blue)", fontSize: "18px" }}>
                  {item.label}
                </span>
              )}
            </Fragment>
          );
        })}
      {data.isLongRead && (
        <Link className={styles.link} to={`/recommendation/${data.id}`}>
          Подробнее
        </Link>
      )}
      <Menu className="popup-menu"  model={items} popup ref={menu} color="black" />
      {showButton(data)}
    </div>
  );
}
