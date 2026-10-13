# Creative Brutalist Portfolio — Video Editor / Graphic Designer

เว็บ Portfolio แบบไทย/อังกฤษ โทนดำ + Neon Lime ใช้ HTML, CSS และ Vanilla JavaScript พร้อมนำขึ้น GitHub Pages ได้โดยไม่ต้อง build

## เริ่มต้นใช้งาน

1. ดาวน์โหลด ZIP แล้วแตกไฟล์
2. เปิด `index.html` ในเบราว์เซอร์เพื่อทดลอง
3. แก้ข้อมูลใน `script.js` ที่ส่วน `PROFILE` และ `PROJECTS`
4. ใส่รูปโปรไฟล์ที่ `assets/images/profile.jpg` (สร้างโฟลเดอร์นี้ไว้ให้แล้ว)
5. อัปโหลดทุกไฟล์เข้า Repository บน GitHub

## เปลี่ยนข้อมูลส่วนตัว

ใน `script.js` แก้:

```js
const PROFILE = {
  name: "ชื่อของคุณ",
  email: "อีเมลของคุณ@example.com"
};
```

จากนั้นแก้ชื่อย่อ `YN` ใน `index.html` ให้ตรงกับชื่อหรือแบรนด์ของคุณ และแก้ลิงก์ Instagram / Behance / YouTube ในส่วน Contact

## เพิ่มหรือแก้ผลงาน

เพิ่ม object ใหม่ใน array `PROJECTS` ของ `script.js`:

```js
{
  id: 7,
  title: "ชื่อผลงาน",
  category: "video", // video, graphic หรือ motion
  label: "VIDEO EDIT",
  year: "2026",
  description: "อธิบายแนวคิด บทบาท และรายละเอียดผลงาน",
  thumbnail: "assets/images/project-07.jpg",
  mediaType: "youtube", // image, youtube, vimeo, video, link
  mediaUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  projectUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
}
```

### ประเภท mediaType
- `image`: เปิดภาพขนาดใหญ่จาก `mediaUrl`
- `youtube`: ฝัง YouTube โดยอ่าน Video ID จากลิงก์
- `vimeo`: ฝัง Vimeo จากลิงก์
- `video`: เล่นไฟล์วิดีโอโดยตรง เช่น `assets/videos/reel.mp4`
- `link`: ใช้ภาพปกและปุ่มเปิดลิงก์ภายนอก

สำหรับ `thumbnail` ใช้ไฟล์ใน Repository เช่น `assets/images/project-07.jpg` หรือ URL ภาพที่เข้าถึงได้สาธารณะ รูปใน Repository จะเสถียรกว่า URL ภายนอก

> ลิงก์ Google Drive / TikTok ไม่ได้ฝังใน Modal โดยอัตโนมัติ เพราะรูปแบบ Embed แตกต่างกัน ให้ใส่ลิงก์ไว้ใน `projectUrl` เพื่อเปิดหน้าโปรเจกต์ภายนอก หรือแปลงวิดีโอเป็น YouTube/Vimeo Embed URL

## Deploy ด้วย GitHub Pages

1. สร้าง Repository ใหม่ เช่น `my-portfolio`
2. อัปโหลด `index.html`, `style.css`, `script.js`, `README.md` และโฟลเดอร์ `assets`
3. ไปที่ **Settings → Pages**
4. ที่ **Build and deployment** เลือก **Deploy from a branch**
5. เลือก branch `main` และ folder `/ (root)` แล้วกด **Save**
6. รอสักครู่ จากนั้นเปิด URL ที่ GitHub Pages แสดงให้ โดยทั่วไปจะเป็น `https://ชื่อผู้ใช้.github.io/my-portfolio/`

## หมายเหตุ
- ตัวอย่างผลงานและข้อความในโปรเจกต์เป็น Demo Content ให้เปลี่ยนเป็นผลงานจริงก่อนเผยแพร่
- หาก Repository เป็น Project Pages ให้ใช้เส้นทางแบบ relative เช่น `assets/images/photo.jpg`
- Google Fonts ต้องเชื่อมต่ออินเทอร์เน็ต หากออฟไลน์เว็บจะใช้ฟอนต์สำรอง
- ใช้เฉพาะภาพและวิดีโอที่คุณมีสิทธิ์เผยแพร่
