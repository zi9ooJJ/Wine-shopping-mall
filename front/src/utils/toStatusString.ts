import { OrderStatus } from "../models";

export function toStatusString(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "배송 준비중 📦";
    case "delivering":
      return "배송 중 🚚";
    case "completed":
      return "배송 완료 💜";
    default:
      return "알 수 없음 🔥";
  }
}
