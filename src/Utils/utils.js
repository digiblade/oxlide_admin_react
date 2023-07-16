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
export const replacePlaceholders = (template, placeholders) => {
  let placeholderKeys = template.match(/<([^>]+)>/g);
  placeholderKeys = [...new Set(placeholderKeys)];
  placeholderKeys = placeholderKeys.map((match) => match.slice(1, -1));
  for (let key of placeholderKeys) {
    if (placeholders.hasOwnProperty(key)) {
      let placeholder = `<${key}>`;
      let value =
        typeof placeholders[key] === "string"
          ? `'${placeholders[key]}'`
          : placeholders[key];
      template = template.replace(new RegExp(placeholder, "g"), value);
    }
  }
  return template;
};
export const executeJS = (jsString) => {
  try {
    let func = Function(jsString);
    return func();
  } catch (error) {
    logSystemData(error);
    return null;
  }
};
