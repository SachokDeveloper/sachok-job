"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header />
      <section className="container-page py-14 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-ink">Contact Us</h1>
          <p className="text-muted mt-2">
            We&apos;d love to hear from you! Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", lines: ["support@sachokjob.com"] },
              { icon: Phone, title: "Phone", lines: ["+1 (646) 123-4567"] },
              { icon: MapPin, title: "Address", lines: ["123 Job Street, Suite 100", "New York, NY 10001, USA"] },
              { icon: Clock, title: "Business Hours", lines: ["Monday - Friday, 9:00 AM - 6:00 PM (EST)"] },
            ].map(({ icon: Icon, title, lines }, i) => (
              <div key={title} className={`flex items-start gap-3 pb-5 ${i < 3 ? "border-b border-line" : ""}`}>
                <span className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  {lines.map((l) => (
                    <p key={l} className="text-sm text-muted">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label className="text-sm font-medium text-ink block mb-1">Full Name</label>
              <input required placeholder="Your full name" className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink block mb-1">Email Address</label>
              <input required type="email" placeholder="your.email@example.com" className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink block mb-1">Subject</label>
              <select className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand text-ink/80">
                <option>Select a subject</option>
                <option>General question</option>
                <option>Employer support</option>
                <option>Job seeker support</option>
                <option>Billing</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-ink block mb-1">Message</label>
              <textarea required placeholder="Type your message here..." rows={5} className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand resize-none" />
            </div>
            <button type="submit" className="btn btn-primary w-full py-3">
              {sent ? "Message sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
