import { useState } from "react";
import { Thread } from "../../types/Thread";
import { getThread } from "../../services/threads.service";
import { Col, Row, Image, Button } from "react-bootstrap";
import { API_URL, ATTACHMENTS, PROFILE } from "../../routes/endpoints";
import PATHS from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import timeElapsed from "../../utils/threadTimeElapsed";
import ThreadActions from "./ThreadActions";

type ThreadHeaderProps = {
  threadId: string;
  filledThread?: Thread;
  replyMode?: boolean;
  handleUpdate: () => void;
};

const ThreadHeader = ({
  threadId,
  filledThread,
  replyMode,
  handleUpdate,
}: ThreadHeaderProps) => {
  const [thread, setThread] = useState<Thread>();

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

  return (
    <>
      {thread && (
        <Row>
          <Col xs="auto" className="overflow-hidden">
            <Image
              src={API_URL + PROFILE.GET_PHOTO + thread.account!.username}
              roundedCircle
              width={50}
              height={50}
            />
            {(thread.replies > 0 || replyMode) && (
              <div className="thread-line"></div>
            )}
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
                {!replyMode && (
                  <div className="d-flex float-end gap-1 align-items-center">
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
                    loading="lazy"
                    height={attachment.height}
                    width={attachment.width}
                    className="img-fluid"
                    style={{ backgroundColor: "#ddd" }}
                  />
                </div>
              ))}
            {!replyMode && (
              <ThreadActions threadId={threadId} handleUpdate={handleUpdate} />
            )}
            {replyMode && <br />}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ThreadHeader;
