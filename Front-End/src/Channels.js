/** @jsx jsx */
import { jsx } from "@emotion/core"

const styles = {
  channels: {
    minWidth: "200px"
  },
  channel: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }
}

export default () => <div css={styles.channels}></div>
