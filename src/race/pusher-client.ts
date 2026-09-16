import PusherJs from "pusher-js";

let client: PusherJs | null = null;

export function getPusherClient(nickname: string): PusherJs {
  if (client) return client;
  client = new PusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "",
    authEndpoint: "/api/pusher/auth",
    auth: { params: { nickname } },
  });
  return client;
}
