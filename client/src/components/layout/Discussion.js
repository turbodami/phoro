import React from "react";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../css/Discussion.css";

function Discussion({ source, text, avatar, link, image, timestamp }) {
  return (
    <div className='discussion'>
      <div className='post__avatar'>
        <Avatar src={avatar}></Avatar>
      </div>
      <div className='post__body'>
        <div className='post__header'>
          <div className='post__headerText'>
            <h3>{source}</h3>
          </div>
          <div className='post__headerDescription'>
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt={source} />
        <div className='post__footer'>
          <ChatBubbleOutlineIcon fontSize='medium' />
          <FavoriteBorderIcon fontSize='medium' />
        </div>
      </div>
    </div>
  );
}

export default Discussion;
