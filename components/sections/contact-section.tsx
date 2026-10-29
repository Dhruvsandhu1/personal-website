"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const EMAIL = "dhruvsandhu21@gmail.com"
const ACCESS_KEY = "9433f5d6-c011-4918-8d16-b6656b062f22"

const profiles = [
  { label: "GitHub", handle: "Dhruvsandhu1", href: "https://github.com/Dhruvsandhu1" },
  { label: "LinkedIn", handle: "dhruvsandhu", href: "https://www.linkedin.com/in/dhruvsandhu/" },
  { label: "Kaggle", handle: "dhruvsandhu1", href: "https://www.kaggle.com/dhruvsandhu1" },
  { label: "Codeforces", handle: "Decoder_RAG", href: "https://codeforces.com/profile/Decoder_RAG" },
  { label: "CodeChef", handle: "dhruv_sandhu22", href: "https://www.codechef.com/users/dhruv_sandhu22" },
]

const fieldClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.035] focus:ring-4 focus:ring-primary/10"

function ContactForm() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    setLoading(true)
    setSuccess(null)
    setStatus("")

    try {
      const formData = new FormData(form)

      // Required by Web3Forms
      if (!formData.has("access_key")) {
        formData.append("access_key", ACCESS_KEY)
      }
      // Default subject if the visitor leaves it blank
      if (!formData.get("subject")) {
        formData.set("subject", "New message from portfolio")
      }

      const payload: Record<string, string> = {}
      formData.forEach((value, key) => {
        payload[key] = typeof value === "string" ? value : String(value)
      })

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setStatus("Thanks — your message is on its way. I'll get back to you soon.")
        form.reset()
      } else {
        setSuccess(false)
        setStatus(data?.message || "Something went wrong while sending your message.")
      }
    } catch {
      setSuccess(false)
      setStatus("Something went wrong. Please try again, or email me directly.")
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(""), 6000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Web3Forms key and honeypot */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-foreground/80">Name</span>
          <input name="name" required placeholder="Jane Doe" autoComplete="name" className={fieldClass} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-foreground/80">Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-foreground/80">
          Subject <span className="text-muted-foreground">(optional)</span>
        </span>
        <input name="subject" placeholder="Role, project or collaboration" className={fieldClass} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-foreground/80">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me a little about what you're working on…"
          className={cn(fieldClass, "resize-none")}
        />
      </label>

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm min-h-5",
            success === true && "text-primary",
            success === false && "text-destructive",
          )}
        >
          {status}
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  )
}

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/[0.06] py-28 md:py-40">
      <div
        aria-hidden
        className="absolute bottom-[-20rem] left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[120px]"
      />

      <div className="container max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="05"
              label="Contact"
              className="mb-0 md:mb-0"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">intelligent.</span>
                </>
              }
              description="Whether it's an ML role, a research collaboration or an interesting problem, I'd love to hear about it. I usually reply within a day."
            />

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-lg md:text-xl font-medium underline decoration-white/20 underline-offset-[6px] transition-colors hover:decoration-primary"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mt-10 border-t border-white/[0.07]">
                {profiles.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-white/[0.07] py-4"
                    >
                      <span className="text-[15px]">{p.label}</span>
                      <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                        {p.handle}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="surface bg-zinc-950/60 p-6 backdrop-blur-xl md:p-10">
              <h3 className="text-xl font-medium tracking-tight">Send a message</h3>
              <p className="mt-2 mb-8 text-sm text-muted-foreground">It lands straight in my inbox.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
