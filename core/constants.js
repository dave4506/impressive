export const UPDATE_APP_STATE = "UPDATE_APP_STATE";

export const APP_STATE = {
  EDIT:"EDIT",
  VIEW:"VIEW",
  INDEX:"INDEX",
  PUBLIC:"PUBLIC",
  INIT:"INIT"
}

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const RESET_QUESTION = "RESET_QUESTION";
export const SEND_QUESTION = "SEND_QUESTION"; //NOT DONE WAITING ON PROFILE

export const PULL_PROFILE = "PULL_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const SAVE_PROFILE = "SAVE_PROFILE";

export const NETWORK_STATUS = {
  SUCCESS:"SUCCESS",
  ERROR:"ERROR",
  LOADING:"LOADING",
  INIT:"INIT"
}

export const GROUP_KEYS = {
  NONE:"NONE",
  THIS_IS_ME:"THIS_IS_ME",
  PASSIONS:"PASSIONS",
  BELIEFS:"BELIEFS",
  EXPERIENCE:"EXPERIENCE"
}

export const QUESTION_STATUS = Object.assign({
  QUESTIONING:"QUESTIONING",
  EMAIL:"EMAIL",
  INVALIDEMAIL:"INVALIDEMAIL"
},NETWORK_STATUS)

export const PULL_ARTICLES = "PULL_ARTICLES";
export const PULL_GROUPS = "PULL_GROUPS";
export const PULL_DRAFTS = "PULL_DRAFTS";

export const SET_CURRENT_ARTICLE = "SET_CURRENT_ARTICLE";

export const MOVE_GROUP = "MOVE_GROUP";

export const CREATE_DRAFT = "CREATE_DRAFT";
export const SAVE_DRAFT = "SAVE_DRAFT";
export const PUBLISH_DRAFT = "PUBLISH_DRAFT";
export const DELETE_DRAFT = "DELETE_DRAFT";

export const CREATE_ARTICLE = "CREATE_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const USER_STATUS_CHANGE = "USER_STATUS_CHANGE";
