import { Splits } from "@/data/Splits";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const SplitDropdown = () => {
  const [split, setSplit] = useState(Splits[0].id);

  return (
    <>
      <Select value={split} onChange={(e) => setSplit(e.target.value)}>
        {Splits.map((split) => (
          <MenuItem key={split.id} value={split.id}>
            {split.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
