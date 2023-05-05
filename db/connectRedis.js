import redis from "redis";
const clientRedis = redis.createClient();

clientRedis.on("connect", () => {
  console.log("Connected to Redis");
});
clientRedis.on("error", (err) => {
  console.log(`Error: ${err}`);
});
await clientRedis.connect();

export default clientRedis;
