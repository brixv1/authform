import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-2xl
        bg-neutral-800 
        px-4 
        py-2 
        text-violet-600 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-neutral-700 
        hover:bg-neutral-700 
        focus:outline-offset-0
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        focus-visible:outline-violet-600
      "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
