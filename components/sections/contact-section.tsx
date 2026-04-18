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
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className="bg-card border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="bg-card border-border focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Regarding..."
          className="bg-card border-border focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message here..."
          rows={5}
          required
          className="bg-card border-border focus:border-primary"
        />
      </div>

      <div className="flex flex-col items-center">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Send className="h-5 w-5 mr-2" />}
          {loading ? "Sending..." : "Send Message"}
        </Button>

        {status && (
          <p
            className={`mt-4 text-sm text-center ${
              success === true ? "text-green-500" : success === false ? "text-red-500" : "text-muted-foreground"
            }`}
            role="status"
            aria-live="polite"
          >
            {status}
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
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Get In Touch</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Have a project in mind, a question, or just want to connect? Feel free to reach out!
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Card className="max-w-2xl mx-auto bg-background shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send me a message</CardTitle>
              <CardDescription>I typically respond within 24-48 hours.</CardDescription>
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
        </Reveal>
      </div>
    </section>
  )
}

export default ContactSection
