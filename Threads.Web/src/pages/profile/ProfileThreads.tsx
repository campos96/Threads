import { useEffect, useState } from "react";
import { getThreads } from "../../services/profile.service";
import { Thread } from "../../types/Thread";
import { Spinner } from "react-bootstrap";
import Threads from "../../components/threads/Threads";

const ProfileThreads = ({ username }: { username: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [threads, setThreads] = useState<Array<Thread>>();

  useEffect(() => {
    setLoading(true);
    getThreads(username)
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
  }, [username]);

  return (
    <>
      {loading && (
        <div className="p-md-3 text-center text-muted">
          <h3>Loading threds...</h3>
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
      {threads && <Threads items={threads} />}
    </>
  );
};

export default ProfileThreads;
