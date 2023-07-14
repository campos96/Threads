import { useNavigate, useParams } from "react-router-dom";
import ThreadHeaderDetailed from "../../components/threads/ThreadHeaderDetailed";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Thread } from "../../types/Thread";
import ThreadHeader from "../../components/threads/ThreadHeader";
import { getThreadReplies } from "../../services/threads.service";
import PATHS from "../../routes/paths";
import ThreadFooter from "../../components/threads/ThreadFooter";

const ThreadDetails = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [threadReplies, setThreadReplies] = useState<Array<Thread>>([]);

  useEffect(() => {
    getThreadReplies(threadId!).then((response) => {
      console.log(response);
      if (response.status === 200) {
        const replies = response.payload as Array<Thread>;
        setThreadReplies(replies);
      }
    });
  }, [threadId]);

  return (
    <>
      {threadId && (
        <Card className="shadow-sm">
          <Card.Body>
            <ThreadHeaderDetailed threadId={threadId} handleUpdate={() => {}} />
            <Row>
              <Col>
                <ListGroup variant="flush">
                  {threadReplies.length > 0 && <hr className="my-2" />}
                  {threadReplies &&
                    threadReplies.map((thread, index) => (
                      <ListGroup.Item
                        
                        className="px-0"
                        key={index}
                      >
                        <ThreadHeader
                          threadId={thread.id}
                          handleUpdate={() => {}}
                        />
                        <ThreadFooter threadId={thread.id} />
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
      {!threadId && (
        <div className="p-md-5 text-center text-muted">
          <h1>Opps!</h1>
          <h3>This thread no longer exist</h3>
        </div>
      )}
    </>
  );
};

export default ThreadDetails;
