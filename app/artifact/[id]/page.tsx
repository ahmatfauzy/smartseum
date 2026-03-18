import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Info } from "lucide-react";
import { qrItems } from "@/datas/qrItems";

// Next.js App Router dynamic page
export default async function ArtifactPage({ params }: { params: { id: string } }) {
  // Await the params since Next.js 15+ sometimes requires awaiting async params, 
  // but to be safe with Next.js 14/15 changes, we can just use it or properly await
  // Next 16 might require awaiting:
  const resolvedParams = await Promise.resolve(params);
  const artifactId = resolvedParams.id;
  
  const artifact = qrItems.find((item) => item.id === artifactId);

  if (!artifact) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Artifact Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          The artifact you are looking for does not exist or has been removed from the archives.
        </p>
        <Link 
          href="/interaction" 
          className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Return to Scanner
        </Link>
      </main>
    );
  }

  // Generate some long dummy text based on the short description for the detailed view
  const dummyDetailParagraphs = [
    `The artifact known as "${artifact.name}" stands as a remarkable testament to the ingenuity of its time. Believed to have originated from ${artifact.origin || "an unknown source"}, its discovery has sparked widespread debate among modern historians and archivists. Initial analysis suggests it was created around ${artifact.year || "an undocumented era"}, providing a unique glimpse into the cultural and aesthetic values that shaped its contemporary society.`,
    `Upon closer inspection, the intricate details of its craftsmanship become apparent. ${artifact.description} Researchers have noted the unusual materials synthesized into its structure, many of which are rarely found in similar pieces from the same region. This implies a network of complex trade routes or advanced local techniques that were previously unrecorded in historical texts.`,
    `Today, it is preserved under strict atmospheric controls to prevent degradation. It is not merely a piece of history, but a bridge to understanding the profound philosophies of its creators. Visitors are deeply captivated by its presence, often reporting a sense of timeless connection when standing before it.`
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors relative pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] bg-black overflow-hidden flex items-end">
        {/* Abstract Placeholder Hero Image related to artifact */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black w-full h-full object-cover opacity-60 flex items-center justify-center pointer-events-none">
           {/* Fake abstract shape just for visual filler since we don't have real images yet */}
           <div className="w-64 h-64 border-[30px] border-white/5 rounded-full blur-xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

        {/* Back Button */}
        <Link 
          href="/interaction" 
          className="absolute top-8 left-6 md:left-12 z-20 group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all text-white"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* Hero Title Area */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-12">
          <span className="text-white/60 font-semibold tracking-widest text-xs uppercase mb-3 block">
            Artifact Record #{artifact.id.split('-').pop()?.padStart(4, '0')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white">
            {artifact.name}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left column: Metadata Metadata */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6 flex items-center">
              <Info className="w-4 h-4 mr-2" /> 
              Quick Facts
            </h3>
            
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" /> Origin
                </p>
                <p className="font-medium text-lg leading-tight">
                  {artifact.origin || "Unknown Origin"}
                </p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" /> Year Discovered / Created
                </p>
                <p className="font-medium text-lg leading-tight">
                  {artifact.year || "Unknown Era"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Detailed text */}
        <div className="md:col-span-8 flex flex-col gap-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
          <p className="text-xl md:text-2xl font-medium text-black dark:text-white leading-snug mb-2">
            {artifact.description}
          </p>

          <div className="w-12 h-1 bg-black dark:bg-white my-4" />

          {dummyDetailParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

    </main>
  );
}
