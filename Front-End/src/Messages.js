import { useTheme } from "@material-ui/core/styles"

const useStyles = (theme) => ({
  messages: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0
    }
  },
  message: {
    margin: ".2rem",
    padding: ".2rem",
    // backgroundColor: '#66728E',
    ":hover": {
      backgroundColor: "rgba(255,255,255,.2)"
    }
  }
})
