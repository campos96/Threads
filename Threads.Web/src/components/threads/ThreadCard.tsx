import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { getThread } from "../../services/threads.service";
import { Thread } from "../../types/Thread";
import ThreadHeader from "./ThreadHeader";
import ThreadFooter from "./ThreadFooter";

const ThreadCard = ({ threadId }: { threadId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [thread, setThread] = useState<Thread>();

  const getThreadDetails = useCallback(() => {
    setLoading(true);
    getThread(threadId)
      .then(
        (response) => {
          if (response.status === 200) {
            setThread(response.payload as Thread);
          } else {
            setError(true);
          }
        },
        (error) => {
          setError(true);
        }
      )
      .then(() => setLoading(false));
  }, [threadId]);

  useEffect(() => {
    getThreadDetails();
  }, [getThreadDetails]);

  const handleUpdate = () => {
    getThreadDetails();
  };

  return (
    <>
      {thread && (
        <Card className="shadow-sm mb-1 mb-sm-2 mb-md-3 overflow-hidden">
          <Card.Body>
            {thread.repliedThreadId && (
              <>
                <ThreadHeader
                  threadId={thread.repliedThreadId}
                  handleUpdate={handleUpdate}
                />
                <ThreadFooter
                  threadId={thread.repliedThreadId}
                  replied={true}
                />
              </>
            )}
            <ThreadHeader
              threadId={threadId}
              filledThread={thread}
              handleUpdate={handleUpdate}
            />
            <ThreadFooter threadId={threadId} filledThread={thread} />
            {loading && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex 
              align-items-center justify-content-center bg-light bg-opacity-50 p-md-3"
              >
                <Spinner animation="border" className="mt-3" />
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {error && (
        <div className="p-md-5 text-center text-muted">
          <h1>Opps!</h1>
          <h3>Something went wrong</h3>
          <p>Please try again later...</p>
        </div>
      )}
    </>
  );
};

export default ThreadCard;
