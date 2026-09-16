export type TestStatus = "idle" | "running" | "finished";

export interface WpmSample {
  elapsedSeconds: number;
  wpm: number;
  rawWpm: number;
}

export interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  samples: WpmSample[];
}
