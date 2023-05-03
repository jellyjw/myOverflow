import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Input from "../ui/Input";
import { login } from "../../util/data";
import { loginState } from "../../store";
import { useRecoilState } from "recoil";
function Copyright(props) {
  const a = "jang";
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        My Overflow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
export default function SignIn({ onClose, onChange, onMemberId }) {
  const [ErrorBar, setErrorBar] = useState("");
  const [text, setText] = useState({
    username: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const changeText = e => {
    // console.log(e.target.username);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/;
    if (data.get("email").trim().length === 0 || data.get("password").trim().length === 0) {
      setErrorBar("모든항목을 작성해주세요");
      return;
    } else if (!email.test(data.get("email")) || !passwordRegex.test(data.get("password"))) {
      setErrorBar("정보가 맞는지 확인해주세요"); // 메시지 고민중 바꿀수도
      return;
    } else {
      login(text, data => {
        onClose(isOpen => !isOpen);
        setErrorBar("");
        if (data?.login) {
          setIsLogin({
            login: true,
            memberId: data.memberId,
          });
        }
      });

      // setIsLogin(true)
      // setTimeout(() => {
      //   onClose(isOpen => !isOpen);
      // }, 1000 * 5);

      //로그인이 되면서
      // console.log(text);
    }
  };
  // console.log(text);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            <img src={"/images/logo.png"} alt="logo" className="w-[170px] inline-block " />
            <span>에 오신것을 환영합니다 !</span>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, margin: 0 }}>
            <Grid container spacing={2}>
              <Input
                value={text.username}
                type="email"
                name="email"
                onChange={e => {
                  setText({ ...text, username: e.currentTarget.value });
                }}
              />
              <Input
                type="password"
                name="password"
                value={text.password}
                onChange={e => setText({ ...text, password: e.currentTarget.value })}
              />
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={() => setIsChecked(!isChecked)}
                      checked={isChecked}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {ErrorBar && <div className="text-gray-700 text-center font-thin">{ErrorBar}</div>}
            <Grid sx={{ mt: 3, mb: 2 }}>
              아직 회원이 아니신가요?{" "}
              <Link
                onClick={() => {
                  onChange(prev => !prev);
                }}
              >
                회원가입
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
