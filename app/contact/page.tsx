"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { FaTiktok, FaInstagram, FaFacebookF, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@sachokjob.com" },
  { icon: Phone, label: "Phone", value: "+1 (646) 123-4567" },
  { icon: MapPin, label: "Address", value: "123 Job Street, Suite 100\nNew York, NY 10001, USA" },
  { icon: Clock, label: "Business Hours", value: "Monday - Friday, 9:00 AM - 6:00 PM (EST)" },
];

const socialIcons = [FaTiktok, FaInstagram, FaFacebookF, FaYoutube, FaXTwitter, FaLinkedinIn];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4 text-center">
          <h1 className="text-4xl font-extrabold text-ink-900">Contact Us</h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            We&apos;d love to hear from you! Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-12">
          <div className="divide-y divide-gray-100">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-start gap-4 py-5 first:pt-0">
                <span className="h-11 w-11 shrink-0 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <c.icon size={18} />
                </span>
                <div>
                  <p className="font-bold text-ink-900">{c.label}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-ink-900 text-lg mb-1">Message sent!</h3>
                <p className="text-sm text-emerald-700">
                  Thanks for reaching out — our team will get back to you within one business day.
                </p>
                <Button variant="outline" size="md" className="mt-5" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">Subject</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 px-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-ink-900"
                  >
                    <option value="">Select a subject</option>
                    <option>General inquiry</option>
                    <option>Employer support</option>
                    <option>Job seeker support</option>
                    <option>Billing</option>
                    <option>Report an issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 px-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-ink-900 resize-y"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center pb-14">
          <p className="font-bold text-ink-900 mb-5">Follow Us</p>
          <div className="flex items-center justify-center gap-3">
            {socialIcons.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-ink-800 hover:bg-gray-200 transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
