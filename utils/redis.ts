import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
};

export const tokenKeyExist = async () => {
  await connect();
  const exists = await client.exists("cache");
  return exists;
};

export const getcache = async () => {
  await connect();
  const cache = await client.get("cache");
  return cache;
};

export const setcache = async (token: string) => {
  await connect();
  await client.set("cache", token);
};
