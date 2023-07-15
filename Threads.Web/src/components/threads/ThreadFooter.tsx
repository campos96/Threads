import {
  Row,
  Col,
  Image,
  Modal,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Thread } from "../../types/Thread";
import { useEffect, useState } from "react";
import {
  getThread,
  getThreadLikes,
  getThreadRepliers,
} from "../../services/threads.service";
import Account from "../../types/Account";
import { API_URL, PROFILE } from "../../routes/endpoints";
import PATHS from "../../routes/paths";
import { useNavigate } from "react-router-dom";

type ThreadFooterProps = {
  threadId: string;
  filledThread?: Thread;
  replied?: boolean;
};

const ThreadFooter = ({
  threadId,
  filledThread,
  replied,
}: ThreadFooterProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [thread, setThread] = useState<Thread>();
  const [threadLikeList, setThreadLikeList] = useState<Array<Account>>();

  useEffect(() => {
    if (filledThread) {
      setThread(filledThread);
    } else {
      getThread(threadId).then((response) => {
        if (response.status === 200) {
          const _thread = response.payload as Thread;
          setThread(_thread);
        }
      });
    }
  }, [threadId, filledThread]);

  const handleShowLikesModal = (show: boolean) => {
    getThreadLikes(threadId).then((response) => {
      if (response.status === 200) {
        const threadLikes = response.payload as Array<Account>;
        setThreadLikeList(threadLikes);
      }
    });
    setShowModal(show);
  };

  function handleShowReplies(): void {
    navigate(PATHS.THREAD + threadId);
  }

  return (
    <>
      {thread && (
        <Row>
          <Col xs="auto">
            {replied && thread.replies === 1 && (
              <>
                <div style={{ width: 50 }}></div>
                <div className="thread-line"></div>
              </>
            )}
            {replied && thread.replies > 1 && (
              <div className="position-relative">
                <div className="bg-primary" style={{ width: 50 }}></div>
                <div className="thread-line" style={{ height: 30 }}></div>
                <div className="thread-line-circle"></div>
              </div>
            )}

            {!replied && thread.replies === 0 && (
              <div style={{ width: 50 }}></div>
            )}

            {!replied && thread.replies > 0 && (
              <ThreadFooterRepliers threadId={thread.id} />
            )}
          </Col>
          <Col className="d-flex ps-0">
            <div
              className="d-flex float-start gap-2 align-items-center text-secondary"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              {thread.replies > 0 && (
                <small
                  className="link-dark"
                  onClick={() => handleShowReplies()}
                >
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
      )}
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
                <ListGroupItem
                  variant="flush"
                  key={index}
                  action
                  href={PATHS.PROFILE + threadLike.username}
                >
                  <Row>
                    <Col xs="auto">
                      <div style={{ width: 50, height: 50 }}>
                        <Image
                          src={
                            API_URL + PROFILE.GET_THUMBNAIL + threadLike.username
                          }
                          className="rounded-circle w-100 h-100"
                        />
                      </div>
                    </Col>
                    <Col>
                      <strong className="d-block">{threadLike.username}</strong>
                      <small className="d-block">{threadLike.fullName}</small>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ThreadFooterRepliers = ({ threadId }: { threadId: string }) => {
  const [repliers, setRepliers] = useState<Array<Account>>([]);

  useEffect(() => {
    getThreadRepliers(threadId).then((response) => {
      if (response.status === 200) {
        const _repliers = response.payload as Array<Account>;
        setRepliers(_repliers);
      }
    });
  }, [threadId]);

  return (
    <div className="h-100">
      <div
        style={{ width: 50, height: 50 }}
        className="h-100 d-flex justify-content-center align-items-center"
      >
        {repliers &&
          repliers.slice(0, 3).map((replier, index) => (
            <Image
              key={index}
              src={API_URL + PROFILE.GET_THUMBNAIL + replier.username}
              roundedCircle
              loading="lazy"
              style={{
                width: repliers.length === 1 ? 25 : 50 / repliers.length,
                height: repliers.length === 1 ? 25 : 50 / repliers.length,
              }}
            />
          ))}
      </div>

      {/* {repliers.length === 1 && (
        <div style={{ width: 50 }}>
          <Image
            src="https://i.pravatar.cc/300"
            roundedCircle
            style={{ marginLeft: 12, width: 25 }}
          />
        </div>
      )} */}

      {/* {repliers.length === 2 && (
        <div style={{ width: 50 }}>
          <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
          <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
        </div>
      )}

      {repliers.length >= 3 && (
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
      )} */}
    </div>
  );
};

export default ThreadFooter;
