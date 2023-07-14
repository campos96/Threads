import { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ProfileThreads from "./ProfileThreads";
import ProfileReplies from "./ProfileReplies";

const Sections = ({ username }: { username: string }) => {
  const [key, setKey] = useState("threads");

  return (
    <Row className="mt-3">
      <Col>
        <Tabs
          id="justify-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k!)}
          className="mb-3"
          justify
        >
          <Tab eventKey="threads" title="Threads">
            {key && <ProfileThreads username={username} />}
          </Tab>
          <Tab eventKey="replies" title="Replies">
            {key && <ProfileReplies username={username} />}
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Sections;
