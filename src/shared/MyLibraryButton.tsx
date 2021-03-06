import { ReactComponent as VisibleIcon } from "../assets/visible_icon.svg";

import "./MyLibraryButton.scss";

interface MyLibraryButtonProps {
  showbooksCathegory: (id: string) => void;
  buttonText: string;
  buttonId: string;
  isActive: boolean;
}

const MyLibraryButton = ({
  showbooksCathegory,
  buttonText,
  buttonId,
  isActive,
}: MyLibraryButtonProps) => {
  return (
    <div>
      <button
        className={`my-library-button ${
          isActive && "my-library-button--active"
        }`}
        onClick={() => showbooksCathegory(buttonId)}
      >
        <div className="button-content">
          <div className="button-content__icon">
            <VisibleIcon />
          </div>
          <div>{buttonText}</div>
        </div>
      </button>
    </div>
  );
};

export default MyLibraryButton;
