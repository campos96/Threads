import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const ThreadCardDesign = () => {
  return (
    <Card className="shadow-sm mb-1 mb-sm-2 mb-md-3">
      <Card.Body>
        <Row>
          <Col sm="auto" className="overflow-hidden">
            <Image src="https://i.pravatar.cc/300" roundedCircle width={50} />
            <div className="thread-line"></div>
          </Col>
          <Col className="ps-0">
            <Row>
              <Col>
                <div className="d-flex float-start gap-1 align-items-center">
                  <strong>username</strong>
                  <FontAwesomeIcon
                    icon={icon({ name: "circle-check" })}
                    className="verified-icon"
                  />
                </div>
                <div className="d-flex float-end gap-1 align-items-center">
                  <small className="text-muted">Jul 7, 2023</small>
                  <Button variant="text" className="btn-icon">
                    <FontAwesomeIcon icon={icon({ name: "ellipsis" })} />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                  src="https://picsum.photos/300/200"
                  rounded
                  className="w-100"
                />
              </Col>
            </Row>
            <Row className="mt-2">
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
        <Row>
          <Col sm="auto">
            {/* <div style={{ width: 50 }}></div> */}

            {/* <div style={{ width: 50 }}>
                <Image
                  src="https://i.pravatar.cc/300"
                  roundedCircle
                  style={{ marginLeft: 12, width: 25 }}
                />
              </div> */}

            {/* <div style={{ width: 50 }}>
                <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
                <Image src="https://i.pravatar.cc/300" roundedCircle width={25} />
              </div> */}

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
          </Col>
          <Col className="d-flex ps-0">
            <div className="d-flex float-start gap-2 align-items-center">
              <small className="text-muted">323 replies</small>
              <small className="text-muted">-</small>
              <small className="text-muted">3,232 likes</small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ThreadCardDesign;
