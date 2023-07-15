import { useState } from "react";
import { Thread } from "../../types/Thread";
import { getThread, getThreadLikes } from "../../services/threads.service";
import { Col, Row, Image, Button, Modal, ListGroup } from "react-bootstrap";
import { API_URL, ATTACHMENTS, PROFILE } from "../../routes/endpoints";
import PATHS from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import timeElapsed from "../../utils/threadTimeElapsed";
import ThreadActions from "./ThreadActions";
import Account from "../../types/Account";
import Thumbnail from "../images/Thumbnail";

type ThreadHeaderDetailedProps = {
  threadId: string;
  filledThread?: Thread;
  replyMode?: boolean;
  handleUpdate: () => void;
};

const ThreadHeaderDetailed = ({
  threadId,
  filledThread,
  replyMode,
  handleUpdate,
}: ThreadHeaderDetailedProps) => {
  const [thread, setThread] = useState<Thread>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [threadLikeList, setThreadLikeList] = useState<Array<Account>>();

  useState(() => {
    if (filledThread) {
      setThread(filledThread);
    } else {
      getThread(threadId).then((response) => {
        if (response.status === 200) {
          const thread = response.payload as Thread;
          setThread(thread);
        }
      });
    }
  });

  const handleShowLikesModal = (show: boolean) => {
    getThreadLikes(threadId).then((response) => {
      if (response.status === 200) {
        const threadLikes = response.payload as Array<Account>;
        setThreadLikeList(threadLikes);
      }
    });
    setShowModal(show);
  };

  return (
    <>
      {thread && (
        <>
          <Row>
            <Col xs="auto" className="overflow-hidden">
              <Thumbnail username={thread.account!.username} />
              {(thread.replies > 0 || replyMode) && (
                <div className="thread-line"></div>
              )}
            </Col>
            <Col className="ps-0">
              <Row className="h-100">
                <Col>
                  <div className="h-100 d-flex float-start gap-1 align-items-center">
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
                  {!replyMode && (
                    <div className="h-100 d-flex float-end gap-1 align-items-center mt-1">
                      <small className="text-muted">
                        {timeElapsed(thread.created)}
                      </small>
                      <Button variant="text" className="btn-icon">
                        <FontAwesomeIcon icon={icon({ name: "ellipsis" })} />
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    <p className="my-1">{thread.description}</p>
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
              {!replyMode && (
                <ThreadActions
                  threadId={threadId}
                  handleUpdate={handleUpdate}
                />
              )}
              {replyMode && <br />}
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                className="d-flex float-start gap-2 align-items-center text-secondary"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                {thread.replies > 0 && (
                  <small className="link-dark">
                    {thread.replies} {thread.replies > 1 ? "replies" : "Reply"}
                  </small>
                )}
                {thread.replies > 0 && thread.likes > 0 && <small>-</small>}
                {thread.likes > 0 && (
                  <small
                    className="link-dark"
                    onClick={() => handleShowLikesModal(true)}
                  >
                    {thread.likes} like{thread.likes > 1 && "s"}
                  </small>
                )}
              </div>
            </Col>
          </Row>

          <Modal
            centered
            show={showModal}
            onHide={() => handleShowLikesModal(false)}
          >
            <Modal.Header closeButton className="border-0"></Modal.Header>
            <Modal.Body className="p-0">
              <Modal.Title className="text-center">Likes</Modal.Title>
              <ListGroup className="mt-3">
                {threadLikeList &&
                  threadLikeList.map((threadLike, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      href={PATHS.PROFILE + threadLike.username}
                    >
                      <Row>
                        <Col xs="auto">
                          <div style={{ width: 50, height: 50 }}>
                            <Image
                              src={
                                API_URL +
                                PROFILE.GET_PHOTO +
                                threadLike.username
                              }
                              className="rounded-circle w-100 h-100"
                            />
                          </div>
                        </Col>
                        <Col>
                          <strong className="d-block">
                            {threadLike.username}
                          </strong>
                          <small className="d-block">
                            {threadLike.fullName}
                          </small>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ThreadHeaderDetailed;
