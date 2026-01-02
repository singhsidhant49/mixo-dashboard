import { Megaphone, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-brand-600 p-2 rounded-lg group-hover:bg-brand-700 transition-colors">
                                <Megaphone className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                                Mixo Ads
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1 mt-1">
                            <Link
                                to="/"
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                            >
                                Dashboard
                            </Link>
                            <button
                                className="px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
                                disabled
                            >
                                Campaigns
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
                                disabled
                            >
                                Analytics
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200"></div>
                        <button className="flex items-center gap-3 pl-2 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 leading-none">Sid</p>
                                <p className="text-xs text-slate-500 leading-none mt-1">Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:border-brand-300 transition-colors">
                                <User className="w-5 h-5 text-slate-600" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
