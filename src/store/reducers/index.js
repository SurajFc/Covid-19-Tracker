import { combineReducers } from "redux";
import virusReducer from "./virusReducer";

const allReducers = combineReducers({ virusReducer: virusReducer });

export default allReducers;
