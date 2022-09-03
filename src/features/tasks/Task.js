import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

const Task = ({ task }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (showDeleteModal) document.body.style.setProperty("overflow", "hidden");
    else document.body.style.removeProperty("overflow");
  });

  return (
    <div className="w-full relative overflow-hidden md:flex mb-4 py-2 bg-white border border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <span className="text-gray-700 bg-gray-300 px-3 py-1 font-light text-xs absolute right-0 top-0 rounded-bl capitalize">
        Pending
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

        <h3 className="font-semibold text-gray-800 my-2 hover:underline text-lg">
          <Link href="/cars/[make]/[model]/[id]">
            <a target="_blank">{task.title}</a>
          </Link>
        </h3>

        <div className="mb-4 w-full text-gray-700 text-sm">{task.description}</div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-800 inline-flex items-center">
            <a href="#">
              <img
                className="w-8 h-8 rounded-full inline-block mr-2"
                src="https://avatars0.githubusercontent.com/u/8238734?s=460&u=4fb91c2850a8e1e7aeb7c2c7a7c7c27f97230823&v=4"
                alt="Asian Girl Avatar"
              />
            </a>
            <span className="mx-1">&bull;</span>
            <a href="#" className="hover:underline text-xs font-light">
              Niyaz
            </a>
            <span className="mx-1">&bull;</span>
            <span className="text-xs font-light">{ format(new Date(), 'dd/mm/yyyy') }</span>
          </div>

          <div className="text-right">
            <div className="flex items-center">
              <Link href="/tasks/edit">
                <a
                  href="#"
                  className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 text-blue-600 text-xs uppercase"
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
              </Link>
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
      </div>
      {/* {showDeleteModal ? <Delete closeModal={closeModal} /> : ""} */}
    </div>
  );
};

export default Task;
