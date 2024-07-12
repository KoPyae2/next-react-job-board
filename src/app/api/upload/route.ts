import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import uniqid from 'uniqid';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Generate a unique filename
  const newFilename = `${uniqid()}-${file.name}`;

  // Create a directory to store uploaded files if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  // Blob data of our file
  const chunks: Uint8Array[] = [];
  const reader = file.stream().getReader();

  // Read the stream
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);

  // Write the file to the local directory
  const filePath = path.join(uploadDir, newFilename);
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({
    newFilename,
    url: `/uploads/${newFilename}`,
  });
}
