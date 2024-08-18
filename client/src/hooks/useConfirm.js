import { useState } from "react"


export const useConfirm = ({id}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

   setIsModalOpen(isModalOpen);


return {
    isModalOpen,
    setIsModalOpen
}
}