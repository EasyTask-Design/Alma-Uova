import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'data.json');

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Default data if file doesn't exist
      const defaultData = {
        texts: {
          title: "Oltre i competitor. <br>\n<span class=\"amber-accent italic uppercase text-3xl md:text-5xl\">L'essenza dell'uovo veneto.</span>",
          subtitle: "Dopo un'analisi approfondita dei video dei migliori concorrenti nel settore, abbiamo definito un posizionamento che distacca Alma Uova dal banale e punta sulla verità del territorio e della performance."
        },
        media: {
          step1: "",
          step2: "",
          step3: "",
          step4: "",
          step5: "",
          step6: ""
        }
      };
      return NextResponse.json(defaultData);
    }

    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Ensure data directory exists
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
