import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

const POSTS = [
  {
    slug: 'best-protein-supplements-2026',
    title: 'Best Protein Supplements for 2026: Complete Guide',
    excerpt:
      'Whey isolate, casein or plant-based? We analysed 40+ products and reveal which proteins deliver the highest bioavailability, lowest lactose content, and best value for European athletes.',
    date: 'Feb 15, 2026',
    readTime: '8 min',
    category: 'PROTEIN',
    tag: 'GUIDE',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80',
  },
  {
    slug: 'creatine-vs-beta-alanine',
    title: 'Creatine vs Beta-Alanine: Which Is Right for You?',
    excerpt:
      "Creatine boosts explosive power; beta-alanine fights muscular fatigue. But combining them may be the real performance unlock — here's the science behind it.",
    date: 'Feb 8, 2026',
    readTime: '6 min',
    category: 'PERFORMANCE',
    tag: 'SCIENCE',
    author: 'Ivan Kowalski',
    photo: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=900&q=80',
  },
  {
    slug: 'vitamin-d3-athletes-guide',
    title: 'Why Every Athlete Needs Vitamin D3',
    excerpt:
      "Over 60% of Europeans are vitamin D deficient. Low D3 directly tanks testosterone, recovery speed, and immune defence. Here's how to dose it correctly year-round.",
    date: 'Jan 30, 2026',
    readTime: '5 min',
    category: 'VITAMINS',
    tag: 'HEALTH',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80',
  },
  {
    slug: 'pre-workout-timing-guide',
    title: 'Pre-Workout Timing: When and How Much to Take',
    excerpt:
      'Taking your pre-workout 20 minutes too early (or late) can cut its effect by half. We break down the optimal caffeine window, beta-alanine loading, and how to avoid the crash.',
    date: 'Jan 22, 2026',
    readTime: '4 min',
    category: 'PRE-WORKOUT',
    tag: 'TIPS',
    author: 'Sofia Brenner',
    photo: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=900&q=80',
  },
  {
    slug: 'omega3-recovery-science',
    title: 'Omega-3 and Muscle Recovery: The Overlooked Stack',
    excerpt:
      'Fish oil is more than a heart supplement. Studies show 3 g/day EPA+DHA reduces DOMS by up to 35% and lowers systemic inflammation — making it a recovery essential.',
    date: 'Jan 14, 2026',
    readTime: '5 min',
    category: 'RECOVERY',
    tag: 'SCIENCE',
    author: 'Ivan Kowalski',
    photo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
  },
  {
    slug: 'magnesium-sleep-gains',
    title: 'Magnesium Glycinate: The Supplement That Fixes Your Sleep',
    excerpt:
      'More than 70% of growth hormone is released during deep sleep. Magnesium glycinate improves sleep quality, reduces cortisol, and costs under €0.30/day.',
    date: 'Jan 5, 2026',
    readTime: '4 min',
    category: 'SLEEP',
    tag: 'TIPS',
    author: 'Sofia Brenner',
    photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80',
  },
  {
    slug: 'testosterone-cycle-beginners-guide',
    title: 'Testosterone Cycle for Beginners: Dosage, Duration & Safety',
    excerpt:
      'Testosterone Enanthate or Propionate? 10 weeks or 16? We break down the safest first cycle protocols, bloodwork timing, and what to expect in terms of gains and side effects.',
    date: 'Feb 10, 2026',
    readTime: '10 min',
    category: 'AAS',
    tag: 'GUIDE',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
  },
  {
    slug: 'pct-guide-nolvadex-clomid',
    title: 'Post Cycle Therapy: Nolvadex vs Clomid — What Works Better',
    excerpt:
      'Skipping PCT after an AAS cycle is one of the most common mistakes. We compare Tamoxifen and Clomiphene protocols, timing after different esters, and how to restore natural testosterone production.',
    date: 'Feb 3, 2026',
    readTime: '7 min',
    category: 'PCT',
    tag: 'GUIDE',
    author: 'Ivan Kowalski',
    photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
  },
  {
    slug: 'sarms-vs-steroids-comparison',
    title: 'SARMs vs Steroids: Honest Comparison for Athletes',
    excerpt:
      'Ostarine, RAD-140 and LGD-4033 promise steroid-like gains without liver toxicity. But how do they really compare? We dig into efficacy data, suppression risk, and which compounds suit which goals.',
    date: 'Jan 27, 2026',
    readTime: '8 min',
    category: 'SARMS',
    tag: 'SCIENCE',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=900&q=80',
  },
  {
    slug: 'hgh-peptides-guide-ghrp-cjc',
    title: 'HGH Peptides: GHRP-6, Ipamorelin, CJC-1295 — Complete Overview',
    excerpt:
      'Growth hormone secretagogues stimulate your own pituitary — no suppression, no fake GH. We compare GHRP-6, GHRP-2, Ipamorelin, and CJC-1295 stacks, dosing windows, and expected results.',
    date: 'Jan 18, 2026',
    readTime: '9 min',
    category: 'PEPTIDES',
    tag: 'GUIDE',
    author: 'Sofia Brenner',
    photo: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80',
  },
  {
    slug: 'anastrozole-vs-exemestane-ai-guide',
    title: 'Anastrozole vs Exemestane: Which Aromatase Inhibitor to Choose?',
    excerpt:
      'Estrogen control on cycle is crucial. Anastrozole (Arimidex) suppresses aromatase reversibly; Exemestane (Aromasin) deactivates it permanently. We explain when to use each and how to avoid crashing your estradiol.',
    date: 'Dec 29, 2025',
    readTime: '6 min',
    category: 'AAS',
    tag: 'SCIENCE',
    author: 'Ivan Kowalski',
    photo: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=900&q=80',
  },
  {
    slug: 'cardarine-gw501516-fat-loss-guide',
    title: 'Cardarine (GW-501516): The Fat-Loss Modulator Explained',
    excerpt:
      'Cardarine is not a SARM — it is a PPARδ agonist that shifts your metabolism toward fat oxidation, boosts endurance, and preserves muscle during a deficit. Here is what the research actually shows.',
    date: 'Dec 20, 2025',
    readTime: '5 min',
    category: 'MODULATORS',
    tag: 'SCIENCE',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0bd?w=900&q=80',
  },
  {
    slug: 'igf-1-lr3-muscle-growth',
    title: 'IGF-1 LR3: How Insulin-Like Growth Factor Builds Muscle',
    excerpt:
      'IGF-1 LR3 works downstream of HGH to stimulate satellite cell proliferation and hyperplasia — actual new muscle fibres, not just hypertrophy. We cover mechanisms, dosing protocols, and what to realistically expect.',
    date: 'Dec 12, 2025',
    readTime: '7 min',
    category: 'PEPTIDES',
    tag: 'SCIENCE',
    author: 'Sofia Brenner',
    photo: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=900&q=80',
  },
  {
    slug: 'dianabol-cycle-guide',
    title: 'Dianabol (Methandienone) Cycle: Gains, Risks & Liver Protection',
    excerpt:
      'Dianabol is the fastest-acting oral steroid — expect 5–8 kg in 4 weeks. But C17-alpha alkylation means serious hepatotoxicity. We outline safe cycle lengths, TUDCA dosing, and how to keep your bloodwork clean.',
    date: 'Nov 30, 2025',
    readTime: '8 min',
    category: 'AAS',
    tag: 'GUIDE',
    author: 'Dr. Markus Hein',
    photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80',
  },
  {
    slug: 'meldonium-mildronate-endurance',
    title: 'Meldonium (Mildronate): Endurance Drug That Banned Sharapova',
    excerpt:
      'Meldonium reduces fatty acid oxidation in cardiac cells, forcing the heart to use more efficient carbohydrate fuel. Used legally in Eastern Europe as a cardioprotectant — here is the science and sports application.',
    date: 'Nov 18, 2025',
    readTime: '5 min',
    category: 'MODULATORS',
    tag: 'SCIENCE',
    author: 'Ivan Kowalski',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
];

const TAG_STYLE: Record<string, string> = {
  GUIDE:   'bg-brand/80 text-white',
  SCIENCE: 'bg-sky-500/80 text-white',
  HEALTH:  'bg-green-500/80 text-white',
  TIPS:    'bg-purple-500/80 text-white',
  NEWS:    'bg-orange-500/80 text-white',
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const [featured, ...rest] = POSTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="text-brand text-xs font-bold tracking-[0.2em] uppercase mb-2">Expert Knowledge</p>
        <h1 className="text-4xl font-black text-white mb-3">
          PharmaForce <span className="text-brand">Blog</span>
        </h1>
        <p className="text-muted text-sm max-w-lg">
          Evidence-based guides on sports pharmacology, nutrition science, and peak athletic performance.
        </p>
      </div>

      {/* Featured post — large horizontal card */}
      <Link href={`/${locale}/blog/${featured.slug}`} className="group block mb-10">
        <article className="relative rounded-2xl overflow-hidden h-[420px] border border-border hover:border-brand/50 transition-all duration-300">
          <Image
            src={featured.photo}
            alt={featured.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${TAG_STYLE[featured.tag]}`}>
                {featured.tag}
              </span>
              <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">{featured.category}</span>
              <span className="text-white/50 text-xs flex items-center gap-1 ml-auto">
                <Clock className="w-3 h-3" /> {featured.readTime} read
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black leading-tight mb-3 max-w-2xl group-hover:text-brand transition-colors">
              {featured.title}
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-4 hidden md:block">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">By <span className="text-white/80">{featured.author}</span> · {featured.date}</span>
              <div className="flex items-center gap-2 text-brand font-bold text-sm">
                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </article>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group">
            <article className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-300 h-full flex flex-col">

              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.photo}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_STYLE[post.tag]}`}>
                    {post.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase">{post.category}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-white font-bold leading-snug mb-2 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted">
                    <span className="text-white/70">{post.author}</span> · {post.date}
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
