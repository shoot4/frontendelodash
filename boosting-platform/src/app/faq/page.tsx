"use client"

import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQSkeleton } from "@/components/faq/faq-skeleton"

const faqs = [
  {
    question: "What is Marvel Rivals Boosting?",
    answer: "Marvel Rivals Boosting is a professional service where skilled players help you improve your rank, learn the game, or master specific characters. Our service is safe, efficient, and tailored to your needs."
  },
  {
    question: "How long does boosting take?",
    answer: "The duration varies depending on the service and your goals. Rank boosting typically takes 1-3 days per rank tier, while coaching sessions are available in 1-hour blocks. We'll provide an estimated timeframe when you place your order."
  },
  {
    question: "Is boosting safe to use?",
    answer: "Yes, we prioritize account safety. Our boosters use VPNs, follow game policies, and maintain natural win rates. We never use cheats or exploits, ensuring your account remains in good standing."
  },
  {
    question: "Can I choose specific characters for boosting?",
    answer: "Yes! You can select preferred characters during the order process. Our boosters are proficient with all characters and can accommodate your preferences for an additional fee."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, PayPal, and various cryptocurrency options. All payments are processed through secure payment gateways to ensure your financial information is protected."
  },
  {
    question: "Can I watch the booster play on my account?",
    answer: "Yes, we offer a streaming option where you can watch the booster play in real-time. This is a great way to learn and ensure transparency. You can enable this option during checkout."
  },
  {
    question: "What happens if I'm not satisfied with the service?",
    answer: "We offer a satisfaction guarantee. If you're not happy with our service, contact our 24/7 support team, and we'll work to resolve any issues or provide a refund according to our refund policy."
  },
  {
    question: "Do you offer duo queue boosting?",
    answer: "Yes, we offer duo queue boosting where you can play alongside our professional boosters. This option is great for learning while climbing ranks, though it may take longer than standard boosting."
  },
  {
    question: "How do I track my order progress?",
    answer: "Once your order begins, you'll receive access to our tracking dashboard where you can monitor progress in real-time, communicate with your booster, and view detailed statistics."
  },
  {
    question: "What regions do you support?",
    answer: "We provide boosting services in all major regions including NA, EU, Asia, and OCE. Our boosters are available 24/7 to accommodate different time zones."
  }
]

export default function FAQPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <FAQSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Find answers to common questions about our Marvel Rivals boosting services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Support */}
        <div className="text-center space-y-4 pt-8 border-t">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <p className="text-muted-foreground">
            Our support team is available 24/7 to help you with any questions or concerns.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
} 