import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Filter from "bad-words";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeSince = (date: Date) => {
  const d = new Date();
  const seconds = Math.floor((d.getTime() - date.getTime()) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const validateUsername = (text: string) => {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/;
  return pattern.test(text);
};

export const cleanup = (text: string) => {
  const filter = new Filter();

  try {
    return filter.clean(text);
  } catch {
    return text;
  }
};
