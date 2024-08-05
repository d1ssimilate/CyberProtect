import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TUserAuthEmailDtoRequest } from "../../../../api/entities/user/user.types";
import { userApiService } from "../../../../api/entities/user/user.api";
import { useContext, useState } from "react";
import { DialogContext } from "../../../Providers/DialogProvier/DialogProvider";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

interface IAuthEmailForm {
  email: string;
}

export const useAuthEmail = () => {
  const { setDialog } = useContext(DialogContext);
  const { setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthEmailForm>({ mode: "onChange" });
  const [data, setData] = useState<IAuthEmailForm | null>(null);
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (params: TUserAuthEmailDtoRequest) =>
      userApiService.postAuthEmail({ params }),
    onSuccess: () => {
      if (data) {
        setUser({ email: data.email, isAuth: false });
        setDialog("AuthPassword", "Введите пароль из почты");
      }
    },
  });

  const onSubmit = (data: IAuthEmailForm) => {
    setData(data);
    mutate({ email: data.email });
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    isSuccess,
  };
};
