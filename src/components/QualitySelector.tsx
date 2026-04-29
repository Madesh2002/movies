import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Download, ChevronRight } from 'lucide-react';
import { Movie } from '../types';

interface QualitySelectorProps {
  movie: Movie | null;
  onClose: () => void;
  onSelect: (movie: Movie, url: string) => void;
}

export default function QualitySelector({ movie, onClose, onSelect }: QualitySelectorProps) {
  if (!movie) return null;

  const defaultLabels = ['1.4 GB', '900 MB', '700 MB', '400 MB', '300 MB'];
  const qualities = movie.links && Array.isArray(movie.links) && movie.links.length > 0 
    ? movie.links.map((link: any, idx: number) => {
        const isObj = typeof link === 'object' && link !== null;
        let url = isObj ? (link.url || link.link || link.videoUrl) : link;
        
        // Final fallback to movie.videoUrl if link doesn't have one
        if (!url || url === 'undefined') url = movie.videoUrl;
        
        const label = (isObj ? link.label : '') || defaultLabels[idx] || `Quality ${idx + 1}`;
        return { label, url };
      }).filter(q => q.url && q.url !== 'undefined')
    : defaultLabels.slice(0, 3).map(label => ({ label, url: movie.videoUrl })).filter(q => q.url && q.url !== 'undefined');

  const handleDownload = (url: string, label: string) => {
    if (!url) return;
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    const a = document.createElement('a');
    a.href = finalUrl;
    const extension = finalUrl.split('.').pop()?.split(/[?#]/)[0] || 'mp4';
    a.download = `${movie.title.replace(/\s+/g, '_')}_${label}.${extension}`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          key={movie.id}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-md bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">{movie.title}</h2>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-2">Select Streaming Quality</p>
            </div>
            
            <div className="space-y-3">
              {qualities.map((q, idx) => (
                <button
                  key={`${movie.id}-q-${idx}`}
                  onClick={() => onSelect(movie, q.url)}
                  className="w-full flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-red-600/50 transition-all p-5 rounded-2xl group relative overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all shadow-lg shadow-red-600/0 group-hover:shadow-red-600/20">
                      <Play className="fill-white text-white ml-1" size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-black text-white uppercase italic tracking-tight">{q.label}</span>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> Direct Streaming Available
                      </span>
                    </div>
                  </div>
                  <div className="text-red-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <ChevronRight size={20} />
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={onClose} 
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-[0.3em] border border-white/5 mt-4"
            >
              Cancel Selection
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
