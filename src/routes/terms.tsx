import { createFileRoute, Link } from '@tanstack/react-router'
import SiteFooter from '../features/parser/components/parser-site-footer'
import { FileText, CheckCircle2, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#df4e28]">Agreement</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0d252c] mt-2 mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Universal Parser is provided as open utility software. By using this application, you agree to the terms outlined below.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-[#df4e28] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Permissible Usage</h3>
                <p className="text-sm text-gray-600">You may freely use Universal Parser for personal, open-source, and commercial development workflows.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <FileText className="w-6 h-6 text-[#df4e28] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Disclaimer of Warranty</h3>
                <p className="text-sm text-gray-600">The software is provided &quot;as is&quot; without warranties of any kind. Always verify parsed results in mission-critical environments.</p>
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
