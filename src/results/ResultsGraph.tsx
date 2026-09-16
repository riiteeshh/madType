"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WpmSample } from "@/test/test-types";

export function ResultsGraph({ samples }: { samples: WpmSample[] }) {
  if (samples.length < 2) return null;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={samples}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="elapsedSeconds"
          stroke="var(--muted-foreground)"
          tickLine={false}
          unit="s"
        />
        <YAxis stroke="var(--muted-foreground)" tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            color: "var(--popover-foreground)",
          }}
        />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke="var(--brand)"
          strokeWidth={2}
          dot={false}
          name="wpm"
        />
        <Line
          type="monotone"
          dataKey="rawWpm"
          stroke="var(--muted-foreground)"
          strokeWidth={1.5}
          dot={false}
          name="raw wpm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
