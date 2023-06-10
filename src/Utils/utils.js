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
