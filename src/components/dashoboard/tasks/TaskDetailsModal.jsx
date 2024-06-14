import moment from "moment";
import Modal from "../../shared/Modal";

const TaskDetailsModal = ({ task, detailsCloseBtnRef }) => {
    const { _id, title, deadline, description, priority } = task;

    return (
        <Modal name={`taskDetailsModal${_id}`} closeBtnRef={detailsCloseBtnRef}>
            <div className='text-xs rounded cursor-pointer transition-all'>
                <h4 className="text-lg w-full font-medium mb-2">{title}</h4>
                <p className="text-[12px]">{description}</p>
                <p className="pt-4 text-[11px]">{priority} Priority</p>
                <p className="pb-3 text-[11px]">
                    <span className="font-semibold">Deadline: </span>
                    <span className="">{moment(deadline).format("hh:mm a, Do MMM YYYY")}</span>
                </p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => document.getElementById(`editTaskModal${_id}`).showModal()} className="btn px-6 py-2 h-fit min-h-fit rounded bg-blue-600 hover:bg-blue-700 text-white border-0 outline-0 text-[11px] uppercase">Edit</button>
                <button onClick={() => document.getElementById(`deleteTaskModal${_id}`).showModal()} className="btn px-6 py-2 h-fit min-h-fit rounded btn-error text-white border-0 outline-0 text-[11px] uppercase">Delete</button>
            </div>
        </Modal>
    )
};

export default TaskDetailsModal