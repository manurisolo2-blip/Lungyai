import { describe, expect, it } from "vitest";
import { formatClock, formatWindow, getServiceStatus, miamiNow, weeklyHoursRows } from "./hours";

/*
  The hours are the most consequential thing on the page: get them wrong and someone
  drives to Little Havana for nothing. These pin the formatting and the Miami clock.
*/

describe("formatClock", () => {
  it("says noon and midnight in words people use", () => {
    expect(formatClock("12:00")).toBe("noon");
    expect(formatClock("17:00")).toBe("5pm");
    expect(formatClock("09:05")).toBe("9:05am");
    expect(formatClock("22:30")).toBe("10:30pm");
  });
});

describe("formatWindow", () => {
  it("keeps one suffix when both ends share it", () => {
    expect(formatWindow({ label: "Dinner", open: "17:00", close: "22:00" })).toBe("5–10pm");
  });

  it("keeps both when they do not", () => {
    expect(formatWindow({ label: "Lunch", open: "12:00", close: "15:00" })).toBe("noon–3pm");
  });
});

describe("weeklyHoursRows", () => {
  const rows = weeklyHoursRows();

  it("groups the days that share a service", () => {
    expect(rows[0]).toEqual({ days: "Tuesday to Saturday", hours: "noon–3pm, 5–10pm" });
    expect(rows[1]).toEqual({ days: "Sunday", hours: "5–10pm" });
  });

  it("puts the closed day last", () => {
    expect(rows.at(-1)).toEqual({ days: "Monday", hours: "Closed" });
  });
});

describe("miamiNow", () => {
  it("reads Miami time, not the visitor's", () => {
    // 17:00 UTC on a Tuesday in September is 13:00 in Miami, which is on daylight time.
    const { day, minutes } = miamiNow(new Date("2026-09-15T17:00:00Z"));
    expect(day).toBe(2);
    expect(minutes).toBe(13 * 60);
  });
});

describe("getServiceStatus", () => {
  it("is open during lunch", () => {
    const status = getServiceStatus(new Date("2026-09-15T17:00:00Z"));
    expect(status.isOpen).toBe(true);
    expect(status.message).toBe("Open now for lunch, until 3pm");
  });

  it("names the next service in the afternoon gap", () => {
    const status = getServiceStatus(new Date("2026-09-15T20:00:00Z"));
    expect(status.isOpen).toBe(false);
    expect(status.message).toBe("Closed right now. Dinner starts at 5pm");
  });

  it("points at tomorrow once dinner is over", () => {
    const status = getServiceStatus(new Date("2026-09-16T03:00:00Z"));
    expect(status.isOpen).toBe(false);
    expect(status.message).toBe("Closed now. Open tomorrow at noon");
  });

  it("handles the closed day", () => {
    // A Monday lunchtime in Miami.
    const status = getServiceStatus(new Date("2026-09-14T16:00:00Z"));
    expect(status.isOpen).toBe(false);
    expect(status.message).toBe("Closed now. Open tomorrow at noon");
  });
});
