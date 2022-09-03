import Link from "next/link";
import { useTasksQuery } from "../api/taskApi";
import Task from "./Task";

const TaskLists = () => {
  const { data, error, isLoading, isSuccess } = useTasksQuery();

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Tasks
        </h2>
        <Link href={"/posts/add/new"}>
          <button className="font-semibold text-gray-800 text-sm bg-slate-300 py-2 px-2 rounded-sm">
            Add New
          </button>
        </Link>
      </div>
      <div className="py-6">
        {(isLoading || error) && <p>{"Loading..."}</p>}
        {isSuccess && (
          <>
            {data.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TaskLists;
