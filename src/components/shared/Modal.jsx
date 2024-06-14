const Modal = ({ name, closeBtnRef, children }) => {

    return (
        <dialog id={name} className="modal">
            <div className="modal-box bg-slate-200">
                <form method="dialog">
                    <button ref={closeBtnRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
            </div>
        </dialog>
    )
};

export default Modal