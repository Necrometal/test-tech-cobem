export default function NoItem({ message }){
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="text-center">{ message ?? 'Message empty' }</span>
    </div>
  )
}