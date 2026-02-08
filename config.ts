
import { AppConfig } from './types';

export const SITE_CONFIG: AppConfig = {
  author: {
    name: "Alex Chen",
    role: "资深设计技术专家",
    avatar: "https://picsum.photos/seed/alex/200/200"
  },
  header: {
    logoText: "作品集",
    navLinks: [
      { label: "关于我", href: "#/" },
      { label: "AI 创意实验室", href: "#/" },
      { label: "深度思考", href: "#/" }
    ],
    ctaLabel: "建立联系"
  },
  hero: {
    badge: "可接受新项目合作",
    title: "探索 AI 与设计的边界",
    subtitle: "我是跨学科创意技术专家。专注于生成式 AI 与交互体验的融合，致力于架起人类直觉与机器智能之间的桥梁。",
    avatarUrl: "https://picsum.photos/seed/hero/800/800",
    primaryCta: "查看作品",
    secondaryCta: "关于我"
  },
  lab: {
    title: "AI 创意实验室",
    description: "探索生成式艺术与逻辑边界的实验性项目。",
    projects: [
      {
        id: "1",
        tag: "艺术生成",
        title: "灵感画笔",
        description: "研究神经网络如何将人类的情感语言转化为视觉诗学。",
        image_url: "https://picsum.photos/seed/art1/600/800",
        aspect_ratio: 'portrait'
      },
      {
        id: "2",
        tag: "数据可视化",
        title: "智能助手",
        description: "在大语言模型中进行向量嵌入的实时映射与语义分析。",
        image_url: "https://picsum.photos/seed/art2/800/800",
        aspect_ratio: 'square'
      },
      {
        id: "3",
        tag: "AI 代理",
        title: "自主演化助手",
        description: "为复杂任务编排开发具有自我修复能力的逻辑闭环。",
        image_url: "https://picsum.photos/seed/art3/800/600",
        aspect_ratio: 'video'
      },
      {
        id: "4",
        tag: "界面设计",
        title: "动态生成 UI",
        description: "基于用户意图和上下文元数据自动适配的动态界面系统。",
        image_url: "https://picsum.photos/seed/art4/600/900",
        aspect_ratio: 'tall'
      },
      {
        id: "5",
        tag: "编程开发",
        title: "代码协同洞察",
        description: "分析 AI 辅助软件开发工作流的效率与创造力趋势。",
        image_url: "https://picsum.photos/seed/art5/800/800",
        aspect_ratio: 'square'
      }
    ]
  },
  blog: {
    title: "深度思考",
    viewAllLabel: "查看全部存档",
    articles: [
      {
        id: "ethic-considerations",
        published_date: "2024年3月12日",
        category: "AI 伦理",
        title: "生成式艺术在公共领域的伦理考量",
        summary: "探讨作品所有权与创意边界的模糊地带...",
        read_time: "12 分钟",
        hero_image: "https://picsum.photos/seed/blog1/1200/600",
        content: `
          <p>机器学习与界面设计的交汇点已不再是遥远的未来概念。它正在此时此刻发生，并从根本上改变了我们对待创意画布的方式。作为设计师，我们正在从“像素搬运工”转变为“算法意图的策展人”。</p>
          <h2>向动态组件合成的跨越</h2>
          <p>传统的个人作品集或企业设计系统往往是静态的。它们提供一系列组件库，由我们手动进行组装。然而，<strong>生成式 AI</strong> 引入了“动态合成”的概念。想象一下，一个能够根据用户的认知负荷或特定任务背景，实时自动调整结构的 UI 界面。这种灵活性将极大地提升用户体验的个性化程度。</p>
          <blockquote>“AI 在设计领域的最终目标并非取代设计师的审美，而是增强其触达范围，并缩短从创意概念到高保真实现之间的路径。”</blockquote>
          <h2>重新定义工作流</h2>
          <p>使用生成式工具需要一套全新的专业词汇。我们正迈向“基于提示词的样式定义（Prompt-based styling）”，通过设定约束条件，让算法引擎在设计空间内进行探索。</p>
          <pre><code>{
  "theme": "generative-fluid",
  "constraints": {
    "primary": "#135bec",
    "variationRange": 0.15,
    "borderCurve": "dynamic",
    "density": "adaptive"
  }
}</code></pre>
          <p>通过利用这些先进工具，我们可以在数秒内生成数千次微小的迭代尝试。这使我们能够将更多宝贵的时间投入到用户研究和高层级战略思考中。</p>
        `
      },
      {
        id: "react-ai-sdk",
        published_date: "2024年2月28日",
        category: "技术栈",
        title: "利用 React 与 AI SDK 构建可扩展应用",
        summary: "将大语言模型集成到现代 Web 应用的实战技巧...",
        read_time: "8 分钟",
        hero_image: "https://picsum.photos/seed/blog2/1200/600",
        content: "<p>详细的技术实战分享...</p>"
      },
      {
        id: "design-trend-2024",
        published_date: "2024年1月15日",
        category: "趋势",
        title: "2024 设计趋势：新野兽派的回归？",
        summary: "为什么锋利的边缘与原始排版正在重新流行...",
        read_time: "6 分钟",
        hero_image: "https://picsum.photos/seed/blog3/1200/600",
        content: "<p>对未来视觉语言的预测...</p>"
      }
    ]
  },
  footerCta: {
    title: "让我们共同构建智能化的未来",
    description: "目前正在寻找 2024 年第三季度的项目合作与创意咨询。期待与你交流。"
  },
  footer: {
    copyright: "© 2024 创意技术专家",
    tagline: "以意图驱动，因好奇而生。",
    socials: [
      { label: "Twitter / X", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Dribbble", href: "#" }
    ]
  }
};
