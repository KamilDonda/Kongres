import React from "react";
import "../App.css";
import DropZone from "../components/DropZone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const { useState } = React;

function AddingWork(props) {
  const styles = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    left: {
      // backgroundColor: 'red',
      width: "50%",
      height: "50vh",
      float: "left",
      textAlign: "left",
    },
    right: {
      // backgroundColor: 'green',
      width: "50%",
      height: "50vh",
      float: "left",
    },
    container: {
      width: "90%",
    },
    textField: {
      marginBottom: "32px",
      width: "100%",
    },
    menuItem: {
      textAlign: "left",
    },
    formControl: {
      marginBottom: "32px",
      width: "300px",
    },
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
    addButton: {
      // float: 'left',
      // marginRight: '5%',
      float: "right",
      textTransform: "none",
    },
  });

  const style = styles();

  const [_file, SetFile] = useState(null);
  const passFile = (f) => {
    SetFile(f);
  };

  const buttonClick = () => {
    console.log(_file);
  };

  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });
  const [counts, setCounts] = React.useState({
    title: 0,
    description: 0,
  });

  const maxTitleSize = 127;
  const maxDescriptionSize = 255;

  const [specialization, setSpecialization] = React.useState("");
  const schema = yup.object().shape({
    title: yup
      .string()
      .matches(/^[A-Za-z0-9]*$/, "Title should only contain letters and digits")
      .max(maxTitleSize, `Title should be ${maxTitleSize} characters or less`)
      .required("Required field"),
    description: yup
      .string()
      .matches(
        /^[A-Za-z0-9]*$/,
        "Description should only contain letters and digits"
      )
      .max(
        maxDescriptionSize,
        `Description should be ${maxDescriptionSize} characters or less`
      )
      .required("Required field"),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setCounts({ ...counts, [prop]: event.target.value.length });
  };

  const handleChangeSelect = (event) => {
    setSpecialization(event.target.value);
  };

  return (
    <div className={style.main}>
      <h1>Adding scientific work</h1>
      <div className={style.left}>
        <div className={style.container}>
          <form
            noValidate
            onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
          >
            {/* Title */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="title-adding-work"
              name="title"
              label="Title"
              autoComplete="title"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {counts.title}/{maxTitleSize}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange("title")}
              variant="outlined"
              error={!!errors.title}
              helperText={errors?.title?.message}
            />

            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="description-adding-work"
              name="description"
              label="Description"
              autoComplete="description"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {counts.description}/{maxDescriptionSize}
                  </InputAdornment>
                ),
              }}
              multiline
              rows={4}
              onChange={handleChange("description")}
              variant="outlined"
              error={!!errors.description}
              helperText={errors?.description?.message}
            />

            {/* Specialization Input - Select*/}
            <FormControl
              variant="outlined"
              name="specialization"
              className={style.formControl}
              required
              error={!!errors.specialization}
            >
              <InputLabel
                shrink
                htmlFor="specialization-signup"
                className={style.inputLabel}
              >
                Specialization
              </InputLabel>
              <Select
                displayEmpty
                name="specialization"
                value={specialization}
                onChange={handleChangeSelect}
                input={
                  <OutlinedInput
                    notched
                    inputRef={register}
                    name="specialization"
                    id="specialization-signup"
                  />
                }
              >
                <MenuItem className={style.MenuItem} value="">
                  Select
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Computer Science"}>
                  Computer Science
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Mathematics"}>
                  Mathematics
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Biology"}>
                  Biology
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Chemistry"}>
                  Chemistry
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Psychics"}>
                  Psychics
                </MenuItem>
                <MenuItem className={style.MenuItem} value={"Geography"}>
                  Geography
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              className={style.addButton}
              color="primary"
              type="submit"
              variant="contained"
              // onClick={buttonClick}
            >
              Add work
            </Button>
          </form>
        </div>
      </div>
      <div className={style.right}>
        <DropZone SET_FILE={passFile} />
      </div>
    </div>
  );
}
export default AddingWork;
