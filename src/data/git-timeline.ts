export interface TimelineEntry {
  id: string;
  branchName: "main" | "education" | "learning" | "career" | "future";
  message: string;
  date: string;
  isMerge?: boolean;
}

export const timelineData: TimelineEntry[] = [
  { id: "a1b2c3d", branchName: "main", message: "init: Early interest in Math & Logic", date: "2021-01-15" },
  { id: "b2c3d4e", branchName: "education", message: "feat: Completed High School & Intermediate in Commerce", date: "2021-06-01" },
  { id: "c3d4e5f", branchName: "education", message: "feat: Enrolled in BBA (Accounting)", date: "2022-01-10" },
  { id: "d4e5f6g", branchName: "learning", message: "feat: Started Python Programming", date: "2023-04-20" },
  { id: "e5f6g7h", branchName: "learning", message: "feat: Mastered HTML, CSS, JavaScript", date: "2023-08-15" },
  { id: "f6g7h8i", branchName: "main", message: "merge: Ready as Frontend Developer (React)", date: "2023-12-01", isMerge: true },
  { id: "g7h8i9j", branchName: "career", message: "feat: Landed Remote Job as WordPress Developer", date: "2024-02-15" },
  { id: "h8i9j0k", branchName: "career", message: "fix: Balancing BBA University & Remote Job", date: "2024-06-10" },
  { id: "i9j0k1l", branchName: "future", message: "refactor: Decided to pivot to Full Stack + AI", date: "2024-09-01" },
  { id: "j0k1l2m", branchName: "main", message: "merge: Enrolled in Programming Hero Level 2 (Current)", date: "2024-10-01", isMerge: true },
];
