import { useState } from "react";
import type { ReviewStatus } from "../types/analysis";

const STATUS_OPTIONS: ReviewStatus[] = ["Pending", "Approved", "Edited", "Rejected"];

export default function ReviewPanel() {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<ReviewStatus>("Pending");

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-gray-800">Human Review</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="review-notes">
          Coach notes
        </label>
        <textarea
          id="review-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add corrections, context, or notes before finalizing this analysis..."
          className="mb-4 h-28 w-full resize-none rounded-md border border-gray-300 p-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setStatus("Approved")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Approve
            </button>
            <button
              onClick={() => setStatus("Edited")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => setStatus("Rejected")}
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Reject
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="review-status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="review-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ReviewStatus)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
