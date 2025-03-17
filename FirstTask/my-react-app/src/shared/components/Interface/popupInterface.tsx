import User from "./userInterface";
export default interface PopupProps {
  isOpen: Boolean;
  onClose: () => void;
  data: User | null;
}
