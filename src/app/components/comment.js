import Image from "next/image"

function Comment({avatar, name, comment}) {
  return (
    <div className="flex flex-col gap-2 ">
    <div className="flex items-center gap-2 ">
      <Image src={avatar ? avatar: null} width={32} height={32} />
      <p className="">{name ? name : null}</p>
      <span className="text-sm text-gray-400">hace 4 horas</span>
    </div>
    <div className="flex flex-col gap-2 ml-9">
      <p className="p-2 bg-white rounded ">{comment ? comment : null}</p>
      <p className="text-sm text-gray-500 underline ">Responder</p>
    </div>
  </div>
  )
}

export default Comment
