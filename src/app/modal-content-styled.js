
function ModalContentStyled({children}) {
  return (
    <div className="fixed w-3/4 p-5 bg-gray-100 rounded top-2/4 start-2/4 translate-modal ">
      {children}
    </div>
  )
}

export default ModalContentStyled
