import { Row, Col, Image } from "react-bootstrap";
import { Thread } from "../../types/Thread";
import { useEffect, useState } from "react";
import { getThread, getThreadRepliers } from "../../services/threads.service";
import Account from "../../types/Account";
import PATHS from "../../routes/paths";
import { API_URL, PROFILE } from "../../routes/endpoints";

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

const ThreadFooterRepliers = ({ threadId }: { threadId: string }) => {
  const [repliers, setRepliers] = useState<Array<Account>>([]);
  const replies: number = 2;

  useEffect(() => {
    getThreadRepliers(threadId).then((response) => {
      if (response.status === 200) {
        const _repliers = response.payload as Array<Account>;
        setRepliers(_repliers);
      }
    });
  }, [threadId]);

  return (
    <div>
      <div style={{ width: 50 }}>
        {repliers &&
          repliers.map((replier, index) => (
            <Image
              src={API_URL + PROFILE.GET_PHOTO + replier.username}
              roundedCircle
              style={{ width: 50 / repliers.length }}
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
