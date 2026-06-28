import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Activity,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const screeningData = [
  {
    title: "Keamanan Pangan & Higienitas",
    subtitle: "Jalur Food-borne",
    questions: [
      "Seberapa sering Anda mengonsumsi daging yang masih berwarna merah/merah muda di bagian dalamnya (seperti steak rare, sate setengah matang, atau daging asap)?",
      "Seberapa sering Anda mencicipi daging giling/mentah saat sedang membumbui masakan sebelum dimasak hingga matang?",
      "Seberapa sering Anda mengonsumsi sayuran mentah (lalapan) atau buah-buahan tanpa mencucinya terlebih dahulu di bawah air mengalir?",
      "Seberapa sering Anda menggunakan talenan atau pisau yang sama untuk memotong daging mentah dan sayuran secara bergantian tanpa dicuci sabun terlebih dahulu?",
      "Seberapa sering Anda mengonsumsi susu kambing atau domba yang tidak melalui proses pasteurisasi (susu mentah)?",
      "Seberapa sering Anda makan di tempat umum yang kebersihan pengolahan makanannya tidak terjamin (risiko kontaminasi silang)?",
      "Seberapa sering Anda lupa mencuci tangan dengan sabun setelah memegang daging mentah di dapur?",
    ],
  },
  {
    title: "Interaksi Hewan & Lingkungan",
    subtitle: "Jalur Fekal-Oral",
    questions: [
      "Seberapa sering Anda bersentuhan langsung dengan kucing liar atau kucing peliharaan yang sering bermain di luar rumah?",
      "Seberapa sering Anda membersihkan kotak kotoran kucing (litter box) tanpa menggunakan sarung tangan dan masker?",
      "Seberapa sering Anda membiarkan kucing peliharaan Anda berburu tikus, burung, atau hewan kecil lainnya di lingkungan rumah?",
      "Seberapa sering Anda memberikan makanan berupa daging mentah atau jeroan mentah kepada kucing di rumah?",
      "Seberapa sering Anda melakukan aktivitas berkebun atau menyentuh tanah/pasir tanpa menggunakan sarung tangan pelindung?",
      "Seberapa sering Anda beraktivitas di area yang banyak terdapat populasi kucing liar yang tidak terawat kesehatannya?",
      "Seberapa sering Anda mengonsumsi air dari sumber yang tidak terjamin kebersihannya (seperti air sumur yang tidak dimasak mendidih)?",
    ],
  },
  {
    title: "Kondisi Kesehatan & Kewaspadaan",
    subtitle: "Kewaspadaan Khusus",
    questions: [
      "Seberapa sering Anda merasa mengalami gejala seperti demam ringan, nyeri otot, atau pembengkakan kelenjar getah bening yang tidak diketahui penyebabnya?",
      "Seberapa sering Anda mencari informasi mandiri mengenai pencegahan penyakit zoonosis (penyakit dari hewan) selama masa kehamilan atau persiapan kehamilan?",
      "Seberapa sering Anda memastikan kuku tangan Anda tetap pendek dan bersih untuk menghindari sisa tanah atau parasit yang menempel?",
      "Seberapa sering Anda mencuci tangan dengan sabun setelah beraktivitas di luar ruangan atau tempat umum sebelum menyentuh area wajah/mulut?",
      "Seberapa sering Anda melakukan konsultasi rutin ke dokter mengenai risiko infeksi parasit jika Anda memiliki hewan peliharaan di rumah?",
      "Seberapa sering Anda berbagi peralatan makan atau mencicipi makanan dari piring yang sama dengan orang lain tanpa memastikan kebersihan mereka?",
    ],
  },
];

export default function Skrining() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    nama: "",
    usia: "",
    jenisKelamin: "",
    statusKehamilan: "",
    wilayah: "",
  });
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = screeningData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0,
  );
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAnswer = (categoryIndex, questionIndex, value, numericScore) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setAnswers({ ...answers, [key]: { value, numericScore } });
  };

  const calculateScoreAndFinish = () => {
    let totalScore = 0;
    for (const key in answers) {
      totalScore += answers[key].numericScore;
    }
    setScore(totalScore);
    setIsFinished(true);
  };

  const nextStep = () => {
    if (step < screeningData.length) {
      window.scrollTo(0, 0);
      setStep(step + 1);
    } else {
      calculateScoreAndFinish();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      window.scrollTo(0, 0);
      setStep(step - 1);
    }
  };

  const getResultDetails = () => {
    if (score <= 6) {
      return {
        level: "Rendah",
        message: "Risiko rendah. Pertahankan kebersihan dan pola hidup sehat.",
        color: "bg-[#23A094]",
        icon: <CheckCircle2 size={48} strokeWidth={3} className="text-white" />,
      };
    } else if (score <= 12) {
      return {
        level: "Sedang",
        message:
          "Risiko sedang. Disarankan melakukan pemeriksaan darah (IgG & IgM).",
        color: "bg-[#FFC900]",
        icon: <Activity size={48} strokeWidth={3} className="text-black" />,
      };
    } else {
      return {
        level: "Tinggi",
        message:
          "Risiko tinggi. Segera konsultasi ke fasilitas kesehatan terdekat untuk pemeriksaan lanjutan.",
        color: "bg-[#FF90E8]",
        icon: <AlertCircle size={48} strokeWidth={3} className="text-black" />,
      };
    }
  };

  if (isFinished) {
    const resultDetails = getResultDetails();
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-500 pb-20 px-4">
        <div
          className={`w-32 h-32 border-4 border-black flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${resultDetails.color}`}
        >
          {resultDetails.icon}
        </div>
        <h2 className="text-4xl font-black text-black mb-2 uppercase tracking-tight text-center">
          HASIL SKRINING
        </h2>
        <p className="font-bold text-lg mb-6 uppercase">
          {profile.nama || "PENGGUNA ANONIM"}
        </p>
        <div className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="text-2xl font-black uppercase mb-2">
            Tingkat Risiko: {resultDetails.level}
          </h3>
          <p className="font-bold text-lg leading-relaxed">
            {resultDetails.message}
          </p>
          <div className="mt-4 border-t-4 border-black pt-4">
            <p className="font-bold uppercase text-sm">
              Skor Anda: {score} / {totalQuestions * 2}
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4 w-full max-w-lg">
          <button
            onClick={() => {
              setStep(0);
              setAnswers({});
              setIsFinished(false);
              setProfile({
                nama: "",
                usia: "",
                jenisKelamin: "",
                statusKehamilan: "",
                wilayah: "",
              });
            }}
            className="flex-1 bg-black text-white border-4 border-black font-black uppercase py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            ULANGI SKRINING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 md:pb-8">
      {step > 0 && (
        <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-4 z-30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black text-black uppercase tracking-widest">
              PROGRES SKRINING
            </span>
            <span className="text-xs font-black text-black">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-4 bg-slate-200 border-2 border-black overflow-hidden relative">
            <div
              className="h-full bg-[#23A094] border-r-2 border-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A1FF] rounded-full blur-[100px] pointer-events-none opacity-50"></div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black text-sm font-black uppercase mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Stethoscope size={18} strokeWidth={3} /> PROFIL SKRINING (OPSIONAL)
          </div>

          <h2 className="text-4xl font-black text-black mb-4 uppercase tracking-tight">
            DATA DIRI ANDA.
          </h2>
          <p className="text-black font-bold mb-8 border-l-4 border-black pl-4">
            Lengkapi data ini untuk mendapatkan analisis risiko yang lebih
            personal dan akurat.
          </p>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                  size={24}
                  strokeWidth={3}
                />
                <input
                  type="text"
                  name="nama"
                  value={profile.nama}
                  onChange={handleProfileChange}
                  className="w-full pl-14 pr-4 py-4 bg-[#f4f4f0] border-4 border-black focus:bg-white outline-none transition-all font-bold text-black placeholder-black/50"
                  placeholder="MASUKKAN NAMA ANDA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">
                  Usia
                </label>
                <input
                  type="number"
                  name="usia"
                  value={profile.usia}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-4 bg-[#f4f4f0] border-4 border-black focus:bg-white outline-none transition-all font-bold text-black placeholder-black/50"
                  placeholder="CONTOH: 24"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">
                  Jenis Kelamin
                </label>
                <select
                  name="jenisKelamin"
                  value={profile.jenisKelamin}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-4 bg-[#f4f4f0] border-4 border-black focus:bg-white outline-none transition-all font-bold text-black appearance-none uppercase"
                >
                  <option value="">PILIH JENIS KELAMIN...</option>
                  <option value="Laki-laki">LAKI-LAKI</option>
                  <option value="Perempuan">PEREMPUAN</option>
                </select>
              </div>
            </div>

            {profile.jenisKelamin === "Perempuan" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-black text-black uppercase mb-2">
                  Status Kehamilan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Tidak Hamil", "Sedang Hamil", "Merencanakan"].map(
                    (status) => (
                      <label
                        key={status}
                        className={`flex items-center justify-center py-4 px-4 border-4 cursor-pointer transition-all font-black text-sm uppercase ${
                          profile.statusKehamilan === status
                            ? "border-black bg-[#FF90E8] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1 translate-y-1"
                            : "border-black bg-white text-black hover:bg-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                        }`}
                      >
                        <input
                          type="radio"
                          name="statusKehamilan"
                          value={status}
                          checked={profile.statusKehamilan === status}
                          onChange={handleProfileChange}
                          className="hidden"
                        />
                        {status}
                      </label>
                    ),
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">
                Wilayah (Kota/Kabupaten)
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                  size={24}
                  strokeWidth={3}
                />
                <input
                  type="text"
                  name="wilayah"
                  value={profile.wilayah}
                  onChange={handleProfileChange}
                  className="w-full pl-14 pr-4 py-4 bg-[#f4f4f0] border-4 border-black focus:bg-white outline-none transition-all font-bold text-black placeholder-black/50"
                  placeholder="CONTOH: DENPASAR"
                />
              </div>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="mt-10 w-full bg-black hover:bg-[#23A094] text-white border-4 border-black font-black uppercase py-4 flex items-center justify-center gap-2 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            MULAI SKRINING SEKARANG <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      )}

      {step > 0 && step <= screeningData.length && (
        <div className="animate-in slide-in-from-right-8 duration-500">
          <div className="mb-8 bg-[#FFC900] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-sm font-black text-black tracking-widest uppercase mb-2 bg-white border-2 border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Kategori {step} dari {screeningData.length}
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight leading-none mt-2">
              {screeningData[step - 1].title}
            </h3>
            <p className="text-black font-bold mt-2 uppercase">
              {screeningData[step - 1].subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {screeningData[step - 1].questions.map((question, qIndex) => {
              const currentAnswer = answers[`${step - 1}-${qIndex}`]?.value;

              return (
                <div
                  key={qIndex}
                  className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
                >
                  <p className="text-lg md:text-xl font-black text-black mb-6 leading-relaxed">
                    {question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                    <button
                      onClick={() =>
                        handleAnswer(step - 1, qIndex, "Tidak pernah", 0)
                      }
                      className={`py-4 px-4 border-4 border-black font-black uppercase transition-all flex flex-col items-center justify-center gap-2 ${
                        currentAnswer === "Tidak pernah"
                          ? "bg-[#23A094] text-white shadow-none translate-x-1 translate-y-1"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100"
                      }`}
                    >
                      <ShieldAlert
                        size={24}
                        strokeWidth={3}
                        className={
                          currentAnswer === "Tidak pernah"
                            ? "text-white"
                            : "text-black"
                        }
                      />
                      TIDAK PERNAH
                    </button>
                    <button
                      onClick={() =>
                        handleAnswer(step - 1, qIndex, "Kadang-kadang", 1)
                      }
                      className={`py-4 px-4 border-4 border-black font-black uppercase transition-all flex flex-col items-center justify-center gap-2 ${
                        currentAnswer === "Kadang-kadang"
                          ? "bg-[#FFC900] text-black shadow-none translate-x-1 translate-y-1"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100"
                      }`}
                    >
                      <Activity
                        size={24}
                        strokeWidth={3}
                        className={
                          currentAnswer === "Kadang-kadang"
                            ? "text-black"
                            : "text-black"
                        }
                      />
                      KADANG
                    </button>
                    <button
                      onClick={() =>
                        handleAnswer(step - 1, qIndex, "Sering", 2)
                      }
                      className={`py-4 px-4 border-4 border-black font-black uppercase transition-all flex flex-col items-center justify-center gap-2 ${
                        currentAnswer === "Sering"
                          ? "bg-[#FF90E8] text-black shadow-none translate-x-1 translate-y-1"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100"
                      }`}
                    >
                      <AlertCircle
                        size={24}
                        strokeWidth={3}
                        className={
                          currentAnswer === "Sering"
                            ? "text-black"
                            : "text-black"
                        }
                      />
                      SERING
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-10">
            <button
              onClick={prevStep}
              className="px-6 py-4 border-4 border-black font-black uppercase bg-white text-black hover:bg-slate-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex justify-center items-center gap-2 order-2 sm:order-1 w-full sm:w-auto"
            >
              <ChevronLeft size={24} strokeWidth={3} /> KEMBALI
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-4 border-4 border-black font-black uppercase bg-black text-white hover:bg-[#C4A1FF] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex justify-center items-center gap-2 order-1 sm:order-2 w-full sm:w-auto"
            >
              {step === screeningData.length ? "LIHAT HASIL" : "SELANJUTNYA"}{" "}
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
