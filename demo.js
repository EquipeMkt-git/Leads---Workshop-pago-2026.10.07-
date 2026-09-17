/*
 * MODO DEMONSTRAÇÃO — simula o backend no navegador com dados fictícios.
 * Só é usado quando APP_CONFIG.API_URL está vazio. Nada é salvo.
 */
(function () {
  'use strict';
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const agora = () => iso(new Date());
  const atras = (h) => iso(new Date(Date.now() - h * 3600000));
  let seq = 1000;
  const id = (p) => p + (++seq);
  let rnd = 7;
  const r = () => { rnd = (rnd * 16807) % 2147483647; return rnd / 2147483647; };
  const pick = (a) => a[Math.floor(r() * a.length)];

  const U = [
    { id: 'U1', nome: 'Coordenação 4blue', email: 'coord@demo.com', perfil: 'coordenador', foto: '', ativo: 'SIM' },
    { id: 'U2', nome: 'Ana Ribeiro', email: 'ana@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM' },
    { id: 'U3', nome: 'Bruno Mendes', email: 'bruno@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM' },
    { id: 'U4', nome: 'Carla Duarte', email: 'carla@demo.com', perfil: 'usuario', foto: '', ativo: 'SIM' }
  ];
  const P = [
    { id: 'P1', nome: 'Produto A (exemplo)', valor_total: '12000', valor_entrada: '2000', parcelas: 'entrada + 10x', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' },
    { id: 'P2', nome: 'Produto B (exemplo)', valor_total: '4750', valor_entrada: '', parcelas: '12x', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' },
    { id: 'P3', nome: 'Produto C (exemplo)', valor_total: '1997', valor_entrada: '1997', parcelas: 'à vista', descricao: '', ativo: 'SIM', origem: 'coordenador', criado_por: 'Coordenação' }
  ];
  const M = [
    { id: 'M1', titulo: 'Boas-vindas', ordem: '1', ativo: 'SIM', tipo_ingresso: 'todos', texto: 'Oi {primeiro_nome}, tudo bem? Aqui é {usuario}, da 4blue! Vi que você garantiu seu ingresso para o Workshop do dia 07/10 e queria te dar as boas-vindas. Posso te fazer uma pergunta rápida?' },
    { id: 'M2', titulo: 'Boas-vindas VIP', ordem: '2', ativo: 'SIM', tipo_ingresso: 'vip', texto: 'Oi {primeiro_nome}! Aqui é {usuario}, da 4blue. Obrigado por garantir o ingresso VIP do Workshop 07/10! Vou cuidar pessoalmente da sua experiência. Posso te chamar aqui?' },
    { id: 'M3', titulo: 'Convite para conversa', ordem: '3', ativo: 'SIM', tipo_ingresso: 'todos', texto: '{primeiro_nome}, antes do workshop quero entender o momento da sua empresa para você aproveitar ao máximo. Tem 5 minutinhos hoje?' }
  ];
  const nomes = ['Mariana Costa', 'Rafael Lima', 'Juliana Alves', 'Pedro Henrique Rocha', 'Fernanda Martins', 'Lucas Oliveira', 'Camila Barros', 'Thiago Ferreira',
    'Patrícia Gomes', 'Gustavo Nunes', 'Aline Teixeira', 'Rodrigo Santana', 'Beatriz Moura', 'Felipe Cardoso', 'Larissa Pires', 'André Batista', 'Renata Vieira',
    'Diego Monteiro', 'Vanessa Freitas', 'Marcelo Azevedo', 'Tatiane Lopes', 'Eduardo Campos', 'Priscila Ramos', 'Leandro Correia', 'Simone Araújo', 'Fábio Rezende',
    'Natália Castro', 'Vinícius Prado', 'Carolina Dias', 'Ricardo Farias', 'Débora Sales', 'Henrique Pacheco', 'Luana Brito', 'Otávio Leal', 'Gabriela Neves', 'Sérgio Matos'];
  const cidades = ['São Paulo / SP', 'Curitiba / PR', 'Goiânia / GO', 'Rio de Janeiro / RJ', 'Fortaleza / CE', 'Campinas / SP', 'Manaus / AM', 'Joinville / SC'];
  const fats = ['Até 30mil/mês', '30 a 60mil/mês', '60 a 100mil/mês', '100 a 300mil/mês', '300mil a 1mi/mês'];
  const evs = ['SP', 'CWB', 'GO', 'RJ', 'FOR', 'CAP', 'SP (AGO)', 'RIB'];

  const L = nomes.map((n, i) => {
    const vip = r() < 0.3;
    const email = n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.') + '@exemplo.com';
    const l = {
      id: 'L' + (100 + i), criado_em: atras(2 + i * 9 + r() * 5), origem: i % 9 === 0 ? 'manual' : 'hotmart', tipo_ingresso: vip ? 'vip' : 'padrao',
      nome: n, email, telefone: '55' + pick(['11', '41', '62', '21', '85', '19']) + '9' + String(10000000 + Math.floor(r() * 89999999)),
      cidade: pick(cidades), empresa: '', obs: '', status: 'novo', responsavel_id: '', responsavel_nome: '', inicio_tratativa: '', ultima_acao: '',
      fechado_em: '', motivo: '', mensagem_usada: '', transacao: 'HP' + (1700000000 + i * 7919), produto_hotmart: vip ? '8502486' : '8502151',
      valor_ingresso: vip ? '997' : '197', status_hotmart: 'APPROVED', cliente_mdl: '', cliente_ilu: '', eventos: '', cargo: pick(['Dono / Sócio', 'Dono / Sócio', 'Diretor', 'Gerente']),
      faturamento: pick(fats), criado_por: i % 9 === 0 ? 'Ana Ribeiro' : 'Hotmart', atualizado_em: ''
    };
    if (r() < 0.22) l.cliente_mdl = pick(['Mamber Ativo · Máquina de Lucros Essencial', 'Ex Mamber · Máquina de Lucros PRO', 'Mentoria Cancelada · Máquina de Lucros Essencial']);
    if (r() < 0.2) l.cliente_ilu = 'Ex iluminista';
    if (r() < 0.45) {
      const k = 1 + Math.floor(r() * 3);
      const a = [];
      for (let j = 0; j < k; j++) a.push({ e: pick(evs), t: pick(['Normal', 'Normal', 'VIP']), f: pick(['Sim', 'Não', '']), c: r() < 0.15 ? 'Produto B (exemplo)' : '' });
      l.eventos = JSON.stringify(a);
    }
    return l;
  });
  const V = [];
  const H = [];
  const hist = (lead, u, acao, det, quando) => H.push({ data: quando || agora(), lead_id: lead, usuario_id: u ? u.id : '', usuario_nome: u ? u.nome : 'Sistema', acao, detalhe: det || '' });

  // distribui alguns leads
  L.forEach((l, i) => {
    if (i < 12) return;
    const u = U[1 + (i % 3)];
    l.responsavel_id = u.id; l.responsavel_nome = u.nome;
    const ini = Math.max(1, (Date.now() - new Date(l.criado_em)) / 3600000 - 3);
    l.inicio_tratativa = atras(ini); l.ultima_acao = atras(ini * r());
    l.status = 'tratativa';
    hist(l.id, u, 'tratativa_iniciada', 'Mensagem: Boas-vindas', l.inicio_tratativa);
    const x = r();
    if (x < 0.35) {
      const p = pick(P);
      l.status = 'ganho'; l.fechado_em = l.ultima_acao;
      V.push({ id: id('V'), data: l.fechado_em, lead_id: l.id, lead_nome: l.nome, usuario_id: u.id, usuario_nome: u.nome, produto_id: p.id, produto_nome: p.nome,
        valor_entrada: p.valor_entrada, valor_total: p.valor_total, parcelas: p.parcelas, forma_pagamento: pick(['Pix', 'Cartão de crédito']), obs: '', status: 'ativa', produto_fora_lista: '' });
      hist(l.id, u, 'ganho', p.nome, l.fechado_em);
    } else if (x < 0.55) {
      l.status = 'perdido'; l.fechado_em = l.ultima_acao; l.motivo = pick(['Sem interesse', 'Achou caro', 'Não respondeu']);
      hist(l.id, u, 'perdido', l.motivo, l.fechado_em);
    } else if (x < 0.62) {
      l.status = 'reembolso'; l.fechado_em = l.ultima_acao; l.motivo = 'Pediu reembolso do ingresso';
      hist(l.id, u, 'reembolso', l.motivo, l.fechado_em);
    }
  });
  H.sort((a, b) => a.data.localeCompare(b.data));

  const sessoes = {};
  const copia = (o) => JSON.parse(JSON.stringify(o));
  const leadDe = (lid) => L.find((l) => l.id === lid);
  function permitido(u, lid, leitura) {
    const l = leadDe(lid);
    if (!l) throw new Error('Lead não encontrado.');
    if (u.perfil === 'coordenador' || l.responsavel_id === u.id) return l;
    if (leitura && l.status === 'novo') return l;
    if (l.status === 'novo') throw new Error('Inicie a conversa pelo WhatsApp para assumir este lead.');
    throw new Error('Este lead está com ' + l.responsavel_nome + '.');
  }
  const bootstrap = (u) => {
    const c = u.perfil === 'coordenador';
    return {
      usuario: copia(u),
      leads: copia(L.filter((l) => c || l.status === 'novo' || l.responsavel_id === u.id)),
      vendas: copia(V.filter((v) => c || v.usuario_id === u.id)),
      produtos: copia(P.filter((p) => c || p.ativo === 'SIM')),
      mensagens: copia(M.filter((m) => c || m.ativo === 'SIM'))
    };
  };
  const config = { webhook: 'https://script.google.com/macros/s/SEU_ID/exec?src=hotmart&key=CHAVE', id_padrao: '8502151', id_vip: '8502486', base_id: '1ihgdFxaR5cM6xyAECvJ-IORN1dmghRin9gmRFCsHe5I', ultima_sincronizacao: atras(0.4), modo_teste: false, hotmart_api: { configurada: false, client_id: '' },
    webhooks: [{ recebido_em: atras(0.2), evento: 'PURCHASE_APPROVED', produto: '8502486', transacao: 'HP1700102947', email: 'felipe.cardoso@exemplo.com', status: 'ok', resultado: 'Lead criado: L113' },
      { recebido_em: atras(1), evento: 'PURCHASE_CHARGEBACK', produto: '0', transacao: 'HP16015479281022', email: 'teste@example.com', status: 'ignorado', resultado: 'produto de teste da Hotmart (id 0) — ative o modo teste para aceitar' }] };

  const rotas = {
    'login': (b) => {
      const u = U.find((x) => x.email === String(b.email || '').trim().toLowerCase());
      if (!u || String(b.senha) !== '123456' || u.ativo !== 'SIM') throw new Error('E-mail ou senha inválidos.');
      const t = 'demo-' + Math.random().toString(36).slice(2);
      sessoes[t] = u.id;
      return { token: t, usuario: copia(u) };
    },
    'logout': () => true,
    'bootstrap': (b, u) => bootstrap(u),
    'admin.painel': (b, u) => Object.assign(bootstrap(u), { usuarios: copia(U), historico: copia(H.slice(-400).reverse()), config }),
    'perfil.salvar': (b, u) => { if (b.nome !== undefined) u.nome = String(b.nome).trim() || u.nome; if (b.foto !== undefined) u.foto = b.foto; L.forEach((l) => { if (l.responsavel_id === u.id) l.responsavel_nome = u.nome; }); return copia(u); },
    'lead.criar': (b, u) => {
      const d = b.lead || {};
      const l = Object.assign({ id: id('L'), criado_em: agora(), origem: 'manual', status: 'novo', criado_por: u.nome, responsavel_id: '', responsavel_nome: '' }, d);
      delete l.assumir;
      if (d.assumir) Object.assign(l, { status: 'tratativa', responsavel_id: u.id, responsavel_nome: u.nome, inicio_tratativa: agora(), ultima_acao: agora() });
      L.unshift(l); hist(l.id, u, 'criado', 'Lead cadastrado manualmente');
      return copia(l);
    },
    'lead.editar': (b, u) => { const l = permitido(u, b.id, true); Object.assign(l, b.lead, { atualizado_em: agora() }); hist(l.id, u, 'editado', ''); return copia(l); },
    'lead.iniciar': (b, u) => {
      const l = leadDe(b.id);
      if (l.status === 'novo') { Object.assign(l, { status: 'tratativa', responsavel_id: u.id, responsavel_nome: u.nome, inicio_tratativa: agora(), ultima_acao: agora(), mensagem_usada: b.mensagem }); hist(l.id, u, 'tratativa_iniciada', b.mensagem ? 'Mensagem: ' + b.mensagem : 'WhatsApp aberto'); }
      else if (l.responsavel_id === u.id || u.perfil === 'coordenador') { l.ultima_acao = agora(); hist(l.id, u, 'whatsapp', 'WhatsApp aberto novamente'); }
      else throw new Error('Este lead já está com ' + l.responsavel_nome + '.');
      return copia(l);
    },
    'lead.ganho': (b, u) => {
      const l = permitido(u, b.id);
      const v = b.venda;
      let p = P.find((x) => x.id === v.produto_id);
      if (!p) {
        p = P.find((x) => x.nome.toLowerCase() === String(v.produto_nome).toLowerCase());
        if (!p) { p = { id: id('P'), nome: v.produto_nome, valor_total: String(v.valor_total), valor_entrada: String(v.valor_entrada || ''), parcelas: v.parcelas, ativo: 'SIM', origem: 'usuario', criado_por: u.nome }; P.push(p); }
      }
      const venda = { id: id('V'), data: agora(), lead_id: l.id, lead_nome: l.nome, usuario_id: l.responsavel_id || u.id, usuario_nome: l.responsavel_nome || u.nome, produto_id: p.id, produto_nome: p.nome,
        valor_entrada: String(v.valor_entrada || ''), valor_total: String(v.valor_total), parcelas: v.parcelas, forma_pagamento: v.forma_pagamento, obs: v.obs, status: 'ativa', produto_fora_lista: v.produto_id ? '' : 'SIM' };
      V.push(venda);
      Object.assign(l, { status: 'ganho', fechado_em: agora(), ultima_acao: agora(), motivo: '' });
      hist(l.id, u, 'ganho', p.nome + ' · total R$ ' + v.valor_total);
      return { lead: copia(l), venda: copia(venda), produto: copia(p) };
    },
    'lead.perdido': (b, u) => { const l = permitido(u, b.id); Object.assign(l, { status: 'perdido', motivo: b.motivo, fechado_em: agora(), ultima_acao: agora() }); hist(l.id, u, 'perdido', b.motivo); return copia(l); },
    'lead.reembolso': (b, u) => {
      const l = permitido(u, b.id);
      Object.assign(l, { status: 'reembolso', motivo: b.motivo, fechado_em: agora(), ultima_acao: agora() });
      if (b.reembolsar_vendas) V.forEach((v) => { if (v.lead_id === l.id) v.status = 'reembolsada'; });
      hist(l.id, u, 'reembolso', b.motivo); return copia(l);
    },
    'lead.reabrir': (b, u) => { const l = permitido(u, b.id); const a = l.status; l.status = 'tratativa'; l.ultima_acao = agora(); hist(l.id, u, 'reaberto', 'De "' + a + '" para tratativa'); return copia(l); },
    'lead.nota': (b, u) => { permitido(u, b.id, true); hist(b.id, u, 'nota', b.texto); return true; },
    'lead.historico': (b, u) => { permitido(u, b.id, true); return copia(H.filter((h) => h.lead_id === b.id).reverse()); },
    'venda.excluir': (b, u) => {
      const i = V.findIndex((v) => v.id === b.id); const v = V[i]; V.splice(i, 1);
      const l = leadDe(v.lead_id);
      if (l && l.status === 'ganho' && !V.some((x) => x.lead_id === l.id && x.status === 'ativa')) l.status = 'tratativa';
      hist(v.lead_id, u, 'venda_excluida', v.produto_nome); return true;
    },
    'admin.usuario.salvar': (b) => {
      const d = b.usuario;
      if (!d.nome || !d.email) throw new Error('Preencha nome e e-mail.');
      if (d.id) { const x = U.find((y) => y.id === d.id); Object.assign(x, { nome: d.nome, email: d.email.toLowerCase(), perfil: d.perfil, ativo: d.ativo }); return copia(x); }
      if (!d.senha || d.senha.length < 6) throw new Error('Defina uma senha com ao menos 6 caracteres.');
      const x = { id: id('U'), nome: d.nome, email: d.email.toLowerCase(), perfil: d.perfil, ativo: d.ativo, foto: '' };
      U.push(x); return copia(x);
    },
    'admin.produto.salvar': (b, u) => {
      const d = b.produto;
      if (d.id) { const x = P.find((y) => y.id === d.id); Object.assign(x, d); return copia(x); }
      const x = Object.assign({}, d, { id: id('P'), origem: 'coordenador', criado_por: u.nome }); P.push(x); return copia(x);
    },
    'admin.mensagem.salvar': (b) => {
      const d = b.mensagem;
      if (d.id) { const x = M.find((y) => y.id === d.id); Object.assign(x, d); return copia(x); }
      const x = Object.assign({}, d, { id: id('M') }); M.push(x); return copia(x);
    },
    'admin.mensagem.excluir': (b) => { M.splice(M.findIndex((m) => m.id === b.id), 1); return true; },
    'admin.lead.atribuir': (b, u) => {
      const l = leadDe(b.id); const x = U.find((y) => y.id === b.usuario_id);
      Object.assign(l, { responsavel_id: x.id, responsavel_nome: x.nome });
      if (l.status === 'novo') Object.assign(l, { status: 'tratativa', inicio_tratativa: agora(), ultima_acao: agora() });
      hist(l.id, u, 'atribuido', 'Para ' + x.nome); return copia(l);
    },
    'admin.lead.liberar': (b, u) => { const l = leadDe(b.id); Object.assign(l, { status: 'novo', responsavel_id: '', responsavel_nome: '', inicio_tratativa: '', motivo: '', fechado_em: '' }); hist(l.id, u, 'liberado', ''); return copia(l); },
    'admin.lead.excluir': (b) => { L.splice(L.findIndex((l) => l.id === b.id), 1); return true; },
    'admin.importar': (b, u) => {
      let n = 0, d = 0, vip = 0;
      const vistos = new Set(L.map((l) => l.email));
      b.linhas.forEach((x) => {
        const em = String(x.email || '').toLowerCase();
        if (em && vistos.has(em)) { d++; return; }
        vistos.add(em); n++; if (x.tipo_ingresso === 'vip') vip++;
        if (!b.simular) L.unshift({ id: id('L'), criado_em: x.criado_em || agora(), origem: 'importacao', status: 'novo', nome: x.nome, email: em, telefone: x.telefone, cidade: x.cidade, tipo_ingresso: x.tipo_ingresso, transacao: x.transacao, criado_por: u.nome });
      });
      return { simulacao: !!b.simular, importados: n, duplicados: d, invalidos: 0, sem_telefone: 0, viraram_vip: 0, vip, exemplos: [] };
    },
    'admin.hotmart.cred': (b) => { config.hotmart_api = { configurada: true, client_id: String(b.client_id).slice(0, 6) + '…' }; return config.hotmart_api; },
    'admin.hotmart.importar': (b, u) => {
      if (!config.hotmart_api.configurada) throw new Error('Cadastre o client_id e o client_secret da Hotmart em Ajustes.');
      const novos = ['Paulo Viana', 'Lívia Duarte', 'Caio Pereira'];
      if (!b.simular) novos.forEach((n, i) => L.unshift({ id: id('L'), criado_em: atras(300 + i), origem: 'hotmart', status: 'novo', nome: n, email: 'api' + i + '@exemplo.com', telefone: '55119' + (80000000 + i * 1111111), cidade: 'São Paulo / SP', tipo_ingresso: i === 1 ? 'vip' : 'padrao', transacao: 'HPAPI' + i, criado_por: 'Hotmart (importação)' }));
      return { simulacao: !!b.simular, encontradas: 27, por_produto: { padrao: 20, vip: 7 }, importados: b.simular ? 3 : 3, duplicados: 24, invalidos: 0, sem_telefone: 1, viraram_vip: 1, vip: 1,
        canceladas: 2, reembolsos_marcados: 1, desde: b.desde, exemplos: novos.map((n, i) => n + ' · (11) 9' + (8000 + i) + '-0000 · ' + (i === 1 ? 'vip' : 'padrao')) };
    },
    'admin.sincronizar': () => { config.ultima_sincronizacao = agora(); return { clientes: 18432, leads_atualizados: 3, em: agora() }; },
    'admin.processarFila': () => ({ processados: 0 }),
    'admin.config': (b) => { const c = b.config || {}; if (c.HOTMART_ID_PADRAO) config.id_padrao = c.HOTMART_ID_PADRAO; if (c.HOTMART_ID_VIP) config.id_vip = c.HOTMART_ID_VIP; if (c.BASE_CLIENTES_ID) config.base_id = c.BASE_CLIENTES_ID; if (c.HOTMART_MODO_TESTE) config.modo_teste = c.HOTMART_MODO_TESTE === 'SIM'; return copia(config); }
  };

  window.DemoAPI = {
    restaurar(token, uid) { sessoes[token] = uid; },
    call(body) {
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            const fn = rotas[body.action];
            if (!fn) throw new Error('Ação desconhecida: ' + body.action);
            if (body.action === 'login') return resolve({ ok: true, data: fn(body) });
            const u = U.find((x) => x.id === sessoes[body.token]);
            if (!u) return resolve({ ok: false, error: 'SESSAO_EXPIRADA', auth: true });
            if (body.action.indexOf('admin.') === 0 && u.perfil !== 'coordenador') throw new Error('Acesso restrito ao coordenador.');
            resolve({ ok: true, data: fn(body, u) });
          } catch (e) { resolve({ ok: false, error: e.message }); }
        }, 250 + Math.random() * 250);
      });
    }
  };
})();
