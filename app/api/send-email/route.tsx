import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from 'react';

// You need to add your Resend API key to your environment variables.
// Create a .env.local file in the root of your project and add:
// RESEND_API_KEY=your_api_key

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplateProps {
    name: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    lastname,
    email,
    subject,
    message,
}) => (
    <div>
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> {name} {lastname}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Asunto:</strong> {subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{message}</p>
    </div>
);


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, lastname, email, subject, message } = body;

    if (!name || !lastname || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // This needs to be a domain you have verified with Resend.
      to: ["henrymanuelnavarro@gmail.com"], // This is where you will receive the emails.
      subject: `Nuevo mensaje de tu portafolio: ${subject}`,
      react: <EmailTemplate name={name} lastname={lastname} email={email} subject={subject} message={message} />,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
} 