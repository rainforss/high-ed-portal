import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";
import path from "path";
import { serverlessCachePluginFunc } from "./serverlessCachePlugin";

let cachedCca: ConfidentialClientApplication | null = null;

if (!cachedCca) {
  cachedCca = null;
}

export const instantiateCca = async () => {
  try {
    if (cachedCca) {
      return cachedCca;
    }

    const cachePath = path.join(process.cwd(), "data", "cache.json");
    // const cachePlugin = await cachePluginFunc(
    //   tokenKeyExist,
    //   setcache,
    //   getcache
    // );

    const cachePlugin = serverlessCachePluginFunc(cachePath);
    const clientConfig: Configuration = {
      auth: {
        clientId: process.env.CLIENT_ID as string,
        authority: process.env.AUTHORITY,
        clientSecret: process.env.CLIENT_SECRET,
      },
      cache: {
        cachePlugin,
      },
    };
    const confidentialClientApplication = new ConfidentialClientApplication(
      clientConfig
    );
    cachedCca = confidentialClientApplication;
    return cachedCca;
  } catch (error) {
    throw error;
  }
};
