import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    
    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({
        error: 'Content directory not found'
      }, { status: 404 });
    }

    // Read all markdown files in the content directory
    const files = fs.readdirSync(contentDir);
    const contentData: Record<string, any> = {};

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        contentData[file] = {
          content,
          lastModified: fs.statSync(filePath).mtime
        };
      }
    }

    return NextResponse.json(contentData);
  } catch (error) {
    console.error('Error loading content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fileName, content } = await request.json();
    
    if (!fileName || !content) {
      return NextResponse.json({ 
        error: 'fileName and content are required' 
      }, { status: 400 });
    }

    const contentDir = path.join(process.cwd(), 'content');
    
    // Ensure content directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const filePath = path.join(contentDir, fileName);
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully' 
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}


