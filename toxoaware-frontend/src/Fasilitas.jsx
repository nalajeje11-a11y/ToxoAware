import "react";
import {
  MapPin,
  Clock,
  ExternalLink,
  Building2,
  Activity,
  ShieldPlus,
} from "lucide-react";

const fasilitasData = [
  {
    nama: "RSUP Prof. dr. I.G.N.G. Ngoerah",
    alamat: "Jl. Diponegoro, Denpasar",
    layanan: ["Klinik Ibu Hamil", "Lab TORCH"],
    buka: "24 Jam",
    link: "https://maps.app.goo.gl/htGYTBxXMfb1vb9W8?g_st=ac",
    tipe: "Rumah Sakit Utama",
  },
  {
    nama: "RS Kasih Ibu Denpasar",
    alamat: "Jl. Teuku Umar No. 120, Denpasar",
    layanan: ["Klinik Ibu Hamil", "Lab TORCH"],
    buka: "24 Jam",
    link: "https://maps.app.goo.gl/kAJfn5RzgqMaYCAv5",
    tipe: "Rumah Sakit",
  },
  {
    nama: "Prodia Denpasar",
    alamat: "Jl. Raya Puputan No. 56, Renon, Denpasar",
    layanan: ["Lab TORCH", "Parasitologi"],
    buka: "Senin–Sabtu, 06.00–20.00",
    link: "https://maps.app.goo.gl/7chrdhVssB3qG1a2A",
    tipe: "Laboratorium",
  },
  {
    nama: "Klinik Bersalin Puri Bunda",
    alamat: "Jl. Gatot Subroto VI No. 19, Dauh Puri Kaja, Denpasar",
    layanan: ["Klinik Ibu Hamil"],
    buka: "24 Jam",
    link: "https://maps.app.goo.gl/2nTvLVbWoMPZ4LZf7?g_st=ac",
    tipe: "Klinik Khusus",
  },
  {
    nama: "RS Bali Royal (BROS)",
    alamat: "Jl. Tantular No. 6, Renon, Denpasar",
    layanan: ["Rumah Sakit Umum", "Lab Lengkap"],
    buka: "24 Jam",
    link: "https://maps.app.goo.gl/L4CCWzM8xY8adJcw9",
    tipe: "Rumah Sakit",
  },
];

export default function Fasilitas() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 md:pb-8">
      <div className="bg-[#C4A1FF] border-4 border-black p-8 md:p-12 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[100px] opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black text-sm font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ShieldPlus size={18} strokeWidth={3} /> TORCH & PARASITOLOGI
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-none uppercase tracking-tight">
              FASILITAS KESEHATAN
              <br />
              TERDEKAT.
            </h2>
            <p className="text-black font-bold max-w-lg text-lg leading-relaxed border-l-4 border-black pl-4">
              Temukan rumah sakit dan laboratorium terpercaya di Bali untuk
              pemeriksaan skrining, konsultasi kehamilan, dan tes TORCH.
            </p>
          </div>
          <div className="hidden md:flex w-32 h-32 bg-white border-4 border-black items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
            <MapPin size={64} className="text-black" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {fasilitasData.map((faskes, index) => (
          <div
            key={index}
            className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full relative"
          >
            <div className="relative z-10 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-[#FFC900] border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Building2 size={32} strokeWidth={3} />
                </div>
                <span className="bg-black text-white text-xs font-black px-4 py-2 uppercase tracking-widest border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {faskes.tipe}
                </span>
              </div>

              <h3 className="text-2xl font-black text-black mb-3 leading-tight uppercase">
                {faskes.nama}
              </h3>

              <div className="flex items-start gap-3 text-black font-bold mb-6 bg-[#f4f4f0] p-3 border-2 border-black">
                <MapPin
                  size={20}
                  className="shrink-0 mt-0.5 text-[#23A094]"
                  strokeWidth={3}
                />
                <p className="text-sm leading-relaxed uppercase">
                  {faskes.alamat}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {faskes.layanan.map((layanan, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 bg-[#FF90E8] text-black border-2 border-black text-xs font-black px-3 py-2 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Activity size={16} strokeWidth={3} /> {layanan}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t-4 border-black mt-auto">
              <div className="flex items-center gap-3 text-black bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Clock size={18} className="text-[#FFC900]" strokeWidth={3} />
                <span className="text-xs font-black uppercase">
                  {faskes.buka}
                </span>
              </div>

              <a
                href={faskes.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#23A094] hover:bg-black text-white border-4 border-black hover:border-white font-black py-3 px-6 uppercase flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-sm"
              >
                NAVIGASI <ExternalLink size={18} strokeWidth={3} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
