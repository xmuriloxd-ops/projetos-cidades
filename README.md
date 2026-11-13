# Fronteira do Sul RP — Central de regras

Site de regras da cidade com página de convite e painel de administrador. Não usa nenhuma dependência além do Node.js 18+.

## Rodar

```
npm start
```

Abre em `http://localhost:3000`.

| Página | Endereço |
| --- | --- |
| Regras (Regulamento geral e Regras da Polícia) | `/` |
| Convite | `/convite/` |
| Painel do administrador | `/admin/` |

## Administrador

Login `adm`, senha `142536`. Para trocar sem mexer no código, defina as variáveis de ambiente `ADMIN_USER` e `ADMIN_PASS`.

No painel dá para editar, adicionar, reordenar e excluir regras, enviar fotos (PNG, JPG, WEBP ou GIF de até 8 MB) e trocar os textos, o emblema e a foto do convite.

## Onde os dados ficam

As edições e as fotos enviadas ficam na pasta `data/` (ou na pasta indicada por `DATA_DIR`). Na hospedagem, essa pasta precisa estar em um disco persistente; se ela for apagada, o site volta ao conteúdo original de `content/seed.txt`.

Outras variáveis: `PORT` (padrão 3000).
