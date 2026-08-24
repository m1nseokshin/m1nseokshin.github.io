import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-static";

const projectsFilePath = path.join(process.cwd(), "src", "data", "projects.json");

export async function GET() {
  try {
    const fileData = await fs.readFile(projectsFilePath, "utf-8");
    const projects = JSON.parse(fileData);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to read projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projects } = body;

    if (!Array.isArray(projects)) {
      return NextResponse.json({ success: false, message: "Invalid payload format" }, { status: 400 });
    }

    const reorderedProjects = projects.map((item, idx) => ({
      ...item,
      index: idx,
    }));

    await fs.writeFile(projectsFilePath, JSON.stringify(reorderedProjects, null, 2), "utf-8");

    return NextResponse.json({ success: true, data: reorderedProjects });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update projects" }, { status: 500 });
  }
}
