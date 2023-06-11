export const objectDeepCopy = (jsonObject) => {
  try {
    return JSON.parse(JSON.stringify(jsonObject));
  } catch (exception) {
    logSystemData(exception);
  }
  return jsonObject;
};

export const logSystemData = (log, otherInfos = "") => {
  console.log(
    `Logs::>> ${log} ${
      otherInfos && otherInfos !== "" ? `Other Info::>> ${otherInfos}` : ""
    }`
  );
};

export const getValueThroughJSON = (
  JSONInput,
  mappingKey,
  defaultValue = false
) => {
  let currentValue = defaultValue;
  try {
    let parsedObject =
      typeof JSONInput === "string" ? JSON.parse(JSONInput) : JSONInput;
    currentValue = eval(`parsedObject${mappingKey}`);
  } catch (exception) {
    logSystemData(exception);
  }
  return currentValue;
};

export const getUserDetails = () => {
  let localData = localStorage.getItem(
    process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY
  );
  try {
    localData = JSON.parse(localData);
  } catch (exception) {
    localData = {};
    logSystemData(exception);
  }

  return localData;
};
