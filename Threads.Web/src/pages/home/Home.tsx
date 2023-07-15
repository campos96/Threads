import { getThreads } from "../../services/threads.service";
import { useEffect, useState } from "react";
import Threads from "../../components/threads/Threads";
import { Thread } from "../../types/Thread";
import { ThreadSkeletonCard } from "../../components/skeletons/Skeleton";

const Home = () => {
  const [error, setError] = useState<boolean>(false);
  const [threads, setThreads] = useState<Array<Thread>>();

  useEffect(() => {
    getThreads().then(
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
    );
  }, []);

  return (
    <>
      {!threads && <ThreadSkeletonCard cards={8} />}
      {threads && <Threads items={threads} />}
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

export default Home;
