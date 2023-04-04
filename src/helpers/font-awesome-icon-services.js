import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faXmark,
  faTrash,
  faPenToSquare,
  faAngleUp,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

function registerFAIcons() {
  library.add(faEye, faEyeSlash, faPlus, faTrash, faXmark, faPenToSquare, faAngleUp, faAngleDown);
}

export default registerFAIcons;
