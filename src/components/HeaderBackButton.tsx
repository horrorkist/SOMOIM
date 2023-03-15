import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface HeaderBackButtonProps {
  onClick?: () => void;
}

export default function HeaderBackButton({ onClick }: HeaderBackButtonProps) {
  const navigate = useNavigate();
  return (
    <FontAwesomeIcon
      icon={faArrowLeft}
      className="text-black text-xl cursor-pointer"
      onClick={onClick ? onClick : () => navigate(-1)}
    />
  );
}
