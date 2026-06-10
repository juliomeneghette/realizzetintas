import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── CONFIGURAÇÃO SUPABASE ───────────────────────────────────────────────────
// Substitua pelas suas credenciais do projeto no Supabase
const SUPABASE_URL = "https://dfkgslzanietysmapimp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DOSzC8kqn8gHu2cjz9B4EA_XfWEzMsj";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Palette & helpers ────────────────────────────────────────────────────────
const C = {
  navy: "#1A2E5A",
  navyLight: "#243d78",
  green: "#27AE60",
  greenLight: "#2ECC71",
  gold: "#F39C12",
  goldLight: "#F5B942",
  white: "#FFFFFF",
  offWhite: "#F0F4F8",
  gray: "#8395A7",
  grayLight: "#DDE3EA",
  danger: "#E74C3C",
  text: "#1A2E5A",
};

const fmt = (n) => Number(n).toLocaleString("pt-BR");
const fmtCPF = (v) => v.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    gift: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    paint: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M12 11v8"/><path d="M8 19c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2"/></svg>,
    params: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/><circle cx="4" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M5 3H3v5a5 5 0 0 0 5 5 5 5 0 0 0 5-5V3H5z"/><path d="M19 3h-4v5a5 5 0 0 0 5 5V3h-1z"/></svg>,
  };
  return icons[name] || null;
};

// ─── Shared UI components ─────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const cfg = status === "ativo"
    ? { bg: "#D5F5E3", color: "#1E8449", label: "Ativo" }
    : { bg: "#FDEDEC", color: "#C0392B", label: "Inativo" };
  return <span style={{ background: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{cfg.label}</span>;
};

const Card = ({ children, style }) => (
  <div style={{ background: C.white, borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 10px rgba(26,46,90,0.08)", ...style }}>{children}</div>
);

const ProgressBar = ({ value, max, color = C.green, height = 10 }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: C.grayLight, borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
};

const StatCard = ({ label, value, icon, color = C.navy, sub }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={icon} size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.gray, marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
    </div>
  </Card>
);

const Input = ({ label, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{label}</label>}
    <input {...props} style={{
      border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "10px 14px",
      fontSize: 14, color: C.text, outline: "none", background: C.white,
      transition: "border-color 0.2s", ...props.style
    }}
      onFocus={e => e.target.style.borderColor = C.green}
      onBlur={e => e.target.style.borderColor = C.grayLight}
    />
  </div>
);

const Btn = ({ children, onClick, variant = "primary", style, disabled }) => {
  const styles = {
    primary: { background: C.green, color: C.white },
    secondary: { background: C.offWhite, color: C.navy },
    danger: { background: C.danger, color: C.white },
    gold: { background: C.gold, color: C.white },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], border: "none", borderRadius: 8, padding: "10px 20px",
      fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1, transition: "opacity 0.2s, transform 0.1s",
      display: "flex", alignItems: "center", gap: 6, ...style
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >{children}</button>
  );
};

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [cpf, setCpf] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("painter");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCpf = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    setCpf(d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
  };

  const doLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (role === "admin") {
        if (cpf === "admin" && pass === "realizze2024") { 
          onLogin({ role: "admin" }); 
          return; 
        }
        setError("Credenciais de administrador inválidas."); 
        return;
      }
      
      const { data: painter, error: fetchError } = await supabase
        .from("painters")
        .select("*")
        .eq("cpf", cpf)
        .single();

      if (fetchError || !painter) { 
        setError("CPF não encontrado. Você precisa ser convidado."); 
        return; 
      }
      if (painter.status === "inativo") { 
        setError("Cadastro inativo. Contate a Realizze Tintas."); 
        return; 
      }
      if (pass !== "1234") { 
        setError("Senha incorreta."); 
        return; 
      }
      onLogin({ role: "painter", painter });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 50%, #1a5276 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.12)", borderRadius: 24, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
            <img
  src="/public/logo.jpg"
  alt="Realizze Tintas"
  style={{
    width: 60,
    height: 60,
    objectFit: "contain"
  }}
/>
          </div>
          <div style={{ color: C.white, fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>Pintores Parceiros</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>Realizze Tintas</div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
            {["painter", "admin"].map(r => (
              <button key={r} onClick={() => { setRole(r); setError(""); }} style={{
                flex: 1, padding: "8px 0", borderRadius: 7, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                background: role === r ? C.white : "transparent", color: role === r ? C.navy : "rgba(255,255,255,0.7)"
              }}>{r === "painter" ? "🎨 Pintor" : "⚙️ Administrador"}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                {role === "admin" ? "Usuário" : "CPF"}
              </label>
              <input value={cpf} onChange={e => role === "painter" ? handleCpf(e.target.value) : setCpf(e.target.value)}
                placeholder={role === "admin" ? "admin" : "000.000.000-00"}
                style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "12px 14px", fontSize: 15, color: C.white, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Senha</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••"
                onKeyDown={e => e.key === "Enter" && doLogin()}
                style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "12px 14px", fontSize: 15, color: C.white, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {error && <div style={{ color: "#FF7675", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</div>}
            <Btn onClick={doLogin} disabled={loading} style={{ width: "100%", padding: 14, marginTop: 10, justifyContent: "center", fontSize: 16 }}>
              {loading ? "Entrando..." : "Entrar no Portal"}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ painters, transactions, goals }) {
  const activeCount = painters.filter(p => p.status === "ativo").length;
  const totalPoints = painters.reduce((s, p) => s + p.points, 0);
  const totalSales = painters.reduce((s, p) => s + p.sales, 0);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 24 }}>Visão Geral</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 32 }}>
        <StatCard label="Pintores Ativos" value={activeCount} icon="users" color={C.green} />
        <StatCard label="Pontos em Circulação" value={fmt(totalPoints)} icon="star" color={C.gold} />
        <StatCard label="Vendas Totais" value={fmt(totalSales)} icon="paint" color={C.navy} sub="litros acumulados" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>Últimas Movimentações</div>
            <div style={{ fontSize: 12, color: C.gray }}>Recentes</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {transactions.slice(0, 6).map(t => {
              const p = painters.find(x => x.id === t.painter_id);
              return (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${C.offWhite}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: t.points > 0 ? C.green + "10" : C.danger + "10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {t.points > 0 ? "📈" : "🎁"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p?.name || "Pintor"}</div>
                    <div style={{ fontSize: 12, color: C.gray }}>{t.desc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: t.points > 0 ? C.green : C.danger }}>{t.points > 0 ? "+" : ""}{t.points}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{t.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, color: C.navy, fontSize: 16, marginBottom: 20 }}>Progresso Mensal</div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Vendas ({goals.month})</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{Math.round((goals.sales_done / goals.sales_target) * 100)}%</span>
            </div>
            <ProgressBar value={goals.sales_done} max={goals.sales_target} color={C.green} />
            <div style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>{fmt(goals.sales_done)} de {fmt(goals.sales_target)} litros</div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Indicações</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{Math.round((goals.indications_done / goals.indications_target) * 100)}%</span>
            </div>
            <ProgressBar value={goals.indications_done} max={goals.indications_target} color={C.gold} />
            <div style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>{fmt(goals.indications_done)} de {fmt(goals.indications_target)} obras</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── ADMIN PAINTERS ───────────────────────────────────────────────────────────
function AdminPainters({ painters, setPainters, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", cpf: "", phone: "", city: "" });
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!form.name || !form.cpf) return;
    setLoading(true);
    try {
      const newPainter = { 
        ...form, 
        status: "ativo", 
        points: 0, 
        sales: 0, 
        indications: 0, 
        invited: new Date().toISOString().split("T")[0] 
      };
      const { data, error } = await supabase.from("painters").insert([newPainter]).select();
      if (error) throw error;
      setPainters([...painters, data[0]]);
      setShowModal(false);
      setForm({ name: "", cpf: "", phone: "", city: "" });
      showToast("Pintor cadastrado com sucesso!");
    } catch (e) {
      showToast("Erro ao cadastrar pintor", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (p) => {
    const newStatus = p.status === "ativo" ? "inativo" : "ativo";
    const { error } = await supabase.from("painters").update({ status: newStatus }).eq("id", p.id);
    if (error) {
      showToast("Erro ao atualizar status", "error");
      return;
    }
    setPainters(painters.map(x => x.id === p.id ? { ...x, status: newStatus } : x));
    showToast(`Pintor ${newStatus === "ativo" ? "ativado" : "desativado"}.`);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: 0 }}>Gestão de Pintores</h2>
        <Btn onClick={() => setShowModal(true)}><Icon name="plus" size={16} color={C.white} /> Novo Parceiro</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: C.offWhite, borderBottom: `1px solid ${C.grayLight}` }}>
              {["Pintor", "Cidade", "Status", "Vendas", "Pontos", "Ações"].map(h => (
                <th key={h} style={{ padding: "16px 20px", fontSize: 13, color: C.gray, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {painters.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${C.offWhite}` }}>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: C.gray }}>{p.cpf}</div>
                </td>
                <td style={{ padding: "16px 20px", fontSize: 14, color: C.text }}>{p.city}</td>
                <td style={{ padding: "16px 20px" }}><Badge status={p.status} /></td>
                <td style={{ padding: "16px 20px", fontSize: 14, color: C.text }}>{fmt(p.sales)} L</td>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 800, color: C.gold }}>{fmt(p.points)} pts</div>
                </td>
                <td style={{ padding: "16px 20px" }}>
                  <Btn onClick={() => toggleStatus(p)} variant="secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                    {p.status === "ativo" ? "Desativar" : "Ativar"}
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 450 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 18, marginBottom: 20 }}>Cadastrar Novo Pintor</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input label="Nome Completo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" />
                <Input label="Telefone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(00) 00000-0000" />
              </div>
              <Input label="Cidade" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Btn onClick={() => setShowModal(false)} variant="secondary" style={{ flex: 1 }}>Cancelar</Btn>
              <Btn onClick={add} disabled={loading} style={{ flex: 1 }}>{loading ? "Salvando..." : "Convidar Pintor"}</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN TRANSACTIONS ───────────────────────────────────────────────────────
function AdminTransactions({ transactions, painters, setTransactions, showToast, params }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ painter_id: "", type: "venda", value: "", desc: "" });
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!form.painter_id || !form.value) return;
    setLoading(true);
    try {
      const p = painters.find(x => x.id === parseInt(form.painter_id));
      let pts = 0;
      let updateData = {};

      if (form.type === "venda") {
        const liters = parseFloat(form.value);
        if (liters >= params.min_purchase_liters) {
          pts = Math.round(liters * params.points_per_liter);
          if (liters >= params.bonus_threshold) pts = Math.round(pts * params.bonus_multiplier);
        }
        updateData = { sales: (p.sales || 0) + liters, points: (p.points || 0) + pts };
      } else if (form.type === "indicacao") {
        pts = params.points_per_indication;
        updateData = { indications: (p.indications || 0) + 1, points: (p.points || 0) + pts };
      }

      const newT = {
        painter_id: p.id,
        type: form.type,
        desc: form.desc || (form.type === "venda" ? `Venda de ${form.value}L` : "Indicação de Obra"),
        points: pts,
        date: new Date().toISOString().split("T")[0]
      };

      const { data, error: tError } = await supabase.from("transactions").insert([newT]).select();
      if (tError) throw tError;

      const { error: pError } = await supabase.from("painters").update(updateData).eq("id", p.id);
      if (pError) throw pError;

      setTransactions([data[0], ...transactions]);
      setShowModal(false);
      setForm({ painter_id: "", type: "venda", value: "", desc: "" });
      showToast("Lançamento realizado com sucesso!");
    } catch (e) {
      showToast("Erro ao processar lançamento", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: 0 }}>Lançamentos de Pontos</h2>
        <Btn onClick={() => setShowModal(true)}><Icon name="plus" size={16} color={C.white} /> Novo Lançamento</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: C.offWhite, borderBottom: `1px solid ${C.grayLight}` }}>
              {["Data", "Pintor", "Tipo", "Descrição", "Pontos"].map(h => (
                <th key={h} style={{ padding: "16px 20px", fontSize: 13, color: C.gray, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => {
              const p = painters.find(x => x.id === t.painter_id);
              return (
                <tr key={t.id} style={{ borderBottom: `1px solid ${C.offWhite}` }}>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: C.gray }}>{t.date}</td>
                  <td style={{ padding: "16px 20px", fontWeight: 700, color: C.text }}>{p?.name || "---"}</td>
                  <td style={{ padding: "16px 20px", textTransform: "capitalize", fontSize: 13 }}>{t.type}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: C.text }}>{t.desc}</td>
                  <td style={{ padding: "16px 20px", fontWeight: 800, color: t.points > 0 ? C.green : C.danger }}>
                    {t.points > 0 ? "+" : ""}{fmt(t.points)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 450 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 18, marginBottom: 20 }}>Novo Lançamento</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>Selecionar Pintor</label>
                <select value={form.painter_id} onChange={e => setForm({ ...form, painter_id: e.target.value })}
                  style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none" }}>
                  <option value="">Selecione...</option>
                  {painters.map(p => <option key={p.id} value={p.id}>{p.name} ({p.city})</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>Tipo</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none" }}>
                    <option value="venda">Venda (Litros)</option>
                    <option value="indicacao">Indicação</option>
                  </select>
                </div>
                <Input label={form.type === "venda" ? "Quantidade (L)" : "Qtd de Obras"} type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
              </div>
              <Input label="Descrição (opcional)" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Ex: Obra Residencial Centro" />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Btn onClick={() => setShowModal(false)} variant="secondary" style={{ flex: 1 }}>Cancelar</Btn>
              <Btn onClick={add} disabled={loading} style={{ flex: 1 }}>{loading ? "Processando..." : "Lançar Pontos"}</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN GOALS ──────────────────────────────────────────────────────────────
function AdminGoals({ goals, setGoals, showToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(goals);

  const save_ = async () => {
    const { error } = await supabase.from("goals").update(form).eq("id", goals.id);
    if (error) {
      showToast("Erro ao salvar metas", "error");
      return;
    }
    setGoals(form);
    setEditing(false);
    showToast("Metas atualizadas!");
  };

  const salesPct = Math.min(100, Math.round((goals.sales_done / goals.sales_target) * 100));
  const indPct = Math.min(100, Math.round((goals.indications_done / goals.indications_target) * 100));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: 0 }}>Metas Mensais</h2>
        {!editing && <Btn onClick={() => setEditing(true)}>Editar Metas</Btn>}
      </div>
      {editing ? (
        <Card>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 16 }}>Editar — {form.month}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Meta de Vendas (litros)" type="number" value={form.sales_target} onChange={e => setForm({ ...form, sales_target: +e.target.value })} />
            <Input label="Vendas Realizadas" type="number" value={form.sales_done} onChange={e => setForm({ ...form, sales_done: +e.target.value })} />
            <Input label="Meta de Indicações" type="number" value={form.indications_target} onChange={e => setForm({ ...form, indications_target: +e.target.value })} />
            <Input label="Indicações Realizadas" type="number" value={form.indications_done} onChange={e => setForm({ ...form, indications_done: +e.target.value })} />
            <Input label="Mês de Referência" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} style={{ gridColumn: "1/-1" }} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={() => setEditing(false)} variant="secondary">Cancelar</Btn>
            <Btn onClick={save_}>Salvar Metas</Btn>
          </div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { label: "Vendas de Tinta", unit: "litros", done: goals.sales_done, target: goals.sales_target, pct: salesPct, color: C.green, icon: "🛒" },
            { label: "Indicações Aprovadas", unit: "obras", done: goals.indications_done, target: goals.indications_target, pct: indPct, color: C.gold, icon: "🔗" },
          ].map(g => (
            <Card key={g.label}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{g.icon}</div>
              <div style={{ fontWeight: 700, color: C.navy, fontSize: 16, marginBottom: 4 }}>{g.label}</div>
              <div style={{ fontSize: 13, color: C.gray, marginBottom: 12 }}>{goals.month}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: g.pct >= 100 ? C.green : C.text, marginBottom: 8 }}>{g.pct}%</div>
              <ProgressBar value={g.done} max={g.target} color={g.color} height={12} />
              <div style={{ fontSize: 13, color: C.gray, marginTop: 8 }}>{fmt(g.done)} de {fmt(g.target)} {g.unit}</div>
              {g.pct >= 100 && <div style={{ fontSize: 13, color: C.green, fontWeight: 700, marginTop: 6 }}>✅ Meta atingida!</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ADMIN REWARDS ────────────────────────────────────────────────────────────
function AdminRewards({ rewards, setRewards, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", points: "", icon: "🎁" });
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!form.name || !form.points) return;
    setLoading(true);
    try {
      const newReward = { name: form.name, points: parseInt(form.points), icon: form.icon };
      const { data, error } = await supabase.from("rewards").insert([newReward]).select();
      if (error) throw error;
      setRewards([...rewards, data[0]]);
      setShowModal(false);
      setForm({ name: "", points: "", icon: "🎁" });
      showToast("Recompensa adicionada!");
    } catch (e) {
      showToast("Erro ao adicionar recompensa", "error");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    const { error } = await supabase.from("rewards").delete().eq("id", id);
    if (error) {
      showToast("Erro ao remover recompensa", "error");
      return;
    }
    setRewards(rewards.filter(r => r.id !== id));
    showToast("Recompensa removida.");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: 0 }}>Catálogo de Recompensas</h2>
        <Btn onClick={() => setShowModal(true)}><Icon name="plus" size={16} color={C.white} /> Nova Recompensa</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {rewards.map(r => (
          <Card key={r.id} style={{ textAlign: "center", position: "relative" }}>
            <button onClick={() => remove(r.id)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: C.gray, padding: 4 }}>
              <Icon name="x" size={16} color={C.gray} />
            </button>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{r.icon}</div>
            <div style={{ fontWeight: 700, color: C.text, marginBottom: 6 }}>{r.name}</div>
            <div style={{ background: C.gold + "20", color: C.gold, borderRadius: 20, padding: "4px 14px", display: "inline-block", fontWeight: 800, fontSize: 14 }}>
              {fmt(r.points)} pts
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 380 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 18, marginBottom: 20 }}>Nova Recompensa</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input label="Nome da Recompensa" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ex: Vale Compras R$50" />
              <Input label="Pontos Necessários" type="number" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} placeholder="Ex: 500" />
              <Input label="Emoji/Ícone" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="🎁" />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Btn onClick={() => setShowModal(false)} variant="secondary" style={{ flex: 1 }}>Cancelar</Btn>
              <Btn onClick={add} disabled={loading} style={{ flex: 1 }}>{loading ? "Salvando..." : "Adicionar"}</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PARAMS ─────────────────────────────────────────────────────────────
function AdminParams({ params, setParams, showToast }) {
  const [form, setForm] = useState(params);
  const [loading, setLoading] = useState(false);

  const save_ = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("params").update(form).eq("id", params.id);
      if (error) throw error;
      setParams(form);
      showToast("Parâmetros salvos!");
    } catch (e) {
      showToast("Erro ao salvar parâmetros", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: "0 0 20px" }}>Parâmetros de Arrecadação</h2>
      <Card style={{ maxWidth: 560 }}>
        <div style={{ fontWeight: 700, color: C.navy, marginBottom: 16, fontSize: 15 }}>⚙️ Regras de Pontuação</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.offWhite, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: 600, color: C.navy, marginBottom: 4 }}>Pontos por litro vendido</div>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>Quantos pontos o pintor ganha por litro de tinta vendido</div>
            <input type="number" value={form.points_per_liter} onChange={e => setForm({ ...form, points_per_liter: +e.target.value })}
              style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, width: 100, color: C.text, outline: "none" }} />
            <span style={{ marginLeft: 8, color: C.gray, fontSize: 13 }}>pts / litro</span>
          </div>
          <div style={{ background: C.offWhite, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: 600, color: C.navy, marginBottom: 4 }}>Pontos por indicação aprovada</div>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>Pontos concedidos quando uma obra indicada pelo pintor é aprovada/concluída</div>
            <input type="number" value={form.points_per_indication} onChange={e => setForm({ ...form, points_per_indication: +e.target.value })}
              style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, width: 100, color: C.text, outline: "none" }} />
            <span style={{ marginLeft: 8, color: C.gray, fontSize: 13 }}>pts / indicação</span>
          </div>
          <div style={{ background: C.offWhite, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: 600, color: C.navy, marginBottom: 4 }}>Compra mínima para ganhar pontos</div>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>Volume mínimo de compra que gera pontuação</div>
            <input type="number" value={form.min_purchase_liters} onChange={e => setForm({ ...form, min_purchase_liters: +e.target.value })}
              style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, width: 100, color: C.text, outline: "none" }} />
            <span style={{ marginLeft: 8, color: C.gray, fontSize: 13 }}>litros mínimos</span>
          </div>
          <div style={{ background: `${C.gold}18`, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${C.gold}40` }}>
            <div style={{ fontWeight: 600, color: C.gold, marginBottom: 4 }}>⭐ Multiplicador de Bônus</div>
            <div style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>Quando venda supera o threshold, aplica o multiplicador nos pontos</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div>
                <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Multiplicador</label>
                <input type="number" step="0.1" value={form.bonus_multiplier} onChange={e => setForm({ ...form, bonus_multiplier: +e.target.value })}
                  style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, width: 80, color: C.text, outline: "none" }} />
                <span style={{ marginLeft: 6, color: C.gray, fontSize: 13 }}>×</span>
              </div>
              <div>
                <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Acima de (litros)</label>
                <input type="number" value={form.bonus_threshold} onChange={e => setForm({ ...form, bonus_threshold: +e.target.value })}
                  style={{ border: `1.5px solid ${C.grayLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 15, width: 90, color: C.text, outline: "none" }} />
                <span style={{ marginLeft: 6, color: C.gray, fontSize: 13 }}>L</span>
              </div>
            </div>
          </div>
        </div>
        <Btn onClick={save_} disabled={loading} style={{ marginTop: 20 }}>{loading ? "Salvando..." : "Salvar Parâmetros"}</Btn>
      </Card>
    </div>
  );
}

// ─── ADMIN VIEW ───────────────────────────────────────────────────────────────
const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "painters", label: "Pintores", icon: "users" },
  { id: "transactions", label: "Lançamentos", icon: "paint" },
  { id: "goals", label: "Metas", icon: "target" },
  { id: "rewards", label: "Recompensas", icon: "gift" },
  { id: "params", label: "Parâmetros", icon: "params" },
];

function AdminView({ onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [painters, setPainters] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [params, setParams] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [p, t, g, r, pr] = await Promise.all([
      supabase.from("painters").select("*").order("name"),
      supabase.from("transactions").select("*").order("date", { ascending: false }),
      supabase.from("goals").select("*").limit(1).single(),
      supabase.from("rewards").select("*").order("points"),
      supabase.from("params").select("*").limit(1).single(),
    ]);
    setPainters(p.data || []);
    setTransactions(t.data || []);
    setGoals(g.data);
    setRewards(r.data || []);
    setParams(pr.data);
    setLoading(false);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", color: C.navy }}>Carregando dados...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.offWhite, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ width: 220, background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ color: C.white, fontWeight: 900, fontSize: 16 }}>🎨 Realizze Tintas</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>Painel Administrativo</div>
        </div>
        <nav style={{ padding: "12px 0", flex: 1 }}>
          {ADMIN_NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 20px",
              background: tab === n.id ? "rgba(255,255,255,0.12)" : "transparent",
              border: "none", cursor: "pointer", color: tab === n.id ? C.white : "rgba(255,255,255,0.55)",
              fontWeight: tab === n.id ? 700 : 500, fontSize: 14, textAlign: "left", borderLeft: tab === n.id ? `3px solid ${C.greenLight}` : "3px solid transparent",
              transition: "all 0.15s",
            }}>
              <Icon name={n.icon} size={16} color={tab === n.id ? C.white : "rgba(255,255,255,0.55)"} />
              {n.label}
            </button>
          ))}
        </nav>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 16px 24px", padding: "10px 16px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600 }}>
          <Icon name="logout" size={16} color="rgba(255,255,255,0.55)" />
          Sair do Painel
        </button>
      </div>

      <div style={{ flex: 1, padding: "28px 32px", overflow: "auto" }}>
        {tab === "dashboard" && <AdminDashboard painters={painters} transactions={transactions} goals={goals} />}
        {tab === "painters" && <AdminPainters painters={painters} setPainters={setPainters} showToast={showToast} />}
        {tab === "transactions" && <AdminTransactions transactions={transactions} painters={painters} setTransactions={setTransactions} showToast={showToast} params={params} />}
        {tab === "goals" && <AdminGoals goals={goals} setGoals={setGoals} showToast={showToast} />}
        {tab === "rewards" && <AdminRewards rewards={rewards} setRewards={setRewards} showToast={showToast} />}
        {tab === "params" && <AdminParams params={params} setParams={setParams} showToast={showToast} />}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.type === "success" ? C.green : C.danger, color: C.white, borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 200, display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "success" ? <Icon name="check" size={16} color={C.white} /> : <Icon name="x" size={16} color={C.white} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── PAINTER VIEW ─────────────────────────────────────────────────────────────
function PainterView({ painter: initialPainter, onLogout }) {
  const [tab, setTab] = useState("home");
  const [painter, setPainter] = useState(initialPainter);
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [toast, setToast] = useState(null);
  const [redeemModal, setRedeemModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPainterData();
  }, []);

  const fetchPainterData = async () => {
    setLoading(true);
    const [t, r, p] = await Promise.all([
      supabase.from("transactions").select("*").eq("painter_id", painter.id).order("date", { ascending: false }),
      supabase.from("rewards").select("*").order("points"),
      supabase.from("painters").select("*").eq("id", painter.id).single()
    ]);
    setTransactions(t.data || []);
    setRewards(r.data || []);
    if (p.data) setPainter(p.data);
    setLoading(false);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const redeem = async (reward) => {
    if (painter.points < reward.points) { 
      showToast("Pontos insuficientes.", "error"); 
      return; 
    }
    
    try {
      const newPoints = painter.points - reward.points;
      const { error: pError } = await supabase.from("painters").update({ points: newPoints }).eq("id", painter.id);
      if (pError) throw pError;

      const newT = { 
        painter_id: painter.id, 
        type: "resgate", 
        desc: `Resgate - ${reward.name}`, 
        points: -reward.points, 
        date: new Date().toISOString().split("T")[0] 
      };
      const { data: tData, error: tError } = await supabase.from("transactions").insert([newT]).select();
      if (tError) throw tError;

      setPainter({ ...painter, points: newPoints });
      setTransactions([tData[0], ...transactions]);
      setRedeemModal(null);
      showToast(`Resgate de "${reward.name}" solicitado! Aguarde a equipe Realizze.`);
    } catch (e) {
      showToast("Erro ao processar resgate", "error");
    }
  };

  const PAINTER_NAV = [
    { id: "home", label: "Início", icon: "home" },
    { id: "points", label: "Meus Pontos", icon: "star" },
    { id: "redeem", label: "Resgatar", icon: "gift" },
    { id: "history", label: "Histórico", icon: "chart" },
  ];

  const pointsGained = transactions.filter(t => t.points > 0).reduce((s, t) => s + t.points, 0);
  const pointsSpent = transactions.filter(t => t.points < 0).reduce((s, t) => s + Math.abs(t.points), 0);

  if (loading) return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", color: C.navy }}>Carregando seu portal...</div>;

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: C.navy, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ color: C.white, fontWeight: 900, fontSize: 16 }}>🎨 Realizze Tintas</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{painter.name.split(" ")[0]}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Pintor Parceiro</div>
          </div>
          <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "rgba(255,255,255,0.7)" }}>
            <Icon name="logout" size={16} color="rgba(255,255,255,0.7)" />
          </button>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.grayLight}`, display: "flex", zIndex: 50, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        {PAINTER_NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            flex: 1, padding: "10px 4px 8px", background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: tab === n.id ? C.green : C.gray, borderTop: tab === n.id ? `2px solid ${C.green}` : "2px solid transparent",
          }}>
            <Icon name={n.icon} size={20} color={tab === n.id ? C.green : C.gray} />
            <span style={{ fontSize: 10, fontWeight: tab === n.id ? 700 : 500 }}>{n.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 20px 80px" }}>
        {tab === "home" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>Olá, {painter.name.split(" ")[0]}! 👋</div>
              <div style={{ color: C.gray, fontSize: 14 }}>Bem-vindo ao Programa Pintores Parceiros</div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`, borderRadius: 18, padding: "24px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", right: 20, bottom: -30, width: 80, height: 80, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Seus Pontos</div>
              <div style={{ color: C.white, fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>{fmt(painter.points)}</div>
              <div style={{ color: C.goldLight, fontSize: 14, fontWeight: 600 }}>pts disponíveis</div>
              <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
                <div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Vendas</div><div style={{ color: C.white, fontWeight: 700 }}>{painter.sales}</div></div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
                <div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Indicações</div><div style={{ color: C.white, fontWeight: 700 }}>{painter.indications}</div></div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
                <div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Cidade</div><div style={{ color: C.white, fontWeight: 700 }}>{painter.city}</div></div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>⭐</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{fmt(pointsGained)}</div>
                <div style={{ fontSize: 12, color: C.gray }}>Pontos ganhos</div>
              </Card>
              <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>🎁</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.danger }}>{fmt(pointsSpent)}</div>
                <div style={{ fontSize: 12, color: C.gray }}>Pontos resgatados</div>
              </Card>
            </div>

            <Card>
              <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 15 }}>Como ganhar pontos?</div>
              {[
                { icon: "🛒", title: "Venda Tinta Realizze", desc: "Ganhe pontos por cada litro vendido" },
                { icon: "🔗", title: "Indique uma obra", desc: "Ganhe pontos quando sua indicação for aprovada" },
                { icon: "⭐", title: "Bônus por volume", desc: "Multiplique seus pontos em grandes volumes" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.grayLight}` : "none" }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: C.gray }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {tab === "points" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 20 }}>Meus Pontos</h2>
            <div style={{ background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 100%)`, borderRadius: 18, padding: "24px 22px", marginBottom: 20, textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>Saldo Atual</div>
              <div style={{ color: C.white, fontSize: 52, fontWeight: 900, lineHeight: 1.1 }}>{fmt(painter.points)}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>pontos</div>
            </div>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 15 }}>Próximas recompensas</div>
              {rewards.filter(r => r.points > painter.points).slice(0, 3).map(r => {
                const missing = r.points - painter.points;
                return (
                  <div key={r.id} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{r.icon} {r.name}</div>
                      <div style={{ fontSize: 12, color: C.gray }}>faltam {fmt(missing)} pts</div>
                    </div>
                    <ProgressBar value={painter.points} max={r.points} color={C.gold} />
                  </div>
                );
              })}
              {rewards.filter(r => r.points > painter.points).length === 0 && (
                <div style={{ textAlign: "center", color: C.green, fontWeight: 700, padding: 10 }}>🎉 Você pode resgatar qualquer recompensa!</div>
              )}
            </Card>
          </div>
        )}

        {tab === "redeem" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 6 }}>Resgatar Recompensas</h2>
            <div style={{ color: C.gray, fontSize: 13, marginBottom: 20 }}>Seus pontos: <strong style={{ color: C.gold }}>{fmt(painter.points)} pts</strong></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {rewards.map(r => {
                const can = painter.points >= r.points;
                return (
                  <Card key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, opacity: can ? 1 : 0.6 }}>
                    <div style={{ fontSize: 36, flexShrink: 0 }}>{r.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{r.name}</div>
                      <div style={{ color: C.gold, fontWeight: 800, fontSize: 14, marginTop: 2 }}>{fmt(r.points)} pts</div>
                      {!can && <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>Faltam {fmt(r.points - painter.points)} pts</div>}
                    </div>
                    <Btn onClick={() => can && setRedeemModal(r)} variant={can ? "gold" : "secondary"} disabled={!can} style={{ flexShrink: 0, fontSize: 13, padding: "8px 14px" }}>
                      {can ? "Resgatar" : "🔒"}
                    </Btn>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {tab === "history" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 20 }}>Histórico de Pontos</h2>
            {transactions.length === 0 ? (
              <Card style={{ textAlign: "center", padding: 40, color: C.gray }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
                Nenhuma movimentação ainda.
              </Card>
            ) : (
              transactions.map(t => {
                const isPos = t.points > 0;
                const typeIcon = { venda: "🛒", indicacao: "🔗", resgate: "🎁", bonus: "⭐" };
                return (
                  <div key={t.id} style={{ background: C.white, borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 6px rgba(26,46,90,0.06)" }}>
                    <div style={{ fontSize: 26, flexShrink: 0 }}>{typeIcon[t.type] || "📌"}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{t.desc}</div>
                      <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{t.date}</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: isPos ? C.green : C.danger, flexShrink: 0 }}>
                      {isPos ? "+" : ""}{fmt(t.points)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {redeemModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 480 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{redeemModal.icon}</div>
              <div style={{ fontWeight: 800, color: C.navy, fontSize: 20 }}>{redeemModal.name}</div>
              <div style={{ color: C.gold, fontWeight: 700, fontSize: 16, marginTop: 4 }}>{fmt(redeemModal.points)} pontos</div>
              <div style={{ color: C.gray, fontSize: 13, marginTop: 8 }}>Após o resgate, a equipe Realizze Tintas entrará em contato para entregar sua recompensa.</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setRedeemModal(null)} variant="secondary" style={{ flex: 1 }}>Cancelar</Btn>
              <Btn onClick={() => redeem(redeemModal)} variant="gold" style={{ flex: 1 }}>Confirmar Resgate</Btn>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: toast.type === "success" ? C.green : C.danger, color: C.white, borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 200, whiteSpace: "nowrap", maxWidth: "90vw" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {!session && <LoginScreen onLogin={setSession} />}
      {session?.role === "admin" && <AdminView onLogout={() => setSession(null)} />}
      {session?.role === "painter" && <PainterView painter={session.painter} onLogout={() => setSession(null)} />}
    </div>
  );
}
