import { Card, Col, Row } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

const ProfileSkeleton = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Row>
          <Col className="d-flex gap-1 align-items-center">
            <div>
              <Skeleton
                width={130}
                height={25}
                style={{ marginBottom: 8, marginTop: 5 }}
              />
              <Skeleton width={70} style={{ marginBottom: 8 }} />
              <Skeleton width={80} height={30} style={{ marginBottom: 8 }} />
            </div>
          </Col>
          <Col xs="auto" className="d-flex align-items-center ps-0">
            <div>
              <Skeleton circle height={100} width={100} />
            </div>
          </Col>
        </Row>
        <Skeleton width={200} style={{ marginBottom: 8 }} />
        <Skeleton width={100} />
      </Card.Body>
    </Card>
  );
};

export default ProfileSkeleton;
