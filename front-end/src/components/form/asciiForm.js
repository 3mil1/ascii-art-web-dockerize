import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

export default function AsciiForm() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", p: 1 }}>
        <Controller
          name="ASCII"
          control={control}
          defaultValue="Hello World"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="ASCII"
              fullWidth
              multiline
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "required input" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          m: 1,
          height: 100,
          justifyContent: "space-between",
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Banner</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue="standard"
            name="banner"
            render={({ field }) => {
              const { name, onBlur, onChange } = field;
              return (
                <RadioGroup
                  row
                  aria-label="banner"
                  name="row-radio-buttons-group"
                  defaultValue="standard"
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                  }}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="standard"
                  />
                  <FormControlLabel
                    value="shadow"
                    control={<Radio />}
                    label="shadow"
                  />
                  <FormControlLabel
                    value="thinkertoy"
                    control={<Radio />}
                    label="thinkertoy"
                  />
                </RadioGroup>
              );
            }}
          />
        </FormControl>

        <Button variant="contained" type="submit">
          Generate ASCII
        </Button>
      </Box>
    </form>
  );
}
