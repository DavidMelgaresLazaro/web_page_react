type UserGreetProps = {
  name: string;
  image: string;
}

function UserGreet(props: UserGreetProps) {

  const { name, image } = props;
  
  return (
    <div className="flex flex-col max-w-12 gap-1 items-center">
      <img className="rounded-full border-2 border-white" src={image} alt={`Foto de perfil de ${name}`} />
      <span className="font-bold text-lg">{name}</span>
    </div>
  )
}

export default UserGreet;