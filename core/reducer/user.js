import { Map } from 'immutable';
import { onSuccess } from '../helper'

import {
} from "../constants"

const defaultState = Map({
  user:Map({})
})

export default function(state=defaultState,action) {
  switch (action.type) {
    default:
      return state;
  }
}
