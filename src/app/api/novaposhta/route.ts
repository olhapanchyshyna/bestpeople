import { searchSettlements } from "@/lib/actions/novaPoshta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cityName, limit, page } = await req.json();
    const data = await searchSettlements(cityName, limit, page);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching settlements:", error);
    return NextResponse.json(
      { error: "Failed to search settlements" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
