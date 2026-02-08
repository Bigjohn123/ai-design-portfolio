-- Clean up existing tables if they exist (to allow re-running the script)
drop table if exists public.site_config;
drop table if exists public.projects;
drop table if exists public.articles;

-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  tag text not null,
  title text not null,
  description text not null,
  image_url text not null,
  aspect_ratio text not null check (aspect_ratio in ('square', 'video', 'portrait', 'tall'))
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Create policy to allow admin write access
create policy "Allow admin write access"
  on public.projects
  for all
  to authenticated
  using (true);

-- Create articles table
-- Changed id to text to support slug-style IDs (e.g., 'ethic-considerations')
create table public.articles (
  id text primary key,
  created_at timestamptz default now(),
  published_date text not null,
  category text not null,
  title text not null,
  summary text not null,
  content text not null,
  hero_image text not null,
  read_time text not null
);

-- Enable Row Level Security (RLS)
alter table public.articles enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.articles
  for select
  to public
  using (true);

-- Create policy to allow admin write access
create policy "Allow admin write access"
  on public.articles
  for all
  to authenticated
  using (true);

-- Create site_config table
create table public.site_config (
  id int primary key default 1,
  config jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

-- Enable Row Level Security (RLS)
alter table public.site_config enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.site_config
  for select
  to public
  using (true);

-- Create policy to allow admin write access
create policy "Allow admin write access"
  on public.site_config
  for all
  to authenticated
  using (true);

-- Insert sample data for projects
insert into public.projects (tag, title, description, image_url, aspect_ratio) values
  ('艺术生成', '灵感画笔', '研究神经网络如何将人类的情感语言转化为视觉诗学。', 'https://picsum.photos/seed/art1/600/800', 'portrait'),
  ('数据可视化', '智能助手', '在大语言模型中进行向量嵌入的实时映射与语义分析。', 'https://picsum.photos/seed/art2/800/800', 'square'),
  ('AI 代理', '自主演化助手', '为复杂任务编排开发具有自我修复能力的逻辑闭环。', 'https://picsum.photos/seed/art3/800/600', 'video'),
  ('界面设计', '动态生成 UI', '基于用户意图和上下文元数据自动适配的动态界面系统。', 'https://picsum.photos/seed/art4/600/900', 'tall'),
  ('编程开发', '代码协同洞察', '分析 AI 辅助软件开发工作流的效率与创造力趋势。', 'https://picsum.photos/seed/art5/800/800', 'square');

-- Insert sample data for articles
insert into public.articles (id, published_date, category, title, summary, content, hero_image, read_time) values
  ('ethic-considerations', '2024年3月12日', 'AI 伦理', '生成式艺术在公共领域的伦理考量', '探讨作品所有权与创意边界的模糊地带...', '<p>机器学习与界面设计的交汇点已不再是遥远的未来概念。它正在此时此刻发生，并从根本上改变了我们对待创意画布的方式。作为设计师，我们正在从“像素搬运工”转变为“算法意图的策展人”。</p><h2>向动态组件合成的跨越</h2><p>传统的个人作品集或企业设计系统往往是静态的。它们提供一系列组件库，由我们手动进行组装。然而，<strong>生成式 AI</strong> 引入了“动态合成”的概念。想象一下，一个能够根据用户的认知负荷或特定任务背景，实时自动调整结构的 UI 界面。这种灵活性将极大地提升用户体验的个性化程度。</p><blockquote>“AI 在设计领域的最终目标并非取代设计师的审美，而是增强其触达范围，并缩短从创意概念到高保真实现之间的路径。”</blockquote><h2>重新定义工作流</h2><p>使用生成式工具需要一套全新的专业词汇。我们正迈向“基于提示词的样式定义（Prompt-based styling）”，通过设定约束条件，让算法引擎在设计空间内进行探索。</p><pre><code>{\n  "theme": "generative-fluid",\n  "constraints": {\n    "primary": "#135bec",\n    "variationRange": 0.15,\n    "borderCurve": "dynamic",\n    "density": "adaptive"\n  }\n}</code></pre><p>通过利用这些先进工具，我们可以在数秒内生成数千次微小的迭代尝试。这使我们能够将更多宝贵的时间投入到用户研究和高层级战略思考中。</p>', 'https://picsum.photos/seed/blog1/1200/600', '12 分钟'),
  ('react-ai-sdk', '2024年2月28日', '技术栈', '利用 React 与 AI SDK 构建可扩展应用', '将大语言模型集成到现代 Web 应用的实战技巧...', '<p>详细的技术实战分享...</p>', 'https://picsum.photos/seed/blog2/1200/600', '8 分钟'),
  ('design-trend-2024', '2024年1月15日', '趋势', '2024 设计趋势：新野兽派的回归？', '为什么锋利的边缘与原始排版正在重新流行...', '<p>对未来视觉语言的预测...</p>', 'https://picsum.photos/seed/blog3/1200/600', '6 分钟');
