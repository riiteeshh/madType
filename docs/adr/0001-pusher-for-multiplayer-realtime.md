# Use Pusher Channels for multiplayer real-time sync, not a self-hosted socket server

madtyper has no accounts, no database, and is deployed on Vercel as a standard serverless Next.js app. Multiplayer racing needs a persistent real-time channel to sync player progress, but Vercel's serverless functions can't hold long-lived WebSocket connections, and running a separate self-hosted Socket.io/ws process would mean operating and deploying a second stateful service — the exact "backend to manage" this project is trying to avoid.

We chose **Pusher Channels** (a managed pub/sub service) over a self-hosted socket server. The Next.js app stays fully serverless/stateless on Vercel; Pusher hosts the persistent connections and presence-channel semantics (room membership, quick-match lobbies) instead. The trade-off is a third-party dependency and its free-tier limits/cost as usage grows, accepted in exchange for not operating any server ourselves.
