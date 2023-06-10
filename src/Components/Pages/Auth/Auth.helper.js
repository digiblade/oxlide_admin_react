import { httpPOST } from "../../../Utils/Api";
import { logSystemData } from "../../../Utils/utils";
export const checkLogin = async (payload) => {
  try {
    let { status, data } = await httpPOST("/login", payload);
    if (status >= 200 && status < 300) {
      return data;
    } else {
      return false;
    }
  } catch (exception) {
    logSystemData(exception);
    return false;
  }
};
