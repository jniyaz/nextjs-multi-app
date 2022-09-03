import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditTaskModal from "./EditTaskModal";

const Task = ({ task }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const onClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (showDeleteModal) document.body.style.setProperty("overflow", "hidden");
    else document.body.style.removeProperty("overflow");
  });

  return (
    <div className="w-full relative overflow-hidden md:flex mb-4 py-2 bg-white border border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <span className="text-gray-700 bg-gray-300 px-3 py-1 font-light text-xs absolute right-0 top-0 rounded-bl capitalize">
        {task.completed ? "Done" : "Not Completed"}
      </span>
      <div className="w-full px-4 py-4">
        <div className="text-gray-600 text-xs font-light">
          <span className="text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 px-3 py-1 select-none">
            #{task.id}
          </span>
          {/* <span className="text-blue-500 rounded-md bg-gray-200 hover:bg-gray-300 px-3 py-1 ml-2 select-none">
            Featured
          </span>
          <span className="text-red-500 rounded-md bg-gray-200 hover:bg-gray-300 px-3 py-1 ml-2 select-none">
            Basic
          </span> */}
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <h3 className="font-semibold text-gray-800 my-2 text-lg ml-2">
            {task.title}
          </h3>
        </div>

        <div className="mb-4 w-full text-gray-700 text-sm">
          {task.description}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a
                href="#"
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 text-red-600 text-xs uppercase"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </a>

              <a
                href="#"
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 ml-2 text-blue-600 text-xs uppercase"
                onClick={() => setShowEditModal(true)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </a>

              <a
                href="#"
                onClick={() => setShowDeleteModal(true)}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 ml-2 text-red-600 text-xs uppercase"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </a>
            </div>
        </div>
      </div>
      {showEditModal ? (
        <EditTaskModal
          onClose={onClose}
          taskId={task.id}
          taskTitle={task.title}
          taskDesc={task.description}
        />
      ) : (
        ""
      )}
      {showDeleteModal ? <DeleteModal onClose={onClose} taskId={task.id} /> : ""}
    </div>
  );
};

export default Task;
