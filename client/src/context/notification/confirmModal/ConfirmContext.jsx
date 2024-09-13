import { useContext, createContext, useState } from "react"


const ConfirmContext = createContext({
    confirm: (message, onConfirm, onCancel) => {},
})


export function ConfirmProvider({childer}){
const [confirmState, setConfirmState] = useState({
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    visible: false,
});

const confirm = (message, onConfirm, onCancel) => {
    setConfirmState({message, onConfirm, onCancel, visible: true});
}

    return (
    <ConfirmContext.Provider values={{confirm}}>
        {children}

        {confirmState.visible && (
<div className="confirm-modal">
    <div className="modal-content">
        <p>confirm.message</p>
        <button onClick={confirmState.onConfirm}>Confirm</button>
        <button onClick={confirmState.onCancel}>Cancel</button>
    </div>
</div>
        )}
    </ConfirmContext.Provider>
    )
}

export const useConfirm = () => useContext(ConfirmContext)