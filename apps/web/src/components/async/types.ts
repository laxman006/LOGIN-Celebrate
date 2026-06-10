export type AsyncStatus = "loading" | "empty" | "error" | "success";

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}

export function idle<T>(): AsyncState<T> {
  return { status: "loading" };
}

export function success<T>(data: T): AsyncState<T> {
  return { status: "success", data };
}

export function error<T>(message: string): AsyncState<T> {
  return { status: "error", error: message };
}

export function empty<T>(): AsyncState<T> {
  return { status: "empty" };
}
