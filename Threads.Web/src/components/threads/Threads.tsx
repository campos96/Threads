import Thread from "../../types/Thread";
import ThreadCard from "./ThreadCard";
import ThreadCardDesign from "./ThreadCardDesign";

const Threads = ({ items }: { items: Array<Thread> }) => {
  return (
    <>
      {items.map((thread, index) => (
        <ThreadCard props={thread} key={index} />
      ))}
      <hr />
      <h5 className="text-center">Demo</h5>
      <hr />
      <ThreadCardDesign />
      <ThreadCardDesign />
      <ThreadCardDesign />
    </>
  );
};

export default Threads;
