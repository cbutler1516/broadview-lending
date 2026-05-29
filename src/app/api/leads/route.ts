import { NextResponse } from "next/server";
import { submitLeadJson } from "@/actions/submit-lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitLeadJson(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: result.duplicate ? 200 : 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
}
