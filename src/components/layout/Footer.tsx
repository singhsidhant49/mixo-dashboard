import { Github, Twitter, Linkedin, Megaphone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Megaphone className="w-6 h-6 text-brand-600" />
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Mixo Ads</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Transforming AI-driven advertising for multi-location brands. Automate and optimize your campaigns at scale.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">How it works</a></li>
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">API Docs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Contact Sid</a></li>
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Status</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Social</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} Mixo Ads. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
                        <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
                        <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
