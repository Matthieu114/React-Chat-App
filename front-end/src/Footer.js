/** @jsxImportSource @emotion/react */

//import { ThemeContext } from "@emotion/react"
import { useTheme } from "@mui/styles"

const useStyles = (theme) => ({
  footer: {
    height: "30px",
    backgroundColor: theme.palette.primary.dark,
    flexShrink: 0
  }
})

export default function Footer() {
  const styles = useStyles(useTheme())
  return <footer style={styles.footer}>Designed by brice and denis</footer>
}
