const PRISMA = {
  users: {
    'admin@prisma.com': { password: 'admin123', role: 'admin', name: 'Nathalia Fonteles' },
    'psicologo1@prisma.com': { password: 'psico123', role: 'profissional', name: 'Ana Silva', empresa: 'Empresa Alpha' },
    'psicologo2@prisma.com': { password: 'psico456', role: 'profissional', name: 'Bruno Costa', empresa: 'Empresa Beta' },
    'gestor@prisma.com': { password: 'gestor123', role: 'gestor', empresa: 'Empresa Alpha', setor: 'Vendas', cargo: 'Gerente Comercial' },
    'gestor2@prisma.com': { password: 'gestor456', role: 'gestor', empresa: 'Empresa Alpha', setor: 'RH', cargo: 'Coordenador de RH' },
    'gestor3@prisma.com': { password: 'gestor789', role: 'gestor', empresa: 'Empresa Alpha', setor: 'Operacoes', cargo: 'Supervisor Operacional' },
    'gestor4@prisma.com': { password: 'gestor111', role: 'gestor', empresa: 'Empresa Beta', setor: 'Vendas', cargo: 'Gerente Comercial' },
    'gestor5@prisma.com': { password: 'gestor222', role: 'gestor', empresa: 'Empresa Beta', setor: 'RH', cargo: 'Coordenador de RH' },
    'gestor6@prisma.com': { password: 'gestor333', role: 'gestor', empresa: 'Empresa Beta', setor: 'Operacoes', cargo: 'Supervisor Operacional' },
  },
  empresaAccess: {
    'empresaalpha': { password: 'alpha123', empresa: 'Empresa Alpha' },
    'empresabeta': { password: 'beta123', empresa: 'Empresa Beta' },
  },
  empresas: ['Empresa Alpha', 'Empresa Beta'],
  nomesMasc: ['Carlos','Rafael','Pedro','Lucas','Marcos','Bruno','Andre','Felipe','Rodrigo','Diego'],
  nomesFem: ['Ana','Julia','Mariana','Fernanda','Patricia','Camila','Beatriz','Larissa','Amanda','Carolina'],
  sobrenomes: ['Silva','Santos','Oliveira','Costa','Souza','Lima','Ferreira','Alves','Pereira','Rodrigues'],
  randomPersona() {
    const m = Math.random() > 0.5;
    const nomes = m ? this.nomesMasc : this.nomesFem;
    const nome = nomes[Math.floor(Math.random()*nomes.length)];
    const sob = this.sobrenomes[Math.floor(Math.random()*this.sobrenomes.length)];
    return { nome:`${nome} ${sob}`, idade:Math.floor(Math.random()*20)+25, anos:Math.floor(Math.random()*8)+1, gen:m?'M':'F' };
  },
  save(k,d){ localStorage.setItem('p_'+k,JSON.stringify(d)); },
  load(k,fb=null){ try{ const d=localStorage.getItem('p_'+k); return d?JSON.parse(d):fb; }catch{ return fb; } },
  setSession(u){ localStorage.setItem('p_session',JSON.stringify(u)); },
  getSession(){ try{ return JSON.parse(localStorage.getItem('p_session')); }catch{ return null; } },
  clearSession(){ localStorage.removeItem('p_session'); },
  getOcorrencias(emp=null){ const a=this.load('ocorrencias',[]); return emp?a.filter(o=>o.empresa===emp):a; },
  addOcorrencia(o){ const a=this.load('ocorrencias',[]); a.push({...o,id:Date.now(),data:new Date().toISOString()}); this.save('ocorrencias',a); },
  getSessoes(emp=null){ const a=this.load('sessoes',[]); return emp?a.filter(s=>s.empresa===emp):a; },
  addSessao(s){ const a=this.load('sessoes',[]); a.push({...s,id:Date.now(),data:new Date().toISOString(),status:'agendada'}); this.save('sessoes',a); },
  finalizarSessao(id,form){ const a=this.load('sessoes',[]); const i=a.findIndex(s=>s.id===id); if(i!==-1){a[i].status='finalizada';a[i].formulario=form;} this.save('sessoes',a); },
  getSimulacoes(emp=null){ const a=this.load('simulacoes',[]); return emp?a.filter(s=>s.empresa===emp):a; },
  addSimulacao(s){ const a=this.load('simulacoes',[]); a.push({...s,id:Date.now(),data:new Date().toISOString()}); this.save('simulacoes',a); },
  getRelatorios(emp=null){ const a=this.load('relatorios',[]); return emp?a.filter(r=>r.empresa===emp):a; },
  addRelatorio(r){ const a=this.load('relatorios',[]); a.push({...r,id:Date.now(),dataCriacao:new Date().toISOString()}); this.save('relatorios',a); },
  getHorarios(emp){ const k='hor_'+emp.replace(/\s/g,'_'); return this.load(k,['09:00','10:00','11:00','14:00','15:00','16:00','17:00']); },
  removerHorario(emp,h){ const k='hor_'+emp.replace(/\s/g,'_'); this.save(k,this.getHorarios(emp).filter(x=>x!==h)); },
};
