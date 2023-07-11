import Sections from "./Sections";
import Profile from "../../types/Profile";
import Header from "./Header";

const Summary = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <Header profile={profile} />
      <Sections username={profile.account!.username} />
    </>
  );
};

export default Summary;
