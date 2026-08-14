export default function Button({
  label,
  type = "button",
  inputId,
  disabled,
}){
  return (
    <button  
      type={type} 
      id={inputId} 
      className={`border rounded-sm border-black h-8 transition ${disabled ? 'bg-gray-400' : 'bg-cyan-300 hover:bg-white'}`}
    >
      {label}
    </button>
  )
}