## 🚀 Quick Setup for Vercel Deployment

### Step 1: Get Your Projects Data Ready
```powershell
# Run this in your project root directory
.\prepare-env.ps1
```
✅ This copies your minified projects JSON to clipboard

### Step 2: Add to Vercel
1. Go to https://vercel.com/dashboard
2. Select your portfolio project
3. Click **Settings**
4. Go to **Environment Variables**
5. Click **Add New**
6. Fill in:
   - **Name:** `PROJECTS_DATA`
   - **Value:** Paste from clipboard (from Step 1)
   - **Environments:** Check all three (Production, Preview, Development)
7. Click **Save**

### Step 3: Deploy
```bash
git add .
git commit -m "Fix: Vercel project upload with env variables"
git push origin main
```

Vercel will automatically redeploy. Once done, your portfolio will:
- ✅ Load projects correctly
- ✅ Show updated design with boxy style
- ✅ Wrap long text properly

---

## 📝 Adding New Projects After Vercel Deployment

### To Add More Projects:

1. **Add locally first:**
   - Go to your admin panel
   - Add the project
   - Test locally

2. **Once working locally:**
   - Run: `.\prepare-env.ps1`
   - Copy the output
   - Update `PROJECTS_DATA` in Vercel (Settings → Environment Variables)
   - Redeploy

3. **Done!** New projects will appear on your live site

---

## 🎨 What's New Visually

✨ **Project Cards Now Have:**
- Stronger, more visible borders (boxy look)
- Better hover effect with yellow glow
- Text wrapping for long titles (max 2 lines)
- Descriptions limited to 3 lines
- Better spacing and padding
- Smoother animations

---

## ⚠️ Important Notes

- **Local development**: Works exactly as before (saves to file)
- **Vercel production**: Uses environment variable (need to update manually for new projects)
- **Session persistence**: New projects stay in memory during a session but don't persist after restart
- **For better experience**: Consider using a database (Firebase, MongoDB) in the future

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not showing? | Make sure you updated `PROJECTS_DATA` env var and redeployed |
| Can't run PS script? | Use `powershell -ExecutionPolicy Bypass -File prepare-env.ps1` |
| Still not working? | Check if `NODE_ENV` is set to `production` on Vercel |

---

**All set!** Your portfolio is ready for production. 🎉
