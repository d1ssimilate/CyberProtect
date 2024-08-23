import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { userApiService } from "../../../../api/entities/user/user.api";
import { useContext } from "react";
import { DialogContext } from "../../../Providers/DialogProvier/DialogProvider";

interface ISubscribeForm {
  nickname: string;
  email: string;
  tgUsername: string;
  isConfirm: boolean;
}

export const useSubscribe = () => {
  const { setDialog } = useContext(DialogContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubscribeForm>({ mode: "onChange" });

  const { mutate, isPending } = useMutation({
    mutationFn: (params: ISubscribeForm) =>
      userApiService.subscribe({ params }),
    onSuccess: () => setDialog("close"),
  });
  const onSubmit = (data: ISubscribeForm) => {
    mutate({
      email: data.email,
      tgUsername: data.tgUsername,
      nickname: data.nickname,
      isConfirm: data.isConfirm,
    });
  };
  return { register, handleSubmit, errors, isPending, onSubmit };
};
