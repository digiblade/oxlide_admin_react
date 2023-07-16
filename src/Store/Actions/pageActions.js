import { pageActionTypes } from "../../Configs/actionTypes";

export const addPageDetails = (page) => {
  return {
    type: pageActionTypes.ADD_PAGE_DETAILS,
    payload: page,
  };
};
