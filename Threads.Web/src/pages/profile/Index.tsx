import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile.service";
import Profile from "../../types/Profile";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sections from "./Sections";
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";

const Index = () => {
  const { username } = useParams();
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    getProfile(username!).then(
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
    );
  }, [username]);

  return (
    <>
      {!profile && <ProfileSkeleton />}

      {profile && (
        <>
          <Header profile={profile} />
        </>
      )}

      <Sections username={username!} />

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

export default Index;
