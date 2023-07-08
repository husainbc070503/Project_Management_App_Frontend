import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";

const TextField = ({
  type,
  name,
  title,
  value,
  icon,
  passIcon,
  handleChange,
  show,
  setShow,
}) => {
  return type === "password" ? (
    <div className="input-group">
      <FormControl fullWidth>
        <InputLabel htmlFor={name}>{title}</InputLabel>
        <Input
          id={name}
          type={show ? "text" : type}
          name={name}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={setShow}>
                {show ? passIcon : icon}
              </IconButton>
            </InputAdornment>
          }
          value={value}
          onChange={handleChange}
          required
        />
      </FormControl>
    </div>
  ) : (
    <div className="input-group">
      <FormControl fullWidth>
        <InputLabel htmlFor={name}>{title}</InputLabel>
        <Input
          id={name}
          type={type}
          name={name}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>{icon}</IconButton>
            </InputAdornment>
          }
          value={value}
          onChange={handleChange}
          required
        />
      </FormControl>
    </div>
  );
};

export default TextField;
