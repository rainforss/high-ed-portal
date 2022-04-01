import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";
import { cachePluginFunc } from "./cachePlugin";
import { getcache, setcache, tokenKeyExist } from "./redis";

let cachedCca: ConfidentialClientApplication | null = null;

if (!cachedCca) {
  cachedCca = null;
}

export const instantiateCca = async () => {
  try {
    if (cachedCca) {
      return cachedCca;
    }
    const cachePlugin = await cachePluginFunc(
      tokenKeyExist,
      setcache,
      getcache
    );
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
