import { useTheme } from "@material-ui/core/styles"
import Channels from "./Channels"
import Channel from "./Channel"

const useStyles = (theme) => ({
  main: {
    backgroundColor: "#373B44",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  }
})
const styles = useStyles(useTheme())
