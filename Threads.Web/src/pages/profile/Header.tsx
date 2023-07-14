import {
  Card,
  Col,
  Row,
  Image,
  Button,
  Modal,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Profile from "../../types/Profile";
import PATHS from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ChangeEvent, useRef, useState } from "react";
import { userIdentity } from "../../services/identity.service";
import {
  deleteProfilePhoto,
  postProfilePhoto,
} from "../../services/profile.service";
import { API_URL, PROFILE } from "../../routes/endpoints";

const Header = ({ profile }: { profile: Profile }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const saveFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      postProfilePhoto(userIdentity()!.id, e.target.files[0]).then(
        (response) => {
          if (response.status === 200) {
            window.location.reload();
          } else {
            setShowModal(false);
          }
        },
        (error) => {
          setShowModal(false);
        }
      );
    }
  };

  const handleDeletePhoto = () => {
    return deleteProfilePhoto(userIdentity()!.id).then(
      (response) => {
        if (response.status === 200) {
          window.location.reload();
        } else {
          setShowModal(false);
        }
      },
      (error) => {
        setShowModal(false);
      }
    );
  };

  const handleShowModal = (show: boolean) => {
    setShowModal(show);
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col className="d-flex gap-1 align-items-center">
              <div>
                <h3 className="mb-0">
                  <strong>{profile.account?.fullName}</strong>
                </h3>
                <h6 className="text-secondary">
                  <strong>{profile.account?.username}</strong>
                </h6>
                {profile.accountId === userIdentity()!.id && (
                  <Button
                    href={PATHS.PROFILE_EDIT}
                    size="sm"
                    variant="outline-dark"
                  >
                    Edit profile
                  </Button>
                )}
              </div>
            </Col>
            <Col xs={3} className="d-flex align-items-center ps-0">
              <div className="position-relative">
                <Image
                  src={API_URL + PROFILE.GET_PHOTO + profile.account!.username}
                  roundedCircle
                  className="img-thumbnail w-100"
                />
                {profile.accountId === userIdentity()!.id && (
                  <Button
                    onClick={() => handleShowModal(true)}
                    variant="light"
                    className="position-absolute bottom-0 start-0 btn-floating-circle"
                  >
                    <FontAwesomeIcon icon={icon({ name: "pencil" })} />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          {profile.biography && (
            <Row>
              <Col>
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {profile.biography}
                </div>
              </Col>
            </Row>
          )}
          {/* <Row className="mt-3">
            <Col>
              <a href="/eeeeee" className="link-dark">
                x followers
              </a>
            </Col>
          </Row> */}
        </Card.Body>
      </Card>

      <Modal centered show={showModal} onHide={() => handleShowModal(false)}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="p-0">
          <Modal.Title className="text-center">Profile Photo</Modal.Title>

          <Row className="justify-content-center my-3">
            <Col xs={8}>
              <Image
                src={API_URL + PROFILE.GET_PHOTO + profile.account!.username}
                roundedCircle
                className="img-thumbnail w-100"
              />
            </Col>
          </Row>

          <input
            id="profileFile"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="d-none"
            ref={hiddenFileInput}
            onChange={saveFileSelected}
          />

          <ListGroup variant="flush" className="text-center">
            <ListGroupItem
              action
              onClick={() => {
                return hiddenFileInput.current?.click();
              }}
              className="text-teal"
            >
              <strong>Upload Photo</strong>
            </ListGroupItem>
            <ListGroupItem
              action
              onClick={handleDeletePhoto}
              className="text-danger"
            >
              <strong>Remove Current Photo</strong>
            </ListGroupItem>
            <ListGroupItem action onClick={() => handleShowModal(false)}>
              Cancel
            </ListGroupItem>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
