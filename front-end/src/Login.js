/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles"
import { Box, TextField, Button } from "@mui/material"

const useStyles = (theme) => ({
  root: {
    flex: "1 1 auto",
    background: theme.palette.background.login,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > div": {
      margin: `${theme.spacing(1)}`,
      marginLeft: "auto",
      marginRight: "auto"
    },
    "& fieldset": {
      border: "none",
      "& label": {
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(0.5),
        display: "block"
      }
    }
  }
})

export default function Login({ onUser }) {
  const styles = useStyles(useTheme())
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <div css={styles.root}>
        <div>
          <fieldset>
            <TextField
              color="secondary"
              id="standard-required"
              label="Username"
              variant="standard"
            />
          </fieldset>
          <fieldset>
            <TextField
              color="secondary"
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </fieldset>
          <fieldset>
            <Button
              color="secondary"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation()
                onUser({ username: "david" })
              }}
            >
              Login
            </Button>
          </fieldset>
        </div>
      </div>
    </Box>
  )
}
