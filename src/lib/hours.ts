import { RESTAURANT, WEEKLY_HOURS, type ServiceWindow } from "@/data/restaurant";

export interface ServiceStatus {
  isOpen: boolean;
  message: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "12:00" -> "noon", "17:00" -> "5pm", "22:30" -> "10:30pm". */
export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (h === 12 && m === 0) return "noon";
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

/** "noon–3pm", "5–10pm". */
export function formatWindow(win: ServiceWindow): string {
  const open = formatClock(win.open);
  const close = formatClock(win.close);
  const sameHalf = open.endsWith(close.slice(-2)) && open !== "noon";
  return sameHalf ? `${open.slice(0, -2)}–${close}` : `${open}–${close}`;
}

export interface HoursRow {
  days: string;
  hours: string;
}

/** Consecutive days with the same service share a row ("Tuesday to Saturday"); closed days go last. */
export function weeklyHoursRows(): HoursRow[] {
  const rows: { first: string; last: string; hours: string }[] = [];
  for (const day of WEEKLY_HOURS) {
    const hours = day.windows.length > 0 ? day.windows.map(formatWindow).join(", ") : "Closed";
    const previous = rows[rows.length - 1];
    if (previous && previous.hours === hours) previous.last = day.name;
    else rows.push({ first: day.name, last: day.name, hours });
  }
  return rows
    .sort((a, b) => Number(a.hours === "Closed") - Number(b.hours === "Closed"))
    .map((row) => ({ days: row.first === row.last ? row.first : `${row.first} to ${row.last}`, hours: row.hours }));
}

/** Day and minutes in Miami, whatever timezone the visitor is in. */
export function miamiNow(now: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));

  return {
    day: day === -1 ? now.getDay() : day,
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

export function getServiceStatus(now: Date = new Date()): ServiceStatus {
  const { day, minutes } = miamiNow(now);
  const today = WEEKLY_HOURS.find((d) => d.day === day);

  if (today) {
    const current = today.windows.find(
      (w) => minutes >= toMinutes(w.open) && minutes < toMinutes(w.close)
    );
    if (current) {
      return {
        isOpen: true,
        message: `Open now for ${current.label.toLowerCase()}, until ${formatClock(current.close)}`,
      };
    }

    const later = today.windows.find((w) => minutes < toMinutes(w.open));
    if (later) {
      return {
        isOpen: false,
        message: `Closed right now. ${later.label} starts at ${formatClock(later.open)}`,
      };
    }
  }

  for (let step = 1; step <= 7; step += 1) {
    const next = WEEKLY_HOURS.find((d) => d.day === (day + step) % 7);
    if (next && next.windows.length > 0) {
      const when = step === 1 ? "tomorrow" : next.name;
      return {
        isOpen: false,
        message: `Closed now. Open ${when} at ${formatClock(next.windows[0].open)}`,
      };
    }
  }

  return { isOpen: false, message: "Closed" };
}
