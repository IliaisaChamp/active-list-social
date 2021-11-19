import React from "react";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useFormik, Form, FormikProvider } from "formik";

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
  mb: 3,
  width: "100%",
};

const descWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "space-between",
  flexDirection: "column",
  mr: 3,
  maxWidth: "60%",
};
const bgBox = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1604737771065-7ce2dc4ba3e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1954&q=80)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left 117px top 64%",
  backgroundSize: "100%",
  opacity: 0.5,
  zIndex: 1,
  borderRadius: 4,
};

const UserProfile = () => {
  const InputFile = styled("input")({
    display: "none",
  });



  const formik = useFormik({
    initialValues: {
      avatar: "",
    },
    onSubmit: (data) => {
      console.dir(data);
    },
  });
  const changeAvatar = () => {
    formik.handleChange
  };

  return (
    <Box sx={wrapperStyle}>
      <Box sx={{ position: "relative", mr: 6 }}>
        <Avatar
          alt="USER PHOTO"
          src="/static/mock-images/avatars/avatar_7.jpg"
          sx={{ width: 250, height: 250, zIndex: 2 }}
        />
        <Stack
          sx={{
            left: "70%",
            bottom: "5%",
            position: "absolute",
            zIndex: 4,
          }}
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <label htmlFor="icon-button-file">
            <InputFile
              accept="image/*"
              id="icon-button-file"
              type="file"
              name="avatar"
              onChange={changeAvatar}
              value={formik.values.avatar}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              size="large"
            >
              <PhotoCamera sx={{ width: "100%", height: "100%" }} />
            </IconButton>
          </label>
        </Stack>
        {/*<AddCircleOutlineTwoToneIcon/>*/}
      </Box>
      <Box sx={descWrapper}>
        <Typography gutterBottom variant="h3" sx={{ zIndex: 2 }}>
          FirstName last`name
        </Typography>
        <Typography gutterBottom sx={{ zIndex: 2 }}>
          Email@email.ru
        </Typography>
        <Typography gutterBottom sx={{ zIndex: 2 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          unde velit error perspiciatis? Voluptatem eum magnam velit eius natus
          aliquam sunt adipisci totam numquam deleniti dolor, at sed voluptates
          nemo?
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ zIndex: 2 }}
        // component={RouterLink}
        size="large"
        to="#"
        startIcon={<Icon icon={plusFill} />}
      >
        Add task
      </Button>
      <Box sx={bgBox} />
    </Box>
  );
};

export default UserProfile;
