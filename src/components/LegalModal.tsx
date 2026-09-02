import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Mail, Phone, Calendar } from 'lucide-react';
import { CafeLegalConfig } from '../../cms/types/cmsTypes';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: 'privacy' | 'terms';
  onClose: () => void;
  legal?: CafeLegalConfig;
  brandingName: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab: initialTab,
  onClose,
  legal,
  brandingName,
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const businessName = legal?.businessLegalName || `${brandingName} Atelier`;
  const contactEmail = legal?.contactEmail || 'legal@kromacafe.id';
  const contactPhone = legal?.contactPhone || '+62 812-8890-4200';
  const lastUpdated = legal?.lastUpdatedDate || '2 September 2026';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--color-bg-main, #FBFBF9)',
          borderColor: 'var(--color-border, #E5E2DC)',
          color: 'var(--color-text-main, #141416)',
        }}
      >
        {/* Modal Top Header */}
        <div
          className="px-6 py-5 border-b flex items-center justify-between gap-4"
          style={{
            borderColor: 'var(--color-border, #E5E2DC)',
            backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
          }}
        >
          {/* Tabs switch */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="legal-tab-privacy"
              onClick={() => setTab('privacy')}
              className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 flex items-center space-x-1.5 ${
                tab === 'privacy'
                  ? 'bg-[#141416] text-[#FBFBF9]'
                  : 'bg-transparent text-[#737373] hover:text-[#141416]'
              }`}
              style={
                tab === 'privacy'
                  ? {
                      backgroundColor: 'var(--color-primary, #141416)',
                      color: 'var(--color-secondary, #FBFBF9)',
                    }
                  : undefined
              }
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              id="legal-tab-terms"
              onClick={() => setTab('terms')}
              className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 flex items-center space-x-1.5 ${
                tab === 'terms'
                  ? 'bg-[#141416] text-[#FBFBF9]'
                  : 'bg-transparent text-[#737373] hover:text-[#141416]'
              }`}
              style={
                tab === 'terms'
                  ? {
                      backgroundColor: 'var(--color-primary, #141416)',
                      color: 'var(--color-secondary, #FBFBF9)',
                    }
                  : undefined
              }
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            id="close-legal-modal-top"
            onClick={onClose}
            aria-label="Tutup Dialog Kebijakan"
            className="cursor-pointer p-2 text-[#737373] hover:text-[#141416] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed"
          style={{ color: 'var(--color-text-main, #141416)' }}
        >
          {tab === 'privacy' ? (
            /* PRIVACY POLICY CONTENT */
            <article className="space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--color-border, #E5E2DC)' }}>
                <span
                  className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#737373] block mb-1"
                  style={{ color: 'var(--color-text-muted, #737373)' }}
                >
                  Kebijakan Privasi
                </span>
                <h2 id="legal-modal-title" className="font-serif-display text-2xl sm:text-3xl font-normal">
                  Privacy Policy
                </h2>
                <div className="flex items-center space-x-2 mt-2 text-xs text-[#737373]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Terakhir Diperbarui: {lastUpdated}</span>
                  <span>•</span>
                  <span>{businessName}</span>
                </div>
              </div>

              <p className="text-[#4A4A4F] text-xs sm:text-sm" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                Terima kasih telah mengunjungi website resmi <strong>{businessName}</strong>. Privasi Anda adalah
                prioritas kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
                informasi pribadi yang Anda berikan melalui website ini.
              </p>

              {/* 1. Pengumpulan Informasi */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  1. Informasi yang Dikumpulkan Secara Sukarela
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela, terutama saat Anda mengisi formulir
                  reservasi meja atau menghubungi layanan pelanggan kami, meliputi:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  <li>Nama lengkap Anda</li>
                  <li>Nomor kontak telepon atau WhatsApp aktif</li>
                  <li>Alamat email (apabila disediakan untuk konfirmasi tertulis)</li>
                  <li>Data reservasi (tanggal kunjungan, jam sesi, area duduk pilihan, dan jumlah tamu)</li>
                </ul>
              </div>

              {/* 2. Penggunaan Data */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  2. Tujuan Penggunaan Data
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Data yang Anda berikan digunakan secara ketat hanya untuk:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 border text-xs" style={{ borderColor: 'var(--color-border, #E5E2DC)', backgroundColor: 'var(--color-bg-surface, #F5F4F0)' }}>
                    <CheckCircle2 className="w-4 h-4 mb-1.5 text-emerald-600" />
                    <strong>Reservasi Meja</strong>
                    <p className="mt-1 text-[#737373]">Memproses ketersediaan tempat dan konfirmasi kedatangan Anda.</p>
                  </div>
                  <div className="p-3 border text-xs" style={{ borderColor: 'var(--color-border, #E5E2DC)', backgroundColor: 'var(--color-bg-surface, #F5F4F0)' }}>
                    <CheckCircle2 className="w-4 h-4 mb-1.5 text-emerald-600" />
                    <strong>Komunikasi Resmi</strong>
                    <p className="mt-1 text-[#737373]">Menghubungi Anda perihal detail meja, keterlambatan, atau update kunjungan.</p>
                  </div>
                  <div className="p-3 border text-xs" style={{ borderColor: 'var(--color-border, #E5E2DC)', backgroundColor: 'var(--color-bg-surface, #F5F4F0)' }}>
                    <CheckCircle2 className="w-4 h-4 mb-1.5 text-emerald-600" />
                    <strong>Peningkatan Layanan</strong>
                    <p className="mt-1 text-[#737373]">Mengevaluasi kenyamanan operasional dan mutu racikan atelier kami.</p>
                  </div>
                </div>
              </div>

              {/* 3. Analytics & Cookies */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  3. Analytics & Cookies
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Website kami dapat menggunakan teknologi penyimpanan lokal (Local Storage) dan cookie analitik anonim
                  untuk memantau statistik kunjungan umum (seperti halaman yang diakses dan tipe perangkat) serta menyimpan
                  preferensi tema. Sistem ini tidak merekam profil sensitif atau aktivitas pelacakan lintas platform di luar
                  keperluan performa website {brandingName}.
                </p>
              </div>

              {/* 4. Perlindungan & Kerahasiaan */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  4. Perlindungan & Kerahasiaan Data
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Kami tidak pernah menjual, menyewakan, membagikan, atau memperdagangkan informasi kontak Anda kepada pihak
                  ketiga untuk kebutuhan iklan spam. Akses terhadap informasi pemesanan dibatasi hanya untuk staf concierge
                  dan manajemen cafe yang berwenang.
                </p>
              </div>

              {/* 5. Hubungi Kami */}
              <div
                className="p-4 border text-xs sm:text-sm space-y-2"
                style={{
                  borderColor: 'var(--color-border, #E5E2DC)',
                  backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
                }}
              >
                <span className="font-medium block text-[#141416]">Pertanyaan atau Permohonan Penghapusan Data:</span>
                <p className="text-[#737373]">
                  Apabila Anda ingin memperbarui atau menghapus informasi kontak Anda dari catatan reservasi kami, silakan
                  hubungi manajemen melalui:
                </p>
                <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs">
                  <span className="flex items-center space-x-1.5 text-[#141416]">
                    <Mail className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{contactEmail}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-[#141416]">
                    <Phone className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{contactPhone}</span>
                  </span>
                </div>
              </div>
            </article>
          ) : (
            /* TERMS OF SERVICE CONTENT */
            <article className="space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--color-border, #E5E2DC)' }}>
                <span
                  className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#737373] block mb-1"
                  style={{ color: 'var(--color-text-muted, #737373)' }}
                >
                  Syarat & Ketentuan Layanan
                </span>
                <h2 id="legal-modal-title" className="font-serif-display text-2xl sm:text-3xl font-normal">
                  Terms of Service
                </h2>
                <div className="flex items-center space-x-2 mt-2 text-xs text-[#737373]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Terakhir Diperbarui: {lastUpdated}</span>
                  <span>•</span>
                  <span>{businessName}</span>
                </div>
              </div>

              <p className="text-[#4A4A4F] text-xs sm:text-sm" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                Selamat datang di platform digital <strong>{businessName}</strong>. Dengan mengakses, membaca menu, atau
                mengajukan permohonan reservasi di website ini, Anda menyetujui syarat dan ketentuan layanan di bawah ini.
              </p>

              {/* 1. Penggunaan Website */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  1. Penggunaan Website
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Website ini disediakan sebagai sarana informasi profil atelier, galeri ruang, katalog menu, dan formulir
                  reservasi meja bagi calon tamu. Anda setuju untuk menggunakan website ini secara wajar, beritikad baik,
                  dan tidak melakukan upaya perusakan atau manipulasi data digital.
                </p>
              </div>

              {/* 2. Informasi Menu & Harga */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  2. Informasi Menu & Fluktuasi Harga
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Daftar menu, foto produk, deskripsi racikan kopi, serta harga yang tercantum di website adalah akurat pada
                  saat diperbarui. Namun, ketersediaan batch biji kopi mikro-lot musiman dan harga dapat berubah sewaktu-waktu
                  tanpa pemberitahuan sebelumnya bergantung pada musim panen dan pasokan dapur kami.
                </p>
              </div>

              {/* 3. Ketentuan Reservasi */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  3. Reservasi & Ketersediaan Meja
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Permohonan reservasi melalui website bergantung sepenuhnya pada ketersediaan meja pada jam yang Anda pilih.
                  Reservasi dinyatakan sah dan terkunci hanya setelah staf concierge kami mengirimkan konfirmasi resmi
                  melalui WhatsApp. Demi kenyamanan seluruh tamu, meja akan ditahan maksimal 15 menit dari jam reservasi yang
                  dijadwalkan.
                </p>
              </div>

              {/* 4. Tanggung Jawab Informasi Pengguna */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  4. Tanggung Jawab Informasi Pengguna
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Pengguna bertanggung jawab atas ketepatan dan kebenaran informasi nama, nomor kontak, serta detail alergi/kebutuhan
                  khusus yang dikirimkan melalui formulir reservasi agar tim barista dan staf kami dapat melayani dengan baik.
                </p>
              </div>

              {/* 5. Hak Pembaruan Website */}
              <div className="space-y-2">
                <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#141416]">
                  5. Hak Pembaruan Informasi Website
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F]" style={{ color: 'var(--color-text-muted, #4A4A4F)' }}>
                  Manajemen <strong>{businessName}</strong> berhak secara penuh untuk memperbarui, mengubah jam operasional,
                  memodifikasi tata letak konten, atau menyesuaikan ketentuan layanan ini sewaktu-waktu demi kelancaran standar
                  layanan atelier.
                </p>
              </div>

              {/* 6. Korespondensi & Layanan Pelanggan */}
              <div
                className="p-4 border text-xs sm:text-sm space-y-2"
                style={{
                  borderColor: 'var(--color-border, #E5E2DC)',
                  backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
                }}
              >
                <span className="font-medium block text-[#141416]">Pertanyaan Terkait Syarat & Ketentuan:</span>
                <p className="text-[#737373]">
                  Untuk pertanyaan atau permintaan klarifikasi terkait ketentuan layanan ini, silakan hubungi kami:
                </p>
                <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs">
                  <span className="flex items-center space-x-1.5 text-[#141416]">
                    <Mail className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{contactEmail}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-[#141416]">
                    <Phone className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{contactPhone}</span>
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div
          className="px-6 py-4 border-t flex items-center justify-between"
          style={{
            borderColor: 'var(--color-border, #E5E2DC)',
            backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
          }}
        >
          <span className="text-[11px] text-[#737373] tracking-wide">
            © {new Date().getFullYear()} {businessName}
          </span>
          <button
            type="button"
            id="close-legal-modal-bottom"
            onClick={onClose}
            className="cursor-pointer px-5 py-2 text-xs uppercase tracking-wider font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-primary, #141416)',
              color: 'var(--color-secondary, #FBFBF9)',
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
