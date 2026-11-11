import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { galleryItems, type GalleryItem } from '../data/gallery'

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <section className="relative flex h-full flex-col justify-center bg-background px-6 py-16 md:px-16">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-secondary/70 to-transparent blur-3xl" />
        <div className="absolute inset-y-0 left-1/3 w-1/3 rounded-full bg-muted-foreground/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-3xl">
          <motion.h2
            className="font-display text-3xl font-semibold text-foreground md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Visual Gallery
          </motion.h2>
          <motion.p
            className="mt-3 text-base text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Moments that inspire engineering craft — from collaborative sprints to the systems
            that power reliable digital experiences.
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: item.id * 0.05 }}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog.Root
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null)
        }}
      >
        <AnimatePresence>
          {selectedItem && (
            <Dialog.Portal forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Dialog.Content className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-background shadow-2xl">
                  <button
                    className="absolute right-4 top-4 rounded-full bg-background/80 p-2 text-muted-foreground transition hover:bg-background"
                    onClick={() => setSelectedItem(null)}
                    aria-label="Close gallery preview"
                  >
                    <X className="size-5" />
                  </button>
                  <div className="relative aspect-[16/9] w-full">
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent p-6 text-white">
                      <p className="text-sm font-medium">{selectedItem.alt}</p>
                    </div>
                  </div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  )
}

