import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { userApiService } from "../../../../api/entities/user/user.api";
import { useContext, useState } from "react";
import { DialogContext } from "../../../Providers/DialogProvier/DialogProvider";

interface ISubscribeForm {
  nickname: string;
  email: string;
  tgUsername: string;
  isConfirm: boolean;
}

interface defaultValues  {
  email: string
}

export const useSubscribe = (  defaultValues?: defaultValues) => {
  const { setDialog } = useContext(DialogContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubscribeForm>({ mode: "onChange", defaultValues });
  const [formData, setFormData] = useState<ISubscribeForm | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (params: ISubscribeForm) =>
      userApiService.subscribe({ params }),
    onSuccess: () => {
      localStorage.setItem("email", formData?.email!);
      setDialog("close");
    },
  });
  const onSubmit = (data: ISubscribeForm) => {
    setFormData(data);
    mutate({
      email: data.email,
      tgUsername: data.tgUsername,
      nickname: data.nickname,
      isConfirm: data.isConfirm,
    });
  };
  return { register, handleSubmit, errors, isPending, onSubmit };
};
