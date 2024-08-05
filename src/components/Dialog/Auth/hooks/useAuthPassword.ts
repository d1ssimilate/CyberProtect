import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { userApiService } from "../../../../api/entities/user/user.api";
import { useContext, useEffect } from "react";
import { TUserAuthPasswordDtoRequest } from "../../../../api/entities/user/user.types";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { useCookie } from "../../../../hooks/useCookie";
import { DialogContext } from "../../../Providers/DialogProvier/DialogProvider";

interface IAuthPasswordForm {
  code: string;
}

export const useAuthPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthPasswordForm>({ mode: "onChange" });
  const { user, setUser } = useContext(AuthContext);
  const { setCookie } = useCookie();
  const { setDialog } = useContext(DialogContext);
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: (params: TUserAuthPasswordDtoRequest) =>
      userApiService.patchAuthPassword({ params }),
  });

  useEffect(() => {
    if (isSuccess) {
      setCookie("l", data.data.accessToken);
      setCookie("l-exp", data.data.exp.toString());
      setCookie("l-refreshToken", data.data.refreshToken);
      setUser({ isAuth: true });
      setDialog("close");
    }
  }, [isSuccess]);

  const onSubmit = (data: IAuthPasswordForm) => {
    mutate({ email: user.email!, code: data.code });
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
