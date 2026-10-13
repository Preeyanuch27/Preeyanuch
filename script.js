/*
  QUICK EDIT:
  1) Change the PROFILE object below.
  2) Add/edit items in PROJECTS. Put local images in assets/images/ or use image URLs.
  3) mediaType: "image", "youtube", "vimeo", "video", or "link".
  4) For video embeds, use a YouTube/Vimeo URL. For links, the project opens in a new tab.
*/
const PROFILE = {
  name: "YOUR NAME",
  email: "hello@example.com"
};

const PROJECTS = [
  {
    id: 1, title: "AFTER HOURS", category: "video", label: "VIDEO EDIT",
    year: "2026", description: "ตัวอย่างงานตัดต่อวิดีโอ — แก้ไขคำอธิบายนี้ให้เป็นรายละเอียดของโปรเจกต์จริง ใส่แนวคิด บทบาท และสิ่งที่คุณรับผิดชอบ",
    thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=85",
    mediaType: "youtube", mediaUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    projectUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4"
  },
  {
    id: 2, title: "NOISE / NOISE", category: "graphic", label: "POSTER DESIGN",
    year: "2026", description: "ตัวอย่างโปสเตอร์กราฟิก ทดลองกับตัวอักษร รูปทรง และสีจัดจ้าน เปลี่ยนข้อความนี้เป็นแนวคิดของงานจริง",
    thumbnail: "https://images.unsplash.com/photo-1550850722-7a5d6ddc1e20?auto=format&fit=crop&w=1200&q=85",
    mediaType: "image", mediaUrl: "https://images.unsplash.com/photo-1550850722-7a5d6ddc1e20?auto=format&fit=crop&w=1800&q=90",
    projectUrl: ""
  },
  {
    id: 3, title: "FORM / FEEL", category: "motion", label: "MOTION DESIGN",
    year: "2025", description: "ตัวอย่างงาน Motion Graphics สามารถใส่ลิงก์วิดีโอหรือรายละเอียดขั้นตอนการทำงานได้ที่นี่",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    mediaType: "vimeo", mediaUrl: "https://vimeo.com/76979871",
    projectUrl: "https://vimeo.com/76979871"
  },
  {
    id: 4, title: "OBJECTS OF DESIRE", category: "graphic", label: "ART DIRECTION",
    year: "2025", description: "ตัวอย่างงาน Visual Direction / Campaign Artwork เปลี่ยนภาพและรายละเอียดให้ตรงกับผลงานของคุณ",
    thumbnail: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    mediaType: "image", mediaUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=90",
    projectUrl: ""
  },
  {
    id: 5, title: "CITY IN MOTION", category: "video", label: "SHOWREEL",
    year: "2025", description: "รวมช็อตและจังหวะการตัดต่อที่สะท้อนสไตล์ของคุณ ใส่ Showreel จริงของคุณได้โดยเปลี่ยน mediaUrl",
    thumbnail: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
    mediaType: "youtube", mediaUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    projectUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
  },
  {
    id: 6, title: "TYPE EXPERIMENT 01", category: "graphic", label: "TYPE / LAYOUT",
    year: "2024", description: "การทดลอง Typography และ Layout — ใช้พื้นที่นี้เล่าคอนเซปต์หรือโจทย์ของโปรเจกต์",
    thumbnail: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=1200&q=85",
    mediaType: "image", mediaUrl: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=1800&q=90",
    projectUrl: ""
  }
];

const projectGrid = document.querySelector("#projectGrid");
const modal = document.querySelector("#projectModal");
const modalMedia = document.querySelector("#modalMedia");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalExternal = document.querySelector("#modalExternal");
const toast = document.querySelector("#toast");
let activeFilter = "all";
let previousFocus = null;
let language = "th";

function safeUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
  } catch { return ""; }
}

function youtubeEmbed(url) {
  try {
    const parsed = new URL(url);
    let id = "";
    if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.slice(1);
    else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v") || "";
      else if (parsed.pathname.startsWith("/embed/") || parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[2] || "";
    }
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0` : "";
  } catch { return ""; }
}
function vimeoEmbed(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("vimeo.com")) return "";
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return /^\d+$/.test(id || "") ? `https://player.vimeo.com/video/${id}` : "";
  } catch { return ""; }
}
function getEmbed(project) {
  if (project.mediaType === "youtube") return youtubeEmbed(project.mediaUrl);
  if (project.mediaType === "vimeo") return vimeoEmbed(project.mediaUrl);
  return "";
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}
function renderProjects() {
  const filtered = PROJECTS.filter(project => activeFilter === "all" || project.category === activeFilter);
  projectGrid.innerHTML = "";
  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `เปิดผลงาน ${project.title}`);
    const imageWrap = document.createElement("div");
    imageWrap.className = "project-image";
    const img = document.createElement("img");
    img.src = project.thumbnail;
    img.alt = `${project.title} — ${project.label}`;
    img.loading = "lazy";
    img.onerror = () => {
      img.removeAttribute("src");
      imageWrap.style.background = index % 2 ? "#c8ff00" : "#b7b8ae";
      imageWrap.classList.add("image-fallback");
    };
    imageWrap.append(img);
    const tag = document.createElement("span");
    tag.className = "project-tag";
    tag.textContent = project.label;
    imageWrap.append(tag);
    if (["youtube", "vimeo", "video"].includes(project.mediaType)) {
      const play = document.createElement("span");
      play.className = "play-icon";
      play.setAttribute("aria-hidden", "true");
      play.textContent = "▶";
      imageWrap.append(play);
    }
    const open = document.createElement("span");
    open.className = "project-open";
    open.setAttribute("aria-hidden", "true");
    open.textContent = "↗";
    imageWrap.append(open);
    const info = document.createElement("div");
    info.className = "project-info";
    const text = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = project.title;
    const meta = document.createElement("p");
    meta.textContent = `${project.category.toUpperCase()} / ${project.year}`;
    text.append(title, meta);
    const year = document.createElement("span");
    year.className = "project-year";
    year.textContent = String(project.id).padStart(2, "0");
    info.append(text, year);
    card.append(imageWrap, info);
    card.addEventListener("click", () => openProject(project));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(project);
      }
    });
    projectGrid.append(card);
  });
  observeReveals();
}
function openProject(project) {
  previousFocus = document.activeElement;
  modalMedia.innerHTML = "";
  modalTitle.textContent = project.title;
  modalCategory.textContent = `${project.label} / ${project.year}`;
  modalDescription.textContent = project.description || "";
  const safeProjectUrl = safeUrl(project.projectUrl || project.mediaUrl);
  modalExternal.href = safeProjectUrl || "#";
  modalExternal.style.display = safeProjectUrl ? "inline-block" : "none";

  if (project.mediaType === "image") {
    const image = document.createElement("img");
    image.src = safeUrl(project.mediaUrl || project.thumbnail);
    image.alt = project.title;
    modalMedia.append(image);
  } else if (project.mediaType === "youtube" || project.mediaType === "vimeo") {
    const src = getEmbed(project);
    if (src) {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = `${project.title} video`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      referrerPolicySafe(iframe);
      modalMedia.append(iframe);
    } else {
      modalMedia.textContent = "ลิงก์วิดีโอไม่ถูกต้อง กรุณาตรวจสอบ mediaUrl";
    }
  } else if (project.mediaType === "video") {
    const videoUrl = safeUrl(project.mediaUrl);
    if (videoUrl) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      modalMedia.append(video);
    }
  } else {
    const image = document.createElement("img");
    image.src = safeUrl(project.thumbnail);
    image.alt = project.title;
    modalMedia.append(image);
  }
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
function referrerPolicySafe(iframe) { iframe.referrerPolicy = "strict-origin-when-cross-origin"; }
function closeModal() {
  modal.hidden = true;
  modalMedia.innerHTML = "";
  document.body.classList.remove("modal-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

document.querySelector("#filterBar").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("active", btn === button));
  renderProjects();
});

document.querySelector("#langToggle").addEventListener("click", () => {
  language = language === "th" ? "en" : "th";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-th][data-en]").forEach(el => {
    el.innerHTML = el.dataset[language];
  });
  document.querySelector("#langToggle").textContent = language === "th" ? "EN ↗" : "TH ↗";
});

document.querySelector("#menuToggle").addEventListener("click", event => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
  event.currentTarget.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
  event.currentTarget.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", "false");
  document.querySelector("#menuToggle").textContent = "☰";
}));

const emailLink = document.querySelector("#emailLink");
emailLink.href = `mailto:${PROFILE.email}`;
emailLink.textContent = `${PROFILE.email.toUpperCase()} ↗`;
document.querySelector("#copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    showToast("คัดลอกอีเมลแล้ว ✓");
  } catch {
    showToast(`อีเมล: ${PROFILE.email}`);
  }
});
document.title = `${PROFILE.name}® — Creative Portfolio`;
document.querySelector(".site-footer .wordmark").setAttribute("aria-label", PROFILE.name);
document.querySelector(".site-footer span:nth-child(3)").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;
document.querySelector("#year").textContent = new Date().getFullYear();

let revealObserver;
function observeReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}
renderProjects();
observeReveals();
