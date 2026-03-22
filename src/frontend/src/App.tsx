import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FlameKindling,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  TrendingDown,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  address: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Benefits", href: "#benefits" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const PROBLEMS = [
  {
    icon: <Droplets className="w-8 h-8" />,
    title: "High Blood Sugar Levels?",
    desc: "Struggling to keep glucose in check despite diet changes?",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Constant Fatigue & Weakness?",
    desc: "Feeling drained and low on energy throughout the day?",
  },
  {
    icon: <FlameKindling className="w-8 h-8" />,
    title: "Sugar Cravings Not Under Control?",
    desc: "Irresistible urges for sweets wreaking havoc on your health?",
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "Risk of Diabetes Complications?",
    desc: "Worried about long-term damage to kidneys, eyes, and heart?",
  },
];

const INGREDIENTS = [
  {
    img: "/assets/generated/ingredient-karela.dim_200x200.jpg",
    name: "Karela",
    sub: "Bitter Gourd",
    benefit: "Natural blood sugar regulator",
  },
  {
    img: "/assets/generated/ingredient-jamun.dim_200x200.jpg",
    name: "Jamun",
    sub: "Indian Blackberry",
    benefit: "Rich in antioxidants",
  },
  {
    img: "/assets/generated/ingredient-methi.dim_200x200.jpg",
    name: "Methi",
    sub: "Fenugreek",
    benefit: "Improves insulin sensitivity",
  },
  {
    img: "/assets/generated/ingredient-neem.dim_200x200.jpg",
    name: "Neem",
    sub: "Neem Leaf",
    benefit: "Purifies blood naturally",
  },
  {
    img: "/assets/generated/ingredient-dalchini.dim_200x200.jpg",
    name: "Dalchini",
    sub: "Cinnamon",
    benefit: "Reduces sugar absorption",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Regulates Glucose Absorption",
    desc: "Karela & Methi slow sugar entry into the bloodstream after meals.",
  },
  {
    num: "02",
    title: "Improves Insulin Sensitivity",
    desc: "Jamun & Dalchini help cells respond better to insulin signals.",
  },
  {
    num: "03",
    title: "Boosts Natural Energy",
    desc: "Neem purifies blood while Ashwagandha restores vitality naturally.",
  },
];

const RESULTS = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Balanced Sugar Levels",
    desc: "Consistent glucose readings within healthy range.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "More Energy Daily",
    desc: "Wake up refreshed with sustained energy all day.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Better Daily Lifestyle",
    desc: "Improved mood, focus, and overall well-being.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Reduced Dependency",
    desc: "Fewer medications with natural long-term management.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    city: "Mumbai",
    rating: 5,
    quote:
      "My sugar levels are stable now! Amazing product. I was skeptical at first but after 2 months of use, my doctor noticed significant improvement.",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    quote:
      "Best Ayurvedic product I have tried. Highly recommend to everyone with blood sugar issues. Completely natural and no side effects at all!",
  },
  {
    name: "Amit Patel",
    city: "Ahmedabad",
    rating: 5,
    quote:
      "Energy improved significantly in just 15 days. I feel like a new person. The fatigue is gone and my sugar cravings have reduced a lot.",
  },
];

const COMPARISON_FEATURES = [
  "Ayurvedic Formula",
  "No Side Effects",
  "Long-Term Use Safe",
  "Natural Ingredients",
  "Made in India",
];

// ─── Reusable Components ─────────────────────────────────────────────────────
function SectionHeading({
  children,
  subtitle,
  light = false,
}: { children: React.ReactNode; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`font-display text-3xl md:text-4xl font-bold mb-3 ${light ? "text-white" : "text-primary"}`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl mx-auto ${light ? "text-white/80" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mx-auto mt-4 h-1 w-20 rounded-full ${light ? "bg-accent" : "bg-accent"}`}
      />
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  const stars = [1, 2, 3, 4, 5].slice(0, count);
  return (
    <div className="flex gap-0.5">
      {stars.map((n) => (
        <Star key={n} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { actor } = useActor();

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[+\d\s-]{10,15}$/.test(form.phone.trim()))
      errors.phone = "Enter a valid phone number";
    if (!form.address.trim()) errors.address = "Address is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const orderId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      // Try to save to backend (non-blocking if actor not ready)
      if (actor) {
        try {
          await actor.submitOrder(
            orderId,
            form.name.trim(),
            form.phone.trim(),
            form.address.trim(),
          );
        } catch (backendErr) {
          console.error("Backend save failed:", backendErr);
        }
      }
      // Also send to Google Sheets via Apps Script webhook (fire-and-forget)
      fetch(
        "https://script.google.com/macros/s/AKfycbxBsMQYCrjmKv8pKXoD99wuikqA3AiS9zceWyeXND9yYWcoYXibhwEOY8p-awnx85I3xA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            fullName: form.name.trim(),
            phoneNumber: form.phone.trim(),
            deliveryAddress: form.address.trim(),
            orderDateTime: new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
          }),
        },
      ).catch((err) => console.error("Google Sheets sync failed:", err));
      setSubmitted(true);
      setForm({ name: "", phone: "", address: "" });
      toast.success("Order placed successfully! We will contact you shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F4EEDC" }}
    >
      <Toaster position="top-center" />

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: "#203B2A" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#C9A24A" }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight tracking-wide">
                  ASHOKVATI
                </div>
                <div
                  className="text-xs leading-tight"
                  style={{ color: "#C9A24A" }}
                >
                  ZERO SUGAR
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/85 hover:text-white text-sm font-medium transition-colors"
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#order")}
                className="btn-gold px-5 py-2 text-sm font-bold tracking-wide"
                data-ocid="nav.order_now.button"
              >
                ORDER NOW
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.menu.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ backgroundColor: "#1a3022" }}
            >
              <div className="px-4 py-3 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/85 hover:text-white text-sm font-medium text-left py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => scrollTo("#order")}
                  className="btn-gold px-5 py-2 text-sm font-bold text-center"
                  data-ocid="nav.mobile_order.button"
                >
                  ORDER NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden py-16"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,45,28,0.88) 0%, rgba(20,45,28,0.70) 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4"
            style={{
              textShadow:
                "0 0 30px rgba(213,177,91,0.6), 0 2px 8px rgba(0,0,0,0.5)",
              fontWeight: 900,
            }}
          >
            🌿 डायबिटीज़ का खात्मा बिना सर्जरी और बिना दर्द! 🌿
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl italic mb-10"
            style={{ color: "#D5B15B" }}
          >
            🌱 आयुर्वेदिक फॉर्मूला जो हजारों लोगों ने अपनाया 🌱
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mx-auto w-full"
            style={{ maxWidth: "800px" }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                paddingBottom: "56.25%",
                border: "2px solid rgba(213,177,91,0.5)",
                boxShadow:
                  "0 0 40px rgba(213,177,91,0.3), 0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <iframe
                src="https://drive.google.com/file/d/1hatsXxT-GzveBxyUDlehvqLWzTqXbTSP/preview"
                title="Ashokvati ZERO SUGAR Video"
                allow="fullscreen"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Decorative leaf corners */}
        <span className="absolute top-4 right-8 text-6xl opacity-15 select-none">
          🍃
        </span>
        <span className="absolute bottom-8 right-4 text-5xl opacity-10 select-none">
          🌿
        </span>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────── */}
      <section id="problems" className="py-20 section-cream leaf-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="You are not alone. Millions face these silent health struggles every day.">
            Are You Facing These Problems?
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card-hover bg-white rounded-2xl p-6 shadow-herbal text-center border-t-4"
                style={{ borderTopColor: "#C9A24A" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#FEF3E2" }}
                >
                  <span style={{ color: "#C9A24A" }}>{p.icon}</span>
                </div>
                <h3 className="font-semibold text-primary text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT INTRODUCTION ────────────────────────────────────── */}
      <section
        id="product"
        className="py-20"
        style={{ backgroundColor: "#EFE6CF" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: "#DDE9D4", color: "#203B2A" }}
              >
                <Leaf className="w-3.5 h-3.5" /> Ayurvedic Proprietary Medicine
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                What is
              </h2>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-6"
                style={{ color: "#C9A24A" }}
              >
                Ashokvati ZERO SUGAR?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-6">
                Ashokvati Harbals ZERO SUGAR is a powerful Ayurvedic formulation
                designed to naturally manage blood sugar levels, improve insulin
                function, and enhance overall vitality.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                Crafted from time-tested herbs used in traditional Indian
                medicine for thousands of years, our formula works in harmony
                with your body — not against it.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "GMP Certified",
                  "No Preservatives",
                  "Vegetarian",
                  "Lab Tested",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: "#DDE9D4", color: "#203B2A" }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => scrollTo("#order")}
                  className="btn-gold px-8 py-3 text-base font-bold tracking-wide"
                >
                  Order Now — Get BOGO Offer{" "}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center"
            >
              <div
                className="relative w-72 h-72 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle, #DDE9D4 0%, #F4EEDC 70%)",
                }}
              >
                <img
                  src="/assets/uploads/ChatGPT-Image-Mar-20-2026-08_29_25-PM-1.png"
                  alt="Ashokvati ZERO SUGAR"
                  className="w-64 drop-shadow-xl object-contain"
                />
                <span className="absolute top-4 right-4 text-4xl opacity-30">
                  🌿
                </span>
                <span className="absolute bottom-4 left-4 text-3xl opacity-30">
                  🍃
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ─────────────────────────────────────────────── */}
      <section id="ingredients" className="py-20 section-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Five ancient Ayurvedic herbs working synergistically for optimal results.">
            Powerful Ayurvedic Ingredients
          </SectionHeading>
          <div className="flex flex-wrap justify-center gap-8">
            {INGREDIENTS.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card-hover flex flex-col items-center text-center w-44"
              >
                <div
                  className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-herbal mb-4"
                  style={{ borderColor: "#C9A24A" }}
                >
                  <img
                    src={ing.img}
                    alt={ing.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="font-display font-bold text-primary text-lg">
                  {ing.name}
                </div>
                <div
                  className="text-xs font-medium mb-1"
                  style={{ color: "#C9A24A" }}
                >
                  {ing.sub}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {ing.benefit}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => scrollTo("#order")}
              className="btn-gold px-8 py-3 text-base font-bold tracking-wide"
            >
              Order Now — Get BOGO Offer <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #203B2A 0%, #2E5040 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            subtitle="A three-step natural mechanism to restore metabolic balance."
          >
            How ZERO SUGAR Works
          </SectionHeading>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5"
              style={{ backgroundColor: "rgba(201,162,74,0.35)" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold font-display mb-5 shadow-gold relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #C9A24A, #D5B15B)",
                      color: "#203B2A",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS / TRANSFORMATION ────────────────────────────────── */}
      <section
        id="results"
        className="py-20"
        style={{ backgroundColor: "#F4EEDC" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Thousands of customers have already experienced real, lasting change.">
            Experience the Change
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card-hover bg-white rounded-2xl p-6 shadow-herbal text-center"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg, #203B2A, #2E5040)",
                  }}
                >
                  <span className="text-white">{r.icon}</span>
                </div>
                <h3 className="font-semibold text-primary text-sm mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 section-pale-green">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Real people. Real results. Hear from our satisfied customers.">
            What Our Customers Say
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                data-ocid={`testimonials.item.${i + 1}`}
                className="card-hover bg-white rounded-2xl p-6 shadow-herbal relative"
              >
                <span className="absolute top-4 right-5 text-5xl font-serif opacity-10 select-none text-primary">
                  "
                </span>
                <StarRating count={t.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed my-4 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: "#203B2A" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.city}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ──────────────────────────────────────────────── */}
      <section id="comparison" className="py-20 section-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="See why ZERO SUGAR is the smarter choice for natural diabetes support.">
            Why ZERO SUGAR is Better?
          </SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-herbal"
            data-ocid="comparison.table"
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#203B2A" }}>
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">
                    Feature
                  </th>
                  <th
                    className="text-center px-6 py-4 font-bold text-sm"
                    style={{ color: "#C9A24A" }}
                  >
                    ZERO SUGAR
                  </th>
                  <th className="text-center px-6 py-4 text-white/70 font-semibold text-sm">
                    Others
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, i) => (
                  <tr
                    key={feature}
                    className={i % 2 === 0 ? "bg-white" : ""}
                    style={i % 2 !== 0 ? { backgroundColor: "#F4EEDC" } : {}}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-primary">
                      {feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle2
                        className="w-5 h-5 mx-auto"
                        style={{ color: "#2E7D32" }}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <XCircle className="w-5 h-5 mx-auto text-red-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── OFFER CTA BAND ──────────────────────────────────────────── */}
      <section
        id="offer"
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #1F3B2A 0%, #2E4A35 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{
                backgroundColor: "rgba(201,162,74,0.2)",
                border: "1px solid #C9A24A",
                color: "#D5B15B",
              }}
            >
              <Timer className="w-3.5 h-3.5" /> Limited Time Offer
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
              Special Launch <span style={{ color: "#D5B15B" }}>Offer</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <ShieldCheck className="w-8 h-8" />,
                  label: "Buy 1 Get 1 Free",
                  sub: "Double the health benefits",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  label: "Free Delivery",
                  sub: "Pan India shipping",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  label: "Cash on Delivery",
                  sub: "Pay when you receive",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                >
                  <span style={{ color: "#C9A24A" }}>{item.icon}</span>
                  <div className="font-bold text-white text-base">
                    {item.label}
                  </div>
                  <div className="text-sm text-white/60">{item.sub}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollTo("#order")}
              className="btn-gold px-10 py-4 text-lg font-bold tracking-wide"
              data-ocid="offer.order_now.primary_button"
            >
              Order Now — Get BOGO Offer <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ + ORDER FORM ────────────────────────────────────────── */}
      <section id="faq" className="py-20 section-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Order now and experience the natural power of Ayurveda.">
            Order Ashokvati ZERO SUGAR
          </SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image + Price Card */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-herbal p-8 border border-amber-100">
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-20-2026-08_29_25-PM-1.png"
                alt="Ashokvati ZERO SUGAR"
                className="w-full max-w-xs object-contain rounded-xl mb-6"
                style={{ maxHeight: 360 }}
              />
              <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-2">
                Special Offer Price
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: "#C9A24A" }}
                >
                  ₹2490
                </span>
                <span className="text-lg font-semibold text-muted-foreground">
                  INR
                </span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-5 py-2 mt-1">
                <span className="text-lg">🎁</span>
                <span className="text-sm font-semibold text-primary">
                  Buy 1 Get 1 Free + Free Delivery
                </span>
              </div>
            </div>

            {/* Order Form */}
            <div id="order">
              <div className="bg-white rounded-2xl shadow-herbal p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5" style={{ color: "#C9A24A" }} />
                  <h3 className="font-display text-2xl font-bold text-primary">
                    Place Your Order
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in your details and we'll deliver to your doorstep.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                      data-ocid="order.success_state"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: "#DDE9D4" }}
                      >
                        <CheckCircle2
                          className="w-8 h-8"
                          style={{ color: "#203B2A" }}
                        />
                      </div>
                      <h4 className="font-display text-xl font-bold text-primary mb-2">
                        Order Placed!
                      </h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Thank you! Our team will contact you within 24 hours to
                        confirm your order.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="btn-gold px-6 py-2.5 text-sm font-bold"
                        data-ocid="order.place_another.button"
                      >
                        Place Another Order
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      data-ocid="order.modal"
                    >
                      <div>
                        <label
                          className="block text-sm font-semibold text-primary mb-1.5"
                          htmlFor="order-name"
                        >
                          Full Name *
                        </label>
                        <input
                          id="order-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                          style={{
                            borderColor: formErrors.name
                              ? "#ef4444"
                              : "#d1d5db",
                          }}
                          data-ocid="order.name.input"
                        />
                        {formErrors.name && (
                          <p
                            className="text-xs text-red-500 mt-1"
                            data-ocid="order.name.error_state"
                          >
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-semibold text-primary mb-1.5"
                          htmlFor="order-phone"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="order-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                          style={{
                            borderColor: formErrors.phone
                              ? "#ef4444"
                              : "#d1d5db",
                          }}
                          data-ocid="order.phone.input"
                        />
                        {formErrors.phone && (
                          <p
                            className="text-xs text-red-500 mt-1"
                            data-ocid="order.phone.error_state"
                          >
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-semibold text-primary mb-1.5"
                          htmlFor="order-address"
                        >
                          Delivery Address *
                        </label>
                        <textarea
                          id="order-address"
                          placeholder="Enter your full delivery address"
                          rows={3}
                          value={form.address}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
                          style={{
                            borderColor: formErrors.address
                              ? "#ef4444"
                              : "#d1d5db",
                          }}
                          data-ocid="order.address.textarea"
                        />
                        {formErrors.address && (
                          <p
                            className="text-xs text-red-500 mt-1"
                            data-ocid="order.address.error_state"
                          >
                            {formErrors.address}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full py-3.5 text-base font-bold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                        data-ocid="order.place_order.submit_button"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Placing Order...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Place Order — Cash on Delivery{" "}
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        🔒 Secure order. Get 10% extra discount on online
                        payment.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#1a3022" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#C9A24A" }}
                >
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base">
                    ASHOKVATI
                  </div>
                  <div className="text-xs" style={{ color: "#C9A24A" }}>
                    ZERO SUGAR
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">
                Ancient Ayurvedic wisdom, modernly formulated for the
                health-conscious India of today.
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  { icon: <SiFacebook />, href: "#", label: "Facebook" },
                  { icon: <SiInstagram />, href: "#", label: "Instagram" },
                  { icon: <SiYoutube />, href: "#", label: "YouTube" },
                  { icon: <SiX />, href: "#", label: "X" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors hover:text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@ashokvati.com"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#C9A24A" }}
                  />
                  info@ashokvati.com
                </a>
                <div className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: "#C9A24A" }}
                  />
                  Ashokvati Herbals Pvt. Ltd., Mumbai, Maharashtra, India
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h4 className="font-semibold text-white mb-4">Disclaimer</h4>
              <p className="text-xs text-white/45 leading-relaxed">
                These statements have not been evaluated by any regulatory
                authority. This product is not intended to diagnose, treat,
                cure, or prevent any disease. Please consult a qualified
                healthcare professional before use. Results may vary from person
                to person.
              </p>
            </div>
          </div>

          <div
            className="border-t pt-6"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
              <span>
                © {new Date().getFullYear()} Ashokvati Herbals Pvt. Ltd. All
                rights reserved.
              </span>
              <span>
                Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors underline underline-offset-2"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
