import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  BaseIcon,
  BodyBaseIcon,
  FoodIcon,
  RewardIcon,
  SleepIcon,
  StepIcon,
} from '@/components/icons';
import { ArrowRight, CheckCircle } from 'lucide-react';

const featureCards = [
  {
    icon: <StepIcon className="w-10 h-10 text-primary" />,
    title: 'Track Steps',
    description: 'Monitor daily steps, integrate with wearables, and earn points for hitting your goals.',
  },
  {
    icon: <FoodIcon className="w-10 h-10 text-primary" />,
    title: 'Log Food',
    description: 'Log meals with our AI, which analyzes nutritional info and provides health insights.',
  },
  {
    icon: <SleepIcon className="w-10 h-10 text-primary" />,
    title: 'Monitor Sleep',
    description: 'Track sleep patterns and bedtime consistency to build a healthy, rewarding routine.',
  },
  {
    icon: <RewardIcon className="w-10 h-10 text-primary" />,
    title: 'Earn Rewards',
    description: 'Gain points and unlock badges for every healthy habit you build on BodyBase.',
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Sign Up & Connect',
    description: 'Create your BodyBase profile and securely connect your wallet in seconds.',
  },
  {
    step: 2,
    title: 'Track & Log',
    description: 'Use our simple tools to log your daily steps, meals, and sleep patterns effortlessly.',
  },
  {
    step: 3,
    title: 'Earn & Compete',
    description: 'Get rewarded with points, unlock cool badges, and climb the leaderboard.',
  },
];

const testimonials = [
  {
    name: 'CryptoFitGal',
    handle: '@fitgal',
    text: 'BodyBase is a game-changer! The neon UI is sick, and earning rewards for my daily walks is so motivating. Finally, a wellness app that gets Web3.',
    image: PlaceHolderImages.find((img) => img.id === 'testimonial-1'),
  },
  {
    name: 'DAO-Deltoids',
    handle: '@deltaman',
    text: 'As a dev, I love the "Built on Base" aspect. The app is fast, fun, and the food logger AI is surprisingly accurate. Highly recommend!',
    image: PlaceHolderImages.find((img) => img.id === 'testimonial-2'),
  },
  {
    name: 'Cardio-Chain',
    handle: '@cardioc',
    text: "I'm obsessed with the leaderboard. Competing with friends keeps me accountable. The sleep tracker is also helping me fix my degen sleep schedule.",
    image: PlaceHolderImages.find((img) => img.id === 'testimonial-3'),
  },
];

const faqItems = [
  {
    question: 'What is BodyBase?',
    answer:
      'BodyBase is a gamified wellness dApp built on the Base blockchain. We help you build healthy habits by rewarding you with points and badges for tracking your steps, nutrition, and sleep.',
  },
  {
    question: 'Do I need a crypto wallet to use BodyBase?',
    answer:
      'Yes and no! You can sign up with a simple username and password. We automatically generate a secure wallet for you in the background, making your onboarding to Web3 seamless.',
  },
  {
    question: 'Are the rewards (points and badges) a cryptocurrency?',
    answer:
      'Currently, no. The points and badges are an off-chain reward system designed to make wellness fun. We may introduce on-chain rewards and tokens in the future, as outlined in our roadmap.',
  },
  {
    question: 'What is "Built on Base"?',
    answer:
      'Base is a secure, low-cost, builder-friendly Ethereum Layer 2 built by Coinbase. Building on Base allows BodyBase to be fast, affordable, and accessible to a wide audience, providing a great user experience.',
  },
];

const roadmapItems = [
  { phase: 'Phase 1', status: 'Complete', items: ['Core dApp Launch', 'Step, Food & Sleep Tracking', 'Off-Chain Points System'] },
  { phase: 'Phase 2', status: 'In Progress', items: ['Social Challenges', 'Wearable Integrations (Garmin, etc.)', 'Advanced Badge Tiers'] },
  { phase: 'Phase 3', status: 'Planned', items: ['On-Chain Rewards (NFTs/Tokens)', 'Public API for Developers', 'Decentralized Identity Integration'] },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-glow');
  const screenshots = [
    PlaceHolderImages.find((img) => img.id === 'screenshot-1'),
    PlaceHolderImages.find((img) => img.id === 'screenshot-2'),
    PlaceHolderImages.find((img) => img.id === 'screenshot-3'),
  ].filter(Boolean) as typeof PlaceHolderImages;


  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BodyBaseIcon className="w-8 h-8 text-primary drop-shadow-neon-primary" />
            <span className="text-xl font-bold">BodyBase</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
          </nav>
          <Button asChild className="btn-gradient font-bold drop-shadow-neon-primary hover:drop-shadow-none">
            <Link href="/dashboard">Launch App</Link>
          </Button>
        </div>
      </header>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-4 py-1 text-sm text-primary mb-4">
              A New Era of Gamified Wellness
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-6 drop-shadow-neon-primary">
              Build Habits. Earn Rewards.
              <br />
              Own Your Wellness.
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-8">
              BodyBase transforms your health journey into a fun, rewarding adventure on the Base blockchain. Track, compete, and level up your life.
            </p>
            <Button size="lg" asChild className="btn-gradient font-bold text-lg drop-shadow-neon-accent">
              <Link href="/dashboard">
                Start Your Journey <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={1000}
              height={800}
              data-ai-hint={heroImage.imageHint}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover opacity-20 blur-2xl animate-float"
            />
          )}
        </section>

        {/* About BodyBase */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl font-bold font-headline mb-4">About BodyBase</h2>
                <p className="text-muted-foreground mb-6">
                    BodyBase is more than just a fitness tracker; it's a decentralized wellness ecosystem. We believe that building healthy habits should be an engaging and rewarding experience. By leveraging the power of Web3 and the Base blockchain, we provide a transparent, secure, and user-owned platform for your health journey. Our mission is to empower individuals to take control of their well-being in a fun, gamified, and futuristic way.
                </p>
            </div>
            <div className="glass-card p-8">
                <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><BaseIcon className="text-accent w-7 h-7" /> Built on Base</h3>
                <p className="text-muted-foreground">
                    We chose Base for its speed, low cost, and scalability. As an Ethereum L2, it offers the security of the mainnet with the performance needed for a smooth user experience. This means your achievements are recorded efficiently and you're part of the growing Coinbase ecosystem.
                </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Core Features</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
              Everything you need to turn your wellness goals into an epic game.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((feature, index) => (
                <div key={index} className="glass-card p-6 text-left flex flex-col items-start">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4 border border-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold font-headline mb-12">Three Steps to a New You</h2>
                <div className="relative grid md:grid-cols-3 gap-8">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-border/50 hidden md:block -z-10"></div>
                    {howItWorksSteps.map((step) => (
                        <div key={step.step} className="relative glass-card p-8 text-left">
                            <div className="absolute -top-5 left-8 w-12 h-12 flex items-center justify-center bg-accent rounded-full text-accent-foreground font-bold text-xl border-4 border-background">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold mt-8 mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Screenshot Carousel Section */}
        <section id="screenshots" className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">
              Explore the dApp
            </h2>
            <Carousel
              opts={{ loop: true }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {screenshots.map((ss, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="glass-card p-2">
                        {ss && <Image
                          src={ss.imageUrl}
                          alt={ss.description}
                          width={800}
                          height={600}
                          data-ai-hint={ss.imageHint}
                          className="rounded-lg w-full"
                        />}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-foreground" />
              <CarouselNext className="text-foreground"/>
            </Carousel>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">Our Journey Ahead</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {roadmapItems.map((phaseItem, index) => (
                    <div key={index} className="glass-card p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-primary">{phaseItem.phase}</h3>
                            <span className={`px-3 py-1 text-xs rounded-full ${phaseItem.status === 'Complete' ? 'bg-green-500/20 text-green-400' : phaseItem.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{phaseItem.status}</span>
                        </div>
                        <ul className="space-y-3">
                            {phaseItem.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">
              What the Community Says
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && <Image
                      src={testimonial.image.imageUrl}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      data-ai-hint={testimonial.image.imageHint}
                      className="rounded-full"
                    />}
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-accent">{testimonial.handle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card mb-4 px-6 rounded-2xl border-none">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/20 py-12">
            <div className="container mx-auto px-4 text-center">
                 <div className="flex justify-center items-center gap-2 mb-4">
                    <BodyBaseIcon className="w-8 h-8 text-primary drop-shadow-neon-primary" />
                    <span className="text-xl font-bold">BodyBase</span>
                </div>
                <p className="text-muted-foreground mb-6">Own your wellness. One block at a time.</p>
                <div className="flex justify-center gap-6 mb-8">
                    <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Discord</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Telegram</Link>
                </div>
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BodyBase. All rights reserved.</p>
            </div>
        </footer>
      </main>
    </div>
  );
}
