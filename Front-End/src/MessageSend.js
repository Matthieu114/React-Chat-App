import { useTheme } from "@material-ui/core/styles"

const useStyles = (theme) => ({
  content: {
    flex: "1 1 auto",
    marginRight: ".5rem"
  },
  send: {
    backgroundColor: "#D6DDEC",
    padding: ".2rem .5rem",
    border: "none",
    ":hover": {
      backgroundColor: "#2A4B99",
      cursor: "pointer",
      color: "#fff"
    }
  }
})
const styles = useStyles(useTheme())
