export default function PageLoader({ message }){
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="text-center">{ message ?? 'Charging message' }</span>
    </div>
  )
}