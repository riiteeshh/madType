import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
  secret: process.env.PUSHER_SECRET ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "",
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const socketId = String(formData.get("socket_id"));
  const channelName = String(formData.get("channel_name"));
  const nickname = String(formData.get("nickname") ?? "Guest");

  const presenceData = {
    user_id: `${socketId}-${Math.random().toString(36).slice(2, 8)}`,
    user_info: { nickname },
  };

  const authResponse = pusher.authorizeChannel(socketId, channelName, presenceData);
  return Response.json(authResponse);
}
