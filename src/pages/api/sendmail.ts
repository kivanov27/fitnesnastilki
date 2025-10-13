import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import { NewOrder, NewOrderItem } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
    const newOrder = req.body;
    res.status(200).json({ message: "Email sent" });
    sendMailAsync(newOrder).catch(err =>
        console.error("Email send failed:", err)
    );
}

async function sendMailAsync(newOrder: NewOrder) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS, },
    });

    const itemsHtml = newOrder.order_items
    .map(
        (item: NewOrderItem) =>
            `<li>${item.product_name} (${item.price} лв.)  x  ${item.quantity}  =  ${item.subtotal} лв.</li>`,
    )
    .join("");

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: "🛒 Нова поръчка!",
        html: `
<h2>Нова поръчка от ${newOrder.customer_name} ${newOrder.customer_surname}</h2>
<p><strong>Дата:</strong> ${new Date().toLocaleString("en-GB", {
day: "2-digit",
month: "2-digit",
year: "2-digit",
hour: "2-digit",
minute: "2-digit",
})}</p>
<p><strong>Имейл:</strong> ${newOrder.customer_email}</p>
<p><strong>Телефон:</strong> ${newOrder.customer_phone}</p>
<p><strong>Адрес:</strong> ${newOrder.customer_address}, ${newOrder.customer_city}</p>
<p><strong>Цена:</strong> ${newOrder.total_price} лв.</p>
<p><strong>Бележки:</strong> ${newOrder.notes ?? "няма"}</p>
<p><strong>Продукти:</strong></p>
<ul>${itemsHtml}</ul>
`,
    };

    await transporter.sendMail(mailOptions);
}
