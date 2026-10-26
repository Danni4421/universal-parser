import { createFileRoute, Link } from '@tanstack/react-router'
import SiteFooter from '../features/parser/components/parser-site-footer'
import { Shield, Lock, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col justify-between">
      <main className="flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-12 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d252c] hover:text-[#df4e28] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Parser
        </Link>

        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-gray-200/80 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#df4e28]">Legal & Trust</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0d252c] mt-2 mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Your privacy is fundamental to Universal Parser. We design our software so that your code, payload data, and query strings never leave your device.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
            <div className="flex gap-4 items-start">
              <Shield className="w-6 h-6 text-[#df4e28] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Local Client-Side Processing</h3>
                <p className="text-sm text-gray-600">All data parsing, decoding, and formatting operations execute inside your browser&apos;s JavaScript engine.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Lock className="w-6 h-6 text-[#df4e28] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">No Data Collection</h3>
                <p className="text-sm text-gray-600">We do not log, store, or transmit your input text, parsed output, or history to external servers or analytics tools.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="w-full px-4 md:px-8 pb-8">
        <SiteFooter />
      </div>
    </div>
  )
}
