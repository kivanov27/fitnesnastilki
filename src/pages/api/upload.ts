import { NextApiRequest, NextApiResponse } from "next";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

type ResponseData = {
    imageUrl?: string;
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const form = new IncomingForm({
        maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, async (err: any, fields: Fields, files: Files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Form parsing error" });
        }

        const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
        const productLink = Array.isArray(fields.productLink) ? fields.productLink[0] : fields.productLink;
        const imageNumber = Array.isArray(fields.imageNumber) ? fields.imageNumber[0] : fields.imageNumber;
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!category || !productLink || !imageNumber || !imageFile) {
            return res.status(400).json({ error: "Missing required fields or file" });
        }

        try {
            const imageDir = path.join('/var/www/images', category, productLink);
            const filePath = path.join(imageDir, `${imageNumber}.webp`);

            // ensure directory exists
            fs.mkdirSync(imageDir, { recursive: true });
            // move the uploaded file to the desired location
            fs.renameSync(imageFile.filepath, filePath);

            const imageUrl = `http://164.90.174.87/images/${category}/${productLink}/${imageNumber}.webp`; // needs to change when we apply domain name

            return res.status(200).json({ imageUrl });
        }
        catch (error) {
            console.error("File saving error: ", error);
            return res.status(500).json({ error: "Failed to save file image." });
        }
    });
}
