# 🤖 AI Resume Analyzer

<div align="center">
  <img src="public/images/resume-scan.gif" alt="AI Resume Analyzer" width="300">
  
  **Intelligent Resume Analysis with AI-Powered Insights**
  
  *Analyze, enhance, and optimize your resume with cutting-edge AI technology*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)

</div>

## ✨ Features

### 🎯 **AI-Powered Resume Analysis**

- **Smart Content Analysis**: Advanced AI evaluates resume content, structure, and relevance
- **ATS Optimization**: Get insights on how ATS systems will parse your resume
- **Personalized Feedback**: Receive detailed suggestions for improvement
- **Industry-Specific Insights**: Tailored recommendations based on your field

### 📱 **Modern User Experience**

- **Drag & Drop Upload**: Seamlessly upload PDF resumes with intuitive interface
- **Real-time Preview**: Instant PDF-to-image conversion for visual feedback
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile devices
- **Glassmorphism UI**: Modern, translucent design with smooth animations

### 🚀 **Dynamic Resume Gallery**

- **Live Resume Showcase**: Browse real user resumes (anonymized)
- **Interactive Carousel**: Mobile-friendly horizontal scroll with touch gestures
- **Adaptive Layout**: Smart grid system that adjusts to screen size (1-5 columns)
- **Loading States**: Smooth loading animations and empty state handling

### ⚡ **Performance & Reliability**

- **Blazing Fast**: Built with Vite for lightning-fast development and builds
- **Type Safety**: Full TypeScript integration for robust code
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Cloud Integration**: Powered by Puter.js for reliable data storage and AI processing

## 🛠️ Tech Stack

<div align="center">

|                                                            Frontend                                                            |                                      Backend/Cloud                                      |                                                                   Styling                                                                   |                                                                Build Tools                                                                 |                                               AI/Processing                                               |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50"><br>**React 18** | <img src="https://puter.com/assets/favicon.ico" width="50" height="50"><br>**Puter.js** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="50" height="50"><br>**Tailwind CSS** |     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="50" height="50"><br>**Vite 6.3.3**     |                                           🧠<br>**AI Chat API**                                           |
| <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" width="50" height="50"><br>**React Router v7**  |                                 ☁️<br>**Cloud Storage**                                 |       <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" height="50"><br>**Custom CSS**        | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" height="50"><br>**TypeScript** | <img src="https://mozilla.github.io/pdf.js/images/logo.svg" width="50" height="50"><br>**PDF.js v5.3.93** |
|                                                   🎨<br>**GSAP Animations**                                                    |                                   �️<br>**KV Store**                                    |                                                         📱<br>**Responsive Design**                                                         |       <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="50" height="50"><br>**Docker**       |                                        🔄<br>**State Management**                                         |

</div>

### 🔧 **Core Technologies**

- **⚛️ React 18** - Modern React with concurrent features and hooks
- **🛣️ React Router v7** - File-based routing with SSR capabilities
- **� TypeScript** - Full type safety and enhanced developer experience
- **⚡ Vite 6.3.3** - Next-generation build tool with HMR
- **🎨 Tailwind CSS 4.1.4** - Utility-first CSS with custom configurations
- **☁️ Puter.js** - Cloud platform for storage, filesystem, and AI services
- **📄 PDF.js v5.3.93** - Client-side PDF parsing and rendering
- **🎭 GSAP 3.13.0** - Professional-grade animations
- **🎯 React Dropzone** - Elegant file upload functionality

### 🎨 **Design System**

- **✨ Glassmorphism Effects** - Modern translucent UI elements
- **� Dark Theme** - Eye-friendly dark interface
- **🔤 Typography** - Inter & Poppins font families
- **� Mobile-First** - Responsive design across all devices
- **🎪 Micro-Interactions** - Smooth hover effects and transitions

## 🚦 Usage Limitations

> **⚠️ Important Notice**
>
> This application allows **only 3 AI analysis requests per day** due to API limitations. Plan your resume analyses accordingly!

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-resume-analyzer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript checks
- `npm run lint` - Code quality checks

## 🐳 Deployment

### Docker Support

```bash
# Build the image
docker build -t ai-resume-analyzer .

# Run the container
docker run -p 3000:3000 ai-resume-analyzer
```

### Deployment Platforms

- **AWS ECS** - Enterprise container service
- **Google Cloud Run** - Serverless container platform
- **Azure Container Apps** - Modern container hosting
- **Vercel** - Frontend deployment platform
- **Netlify** - JAMstack hosting
- **Railway** - Simple deployment platform

## 🎯 How It Works

1. **📤 Upload Resume** - Drag and drop your PDF resume
2. **🔍 AI Analysis** - Advanced AI processes your resume content
3. **📊 Get Insights** - Receive detailed feedback and suggestions
4. **✨ Optimize** - Apply recommendations to enhance your resume
5. **🎉 Success** - Stand out with an optimized, ATS-friendly resume

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**Built with ❤️ using cutting-edge web technologies**

_Transform your resume with the power of AI_

</div>
