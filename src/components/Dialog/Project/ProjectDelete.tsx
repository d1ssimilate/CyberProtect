import { useContext } from "react";
import { Button } from "../../UI/Button/Button";
import { DialogContext } from "../../Providers/DialogProvier/DialogProvider";
import { useMutation } from "@tanstack/react-query";
import { projectsApiService } from "../../../api/entities/projects/projects.api";
import { TProjectRequestData } from "../../../api/entities/projects/projects.types";
import { queryClient } from "../../../api/instance";

export const ProjectDelete = () => {
  const { setDialog, data } = useContext(DialogContext);
  const dialogData = data as TProjectRequestData;
  const { mutate } = useMutation({
    mutationFn: () => projectsApiService.deleteProjects(dialogData.id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      setDialog("close");
    },
  });
  return (
    <div
      style={{
        display: "flex",
        gap: 15,
        marginTop: 20,
        justifyContent: "flex-end",
      }}
    >
      <Button variant="red" onClick={() => setDialog("close")}>
        Отменить
      </Button>
      <Button variant="blue" onClick={() => mutate()}>
        Подтвердить
      </Button>
    </div>
  );
};
