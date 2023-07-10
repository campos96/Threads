import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile.service";
import Profile from "../../types/Profile";
import {
  Card,
  Col,
  Row,
  Spinner,
  Tab,
  Tabs,
  Image,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Threads from "../../components/threads/Threads";
import Thread from "../../types/Thread";
import { getThreads } from "../../services/threads.service";
import PATHS from "../../routes/paths";

const Index = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    setLoading(true);
    getProfile(username!)
      .then(
        (response) => {
          if (response.status === 200) {
            const profile = response.payload as Profile;
            setProfile(profile);
          } else {
            setError(true);
          }
        },
        (error) => {
          setError(true);
        }
      )
      .then(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <>
      {loading && (
        <div className="p-md-3 text-center text-muted">
          <h3>Loading Threads...</h3>
          <Spinner animation="border" className="mt-3"></Spinner>
        </div>
      )}
      {error && (
        <div className="p-md-5 text-center text-muted">
          <h1>Opps!</h1>
          <h3>Something went wrong</h3>
          <p>Please try again later...</p>
        </div>
      )}

      {profile && <ProfileCard profile={profile} />}
    </>
  );
};

const ProfileCard = ({ profile }: { profile: Profile }) => {
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
                <Button
                  href={PATHS.PROFILE_EDIT}
                  size="sm"
                  variant="outline-dark"
                >
                  Edit profile
                </Button>
              </div>
            </Col>
            <Col xs={3} className="d-flex align-items-center ps-0">
              xs={3}
              className="d-flex align-items-center ps-0"
            >
              <Image
                src="https://i.pravatar.cc/300"
                roundedCircle
                className="w-100"
              />
            </Col>
          </Row>
          {profile.biography && (
          <Row>
            <Col>
              <div style={{ whiteSpace: "pre-wrap" }}>{profile.biography}</div>
            </Col>
          </Row>
          )}
          <Row className="mt-3">
            <Col>
              <a href="/eeeeee" className="link-dark">
                x followers
              </a>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ProfileSections />
    </>
  );
};

const ProfileSections = () => {
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
            {key && <ProfileThreads />}
          </Tab>
          {/* <Tab eventKey="replies" title="Replies">
                    replies
                  </Tab> */}
        </Tabs>
      </Col>
    </Row>
  );
};

const ProfileThreads = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [threads, setThreads] = useState<Array<Thread>>();

  useEffect(() => {
    setLoading(true);
    getThreads()
      .then(
        (response) => {
          if (response.status === 200) {
            const threadList = response.payload as Array<Thread>;
            setThreads(threadList);
          } else {
            setError(true);
          }
        },
        (error) => {
          setError(true);
        }
      )
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="p-md-3 text-center text-muted">
          <Card.Title>Loading Profile...</Card.Title>
          <Spinner animation="border" className="mt-3"></Spinner>
        </div>
      )}
      {error && (
        <div className="p-md-5 text-center text-muted">
          <h1>Opps!</h1>
          <h3>Something went wrong</h3>
          <p>Please try again later...</p>
        </div>
      )}
      {threads && <Threads items={threads} />}
    </>
  );
};

export default Index;
