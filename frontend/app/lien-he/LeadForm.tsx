"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { api } from "../../lib/api";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.createLead({ name, phone });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-amber-100 bg-[#F3EFE7] p-6 flex items-start gap-3">
        <CheckCircle2 size={22} className="text-[#8a6530] flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-[#241f1a] mb-1">Đã nhận được thông tin của bạn</div>
          <div className="text-sm text-[#6b6459]">
            Chúng tôi sẽ gọi lại trong 24h. Nếu cần gấp hơn, cứ gọi hoặc nhắn Zalo theo số ở trên.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 p-6 sm:p-8">
      <h3 className="font-semibold text-[#241f1a] mb-1">Chưa tiện gọi ngay?</h3>
      <p className="text-sm text-[#6b6459] mb-5">
        Để lại tên và số điện thoại — chúng tôi gọi lại trong 24h, không gọi làm phiền nhiều lần.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm text-[#6b6459] mb-1.5">
            Họ tên
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#241f1a] focus:outline-none focus:border-[#a67c3d] focus:ring-1 focus:ring-[#a67c3d]"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm text-[#6b6459] mb-1.5">
            Số điện thoại
          </label>
          <input
            id="lead-phone"
            type="tel"
            required
            pattern="[0-9]{9,11}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#241f1a] focus:outline-none focus:border-[#a67c3d] focus:ring-1 focus:ring-[#a67c3d]"
            placeholder="0912345678"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">
            Gửi chưa thành công. Vui lòng nhắn trực tiếp qua Zalo/gọi điện theo số ở trên giúp chúng tôi nhé.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-[#a67c3d] hover:bg-[#8a6530] disabled:opacity-60 text-white font-medium text-sm py-3 transition-colors"
        >
          {status === "loading" ? "Đang gửi..." : "Gửi thông tin, gọi lại sau"}
        </button>
      </form>
    </div>
  );
}
