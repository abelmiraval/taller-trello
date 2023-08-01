import Image from "next/image"
function Header() {
  return (
    <header className="bg-black/40 py-2">
      <p className=" logo">
        <Image src="/trello-logo-svgrepo-com.svg" width={40} height={40}/>
        <a className="ml-4 uppercase text-logo" href="https://leonidasesteban.com/">
          Trelloclone
        </a>
      </p>
    </header>
  )
}

export default Header
