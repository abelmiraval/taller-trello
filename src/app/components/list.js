import { useRef, useState } from "react"
import { todoList } from "./data"
import Image from "next/image"
function List({ title, children, handleDrop, id, listOfLists, setListOfLists }) {
  const formActionsRef = useRef(null)
  const addCardRef = useRef(null)
  const [card, setCard] = useState({
    title: '',
    list: ''
  })

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleChange(event) {
    setCard({
      ...card,
      [event.target.name]: event.target.value,

    })

  }

  function handleSubmit(event) {
    event.preventDefault();
    const newList = [...listOfLists[id]];
 
    const newCard = {
      title: card.title,
      id: Math.random(),
      user: {
        name: "Nuevo Usuario",
        avatar: "/avatar.png"
      }
    }

   const newCardTitle = newCard.title

   const newCardTitleTrimmed= newCardTitle.trim()

    if (newCardTitleTrimmed !== "" ) {

      newList.push(newCard);
      setListOfLists({
        ...listOfLists,
        [id]: newList
      });
      setCard({ title: "", list: "" });
    }
  }
  function handleClick() {
    const formActions = formActionsRef.current
    const addCard = addCardRef.current

   

    formActions.style.display = 'none'

    addCard.style.display = 'flex'
    

  }

  function handleAddClick() {
    const addCard = addCardRef.current
    const formActions = formActionsRef.current
    formActions.style.display = 'flex'

    addCard.style.display='none'
  }


  return (
    <div data-id={id} className="relative flex-1 h-[28rem] md:h-full" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="absolute inset-0 flex flex-col flex-1 gap-4 p-4 text-gray-900 rounded bg-slate-300" >
        <div>
          <h2 className="font-bold "> {title} </h2>
        </div>
        <div className="flex flex-col flex-1 gap-4 overflow-auto">
          {children}
        </div>
        <div>
          <form ref={formActionsRef} className="flex-col hidden gap-4" onSubmit={handleSubmit}  >
            <input className="p-2 rounded-sm " name='title' onChange={handleChange} type="text" autoComplete="off" placeholder="Card Text"></input>
            <div id="form-actions" className="flex gap-4 ">
              <button className="p-2 text-white bg-blue-500 rounded-sm " type="submit">Add Card</button>
              <button onClick={handleClick} className="p-2 text-white bg-transparent bg-blue-500 rounded "><Image src="/close.svg" width={10} height={10} /></button>
            </div>
          </form>
          <div ref={addCardRef} className="flex gap-2" onClick={handleAddClick}>
            <div>
            <Image src='./plus.svg' height={24} width={24} />
              </div>
            <p className="text-gray-500 " > Add card</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
