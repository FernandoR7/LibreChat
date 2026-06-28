// AuthLayout customizado da Valore (substitui client/src/components/Auth/AuthLayout.tsx
// no fork do LibreChat). Recria o login split-screen do design Valore, mantendo
// toda a logica original de auth (erros, header, children, social login, footer).
import { ThemeSelector } from '@librechat/client';
import { TStartupConfig } from 'librechat-data-provider';
import { ErrorMessage } from '~/components/Auth/ErrorMessage';
import { TranslationKeys, useLocalize } from '~/hooks';
import SocialLoginRender from './SocialLoginRender';
import { Banner } from '../Banners';
import Footer from './Footer';

const PETROL = '#073b59';
const COPPER = '#c97533';
const IVORY = '#f4efe7';

const Simbolo = ({ size = 44 }: { size?: number }) => (
  <svg viewBox="0 0 512 512" style={{ width: size, height: size }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="72" fill="#f4efe7" />
    <path d="M128 148L252 250L170 287L170 359C170 386 194 410 221 410L221 439C177 439 141 403 141 359V179L128 148Z" fill="#073b59" />
    <path d="M384 178V344L260 452V352C260 300 287 261 333 233C354 220 371 202 384 178Z" fill="#073b59" />
    <path d="M214 430V338C214 292 236 258 281 230C321 205 345 175 356 133L411 133V185L374 185C361 208 344 226 321 240C286 263 268 291 268 330V430H214Z" fill="#c97533" />
    <path d="M194 421V334C194 279 220 239 266 211C304 188 327 162 338 122H366C354 175 327 215 285 240C244 264 222 298 222 345V421H194Z" fill="#d0c1a7" />
  </svg>
);

const Wordmark = ({ color = IVORY, size = 22 }: { color?: string; size?: number }) => (
  <span style={{ fontFamily: 'Sora, Manrope, sans-serif', fontWeight: 600, fontSize: size, letterSpacing: '0.14em', color }}>
    VALO<span style={{ color: COPPER }}>R</span>E
  </span>
);

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: TranslationKeys | null;
}) {
  const localize = useLocalize();
  const hasStartupConfigError = startupConfigError !== null && startupConfigError !== undefined;

  const DisplayError = () => {
    if (hasStartupConfigError) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize('com_auth_error_login_server')}</ErrorMessage>
        </div>
      );
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>
            {localize('com_auth_error_invalid_reset_token')}{' '}
            <a className="font-semibold hover:underline" style={{ color: COPPER }} href="/forgot-password">
              {localize('com_auth_click_here')}
            </a>{' '}
            {localize('com_auth_to_try_again')}
          </ErrorMessage>
        </div>
      );
    } else if (error != null && error) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize(error)}</ErrorMessage>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative flex min-h-screen" style={{ background: IVORY }}>
      <Banner />

      {/* Painel da marca (desktop) */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden md:flex"
        style={{ width: '48%', background: PETROL, color: IVORY, padding: '56px 60px', fontFamily: 'Manrope, Inter, sans-serif' }}
      >
        <svg
          viewBox="0 0 512 512"
          style={{ position: 'absolute', right: -120, bottom: -110, width: 620, height: 620, opacity: 0.1, pointerEvents: 'none' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M128 148L252 250L170 287L170 359C170 386 194 410 221 410L221 439C177 439 141 403 141 359V179L128 148Z" fill="#f4efe7" />
          <path d="M384 178V344L260 452V352C260 300 287 261 333 233C354 220 371 202 384 178Z" fill="#f4efe7" />
          <path d="M214 430V338C214 292 236 258 281 230C321 205 345 175 356 133L411 133V185L374 185C361 208 344 226 321 240C286 263 268 291 268 330V430H214Z" fill="#c97533" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 0% 0%, rgba(201,117,51,0.18), transparent 55%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Simbolo size={44} />
          <Wordmark />
        </div>

        <div style={{ position: 'relative', maxWidth: 430 }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px',
              border: '1px solid rgba(244,239,231,0.22)', borderRadius: 999, fontSize: 12,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d0c1a7', marginBottom: 26,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: COPPER }} />
            Consultor IA &middot; Planos de saude
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 40, lineHeight: 1.12, letterSpacing: '-0.01em', marginBottom: 18 }}>
            Do lead bruto a receita organizada.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(244,239,231,0.78)' }}>
            Cotacao, comparativo e atendimento com IA numa so operacao. Entre para continuar de onde voce parou.
          </p>
        </div>

        <div style={{ position: 'relative', fontSize: 13, color: 'rgba(244,239,231,0.55)' }}>
          Valore &middot; Consultoria em planos de saude empresarial
        </div>
      </div>

      {/* Formulario */}
      <main className="relative flex flex-1 items-center justify-center" style={{ background: IVORY, padding: '40px 28px' }}>
        <div className="w-full" style={{ maxWidth: 400 }}>
          <div className="mb-7 flex items-center gap-3 md:hidden">
            <Simbolo size={38} />
            <Wordmark color={PETROL} size={20} />
          </div>

          <DisplayError />

          {!hasStartupConfigError && !isFetching && header && (
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 29, letterSpacing: '-0.01em', color: PETROL, marginBottom: 18 }}>
              {header}
            </h2>
          )}

          {children}

          {!pathname.includes('2fa') && (pathname.includes('login') || pathname.includes('register')) && (
            <SocialLoginRender startupConfig={startupConfig} />
          )}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>
      <Footer startupConfig={startupConfig} />
    </div>
  );
}

export default AuthLayout;
