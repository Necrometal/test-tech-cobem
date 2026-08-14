export default function InputLabel({
  label,
  type,
  inputId,
  name,
  placeholder,
  errorMsg
}){
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId}>{label}</label>
      <input 
        className={`border rounded-sm h-8 px-4 py-2 ${errorMsg ? 'border-red-500' : 'border-black'}`} 
        type={type} 
        id={inputId} 
        name={name} 
        placeholder={placeholder}
      />
      {
        errorMsg && (
          <span className="text-red-500">{errorMsg}</span>
        )
      }
    </div>
  )
}