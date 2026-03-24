"use client";
import { useEffect, useState } from "react";
import Lukisan from "@/public/assets/lukisan-1.jpg";
import CardWrapper from "../ui/CardWrapper";
import { motion } from "framer-motion";

type ItemType = {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionCard = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        // Ambil maksimal 3 item terbaru
        if (data.items) {
          setItems(data.items.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal memuat item eksibisi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-black transition-colors relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <p className="text-emerald-500 font-bold tracking-[0.3em] uppercase text-[10px]">
              Explore Live Collections
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white max-w-xl leading-tight">
              Eksplorasi <span className="text-emerald-500">Mahakarya</span> Terpilih.
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm font-light leading-relaxed">
            Data terbaru dari sistem museum kami. Temukan artefak bersejarah yang telah didigitalisasi secara real-time.
          </p>
        </div>

        {isLoading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 dark:bg-neutral-900 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <CardWrapper
                  image={Lukisan} // Menggunakan lukisan sebagai fallback visual karena belum ada field thumbnail
                  title={item.title}
                  description={item.description || "Belum ada deskripsi untuk artefak ini."}
                  href={`/item/${item.id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem]">
            <p className="text-gray-400 text-sm">Belum ada koleksi yang tersedia untuk ditampilkan.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionCard;
