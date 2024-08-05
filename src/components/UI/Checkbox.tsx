import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
interface CheckboxProps {
  onChange: Dispatch<SetStateAction<boolean>>;
  active?: boolean;
}

export function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = useState(props.active || false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    props.onChange(isChecked);
  };

  return (
    <input
      style={{ width: "40px", height: "40px" }}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}
