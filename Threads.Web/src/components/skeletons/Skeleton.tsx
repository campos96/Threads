import React from "react";
import { Card, Col, Row } from "react-bootstrap";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  style?: React.CSSProperties;
};

export const ThreadSkeletonCard = ({ cards }: { cards?: number }) => {
  cards = cards !== undefined ? cards : 1;
  return (
    <>
      {cards &&
        Array(cards)
          .fill(0)
          .map((card, index) => (
            <Card className="shadow-sm mb-1 mb-sm-2 mb-md-3" key={index}>
              <Card.Body>
                <ThreadSkeleton />
              </Card.Body>
            </Card>
          ))}
    </>
  );
};

export const ThreadSkeleton = () => {
  return (
    <>
      <ThreadSkeletonHeader />
      <ThreadSkeletonActions />
      <Row className="mt-2">
        <Col xs="auto">
          <div style={{ width: 50 }}>
            <Skeleton
              circle
              width={25}
              height={25}
              style={{ marginLeft: 12.5 }}
            />
          </div>
        </Col>
        <Col className="ps-0">
          <Row className="h-100">
            <Col xs="auto" className="d-flex align-items-center">
              <Skeleton width={50} />
            </Col>
            <Col xs="auto" className="ps-0 d-flex align-items-center">
              <Skeleton width={50} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export const ThreadSkeletonHeader = () => {
  return (
    <Row>
      <Col xs="auto">
        <Skeleton width={50} height={50} circle />
      </Col>
      <Col className="ps-0 pt-2">
        <Row>
          <Col>
            <Skeleton width={100} />
          </Col>
          <Col xs="auto">
            <Skeleton width={50} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Skeleton width="80%" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const ThreadSkeletonActions = () => {
  return (
    <Row className="mt-2">
      <Col xs="auto">
        <div style={{ width: 50 }}></div>
      </Col>
      <Col className="ps-0">
        <Row>
          <Col xs="auto">
            <Skeleton circle width={23.5} height={25} />
          </Col>
          <Col xs="auto" className="ps-0">
            <Skeleton circle width={23.5} height={25} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const Skeleton = ({ height, width, circle, style }: SkeletonProps) => {
  return (
    <div
      className="skeleton"
      style={{
        backgroundColor: "#ddd",
        height: height ?? 15,
        width: width ?? "100%",
        borderRadius: circle ? "100%" : 0,
        ...style,
      }}
    ></div>
  );
};
