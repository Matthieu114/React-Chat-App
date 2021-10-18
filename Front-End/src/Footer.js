import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/core"
const styles = {
  footer: {
    height: "30px",
    color: "red",
    backgroundColor: "rgba(255,255,255,.3)",
    flexShrink: 0
  }
}
const Footer = () => {
  return <footer css={styles.footer}>by BRICE and DENIS</footer>
}
export default Footer
