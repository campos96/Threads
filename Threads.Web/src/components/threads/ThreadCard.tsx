import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Thread from "../../types/Thread";
import PATHS from "../../routes/paths";
import { API_URL, ATTACHMENTS, PROFILE } from "../../routes/endpoints";
import timeElapsed from "../../utils/threadTimeElapsed";
import { useCallback, useEffect, useState } from "react";
import {
  getThread,
  getThreadLike,
  postThreadLike,
} from "../../services/threads.service";
import { userIdentity } from "../../services/identity.service";

const ThreadCard = ({ threadId }: { threadId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [likedThread, setLikedThread] = useState<boolean>(false);
  const [thread, setThread] = useState<Thread>();

  const getThreadDetails = useCallback(() => {
    setLoading(true);
    getThread(threadId)
      .then(
        (response) => {
          if (response.status === 200) {
            setThread(response.payload as Thread);
            getThreadLike(threadId, userIdentity()!.id).then((response) => {
              setLikedThread(response.status === 200);
            });
          } else {
            //setShowModal(false);
          }
        },
        (error) => {
          //setShowModal(false);
        }
      )
      .then(() => setLoading(false));
  }, [threadId]);

  const handleLikeThread = () => {
    postThreadLike(threadId, userIdentity()!.id).then((response) => {
      if (response.status === 200) {
        getThreadDetails();
      }
    });
  };

  useEffect(() => {
    getThreadDetails();
  }, [getThreadDetails]);

  return (
    <Card className="shadow-sm mb-1 mb-sm-2 mb-md-3">
      <Card.Body>
        {thread && (
          <>
            <Row>
              <Col xs="auto" className="overflow-hidden">
                <Image
                  src={API_URL + PROFILE.GET_PHOTO + thread.account!.username}
                  roundedCircle
                  width={50}
                />
                {thread.replies > 0 && <div className="thread-line"></div>}
              </Col>
              <Col className="ps-0">
                <Row>
                  <Col>
                    <div className="d-flex float-start gap-1 align-items-center">
                      <a
                        href={PATHS.PROFILE + thread.account?.username}
                        className="link-text"
                      >
                        <strong>{thread.account?.username}</strong>
                      </a>
                      {/* <FontAwesomeIcon
                      icon={icon({ name: "circle-check" })}
                      className="verified-icon"
                    /> */}
                    </div>
                    <div className="d-flex float-end gap-1 align-items-center">
                      <small className="text-muted">
                        {timeElapsed(thread.created)}
                      </small>
                      <Button variant="text" className="btn-icon">
                        <FontAwesomeIcon icon={icon({ name: "ellipsis" })} />
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      <p className="mb-2">{thread.description}</p>
                    </div>
                  </Col>
                </Row>
                {thread.attachments.length > 0 &&
                  thread.attachments.map((attachment, index) => (
                    <div key={index} className="mb-2">
                      <Image
                        src={API_URL + ATTACHMENTS.GET + attachment.id}
                        rounded
                        className="img-thumbnail w-100"
                      />
                    </div>
                  ))}
                <Row>
                  <Col>
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
                      {/* <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon
                        icon={icon({ style: "regular", name: "comment" })}
                      />
                    </Button> */}
                      {/* <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon icon={icon({ name: "retweet" })} />
                    </Button>
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon
                        icon={icon({ style: "regular", name: "paper-plane" })}
                      />
                    </Button> */}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <ThreadCardFooter props={thread} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

const ThreadCardFooter = ({ props }: { props: Thread }) => {
  return (
    <Row>
      <Col xs="auto">
        {props.replies >= 3 && (
          <div style={{ width: 50 }}>
            <Image
              src="https://i.pravatar.cc/300"
              roundedCircle
              style={{ width: 17, marginRight: 3 }}
            />
            <Image src="https://i.pravatar.cc/300" roundedCircle width={30} />
            <Image
              src="https://i.pravatar.cc/300"
              roundedCircle
              width={25}
              style={{ marginTop: -11, marginLeft: 2 }}
            />
          </div>
        )}

        {props.replies >= 2 && (
          <div style={{ width: 50 }}>
            <Image
              src="https://i.pravatar.cc/300"
              roundedCircle
              style={{ marginLeft: 12, width: 25 }}
            />
          </div>
        )}

        {props.replies >= 1 && (
          <div style={{ width: 50 }}>
            <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
            <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
          </div>
        )}

        {props.replies === 0 && <div style={{ width: 50 }}></div>}
      </Col>
      <Col className="d-flex ps-0">
        <div className="d-flex float-start gap-2 align-items-center">
          {props.replies > 0 && (
            <small className="text-muted">{props.replies} replies</small>
          )}
          {props.replies > 0 && props.likes > 0 && (
            <small className="text-muted">-</small>
          )}
          {props.likes === 1 && (
            <small className="text-muted">{props.likes} like</small>
          )}
          {props.likes > 1 && (
            <small className="text-muted">{props.likes} likes</small>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ThreadCard;
