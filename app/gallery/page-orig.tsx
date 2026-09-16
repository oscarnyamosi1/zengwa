// 'use client';

// import React, { useState } from 'react';
// import PublicHeader from '@/components/PublicHeader';
// import PublicFooter from '@/components/PublicFooter';
// import AppImage from '@/components/ui/AppImage';
// import { Heart, Play, Image as ImageIcon } from 'lucide-react';
// import { galleryItems } from '@/data/dummyData';

// const albums = ['All', 'Construction', 'Water Projects', 'Education', 'Health', 'Church', 'Infrastructure', 'Volunteers'];

// export default function GalleryPage() {
//   const [activeAlbum, setActiveAlbum] = useState('All');
//   const [lightbox, setLightbox] = useState<string | null>(null);

//   const filtered = activeAlbum === 'All' ? galleryItems : galleryItems.filter((g) => g.album === activeAlbum);

//   return (
//     <div className="min-h-screen bg-background">
//       <PublicHeader />
//       {lightbox && (
//         <div
//           className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//           onClick={() => setLightbox(null)}
//         >
//           <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
//             <button
//               onClick={() => setLightbox(null)}
//               className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-medium"
//             >
//               ✕ Close
//             </button>
//             <AppImage
//               src={lightbox}
//               alt="Gallery image enlarged view"
//               width={1200}
//               height={800}
//               className="w-full max-h-[80vh] object-contain rounded-2xl"
//             />
//           </div>
//         </div>
//       )}
//       <main>
//         {/* Hero */}
//         <section className="relative bg-primary overflow-hidden py-14 lg:py-20">
//           <div className="herosection absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
//           </div>
//           <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
//             <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
           
//                 <h1 className="text-4xl text-white lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
//                   <ImageIcon size={40} className="shrink-0" />
//                   Child Sponsorship
//                 </h1>

//             </div>

//             <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
//               See the Impact
//             </h1>
//             <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto">
//               A picture is worth a thousand words. Browse photos and videos from our projects, events, and community life.
//             </p>
//           </div>
//         </section>

//         {/* Album Filter */}
//         <section className="py-6 bg-card border-b border-border sticky top-16 z-30">
//           <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
//             <div className="flex flex-wrap gap-2">
//               {albums.map((album) => (
//                 <button
//                   key={album}
//                   onClick={() => setActiveAlbum(album)}
//                   className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//                     activeAlbum === album
//                       ? 'bg-primary text-primary-foreground shadow-card'
//                       : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
//                   }`}
//                 >
//                   {album}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Gallery Grid */}
//         <section className="py-10 lg:py-14">
//           <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
//             <p className="text-muted-foreground text-sm mb-6">{filtered.length} items</p>
//             <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
//               {filtered.map((item) => (
//                 <div
//                   key={item.id}
//                   className="break-inside-avoid bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group cursor-pointer"
//                   onClick={() => setLightbox(item.image)}
//                 >
//                   <div className="relative overflow-hidden">
//                     {item.type === 'photo' ? 
                    
//                     <AppImage
//                       src={item.image}
//                       alt={item.alt}
//                       width={400}
//                       height={300}
//                       className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
                    
//                     :
//                     <div style={{width: "100%", aspectRatio: "16 / 9"}}>
//                       <iframe src={item.image} style={{width: "100%", height: "100", border: 0}}  />
//                     </div>

//                     }
//                     {item.type === 'video' && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                         <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
//                           <Play size={20} className="text-primary ml-1" />
//                         </div>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
//                   </div>
//                   <div className="p-3">
//                     <p className="font-semibold text-foreground text-sm leading-snug">{item.title}</p>
//                     <div className="flex items-center justify-between mt-1.5">
//                       <span className="text-xs text-muted-foreground">{item.album} · {item.date}</span>
//                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <Heart size={11} className="text-primary" />
//                         {item.likes}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <PublicFooter />
//     </div>
//   );
// }