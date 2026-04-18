"use client"

import { useState, type FormEvent } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"

function Web3ContactForm({ status, setStatus, loading, setLoading, success, setSuccess }: any) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    setLoading(true)
    setSuccess(null)
    setStatus("Please wait...")

    try {
      const formData = new FormData(form)

      // Required by Web3Forms
      if (!formData.has("access_key")) {
        formData.append("access_key", "9433f5d6-c011-4918-8d16-b6656b062f22")
      }
      // Optional: default subject if user leaves it blank
      if (!formData.get("subject")) {
        formData.set("subject", "New message from portfolio")
      }

      // Build JSON payload
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
        setStatus(data?.message || "Message sent successfully! I'll get back to you soon.")
        form.reset()
      } else {
        setSuccess(false)
        setStatus(data?.message || "Something went wrong while sending your message.")
      }
    } catch (err) {
      setSuccess(false)
      setStatus("Something went wrong! Please try again.")
    } finally {
      setLoading(false)
      // Auto-clear message after a few seconds
      setTimeout(() => setStatus(""), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Web3Forms required key and honeypot */}
      <input type="hidden" name="access_key" value="9433f5d6-c011-4918-8d16-b6656b062f22" />
      <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <Label htmlFor="name" className="text-cyan-400 font-mono text-sm uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="[Enter Your Name]"
            required
            className="bg-slate-900 border-slate-700/80 focus:border-cyan-400 font-mono text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 transition-all rounded-lg"
          />
        </div>
        <div className="space-y-2 group">
          <Label htmlFor="email" className="text-cyan-400 font-mono text-sm uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="[user@domain.com]"
            required
            className="bg-slate-900 border-slate-700/80 focus:border-cyan-400 font-mono text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 transition-all rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-2 group">
        <Label htmlFor="subject" className="text-cyan-400 font-mono text-sm uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="[Query Subject]"
          className="bg-slate-900 border-slate-700/80 focus:border-cyan-400 font-mono text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 transition-all rounded-lg"
        />
      </div>

      <div className="space-y-2 group">
        <Label htmlFor="message" className="text-cyan-400 font-mono text-sm uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Transmission Payload</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="[Type your transmission message here...]"
          rows={5}
          required
          className="bg-slate-900 border-slate-700/80 focus:border-cyan-400 font-mono text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 transition-all rounded-lg resize-none"
        />
      </div>

      <div className="flex flex-col items-center">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto font-mono uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Send className="h-5 w-5 mr-2" />}
          {loading ? "TRANSMITTING..." : "TRANSMIT"}
        </Button>

        {status && (
          <p
            className={`mt-4 font-mono text-sm tracking-wide text-center drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] ${
              success === true ? "text-cyan-400" : success === false ? "text-red-400" : "text-white/70"
            }`}
            role="status"
            aria-live="polite"
          >
            {success === true ? "[SUCCESS]: " : success === false ? "[ERROR]: " : "[PROCESSING]: "}{status}
          </p>
        )}
      </div>
    </form>
  )
}

export function ContactSection() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)] mb-2 uppercase tracking-tight">
              Initialize Contact
            </h2>
          </Reveal>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
        </div>
        <Reveal delay={0.06}>
          <p className="font-mono text-cyan-300/70 text-center mb-12 max-w-xl mx-auto">
            {'>'} system input awaiting transmission pattern //
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="max-w-2xl mx-auto relative group/form">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover/form:border-cyan-500/50 transition-all duration-500 relative z-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-white/95 text-center tracking-tight">Open Secure Channel</CardTitle>
                <CardDescription className="text-center font-mono uppercase text-xs tracking-widest text-slate-400 mt-2">Latency: ~24.0 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <Web3ContactForm
                  status={status}
                  setStatus={setStatus}
                  loading={loading}
                  setLoading={setLoading}
                  success={success}
                  setSuccess={setSuccess}
                />
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ContactSection
