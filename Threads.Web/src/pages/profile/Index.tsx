import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile.service";
import Profile from "../../types/Profile";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Summary from "./Summary";

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

      {profile && <Summary profile={profile} />}
    </>
  );
};

export default Index;
