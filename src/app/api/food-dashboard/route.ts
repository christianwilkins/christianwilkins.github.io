import { NextResponse } from "next/server";
import { readFoodDashboardData } from "@/lib/food-dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await readFoodDashboardData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load food dashboard data";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
