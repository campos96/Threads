import { Card, Spinner } from "react-bootstrap";
import { getThreads } from "../../services/threads.service";
import { useEffect, useState } from "react";
import Threads from "../../components/threads/Threads";
import { Thread } from "../../types/Thread";

const Home = () => {
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
          <Card.Title>Loading Threads...</Card.Title>
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

export default Home;
