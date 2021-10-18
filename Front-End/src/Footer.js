import React from "react"
const styles = {
  footer: {
    height: "30px",
    color: "red",
    backgroundColor: "rgba(255,255,255,.3)",
    flexShrink: 0
  }
}
const Footer = () => {
  return (
    <footer css={styles.footer}>
      <h2>by BRICE and DENIS</h2>
    </footer>
  )
}
export default Footer
