import React, {useState} from "react";
import {useForm, Controller, useWatch} from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import {ascii} from "../api/api";

export default function AsciiForm() {
    const {handleSubmit, control} = useForm({
        mode: "onChange"
    });
    const [ASCII, setASCII] = useState();

    const inputVal = useWatch({
        control,
        name: 'ASCII'
    });

    let radioVal = useWatch({
        control,
        name: 'banner'
    });

    if (radioVal === undefined) {
        radioVal = "standard"
    }

    ascii(inputVal, radioVal)
        .then((response) => {
            setASCII(response.data)
        }, (error) => {
            console.log(error);
        });


    const onSubmit = (formData) => {
        ascii(formData.ASCII, formData.banner)
            .then((response) => {
                setASCII(response.data)
            }, (error) => {
                console.log(error);
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{display: "flex", p: 1}}>
                    <Controller
                        name="ASCII"
                        control={control}
                        defaultValue="Hello World"
                        render={({field: {onChange, value}, fieldState: {error}}) => (
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
                        rules={{required: "required input"}}
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
                            rules={{required: true}}
                            control={control}
                            defaultValue="standard"
                            name="banner"
                            render={({field}) => {
                                const {onBlur, onChange} = field;
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
                                            control={<Radio/>}
                                            label="standard"
                                        />
                                        <FormControlLabel
                                            value="shadow"
                                            control={<Radio/>}
                                            label="shadow"
                                        />
                                        <FormControlLabel
                                            value="thinkertoy"
                                            control={<Radio/>}
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
            <pre>{ASCII}</pre>
        </>
    );
}
