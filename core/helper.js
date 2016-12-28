import {
  NETWORK_STATUS
} from "../constants"

export const onSuccess = (action) => {
  return action.status.get('status') == NETWORK_STATUS.SUCCESS;
}
