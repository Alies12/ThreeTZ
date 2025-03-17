import User from "./userInterface";
export default interface PopupState {
    isOpen: Boolean;
    selectedUser: User | null;
  }
  