import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import PATHS from "../../routes/paths";
import { userIdentity } from "../../services/identity.service";
import AccountProfile from "../../types/AccountProfile";
import { getProfileAccount } from "../../services/profile.service";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";

const Edit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [accountProfile, setAccountProfile] = useState<AccountProfile>();
  const [error, setError] = useState<boolean>(false);

  const onSucceed = () => {
    navigate(PATHS.PROFILE + userIdentity()!.username);
  };

  useEffect(() => {
    setLoading(true);
    getProfileAccount(userIdentity()!.id)
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            const account = response.payload as AccountProfile;
            setAccountProfile(account);
          } else {
            setError(true);
          }
        },
        (error) => {
          setError(true);
        }
      )
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {accountProfile && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Edit profile</Card.Title>
            <EditForm accountProfile={accountProfile} onSucceed={onSucceed} />
          </Card.Body>
        </Card>
      )}
      {loading && (
        <div className="p-md-3 text-center text-muted">
          <h3>Loading Profile...</h3>
          <Spinner animation="border" className="mt-3" />
        </div>
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

export default Edit;
