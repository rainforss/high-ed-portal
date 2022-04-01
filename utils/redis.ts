import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

export const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
  console.log("Connected successfully.");
};

export const disconnect = async () => {
  if (!client.isOpen) {
    return;
  }
  await client.disconnect();
  console.log("Disconnected.");
};

export const tokenKeyExist = async () => {
  const exists = await client.exists("cache");
  return exists;
};

export const getcache = async () => {
  const cache = await client.get("cache");
  return cache;
};

export const setcache = async (token: string) => {
  await client.set("cache", token);
  return;
};
