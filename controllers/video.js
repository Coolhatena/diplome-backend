import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SendVideo = async (req, res) => {
	const videoPath = path.join(__dirname, '../videos', req.params.filename);
	const stat = fs.statSync(videoPath);
	const fileSize = stat.size;
	const range = req.headers.range;
  
	if (range) {
	  const parts = range.replace(/bytes=/, "").split("-");
	  const start = parseInt(parts[0], 10);
	  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
	  const chunkSize = (end - start) + 1;
	  const file = fs.createReadStream(videoPath, { start, end });
  
	  res.writeHead(206, {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunkSize,
		'Content-Type': 'video/mp4'
	  });
  
	  file.pipe(res);
	} else {
	  res.writeHead(200, {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4'
	  });
  
	  fs.createReadStream(videoPath).pipe(res);
	}
  };