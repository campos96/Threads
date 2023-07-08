import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Thread from "../../types/Thread";

const ThreadCard = ({ props }: { props: Thread }) => {
  console.log(props);
  return (
    props && (
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col sm="auto" className="overflow-hidden">
              <Image src="https://i.pravatar.cc/300" roundedCircle width={50} />
              {props.replies > 0 && <div className="thread-line"></div>}
            </Col>
            <Col className="ps-0">
              <Row>
                <Col>
                  <div className="d-flex float-start gap-1 align-items-center">
                    <strong>{props.account?.username}</strong>
                    {/* <FontAwesomeIcon
                      icon={icon({ name: "circle-check" })}
                      className="verified-icon"
                    /> */}
                  </div>
                  <div className="d-flex float-end gap-1 align-items-center">
                    <small className="text-muted">
                      {props.created.toLocaleString()}
                    </small>
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon icon={icon({ name: "ellipsis" })} />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="mb-2">{props.description}</p>
                </Col>
              </Row>
              {props.attachments.length > 0 && (
                <div className="mb-2">
                  <Image
                    src="https://picsum.photos/300/200"
                    rounded
                    className="w-100"
                  />
                </div>
              )}
              <Row>
                <Col>
                  <div className="d-flex gap-3">
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon
                        icon={icon({ style: "regular", name: "heart" })}
                      />
                    </Button>
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon
                        icon={icon({ style: "regular", name: "comment" })}
                      />
                    </Button>
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon icon={icon({ name: "retweet" })} />
                    </Button>
                    <Button variant="text" className="btn-icon">
                      <FontAwesomeIcon
                        icon={icon({ style: "regular", name: "paper-plane" })}
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <ThreadCardFooter props={props} />
        </Card.Body>
      </Card>
    )
  );
};

const ThreadCardFooter = ({ props }: { props: Thread }) => {
  return (
    <Row>
      <Col sm="auto">
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
          {props.likes > 0 && (
            <small className="text-muted">{props.likes} likes</small>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ThreadCard;
