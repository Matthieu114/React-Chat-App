/** @jsxImportSource @emotion/react */
import { useTheme } from "@mui/styles"

const useStyles = (theme) => ({
  header: {
    height: "60px",
    backgroundColor: theme.palette.primary.dark,
    flexShrink: 0
  },
  headerLogIn: {
    backgroundColor: "red"
  },
  headerLogOut: {
    backgroundColor: "blue"
  }
})

export default function Header() {
  const styles = useStyles(useTheme())
  return (
    <header css={styles.header}>
      <h1>Welcome on our chat application</h1>
    </header>
  )
}
