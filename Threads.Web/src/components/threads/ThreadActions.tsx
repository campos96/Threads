import { useEffect, useState } from "react";
import { userIdentity } from "../../services/identity.service";
import { getThreadLike, postThreadLike } from "../../services/threads.service";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import PATHS from "../../routes/paths";

type ThreadActionsProps = {
  threadId: string;
  handleUpdate: () => void;
};

const ThreadActions = ({ threadId, handleUpdate }: ThreadActionsProps) => {
  const [likedThread, setLikedThread] = useState<boolean>(false);

  const getThreadLikeState = () => {
    getThreadLike(threadId, userIdentity()!.id).then((response) => {
      setLikedThread(response.status === 200);
    });
  };

  useEffect(() => {
    getThreadLikeState();
  });

  const handleLikeThread = () => {
    postThreadLike(threadId, userIdentity()!.id).then((response) => {
      if (response.status === 200) {
        console.log("thread liked")
        handleUpdate();
        //getThreadLikeState();
      }
    });
  };

  return (
    <div className="d-flex gap-2">
      <Button variant="text" className="btn-icon" onClick={handleLikeThread}>
        {likedThread && (
          <FontAwesomeIcon
            className="text-danger"
            icon={icon({ name: "heart" })}
          />
        )}
        {!likedThread && (
          <FontAwesomeIcon icon={icon({ style: "regular", name: "heart" })} />
        )}
      </Button>
      <Button
        variant="text"
        className="btn-icon"
        href={PATHS.REPLY_THREAD + threadId}
      >
        <FontAwesomeIcon icon={icon({ style: "regular", name: "comment" })} />
      </Button>
      {/* <Button variant="text" className="btn-icon">
            <FontAwesomeIcon icon={icon({ name: "retweet" })} />
            </Button>
            <Button variant="text" className="btn-icon">
            <FontAwesomeIcon
                icon={icon({ style: "regular", name: "paper-plane" })}
            />
            </Button> */}
    </div>
  );
};

export default ThreadActions;
