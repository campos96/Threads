import { useEffect, useState } from "react";
import { getThreads } from "../../services/profile.service";
import { Thread } from "../../types/Thread";
import Threads from "../../components/threads/Threads";
import { ThreadSkeletonCard } from "../../components/skeletons/Skeleton";

const ProfileThreads = ({ username }: { username: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [threads, setThreads] = useState<Array<Thread>>();

  useEffect(() => {
    getThreads(username).then(
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
  }, [username]);

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

export default ProfileThreads;
