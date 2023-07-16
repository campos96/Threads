import { useEffect, useState } from "react";
import { userIdentity } from "../../services/identity.service";
import { getThreadLike, postThreadLike } from "../../services/threads.service";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import PATHS from "../../routes/paths";
import { Skeleton } from "../skeletons/Skeleton";

type ThreadActionsProps = {
  threadId: string;
  handleUpdate: () => void;
};

const ThreadActions = ({ threadId, handleUpdate }: ThreadActionsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [likedThread, setLikedThread] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getThreadLike(threadId, userIdentity()!.id)
      .then((response) => {
        console.log("get like status of: " + threadId);
        setLikedThread(response.status === 200);
      })
      .then(() => setLoading(false));
  }, [threadId]);

  const handleLikeThread = () => {
    postThreadLike(threadId, userIdentity()!.id).then((response) => {
      if (response.status === 200) {
        console.log("thread liked");
        setLikedThread(!likedThread);
        handleUpdate();
      }
    });
  };

  return (
    <>
      {loading && (
        <>
          <Row>
            <Col xs="auto">
              <Skeleton circle width={23.5} height={25} />
            </Col>
            <Col xs="auto" className="ps-0">
              <Skeleton circle width={23.5} height={25} />
            </Col>
          </Row>
        </>
      )}
      {!loading && (
        <div className="d-flex gap-2">
          <Button
            variant="text"
            className="btn-icon"
            onClick={handleLikeThread}
          >
            {likedThread && (
              <FontAwesomeIcon
                className="text-danger"
                icon={icon({ name: "heart" })}
              />
            )}
            {!likedThread && (
              <FontAwesomeIcon
                icon={icon({ style: "regular", name: "heart" })}
              />
            )}
          </Button>
          <Button
            variant="text"
            className="btn-icon"
            href={PATHS.REPLY_THREAD + threadId}
          >
            <FontAwesomeIcon
              icon={icon({ style: "regular", name: "comment" })}
            />
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
      )}
    </>
  );
};

export default ThreadActions;
