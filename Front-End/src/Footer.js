import { useTheme } from "@material-ui/core/styles"

const useStyles = (theme) => ({
  footer: {
    height: "30px",
    backgroundColor: "rgba(255,255,255,.3)",
    flexShrink: 0
  }
})
const styles = useStyles(useTheme())
