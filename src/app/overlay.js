
function Overlay({children}) {
  return (
    <div className="fixed inset-0 backdrop-filter backdrop-blur-sm">
      {children}
    </div>
  )
}

export default Overlay

// .translate-modal{
//   transform: translateX(-50%) translateY(-50%);
// }