# projetos-cidades

Site oficial de regras da **Fronteira do Sul RP** (servidor de roleplay de GTA V / FiveM),
com convite público e painel de administração.

## Como rodar

```bash
npm start        # ou: node server.js
```

O servidor sobe em `http://localhost:3000` (use a variável `PORT` para mudar).

## Estrutura

| Rota       | Descrição                                                        |
| ---------- | ---------------------------------------------------------------- |
| `/`        | Regulamento geral + aba "Regras da Polícia" + pesquisa + galeria |
| `/convite/`| Página de convite oficial                                        |
| `/admin/`  | Painel do administrador                                          |

## Painel de admin (`/admin/`)

- **Usuário:** `admin`
- **Senha:** `142536`

O administrador pode:

- editar o texto de qualquer regra/seção (HTML);
- adicionar novas regras, reordenar e excluir seções (nos dois documentos);
- editar cabeçalhos, destaques, rodapé, logo, textos do convite;
- enviar fotos (galeria do site) e inserir fotos dentro das regras (botão 📷).

Tudo é salvo em `data/content.json` e vale para todos os visitantes do site.

## Observações

- O conteúdo original do regulamento foi reproduzido fielmente; a aba "Regras da Polícia"
  veio com um texto-base que pode ser editado no painel.
- Sem dependências externas: apenas Node.js (>= 18) com módulos nativos.
