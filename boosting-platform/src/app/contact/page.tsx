"use client"

import { useState } from "react"
import { Mail, MessageCircle, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Form submission logic will go here
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Contact Support</h1>
          <p className="text-muted-foreground">
            Our support team is here to help 24/7
          </p>
        </div>

        {/* Live Chat Card */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Chat Support
            </CardTitle>
            <CardDescription>
              Get instant help from our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              Start Live Chat
            </Button>
          </CardContent>
        </Card>

        {/* Alternative Contact Methods */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Response time: Within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:support@marvelrivalsboost.com"
                className="text-primary hover:underline"
              >
                support@marvelrivalsboost.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discord Support</CardTitle>
              <CardDescription>
                Join our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href="https://discord.gg/marvelrivalsboost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Discord Server
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Offline Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send us a message
            </CardTitle>
            <CardDescription>
              We&apos;ll get back to you via email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject">Subject</label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..." 
                  className="min-h-[100px]"
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Help Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Need quick answers?</AlertTitle>
          <AlertDescription>
            Check our <a href="/faq" className="text-primary hover:underline">FAQ page</a> for instant answers to common questions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
} 