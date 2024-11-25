type UserGreetProps = {
  name: string;
  image: string;
}

// UserGreet component that displays a user's profile picture and name.
// Features:
// - Accepts `name` and `image` props to customize the greeting message.
// - Displays the profile picture as a circular image with a white border.
// - Shows the user's name below the image, styled in bold and large font.


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