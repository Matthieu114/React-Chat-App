/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import { Fab } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Local
import Form from "./channel/Form";
import List from "./channel/List";
//width
import { drawerWidth } from "./Main";

const useStyles = (theme) => ({
  root: {
    height: "100%",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: "-23px",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    background: "rgba(0,0,0,.2)",
    position: "absolute",
    bottom: "0",
    overflow: "auto"
  },
  fab: {
    position: "absolute !important",
    // position: 'fixed !important',
    top: theme.spacing(2),
    // width: '50px',
    // bottom: '0',
    // marginLeft: '100%',
    // bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fabDisabled: {
    display: "none !important"
  }
});

export default function Channel({ channel }) {
  const styles = useStyles(useTheme());
  const listRef = useRef();
  const channelId = useRef();
  const [messages, setMessages] = useState([]);
  const [scrollDown, setScrollDown] = useState(false);
  const addMessage = (message) => {
    fetchMessages();
  };
  const fetchMessages = async () => {
    setMessages([]);
    const { data: messages } = await axios.get(
      `http://localhost:3001/channels/${channel.id}/messages`
    );
    setMessages(messages);
    if (listRef.current) {
      listRef.current.scroll();
    }
  };

  if (channelId.current !== channel.id) {
    fetchMessages();
    channelId.current = channel.id;
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown);
  };
  const onClickScroll = () => {
    listRef.current.scroll();
  };
  return (
    <div css={styles.root}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
	if (condition) {
		
	}	else{

	}
    </div>
  );
}
