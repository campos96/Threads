import Thread from "../../types/Thread";
import ThreadCard from "./ThreadCard";
import ThreadCardDesign from "./ThreadCardDesign";

const Threads = ({ items }: { items: Array<Thread> }) => {
  return (
    <>
      {items.map((thread, index) => (
        <ThreadCard threadId={thread.id} key={index} />
      ))}
    </>
  );
};

export default Threads;
