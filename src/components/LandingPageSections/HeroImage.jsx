import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.div 
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/20 to-transparent"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      <img 
        src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw2fHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBzaG93aW5nJTIwYXZhaWxhYmlsaXR5JTIwc3RhdHVzfGVufDB8fHx8MTczNzY3OTg5M3ww&ixlib=rb-4.0.3&q=80&w=1080" 
        alt="App interface preview" 
        className="w-full h-auto object-cover opacity-90" 
        data-image-request="modern mobile app interface showing availability status"
        style={{ minHeight: '480px' }}
      />
    </motion.div>
  );
}