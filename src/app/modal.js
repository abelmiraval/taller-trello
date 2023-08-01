import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Overlay from "./overlay";
import ModalContentStyled from "./modal-content-styled";
import Image from "next/image";
import Comment from "./components/comment";

const ModalPortal = ({ children }) => {
  useEffect(() => {
    const modalRoot = document.getElementById("__next");
    if (!modalRoot) return; // Verificar si el elemento objetivo existe antes de continuar

    const el = document.createElement("div");
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, document.getElementById("portal"));
};





const Modal = ({ isActive, handleCloseModal, selectedCard }) => {

  if (isActive) {
    return (
      <ModalPortal>
        <ModalContent handleCloseModal={handleCloseModal} selectedCard={selectedCard} />
      </ModalPortal>
    );
  }
  return null;
};


const ModalContent = ({ handleCloseModal, selectedCard }) => {
  const [newComment, setNewComment] = useState("");
  const addCommentRef = useRef(null)

  function handleCommentSubmit(event) {
    event.preventDefault();

    const addComment = addCommentRef.current
    const trimmedComment = newComment.trim()
    if (trimmedComment !== "") {
    const comment = {
      text: newComment,
      user: {
        avatar: "/avatar-3.png",
        name: "Pepa",
      },
    }
    selectedCard.comments.push(comment)
    setNewComment("")
    addComment.style.display = 'none'
  }

  }

  function handleCommentChange(event) {
    setNewComment(event.target.value)
  }

  function handleInputClick() {
    const addComment = addCommentRef.current
    addComment.style.display = 'flex'
  }
  return (
    <Overlay>
      <ModalContentStyled>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between">
              <h2 className="font-bold">{selectedCard.title}</h2>
              <Image className="cursor-pointer" height={16} width={16} onClick={handleCloseModal} src="./close.svg" alt="Close" />
            </div>
            <p className="font-bold">Description</p>
            <input
              placeholder="Add description..."
              className="p-4 bg-gray-200 rounded "
            ></input>
            <div className="flex gap-2">
              <div>
                <Image
                  src={selectedCard.user.avatar ? selectedCard.user.avatar : null}
                  width={32}
                  height={32}
                  alt="User Avatar"
                />
              </div>
              <form onSubmit={handleCommentSubmit} className="flex flex-col flex-1 gap-2">
                  <input
                    type="text"
                    value={newComment}
                    placeholder="Write a comment..."
                    className="p-2"
                    onChange={handleCommentChange}
                    onClick={handleInputClick}
                  ></input>
                  <div ref={addCommentRef} className="flex gap-4">
                    <button  type="submit" className="p-2 text-sm text-white bg-blue-500 rounded">Guardar</button>
                    <button  className="text-sm bold">Cancelar</button>
                  </div>


              </form>
            </div>
      
          </div>
          <div className="flex flex-col gap-4 overflow-auto max-h-96 ">
          {selectedCard.comments &&
            selectedCard.comments.length > 0 &&
            selectedCard.comments.map((comment, index) => (
              <Comment
                key={index}
                avatar={comment.user.avatar}
                name={comment.user.name}
                comment={comment.text}
              />
            ))}
          </div>


        </div>
      </ModalContentStyled>
    </Overlay>
  )



}

export default Modal;