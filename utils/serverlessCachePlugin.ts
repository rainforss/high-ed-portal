import { TokenCacheContext } from "@azure/msal-node";
import fs, { PathLike } from "fs";

export function serverlessCachePluginFunc(cacheLocation: PathLike) {
  const beforeCacheAccess = (cacheContext: TokenCacheContext) => {
    return new Promise<void>((resolve, reject) => {
      if (fs.existsSync(cacheLocation)) {
        fs.readFile(cacheLocation, "utf-8", (err, data) => {
          if (err) {
            reject();
          } else {
            cacheContext.tokenCache.deserialize(data);
            resolve();
          }
        });
      } else {
        fs.writeFile(
          cacheLocation,
          cacheContext.tokenCache.serialize(),
          (err) => {
            if (err) {
              reject();
            }
          }
        );
      }
    });
  };

  const afterCacheAccess = (cacheContext: TokenCacheContext) => {
    return new Promise<void>((resolve, reject) => {
      if (cacheContext.cacheHasChanged) {
        fs.writeFile(
          cacheLocation,
          cacheContext.tokenCache.serialize(),
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  };

  return {
    beforeCacheAccess,
    afterCacheAccess,
  };
}
