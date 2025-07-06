export function logRequest(config: any) {
  console.groupCollapsed(`📡 ${config.method?.toUpperCase()} ${config.url}`);
  console.log("Headers:", JSON.parse(JSON.stringify(config.headers)));
  console.log("Params:", config.params);
  console.log("Data:", config.data);
  console.groupEnd();
}

export function logResponse(response: any) {
  console.groupCollapsed(
    `📡 RESPONSE [${response.status}] ${response.config.url}`
  );
  console.log("Data:", response.data);
  console.log("Headers:", response.headers);
  console.groupEnd();
  return response;
}

export function logError(error: any) {
  if (error.response) {
    console.groupCollapsed(
      `❌ ERROR [${error.response.status}] ${error.config.url}`
    );
    console.log("Error Data:", error.response.data);
    console.log("Headers:", error.config.headers);
    console.log("Request Config:", error.config);
    console.groupEnd();
  } else {
    console.error("❌ NETWORK ERROR:", error.message);
  }
  return Promise.reject(error);
}
