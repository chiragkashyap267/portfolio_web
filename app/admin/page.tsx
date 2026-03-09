"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
};

type Certificate = {
  title: string;
  image: string;
  link?: string;
};

type Website = {
  title: string;
  description: string;
  platform: string;
  category?: string;
  image?: string;
  url: string;
};

/* ================= PAGE ================= */

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState(0);

  if (!authorized) {
    return (
      <Center>
        <Box p={4} border="1px solid #222" borderRadius={2}>
          <Typography mb={2}>Admin Login</Typography>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() =>
              password === "chirag267"
                ? setAuthorized(true)
                : alert("Wrong password")
            }
          >
            Login
          </Button>
        </Box>
      </Center>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" mb={2}>
        Admin Panel
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Projects" />
        <Tab label="Websites" />
        <Tab label="Certificates" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {tab === 0 && <ProjectsAdmin />}
      {tab === 1 && <WebsitesAdmin />}
      {tab === 2 && <CertificatesAdmin />}
    </Box>
  );
}

/* ================= PROJECTS ADMIN ================= */

function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) {
          const errorMessage = await parseApiError(
            res,
            "Failed to load projects"
          );
          throw new Error(errorMessage);
        }
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Projects load error:", err);
        setProjects([]);
      }
    }
    load();
  }, []);

  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  }

  async function addProject() {
    if (!title || !image) {
      alert("Title & image required");
      return;
    }

    const payload = {
      title,
      description,
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image,
      github: github || undefined,
      live: live || undefined,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      console.error(errorBody);
      alert(errorBody?.detail || errorBody?.error || "Failed to save project");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.projects)) {
      setProjects(result.projects);
    } else {
      setProjects((prev) => [...prev, payload]);
    }
    setTitle("");
    setDescription("");
    setTech("");
    setImage("");
    setGithub("");
    setLive("");
  }

  async function deleteProject(index: number) {
    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    if (!res.ok) {
      alert("Failed to delete project");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.projects)) {
      setProjects(result.projects);
      return;
    }

    setProjects((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Stack spacing={3}>
      <Typography fontWeight={600}>Add Project</Typography>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Tech (comma separated)"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />
      <TextField
        label="GitHub Repository URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        placeholder="https://github.com/username/repo"
        size="small"
      />

      <TextField
        label="Live Deployed URL"
        value={live}
        onChange={(e) => setLive(e.target.value)}
        placeholder="https://yourapp.vercel.app"
        size="small"
      />

      <Button variant="outlined" component="label">
        Upload Image
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files?.[0])
              setImage(await uploadImage(e.target.files[0]));
          }}
        />
      </Button>

      {image && <Typography color="gray">Image uploaded</Typography>}

      <Button variant="contained" onClick={addProject}>
        Save Project
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography fontWeight={600} mb={2}>Existing Projects ({projects.length})</Typography>

      {projects.length === 0 ? (
        <Typography color="gray">No projects yet</Typography>
      ) : (
        <Stack spacing={2}>
          {projects.map((p, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                border: "1px solid #333",
                borderRadius: 1,
                backgroundColor: "rgba(255, 212, 0, 0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255, 212, 0, 0.1)",
                  borderColor: "#FFD400",
                }
              }}
            >
              <Box flex={1}>
                <Typography fontWeight={500}>{p.title}</Typography>
                <Typography variant="caption" color="gray">{p.description?.substring(0, 60)}...</Typography>
              </Box>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={() => deleteProject(i)}
                sx={{ ml: 2 }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

/* ================= WEBSITES ADMIN ================= */

function WebsitesAdmin() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/websites", { cache: "no-store" });
        if (!res.ok) {
          const errorMessage = await parseApiError(
            res,
            "Failed to load websites"
          );
          throw new Error(errorMessage);
        }
        const data = await res.json();
        setWebsites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Websites load error:", err);
        setWebsites([]);
      }
    }
    load();
  }, []);

  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  }

  async function addWebsite() {
    if (!title || !platform || !url) {
      alert("Title, platform & website URL are required");
      return;
    }

    const payload = {
      title,
      description,
      platform,
      category: category || undefined,
      image: image || undefined,
      url,
    };

    const res = await fetch("/api/websites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      console.error(errorBody);
      alert(errorBody?.detail || errorBody?.error || "Failed to save website");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.websites)) {
      setWebsites(result.websites);
    } else {
      setWebsites((prev) => [...prev, payload]);
    }

    setTitle("");
    setDescription("");
    setPlatform("");
    setCategory("");
    setImage("");
    setUrl("");
  }

  async function deleteWebsite(index: number) {
    const res = await fetch("/api/websites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    if (!res.ok) {
      alert("Failed to delete website");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.websites)) {
      setWebsites(result.websites);
      return;
    }

    setWebsites((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Stack spacing={3}>
      <Typography fontWeight={600}>Add Live Website</Typography>

      <TextField
        label="Website Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Platform (WordPress / Shopify)"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <TextField
        label="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Live Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />

      <Button variant="outlined" component="label">
        Upload Preview Image (optional)
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              setImage(await uploadImage(e.target.files[0]));
            }
          }}
        />
      </Button>

      {image && <Typography color="gray">Preview image uploaded</Typography>}

      <Button variant="contained" onClick={addWebsite}>
        Save Website
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography fontWeight={600} mb={2}>
        Existing Websites ({websites.length})
      </Typography>

      {websites.length === 0 ? (
        <Typography color="gray">No website links yet</Typography>
      ) : (
        <Stack spacing={2}>
          {websites.map((w, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                border: "1px solid #333",
                borderRadius: 1,
                backgroundColor: "rgba(255, 212, 0, 0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255, 212, 0, 0.1)",
                  borderColor: "#FFD400",
                },
              }}
            >
              <Box flex={1}>
                <Typography fontWeight={500}>
                  {w.title}{" "}
                  <Typography component="span" color="#FFD400" fontWeight={600}>
                    [{w.platform}]
                  </Typography>
                </Typography>
                <Typography variant="caption" color="gray">
                  {w.url}
                </Typography>
              </Box>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={() => deleteWebsite(i)}
                sx={{ ml: 2 }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

/* ================= CERTIFICATES ADMIN ================= */

function CertificatesAdmin() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/certificates", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load certificates");
        const data = await res.json();
        setCerts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Certificates load error:", err);
        setCerts([]);
      }
    }
    load();
  }, []);

  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  }

  async function addCert() {
    if (!title || !image) {
      alert("Title & image required");
      return;
    }

    const payload = { title, image, link };

    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      console.error(errorBody);
      alert(errorBody?.detail || errorBody?.error || "Failed to save certificate");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.certificates)) {
      setCerts(result.certificates);
    } else {
      setCerts((prev) => [...prev, payload]);
    }
    setTitle("");
    setLink("");
    setImage("");
  }

  async function deleteCert(index: number) {
    const res = await fetch("/api/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    if (!res.ok) {
      alert("Failed to delete certificate");
      return;
    }

    const result = await res.json();
    if (Array.isArray(result?.certificates)) {
      setCerts(result.certificates);
      return;
    }

    setCerts((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Stack spacing={3}>
      <Typography fontWeight={600}>Add Certificate</Typography>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <Button variant="outlined" component="label">
        Upload Image
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files?.[0])
              setImage(await uploadImage(e.target.files[0]));
          }}
        />
      </Button>

      {image && <Typography color="gray">Image uploaded</Typography>}

      <Button variant="contained" onClick={addCert}>
        Save Certificate
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography fontWeight={600} mb={2}>Existing Certificates ({certs.length})</Typography>

      {certs.length === 0 ? (
        <Typography color="gray">No certificates yet</Typography>
      ) : (
        <Stack spacing={2}>
          {certs.map((c, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                border: "1px solid #333",
                borderRadius: 1,
                backgroundColor: "rgba(255, 212, 0, 0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255, 212, 0, 0.1)",
                  borderColor: "#FFD400",
                },
              }}
            >
              <Typography fontWeight={500}>{c.title}</Typography>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={() => deleteCert(i)}
                sx={{ ml: 2 }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

async function parseApiError(res: Response, fallback: string) {
  try {
    const payload = await res.json();
    if (typeof payload?.detail === "string" && payload.detail.trim()) {
      return payload.detail;
    }
    if (typeof payload?.error === "string" && payload.error.trim()) {
      return payload.error;
    }
  } catch {
    try {
      const text = await res.text();
      if (text.trim()) return text;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

/* ================= CENTER ================= */

function Center({ children }: { children: React.ReactNode }) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
