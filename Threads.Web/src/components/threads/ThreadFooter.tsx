import { Row, Col, Image } from "react-bootstrap";
import { Thread } from "../../types/Thread";
import { useEffect, useState } from "react";
import { getThread } from "../../services/threads.service";
import thradReplied from "../../assets/img/thread-with-replies.png";

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
  const [thread, setThread] = useState<Thread>();

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
              <>
                <div style={{ width: 50 }}>
                  <Image src={thradReplied} className="w-100" />
                </div>
              </>
            )}

            {!replied && thread.replies === 0 && (
              <div style={{ width: 50 }}></div>
            )}

            {!replied && thread.replies === 1 && (
              <div style={{ width: 50 }}>
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  style={{ marginLeft: 12, width: 25 }}
                />
              </div>
            )}

            {!replied && thread.replies === 2 && (
              <div style={{ width: 50 }}>
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  width={25}
                />
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  width={25}
                />
              </div>
            )}

            {!replied && thread.replies >= 3 && (
              <div style={{ width: 50 }}>
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  style={{ width: 17, marginRight: 3 }}
                />
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  width={30}
                />
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  width={25}
                  style={{ marginTop: -11, marginLeft: 2 }}
                />
              </div>
            )}
          </Col>
          <Col className="d-flex ps-0">
            <div
              className="d-flex float-start gap-2 align-items-center text-secondary"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              {thread.replies === 1 && <small>{thread.replies} reply</small>}
              {thread.replies > 1 && <small>{thread.replies} replies</small>}
              {thread.replies > 0 && thread.likes > 0 && <small>-</small>}
              {thread.likes === 1 && <small>{thread.likes} like</small>}
              {thread.likes > 1 && <small>{thread.likes} likes</small>}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ThreadFooter;
