# 🚀 DeepSeek R1 API Setup Guide

This guide shows you how to get and use the DeepSeek R1 API from Hugging Face for your Chat with Sam AI functionality.

## 🎯 **What is DeepSeek R1?**

DeepSeek R1 is a powerful AI model that's excellent for:
- **Coding assistance** - Great for technical questions
- **Conversational AI** - Natural, friendly responses
- **Portfolio assistance** - Perfect for your Chat with Sam AI
- **Multilingual support** - Works in multiple languages

## 🆓 **Getting DeepSeek R1 API from Hugging Face**

### Step 1: Create Hugging Face Account
1. Go to [huggingface.co](https://huggingface.co)
2. Click "Sign Up" or "Login"
3. Complete the registration process

### Step 2: Get API Key
1. **Go to Settings**:
   - Click your profile picture → Settings
   - Or go to: https://huggingface.co/settings/tokens

2. **Create Access Token**:
   - Click "New token"
   - Give it a name: `DeepSeek R1 API`
   - Select role: **Read** (for inference API)
   - Click "Generate token"

3. **Copy the Token**:
   - It starts with `hf_`
   - Example: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Test the API Key
```bash
# Test with curl
curl -X POST https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-33b-instruct \
  -H "Authorization: Bearer hf_your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"inputs": "[INST] Hello! How are you? [/INST]"}'
```

---

## 🚀 **Deploy with DeepSeek R1**

### Step 1: Deploy Backend to Railway
```bash
# Use the deployment script
chmod +x deploy-chat-backend.sh
./deploy-chat-backend.sh
```

### Step 2: Configure Environment Variables
In Railway dashboard, add:
```
HUGGINGFACE_API_KEY=hf_your_token_here
```

### Step 3: Update Frontend
In Vercel dashboard, add:
```
VITE_BACKEND_URL=https://your-railway-app.railway.app
```

---

## 🧪 **Testing DeepSeek R1**

### Test Health Endpoint
```bash
curl https://your-backend-url.railway.app/api/freeai/health
```

### Test Chat with DeepSeek R1
```bash
curl -X POST https://your-backend-url.railway.app/api/freeai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello! Tell me about Sameer\'s skills."}],
    "provider": "huggingface",
    "model": "deepseek-ai/deepseek-coder-33b-instruct"
  }'
```

### Test from Your Portfolio
1. Open your deployed portfolio
2. Click "Chat with Sam AI"
3. Ask a question
4. DeepSeek R1 will respond!

---

## 📊 **DeepSeek R1 Models Available**

| Model | Size | Best For | Free Tier |
|-------|------|----------|-----------|
| **deepseek-ai/deepseek-coder-33b-instruct** | 33B | Coding + Chat | ✅ 30k requests/month |
| **deepseek-ai/deepseek-coder-6.7b-instruct** | 6.7B | Fast responses | ✅ 30k requests/month |
| **deepseek-ai/deepseek-chat-6.7b** | 6.7B | General chat | ✅ 30k requests/month |

---

## 🔧 **Configuration Options**

### Use Specific Model
```javascript
// In your frontend chat request
{
  "messages": [{"role": "user", "content": "Hello!"}],
  "provider": "huggingface",
  "model": "deepseek-ai/deepseek-coder-33b-instruct"
}
```

### Auto-select (Recommended)
```javascript
// Let the backend choose the best model
{
  "messages": [{"role": "user", "content": "Hello!"}],
  "provider": "huggingface"
}
```

---

## 🎯 **DeepSeek R1 Features**

### ✅ **Advantages**
- **Excellent coding knowledge** - Perfect for technical questions
- **Natural conversation** - Friendly, engaging responses
- **Fast responses** - Quick generation times
- **Multilingual** - Works in multiple languages
- **Free tier** - 30,000 requests per month
- **No setup** - Just API key needed

### ⚠️ **Limitations**
- **Rate limits** - 30k requests/month on free tier
- **Model size** - Larger models may be slower
- **API dependency** - Requires internet connection

---

## 🚀 **Quick Start Commands**

```bash
# 1. Get API key from Hugging Face
# Go to: https://huggingface.co/settings/tokens

# 2. Deploy backend
cd backend
railway login
railway init
railway up

# 3. Add environment variable in Railway
# HUGGINGFACE_API_KEY=hf_your_token_here

# 4. Add to Vercel
# VITE_BACKEND_URL=https://your-railway-app.railway.app

# 5. Test
curl https://your-backend-url.railway.app/api/freeai/health
```

---

## 🔍 **Troubleshooting**

### Common Issues:

1. **"No API key configured"**
   - Make sure `HUGGINGFACE_API_KEY` is set in Railway
   - Check that the token starts with `hf_`

2. **"Model not found"**
   - The model name should be: `deepseek-ai/deepseek-coder-33b-instruct`
   - Check spelling and case

3. **"Rate limit exceeded"**
   - Free tier: 30k requests/month
   - Wait for next month or upgrade

4. **"Connection timeout"**
   - Model might be loading (first request takes longer)
   - Try again in a few seconds

### Debug Steps:
```bash
# Check if API key is working
curl -H "Authorization: Bearer hf_your_token_here" \
  https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-33b-instruct

# Check backend health
curl https://your-backend-url.railway.app/api/freeai/health
```

---

## 🎉 **Benefits of DeepSeek R1**

✅ **Perfect for portfolios** - Great at discussing technical skills  
✅ **Coding expertise** - Excellent for programming questions  
✅ **Natural conversation** - Friendly, engaging responses  
✅ **Free tier** - 30k requests/month at no cost  
✅ **Easy setup** - Just API key needed  
✅ **Reliable** - Managed by Hugging Face  

---

## 🚀 **Next Steps**

1. **Get your Hugging Face API key** now
2. **Deploy your backend** to Railway
3. **Configure environment variables**
4. **Test your Chat with Sam AI**
5. **Enjoy your working AI chat!** 🎉

Your Chat with Sam AI will be powered by the excellent DeepSeek R1 model! 🚀 