import { useState } from "react";
import { useUpdateTaskMutation } from "../api/taskApi";

const EditTaskModal = ({ onClose, taskId, taskTitle, taskDesc }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDesc);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescChanged = (e) => setDescription(e.target.value);

  const handleEditTask = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed: false,
      id: taskId
    };
    await updateTask(task);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form name="addTask" onSubmit={handleEditTask}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    {"Add Task"}
                  </h3>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-col  my-3">
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    className="enabled:hover:border-gray-400 disabled:opacity-75 my-2  focus:border-blue-600 focus:outline-none"
                    value={title}
                    onChange={onTitleChanged}
                    required
                  />
                </div>
                <div className="flex flex-col  my-3">
                  <label>Description</label>
                  <textarea
                    className="
                        text-gray-700
                        bg-white bg-clip-padding
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    name="content"
                    rows="3"
                    value={description}
                    onChange={onDescChanged}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:blue-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5 "
                >
                  Save
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
