// Conteúdo padrão do site — Fronteira do Sul RP
// Este arquivo só é usado na primeira execução; depois disso o conteúdo
// fica em data/content.json e pode ser editado pelo painel de admin.
module.exports = {
  site: {
    name: "FRONTEIRA DO SUL",
    tagline: "GUIA OFICIAL DA CIDADE",
    pageTitle: "Fronteira do Sul RP — Uma nova história começa aqui",
    description: "Central de regras da Fronteira do Sul RP. Consulte o regulamento da cidade, navegue pelas seções ou pesquise qualquer termo.",
    logo: "/assets/logo.png",
    footer: "FRONTEIRA DO SUL RP · REGRAS PARA UMA CIDADE MELHOR"
  },

  invite: {
    label: "CONVITE OFICIAL",
    title: "Uma nova história começa aqui.",
    subtitle: "Conheça a cidade, confira as regras oficiais e prepare-se para o roleplay.",
    cta: "Consultar regras oficiais",
    image: "/assets/convite-banner.jpg"
  },

  general: {
    tabLabel: "Regulamento geral",
    hero: {
      label: "CENTRAL DE REGRAS",
      titleHtml: "Roleplay justo. <em>Histórias melhores.</em>",
      subtitle: "Consulte o regulamento da cidade com clareza. Navegue pelas seções ou pesquise qualquer termo para encontrar a regra certa, sem perder o contexto.",
      meta: ""
    },
    docLabel: "DOCUMENTO DA CIDADE",
    docTitle: "Regulamento completo",
    highlight: {
      badge: "CONSULTA ABERTA",
      tag: "REGRA DE INTEGRIDADE",
      title: "Cheats ou vantagens indevidas são proibidas",
      text: "É proibido qualquer tipo de cheat, modificação ou recurso que conceda vantagem no jogo. Isso inclui retirar mato ou arbustos, retirar água e deixar o jogo sempre de dia. A proibição também abrange qualquer alteração equivalente que facilite a jogabilidade de forma injusta."
    },

    sections: [
      {
        id: "sec-1",
        title: "Boas-vindas e apresentação",
        html: `<h4>Bem vindo!</h4>
<p>A Fronteira do Sul RP é um servidor de role-play baseado no jogo Grand Theft Auto V , desenvolvido com dedicação por nossa equipe. Hospedado na plataforma FiveM, especializada em multiplayer, o servidor conta com diversos scripts personalizados, criados exclusivamente para proporcionar uma experiência única aos jogadores.</p>
<p>O roleplay envolve interpretar e agir conforme o personagem que você está controlando. Isso significa que todas as suas ações no jogo devem ser realizadas em nome do seu personagem, garantindo uma experiência imersiva. Nosso objetivo é permitir que jogadores e espectadores vivam histórias e situações envolventes, seguindo a tradição do servidor e mergulhando em um universo completamente novo.</p>
<h4>Como jogar em nosso servidor?</h4>
<p>Para jogar em nosso servidor você deverá obrigatoriamente possuir uma cópia ORIGINAL do GTA V, seja na Steam ou na Epic Games e passar em nossa Allowlist.</p>
<div class="note"><span class="note-label">NOTA</span><p>Temos grande orgulho em valorizar a diversidade, o acolhimento e a inclusão que definem nossa comunidade. Cada pessoa é respeitada por sua singularidade e contribui para tornar este espaço verdadeiramente especial para todos.</p></div>
<p>Reafirmamos os princípios fundamentais que sustentam nossa comunidade e nos tornamos únicos. Aqui, garantimos um ambiente seguro, respeitoso e acolhedor para todos, independentemente de origem, gênero ou qualquer outra característica.</p>
<p>Não toleramos nenhuma forma de preconceito, seja transfobia, homofobia, racismo, capacitismo ou qualquer discurso que oprima ou diminua qualquer grupo social. Repudiamos, com veemência, atos que promovam o ódio, a discriminação ou a desigualdade, dentro ou fora de nossa comunidade. Qualquer atitude preconceituosa ou que incite ao ódio resultará em banimento permanente , pois nosso compromisso é manter um ambiente baseado no respeito, empatia e igualdade.</p>
<p>Nosso dever é construir uma sociedade justa e acolhedora, onde todos possam se sentir seguros e respeitados em sua identidade e individualidade. Embora defendamos a igualdade de direitos e a liberdade de expressão, ressaltamos que esses valores jamais devem ser usados ​​para discursos intolerantes fundamentados.</p>
<p>Nossa comunidade é um espaço onde a liberdade e a equidade são pilares, mas reforçamos não haver espaço para qualquer tipo de intolerância. Contamos com a colaboração de todos para preservar um ambiente inclusivo e respeitoso.</p>`
      },

      {
        id: "sec-2",
        title: "Regras gerais",
        html: `<h4>Regras gerais</h4>
<h4>Interpretação de papéis</h4>
<p>Roleplay, ou interpretação de papéis, consiste em assumir a identidade de um personagem fictício no jogo, obedecendo às diretrizes estabelecidas pelo servidor. Nos servidores de GTA, isso significa interpretar o personagem de forma realista, respeitando sua história e conduta no universo do roleplay. É essencial que essa participação seja conduzida com responsabilidade e respeito, garantindo uma experiência autêntica para todos os jogadores.</p>
<p>Existem diversas regras que visam coibir práticas de anti-roleplay, tais como RDM (Random Deathmatch ), VDM ( Vehicle Deathmatch ), PG ( Power Gaming ), Meta ( Metagaming ), entre outras que serão incluídas a seguir nos documentos gerais.</p>
<h4>Interpretação de papéis: Legal e Ilegal</h4>
<p>A “ História do seu personagem ” define o caminho que ele seguirá dentro do roleplay. Personagens do caminho legal costumam agir de forma ética e justa perante a sociedade, exercendo profissões como enfermeiro, médico, mecânico, policial, advogado, entre outros. Já os personagens do caminho ilegal adotaram posturas mais arriscadas, envolvendo-se em atividades criminosas, como bandidagem, máfias e tráfico. Apesar dessas divisões, o roleplay não se limita a esses extremos. Um personagem jurídico pode ter conexões ou motivações que o levem a atos ilegais, seja por influência de amigos, familiares ou outros fatores narrativos. O importante é manter a coerência na história criada para o personagem.</p>
<h4>Personagem e Multislot</h4>
<ul>
<li>O personagem deverá possuir nome e sobrenome devidamente registrados no cartório. Caso o nome não siga esse padrão, ele será alterado pela equipe para um nome aleatório. Exemplo de nome não permitido: ReizinDoCrime, MatadorDeCop e etc...</li>
<li>Os personagens não devem conter nomes de cunho ofensivo ou conotação sexual, preconceito, que não tenham relação ou que não condizem com a história e/ou interpretação do personagem.</li>
<li>Não será permitida a criação de personagens infantis ou adolescentes, somente personagens adultos maiores de 18 anos.</li>
<li>Não será possível ter um personagem em mais de uma facção diferente.</li>
<li>Personagens adicionais não poderão compartilhar nenhum item, dinheiro, veículo, tampouco ter relação de parentesco com seu personagem principal.</li>
<li>Os que foram assentados em facções e tiverem um segundo personagem na polícia, não poderão entrar no personagem caso a facção do personagem principal esteja participando de uma guerra, mesmo que ele tenha desmaiado. O personagem secundário só poderá ser utilizado AO FIM da guerra.</li>
<li>É permitido ter um personagem secundário na polícia, porém com limitações.</li>
<li>É permitido ter um personagem secundário não ilegal, porém com limitações.</li>
</ul>
<h4>Zonas seguras</h4>
<p>É proibida a prática de quaisquer atos ilegais em locais de zonas seguras. O descumprimento desta regra poderá resultar na suspensão da lista de permissão. Isso vale também para dependências e especificidades desses locais. Está liberado FURTOS em áreas de segurança. Atenção: FURTO é diferente de ROUBO, que é proibido.</p>
<h4>Concessionária</h4>
<h4>Praças</h4>
<h4>Hospital</h4>
<p>Hospital Ilegal (Nota-se que é uma área neutra e deve-se evitar qualquer conflito).</p>
<h4>Departamentos de Polícia</h4>
<h4>Mecânica</h4>
<ul>
<li>Restaurantes.</li>
<li>Cinema.</li>
</ul>
<p>A polícia está apta a realizar abordagens em zonas seguras em caso de denúncias ou motivos plausíveis para a abordagem (máscara, frio ou acessórios militares) . Lembrando que deve se prezar pelo RP do policial e respeitando a abordagem. Expressamente proibido começar uma ação próxima a uma área segura e correr para a mesma ou qualquer outra. No caso de acontecer, o RP seguirá e após o término, as devidas punições serão aplicadas aos envolvidos que levaram a ação para safezones, isso inclui iniciar uma ação na safezones ou levar uma até a mesma.</p>`
      },

      {
        id: "sec-3",
        title: "Regras de ouro e conduta",
        html: `<p>Este é um servidor de interpretação de personagens e criação de histórias, então sempre interprete seu personagem acima de qualquer situação nunca saia do roleplay ;</p>
<ul>
<li>Não é permitido nenhum tipo de indicação dentro do roleplay de que você esteja gravando, transmitindo o cenário atual dentro do jogo;</li>
<li>Quando desamaiado você não poderá lembrar do contexto que levou ao seu desmaio e nada referente à história do seu desmaio, mesmo sem lembrar o contexto, caso seja realizado RP com o paramédico, deverá dar ao paramédico a interpretação de dores para que o mesmo tenha um cenário em volta do seu desamio e realize seu atendimento;</li>
<li>Caso você esteja realizando um roleplay criminal, em hipótese alguma você deverá dar sugestões ou questionar procedimentos policiais dentro do roleplay, caso ache que passou por algum desconforto ou quebra de regra, o canal adequado de relatório é o sistema de tickets, lembre-se você é um criminoso, caso queira saber procedimentos policiais, faça o recrutamento da polícia;</li>
<li>Roleplay é uma interpretação volátil, ou seja, nem sempre o roleplay sairá da forma como você planejou, por isso tenha em mente sempre se adaptar ao cenário ou qual você está inserido, seu roleplay não está acima de nenhum outro servidor;</li>
<li>Roleplays que envolvem a saúde da sua pessoa em condições específicas, como por exemplo; roleplay de gravidez ou de um personagem PCD (seja a condição ou intelectual) deverá passar por alinhamento juntamente ao setor operacional (membros listados com o cargo de Staff no Discord) sendo solicitado previamente por meio do nosso sistema de tickets;</li>
<li>Amor à vida é obrigatório, é proibido o RDM, VDM, powergaming, metagaming, ghosting, cheating, combat logging e/ou programas auxiliares de mira, se beneficiar e/ou abusar de exploits e bugs;</li>
</ul>
<h4>Jogos de poder (PG)</h4>
<p>O Powergaming é proibido; Exceto aos relacionados à utilização de veículos em terrenos, rampas e construções.O famoso " bate-bate " está vetado, e essa prática passa a ser considerada VDM e Power Gaming , podendo resultar em punições severas . O jogador que fizer uso dessa prática estará sujeito à proteção</p>
<p>Ou seja: Se você está perseguindo alguém e bate intencionalmente no carro de outra pessoa com o objetivo de capotá-lo ou quebrá-lo para obter vantagem , você estará incorrendo na quebra dessa regra e será punido.</p>
<p>Desculpas como " foi vento " não serão aceitas, salvo os casos em que sejam nítidos os problemas de conexão , a depender da interpretação única e exclusiva da administração .</p>
<p>Proibido o powergaming utilizar veículos esportivos para subir escadas; Proibido o uso de bugs de colisões para subir ou atravessar barreiras, barricadas, muros ou objetos que excedam a altura do parachoque do veículo;</p>
<h4>Registro de Combate (CL)</h4>
<p>O Combat Loggin é proibido; É o ato de desconectar-se durante uma ação em que você está participando.</p>
<p>É proibido desconectar-se apenas por medo de ser abordado pela polícia ou quando você estiver envolvido em uma ação (sequestro, fuga, troca de tiros, transporte para o presídio e etc...)</p>
<p>Em caso de travamento durante uma ação em que o PVP já foi iniciado, o jogador não deverá retornar ao servidor, retorne assim que ela terminar. Você deve relatar uma falha em nosso servidor, tanto para conhecimento quanto para correção. Nos casos de /GG antes do término do roleplay será considerado como Combat Loggin (CL).</p>
<h4>Flamejante</h4>
<p>O Flaming é proibido; É qualquer interação hostil ou experiência que inflama uma situação ou pessoa de forma negativa.</p>
<p>É proibido qualquer tipo de flaming, seja ele in-game, no Discord ou em qualquer outro método de comunicação social, como redes sociais, plataformas de live stream, entre outros.</p>
<h4>Amor à vida</h4>
<p>A preservação da vida é uma consideração fundamental para o desenvolvimento do seu personagem. Assim como na vida real, o medo da morte deve ser uma preocupação constante para o seu personagem, levando-o a evitar situações de risco extremo que possam colocar sua vida em perigo.</p>
<h4>RP Sombrio</h4>
<p>O Dark RP é proibido; É quando um jogador realiza ações extremas, irreais ou exageradas dentro do roleplay, que fogem da lógica e do realismo esperado. Isso pode incluir tortura sem sentido, violência gratuita e outras práticas.</p>
<p>Todo e qualquer ato que seja considerado Dark RP resultará em BANIMENTO PERMANENTE , sem possibilidade de revogação.</p>`
      },

      {
        id: "sec-4",
        title: "Cheats e vantagens indevidas",
        html: `<p>É proibido qualquer tipo de cheat, modificação ou recurso que conceda vantagem no jogo.</p>
<p>Exemplos expressamente proibidos: retirar mato ou arbustos, retirar água e deixar o jogo sempre de dia.</p>
<p>A proibição também abrange qualquer alteração equivalente que facilite a jogabilidade de forma injusta. Não use ferramentas, alterações ou recursos externos para obter vantagem.</p>`
      },

      {
        id: "sec-5",
        title: "Discord e denúncias",
        html: `<h4>Regras do Discord</h4>
<p>No discord da FRONTEIRA DO SUL , esperamos que todos mantenham um ambiente respeitoso e saudável. Respeito e convivência são essenciais, então trate todos com educação, sem ofensas, discriminação ou assédio. As discussões são bem-vindas, mas nunca devem se tornar brigas ou ataques pessoais. A toxicidade não será tolerada: evite inundações, spam, uso excessivo de CAPS LOCK ou publicações que não agreguem ao ambiente. Manter o Discord livre de conteúdos inapropriados é fundamental, portanto, não compartilhar imagens, vídeos ou mensagens com conteúdo pornográfico, violento ou ilegal. Links suspeitos, como phishing, vírus ou malwares, também são proibidos.</p>
<p>O comportamento da equipe deve ser sempre respeitoso. Não é permitido acusar uma equipe sem provas ou tentar manipular suas decisões.</p>
<p>Não compartilhe informações pessoais suas ou de outros sem consentimento, nem exponha pessoas sem autorização. A divulgação de outros servidores ou comunidades sem permissão da administração é proibida. Respeite o uso correto dos canais, evitando desviar o foco com mensagens irrelevantes.</p>
<h4>Denúncias & Punições</h4>
<p>As regras e o funcionamento de um ticket de denúncia são essenciais para garantir que os jogadores possam reportar erros ou comportamentos inadequados de forma organizada e eficaz. Todos têm a possibilidade de abrir um ticket de denúncia contra outros jogadores da cidade, caso sofram qualquer tipo de problema.</p>
<p>Nossa recomendação é que você tenha todas as provas reunidas antes de abrir qualquer ingresso com gravação completa. Assim, podemos realizar o processo de análise de forma mais eficaz, buscando uma investigação mais aprofundada. A análise da equipe administrativa é essencial, pois buscamos sempre manter o equilíbrio em todas as denúncias recebidas.</p>
<p>Não é porque você abriu um ticket de denúncia de que uma pessoa receberá obrigatoriamente uma indenização. A equipe está preparada para analisar profundamente todos os fatos de ambas as partes: do denunciado e do denunciante.</p>`
      },

      {
        id: "sec-6",
        title: "Pacificação e contingente",
        html: `<h4>Pacificacao</h4>
<p>As regras de pacificação visam garantir que os conflitos dentro do servidor ocorram de forma justa, equilibrada e consistente com a proposta de roleplay. A pacificação deve seguir um contexto sólido e bem desenvolvido, respeitando a tradição da cidade e as consequências das ações tomadas.</p>
<p>Normalmente, ela será decretada após o encerramento de uma investigação policial, quando as autoridades reunirem provas suficientes para agir contra facções, organizações criminosas ou áreas de alto risco.</p>
<h4>& Contingente</h4>
<ul>
<li>O lado derrotado da pacificação deve obrigatoriamente dar "/GG" ao término da ação.</li>
<li>Todas as portas com trancas devem estar abertas.</li>
<li>Proibido trancar passagens com veículos.</li>
<li>Caso a polícia ganhe, serão retirados todos os tipos de pertences do baú da facção, e os bandidos terão que ficar fora do local por 3 dias. (o local será transitado somente por policiais).</li>
<li>Se o bandido ganhar uma investigação será zerada.</li>
<li>Proibido qualquer retirada de itens do baú no período em que foi anunciada a pacificação.</li>
</ul>
<h4>Contingente</h4>
<ul>
<li>Do lado policial será;</li>
<li>A polícia entra sempre com um contingente de 20 policiais a mais do contingente total da organização e/ou da facção.</li>
<li>Do lado ilegal será:;</li>
<li>A família irá com o máximo de membros reconhecidos em seu tablet.</li>
<li>Está proibido que moradores participem.</li>
<li>Proibido qualquer tipo de aliança nessa modalidade de ação.</li>
</ul>`
      },

      {
        id: "sec-7",
        title: "Regras de ações",
        html: `<h4>Batida</h4>
<ul>
<li>A polícia tem a possibilidade de poder realizar batidas em facções proeminentes a situações, sendo elas;</li>
<li>O indivíduo realiza fuga para o local da facção;</li>
<li>Recuperação de viaturas policiais;</li>
<li>Situações de sequestro confirmadas;</li>
<li>Prender uma determinada pessoa no local;</li>
<li>O policial está proibido procurar/mexer nos baús;</li>
<li>Não é permitida a realização de batidas programadas sem justificativa prévia.</li>
<li>ATENÇÃO: Todas essas determinações serão apenas liberadas pelo Alto comando.</li>
</ul>
<ul>
<li>É proibido usar o /gg antes do término da ação ou caso tenha perdido a mesma, podendo se enquadrar em combat logging.</li>
<li>Caso você esteja em uma situação de RP eminente você deve esperar o mesmo finalizar para usar o /gg.</li>
<li>Toda ação no qual o jogador não estiver utilizando máscara, ele poderá ser reconhecido mesmo trocando de roupa e por sua voz.</li>
<li>Os reféns não podem ter nenhum tipo de ligação com o grupo da ação.</li>
<li>A partir do momento em que você sai de área de combate da ação, você fica proibido de retornar para ação, independente do motivo.</li>
<li>Caso venha a crashar ou ser desconectado do servidor durante a ação, uma vez que tenha sido iniciado o combate, é proibido voltar independente do motivo, nesse ponto você perdeu a ação sendo obrigatório enviar a print/clipe do crash ou erro de conexão, caso não seja apresentado poderá ser considerado combat logging (em caso de Eventos, fica a critério do staff responsável);</li>
<li>Proibido bloquear a entrada de estabelecimento (portas) em ações, seja por parte de bandido ou da polícia.</li>
<li>Ao término de uma ação os bandidos podem acionar o hospital ilegal, caso seja realizado um chamado para um médico ele irá acionar a polícia, para prestar apoio no atendimento.</li>
<li>Após ganhar ações contra policiais, você não pode chamar os paramédicos, utilize o Hospital Clandestino.</li>
<li>Fica padronizado as ações de Todos em Solo.</li>
<li>A policia deve começar fora do perímetro;</li>
<li>Os bandidos devem estar dentro do local do roubo no momento do inicio da ação, mesmo que saiam posteriormente, exceto os que são permitidos estarem fora por regra.</li>
<li>É proibido utilizar TODO tipo de droga ilegal durante ações fechadas (metanfetamina, cocaína, oxy, etc.).</li>
<li>Todos os jogadres que queiram ou forem participar de qualquer tipo de RP no servidor, é obrigatório realizar a gravação da tela do início até o fim da situação (isso também inclui faixas de áudio de gravação e reprodução: captura do microfone e som do PC). Caso seja solicitada (por parte da staff) a gravação de tela de qualquer situação (seja ela envolvendo tiro ou não) e o jogador não tenha, poderá acarretar em suspesão de Allowlist.</li>
<li>Em casos de ações (blipadas ou não) é preciso começar a gravação 3 minutos antes e finalizar 3 minutos depois do término da ação.</li>
<li>Uma gravação de tela não pode ser cortada, sem áudio, incompleta ou com qualquer tipo de edição. Sujeito a suspensão da Allowlist sem aviso prévio.</li>
<li>As gravações podem ser solicitadas dentro de um período de até 7 dias .</li>
<li>É proibido qualquer tipo de movimento/rotação utilizando qualquer tipo de veículo tanto para a polícia quanto para o bandido durante ações fechadas. (exceção para o presidente da polícia).</li>
<li>É proibido entrar em interiores de casas em ações fechadas.</li>
<li>Proibido o uso de gasolina como arma em qualquer ação fechada.</li>
<li>Fica vetado utilizar adereços que possivelmente deixem os personagens invisíveis, como exemplo: Lustre do Banco Central, armário do Banco Central e etc.</li>
<li>Todas as ações fechadas de confronto direto entre Polícia x Ilegal só podem ser iniciadas após o início do anúncio feito pela polícia.</li>
<li>Exemplo 1: Em ações de Fleeca, quando o anúncio terminar, bandidos poderão sair de dentro do Fleeca e a polícia entrar no perímetro.</li>
<li>Exemplo 2: Em ações da Joalheria, quando o anúncio terminar, os bandidos poderão sair de dentro da Joalheria e a polícia entrar no perímetro.</li>
<li>Exemplo: Puxar o Fleeca da Life Invader e negociar para levar a troca de tiros para o açougue.</li>
<li>Qualquer ação levada a cabo fora do perímetro terá um adicional de 1 (um) policial sem contingente máximo.</li>
<li>Os bandidos podem fugir com o dinheiro 15 minutos após o roubo, caso a polícia não responda à ocorrência nesse período.</li>
</ul>
<h4>Resgate</h4>
<ul>
<li>Permitido resgates e rebeliões após ações de RUA em que o resgate tenha pego mais(+) de 200 serviços de prisão.</li>
<li>É proibido juntar facções é proibido resgatar em ações fechadas.</li>
<li>Os presos que pegaram mais(+) de 200 serviços têm o direito a uma ligação na DP ou no Presídio</li>
<li>Em casos de resgates mal sucedidos, seu tempo de prisão poderá ser significativamente aumentado.</li>
</ul>
<h4>Trafico de drogas</h4>
<ul>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente.</li>
<li>Refém: Proibido.</li>
</ul>
<h4>Corrida ilegal</h4>
<ul>
<li>Fuga limpa 100%.</li>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>Armamento permitido somente em caso de disparos contra os policiais ou em caso de QRR.</li>
</ul>`
      },

      {
        id: "sec-8",
        title: "Roubos e atividades criminosas",
        html: `<h4>Registradora & Caixa Eletrônico</h4>
<ul>
<li>É proibido utilizar veículos no interior da loja é utilizá-los como barreiras para impedir a entrada e saída do local.</li>
<li>Máximo de bandidos: 1 veículo cheio (independente de qual for).</li>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>Armamento: Permitido em caso de troca de tiro (tanto da parte dos bandidos quanto dos policiais).</li>
<li>Negociação: Inexistente.</li>
<li>Refém: Proibido.</li>
</ul>
<h4>Roubo á veiculo NPC/Furto</h4>
<ul>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>É proibido furtar veículos no HOSPITAL.</li>
<li>É proibido furtar veículos durante eventos oficiais da cidade.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.</li>
</ul>
<h4>Roubo á Residência</h4>
<ul>
<li>Fuga limpa 100%.</li>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>Armamento permitido somente em caso de disparos contra os policiais ou em caso de QRR.</li>
<li>A polícia não precisa aguardar o fim da coleta do roubo para seguir com o procedimento padrão.</li>
<li>É proibido durante uma fuga tentar arrombar em uma casa para tentar se esconder.</li>
<li>É proibido roubar a sua própria casa ou que você tenha a chave.</li>
</ul>
<h4>Loja de Armas</h4>
<ul>
<li>Bandidos: O tanto que quiser.</li>
<li>Máximo de policiais: O tanto que estiver disponivel para a QRU.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inesistente.</li>
<li>Refém: Proibido.</li>
</ul>
<h4>Loja de Bebidas</h4>
<ul>
<li>Bandidos: Minimo 2 maximo 15.</li>
<li>Máximo de policiais: O contigente.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente.</li>
<li>Refém: Proibido.</li>
<li>Proibido veículo dentro do perímetro.</li>
</ul>
<h4>Loja de Departamento</h4>
<ul>
<li>Bandidos: Mínimo 3 máximo 5 (máximo de 2 fora).</li>
<li>Máximo de policiais: O contigente.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente.</li>
<li>Refém: Proibido.</li>
<li>Proibido veículo dentro do perímetro.</li>
</ul>
<h4>Aeroporto Abandonado</h4>
<ul>
<li>Bandidos: Obrigatório 6.</li>
<li>Policiais: Obrigatório 8.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente, ação de confronto direto com a polícia.</li>
<li>Refém: Proibido.</li>
<li>Essa ação são totalmente Teti-Chão.</li>
<li>Proibido pular o MURO do perímetro.</li>
</ul>
<h4>Yellow Jack</h4>
<ul>
<li>Bandidos: Mínimo 4.</li>
<li>Máximo de policiais: O contigente.</li>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente, ação de confronto direto com a polícia.</li>
<li>Refém: Proibido.</li>
<li>Proibido veículo dentro do perímetro.</li>
</ul>
<h4>Galinheiro</h4>
<ul>
<li>Bandidos: Obrigatório 7. (TODOS DENTRO DO GALINHEIRO)</li>
<li>Máximo de policiais: O contigente.</li>
<li>Armamentos: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Inexistente, ação de confronto direto com a polícia.</li>
<li>Refém: Proibido.</li>
<li>Máximo de SMOKE: 4.</li>
<li>Proibido veículo dentro do perímetro</li>
</ul>
<h4>Joalheria</h4>
<ul>
<li>Bandidos: Obrigatório 7.</li>
<li>Máximo de policiais: Obrigatório 9.</li>
<li>Máximo de veículos por parte dos bandidos: 3 (em caso de fuga).</li>
<li>Armamentos: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Somente se tiver refém.</li>
<li>Refém: Opcional. (Máximo 3)</li>
<li>Proibido veículo dentro do perímetro.</li>
</ul>
<h4>Bancos Fleeca</h4>
<ul>
<li>Mínimo de bandidos: 6.</li>
<li>Máximo de policiais: Obrigatório 9.</li>
<li>Máximo de veículos por parte dos bandidos: 3.</li>
<li>Armamentos: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Refém: Máximo 3.</li>
<li>Proibido veículo dentro do perímetro.</li>
<li>Obs¹: Estacionamentos não são considerados como INTERIOR.</li>
</ul>
<h5>Banco Fleeca Life Invader</h5>
<ul>
<li>Armamentos: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Máximo 3 bandidos em prédios (Acessíveis com Escada) e 1 bandido em prédio (Não acessível a Escada).,</li>
<li>Proibido o uso da piscina & QUALQUER tipo de interior no perímetro da ação.</li>
<li>Proibido veículo dentro do perímetro.</li>
<li>Polícia não pode marcar saída do Fleeca.</li>
<li>Com atirador, permitido prédios. Sem atirador (totalmente chão).</li>
</ul>
<h5>Banco Fleeca Praia</h5>
<ul>
<li>Armamentos: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Negociação: Helidrone + teti chão.</li>
<li>Proibido interior da lojinha de departamento (cofre), casa da madeira limita 3 bandidos.</li>
<li>Proibido veículo dentro do perímetro.</li>
<li>Na casa da madeira fica limitado 3 bandidos.</li>
<li>Polícia não pode marcar saída do Fleeca.</li>
<li>Negociação: Ação de confronto com a direto com a policia, entretanto, deverá ocorrer obrigatoriamente a negociação, podendo ser levado para outros locais, desde que dentro dos parâmetros estabelecidos.</li>
</ul>
<h5>Banco Fleeca Shopping</h5>
<ul>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Com atirador, máximo 4 bandidos em prédios (Sem atirador, teti-chão).</li>
<li>Proibido usar metrô.</li>
<li>Negociação: Ação de confronto com a direto com a policia, entretanto, deverá ocorrer obrigatoriamente a negociação, podendo ser levado para outros locais, desde que dentro dos parâmetros estabelecidos.</li>
</ul>
<h5>Banco Fleeca Chaves</h5>
<ul>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Máximo 3 bandidos em prédios. (Acessíveis com escada). Quando a ação for teti chão, fica proibido o uso da pista de skate</li>
</ul>
<h5>Banco Fleeca Rota 68 (FUGA)</h5>
<ul>
<li>Armamento: É permitido qualquer armamento, disparos só são permitidos após 5 minutos de fuga. (caso os policias cheguem na QRU e você mate todos sem gerar um mínimo de RP, será considerado aplicado uma punição de 3 dias de banimento.)</li>
<li>Máximo de 4 CARROS (OBRIGATÓRIO)</li>
<li>Máximo de 9 BANDIDOS.</li>
<li>Máximo de policiais: O contigente.</li>
<li>O uso da palavra OBRIGATÓRIA significa que a ação não possui uma quantidade mínima ou máxima, mas sim uma quantidade EXATA a ser seguida.</li>
<li>Essa ação é apenas para FUGA; é proibido transformá-la em um confronto armado.</li>
</ul>
<h4>Banco Paleto</h4>
<ul>
<li>Bandidos: Obrigatório 10.</li>
<li>Máximo de policiais: Obrigatório 14.</li>
<li>Armamento: Obrigatório todos de Fuzil.</li>
<li>Máximo de veículos por parte dos bandidos: 3.</li>
<li>Negociação: Inexistente. A ação será iniciada somente quando a polícia entrar no perímetro da ação, (Obrigatório entrar na rádio para mediar a ação)</li>
<li>Refém: 1. (Troca da ação para fuga)</li>
<li>Proibido veículos dentro do perímetro. (Caso não seja na FUGA)</li>
<li>Máximo de SMOKE: 5.</li>
</ul>
<h4>Banco Central</h4>
<ul>
<li>Bandidos: Obrigatório 10.</li>
<li>Bandidos fora: Máximo 3 bandidos em prédios.</li>
<li>Máximo de policiais: Obrigatório 13, máximo de 25.</li>
<li>Máximo de veículos por parte dos bandidos: 4.</li>
<li>Armamento: Obrigatório todos de Fuzil.</li>
<li>Negociação: Obrigatória, caso tenha refém.</li>
<li>Refém: Máximo 4. (Para tirar os atiradores ou proibir o reposicionamento com o helicóptero, não podendo ser os dois ao mesmo tempo)</li>
<li>Proibido veículo dentro do perímetro.</li>
<li>Máximo de SMOKE: 10.</li>
</ul>`
      },

      {
        id: "sec-9",
        title: "Administração e denúncias",
        html: `<h4>Administração aos Jogadores</h4>
<p>Todos os jogadores estão sujeitos à constante análise pela administração do servidor para garantir o cumprimento efetivo das regras.</p>
<p>Jogadores que descumprirem regras ou não contribuírem para um ambiente sadio e justo estão sujeitos a punições administrativas.</p>
<p>A cidade é estritamente proibida para jogadores menores de 14 anos.</p>
<p>A administração tem autonomia para coletar evidências e banir ou suspender qualquer jogador do servidor.</p>
<p>Capturas de tela, vídeos, prints e arquivos de áudio são considerados meios de prova para punições administrativas.</p>
<p>A palavra de um administrador é igualmente considerada prova suficiente para suspensão ou banimento.</p>
<p>A administração tem total autonomia para monitorar e suspeitar do uso de softwares terceiros para obter vantagem no servidor.</p>
<p>Jogadores suspeitos de utilizar tais softwares podem passar por procedimentos de averiguação para voltarem a ser liberados no servidor.</p>
<p>Os procedimentos são detalhados na próxima seção.</p>
<h4>DENUNCIAS</h4>
<p>As denúncias são uma parte muito importante do nosso servidor, pois é por meio delas que conseguimos identificar erros e aplicar as punições necessárias quando alguém não age da forma correta. Para que tudo seja analisado e resolvido da melhor maneira possível, é importante que todas as denúncias sigam algumas regras. Pedimos, por gentileza, que cada uma seja feita conforme o que está descrito.</p>
<h4>REGRAS GERAIS SOBRE PROVAS</h4>
<ul>
<li>Toda denúncia DEVE conter VÍDEO, exceções em casos de Combat Logging (CL);</li>
<li>Áudio é obrigatório do denunciante e do denunciado;</li>
<li>Quebra de regras de ambos lados → Punição aplicada para ambos;</li>
<li>PRINTS NÃO SÃO ACEITOS, salvo quando explicitamente autorizado;</li>
</ul>
<h4>DENÚNCIAS QUE EXIGEM NO MÍNIMO 2 MINUTOS DE VÍDEO</h4>
<p>Obrigatoriamente 2 minutos ou mais, gravação contínua e sem cortes relevantes:</p>
<ul>
<li>RDM</li>
<li>Denúncia de Facção</li>
<li>Anti amor à Vida</li>
<li>Flaming</li>
<li>Ghost</li>
<li>Metagaming</li>
<li>Cop-bait</li>
<li>Power RP</li>
<li>Forçar RP</li>
<li>Quebra de Regras (quando não listado abaixo)</li>
</ul>
<p>Denúncias com menos de 2 minutos nessas categorias serão indeferidas automaticamente.</p>
<h4>DENÚNCIAS QUE EXIGEM NO MÍNIMO 1 MINUTO DE VÍDEO</h4>
<p>Podem ser analisadas com 1 minuto ou mais de gravação:</p>
<ul>
<li>Power Gaming (bate-bate se encaixa em PG).</li>
<li>Anti RP</li>
<li>Dark RP</li>
<li>Trash RP</li>
<li>VDM — Obrigatório conter 20 segundos após o atropelamento para verificação de socorro.</li>
</ul>`
      },

      {
        id: "sec-10",
        title: "Regras específicas e averiguação",
        html: `<h4>REGRAS ESPECÍFICAS OBRIGATÓRIAS</h4>
<ul>
<li>Combat Loggin (CL): O uso do comando /cl próximo ao jogador que desconectou. Print são aceitos, desde que todo o contexto anterior e posterior seja devidamente explicado. Clipe do CL não é obrigatório, mas auxilia na melhor compreensão do ocorrido.</li>
<li>Denúncias sem morte: Uso do comando /id próximo ao jogador no vídeo é obrigatório para identificação</li>
</ul>
<h4>FORMA CORRETA DE DENÚNCIA</h4>
<p>Denúncias devem ser feitas EXCLUSIVAMENTE via TICKET.</p>
<p>O ticket deve conter todas as provas exigidas, incluindo:</p>
<ul>
<li>→ Tempo mínimo de gravação.</li>
<li>→ Áudio de ambas partes.</li>
<li>→ ID quando necessário.</li>
<li>→ Contexto suficiente para análise.</li>
</ul>
<h4>AVISO FINAL</h4>
<ul>
<li>→ Cumprir o tempo mínimo não garante a aceitação da denúncia.</li>
<li>→ Vídeos sem contexto claro, editando ou inconclusivos podem ser recusados a critério da administração</li>
</ul>
<h4>PROCEDIMENTO DE AVERIGUAÇÃO</h4>
<p>Embora ninguém seja obrigado a aceitar a telagem, a administração poderá manter permanentemente banido quem a recusar, por suspeita de uso de softwares maliciosos, prezando pelo bom andamento do servidor e fazendo valer as regras de monitoramento administrativo e produção de provas.</p>
<ul>
<li>Ao suspeitar de um jogador, a administração poderá suspendê-lo temporariamente.</li>
<li>A suspensão visa impedir que o jogador prejudique o servidor durante a averiguação.</li>
<li>A suspensão será sempre comunicada ao jogador.</li>
<li>O jogador suspenso, quando comunicado da suspensão, terá prazos para iniciar contato com a administração:</li>
<li>Se logado, prazo de 1 hora para iniciar contato.</li>
<li>O jogador logado poderá ter a sua tela travada com uma mensagem solicitando o início de contato com a administração e, portanto, NÃO deverá desconectar até que a averiguação seja concluída.</li>
<li>O jogador, a partir do momento que iniciar contato, não deverá demorar mais do que 15 minutos para responder às consequentes exigências da administração.</li>
<li>Descumprir os prazos estipulados acima pode resultar em banimento permanente do jogador.</li>
<li>O jogador, ao iniciar o contato com a administração, deverá seguir as instruções da administração para ser telado via Echo e AnyDesk.</li>
<li>Os arquivos são benignos, sem risco ao computador, com documentação disponível online.</li>
<li>O jogador deve manter contato com a administração durante todo o processo.</li>
<li>Após a telagem, decisões podem incluir: Liberação, se não houver observância de arquivos maliciosos.</li>
</ul>
<p>Banimento permanente se observados:</p>
<ul>
<li>⚠️ Softwares desinstalados.</li>
<li>⚠️ Computador reiniciado ou formatado</li>
<li>⚠️ Arquivos suspeitos apagados</li>
<li>⚠️ Rastros de scripts ou programas proibidos.</li>
<li>⚠️ Interrupções de processos nativos (Windows Otimizados em versões não oficiais) que visam desativar processos suspeitos e afins. (BANIMENTO TEMPORÁRIO — Válido até a formatação do computador)</li>
<li>Jogadores que recusarem a telagem serão banidos por suspeita de cheat</li>
</ul>
<p>Excede-se a essa regra de não divulgação do RESULTADO da telagem àqueles casos em que o jogador de má-fé tentar difamar o servidor posteriormente ao seu banimento.</p>
<p>🔰 - A Fronteira Sul e seus administradores poderão, portanto, divulgar por meio de suas redes que determinado jogador foi banido por uso de softwares maliciosos.</p>
<p>🔰 - Este tópico, portanto, consiste em exceção à regra, de modo a proteger a imagem do servidor e as medidas dispostas serão tomadas somente em casos EXCEPCIONAIS. É importante ressaltar que o CONEXAOSC preza tanto pela transparência quanto pela segurança e preservação da imagem dos seus jogadores e ex-jogadores.</p>
<p>Essas regras visam criar um ambiente justo e sadio para todos os jogadores, garantindo transparência e segurança no servidor.</p>`
      },

      {
        id: "sec-11",
        title: "Modificações e recursos",
        html: `<h4>MODIFICAÇÕES</h4>
<p>É proibido fazer qualquer tipo de modificações visuais e sonoras de maneira que obtenha alguma vantagem em relação à configuração padrão ou que interfiram diretamente na dinâmica do roleplay.</p>
<ul>
<li>Ex: Modificar citizen (remover a noite, água, confete)</li>
<li>Ex: Utilizar Noprops (remover props do jogo)</li>
<li>Ex: Utilizar mod gráficos que remove itens/props</li>
<li>Ex: Mod de armas (alterar cores e modelos)</li>
<li>Ex: Mod de som que altera os passos;</li>
</ul>`
      },

      {
        id: "sec-12",
        title: "Ações e negociações",
        html: `<h4>REGRAS DE AÇÕES E NEGOCIAÇÕES Proibição de entrada após o início das negociações</h4>
<p>É estritamente proibido entrar ou interferir em uma ação após o início das negociações. Todos os envolvidos devem estar presentes antes do começo das negociações, sendo proibida a entrada de novos participantes durante esse processo.</p>
<h4>Negociação obrigatória com reféns</h4>
<p>Toda ação que envolver reféns deverá, obrigatoriamente, possuir uma negociação entre os criminosos e as forças policiais. Não será permitido iniciar ou prosseguir com a ação sem que haja uma tentativa de negociação.</p>
<h4>Valores para libertação de reféns</h4>
<p>O valor exigido para a libertação de um refém deverá ser razoável e proporcional à situação. É proibido exigir quantias excessivamente altas ou abusivas, com o objetivo de manter o realismo e o equilíbrio do Roleplay. Os valores deverão respeitar os limites estabelecidos pela administração da cidade.</p>
<h4>Respeito durante as negociações</h4>
<p>Todos os envolvidos deverão manter o respeito e agir de forma coerente com a situação, sem interromper indevidamente as negociações ou utilizar vantagens injustas para obter benefícios.</p>
<h4>Cumprimento das regras</h4>
<p>O descumprimento de qualquer uma dessas regras poderá resultar em advertências ou outras punições administrativas, de acordo com a gravidade da infração.</p>`
      }
    ],

    extrasHtml: `<h2>Multas de Trânsito</h2>
<p>pts = pontos na carteira (CNH).</p>
<h3>Infrações leves</h3>
<table>
<thead><tr><th>Infração</th><th>Valor</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Estacionar em local proibido</td><td>R$ 8.000</td><td>—</td></tr>
<tr><td>Dirigir sem utilizar faróis à noite</td><td>R$ 9.000</td><td>—</td></tr>
<tr><td>Não respeitar sinalização de estacionamento</td><td>R$ 10.000</td><td>—</td></tr>
<tr><td>Parar sobre faixa de pedestres</td><td>R$ 11.000</td><td>—</td></tr>
<tr><td>Trafegar com veículo danificado</td><td>R$ 12.000</td><td>—</td></tr>
<tr><td>Buzinar excessivamente</td><td>R$ 13.000</td><td>—</td></tr>
</tbody>
</table>
<h3>Infrações médias</h3>
<table>
<thead><tr><th>Infração</th><th>Valor</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Excesso de velocidade até 30%</td><td>R$ 16.000</td><td>2 pts</td></tr>
<tr><td>Avançar sinal vermelho</td><td>R$ 19.000</td><td>3 pts</td></tr>
<tr><td>Dirigir utilizando contramão</td><td>R$ 22.000</td><td>3 pts</td></tr>
<tr><td>Não respeitar placa de PARE</td><td>R$ 25.000</td><td>2 pts</td></tr>
<tr><td>Realizar conversão proibida</td><td>R$ 28.000</td><td>2 pts</td></tr>
<tr><td>Não dar preferência</td><td>R$ 30.000</td><td>—</td></tr>
</tbody>
</table>
<h3>Infrações graves</h3>
<table>
<thead><tr><th>Infração</th><th>Valor</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Excesso de velocidade acima de 30%</td><td>R$ 38.000</td><td>4 pts</td></tr>
<tr><td>Ultrapassagem em local proibido</td><td>R$ 42.000</td><td>4 pts</td></tr>
<tr><td>Conduzir sem habilitação</td><td>R$ 48.000</td><td>—</td></tr>
<tr><td>Direção perigosa</td><td>R$ 53.000</td><td>5 pts</td></tr>
<tr><td>Trafegar pela calçada</td><td>R$ 58.000</td><td>3 pts</td></tr>
<tr><td>Fugir de abordagem policial</td><td>R$ 65.000</td><td>5 pts</td></tr>
</tbody>
</table>
<h3>Infrações gravíssimas</h3>
<table>
<thead><tr><th>Infração</th><th>Valor</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Participar de racha</td><td>R$ 75.000</td><td>6 pts</td></tr>
<tr><td>Dirigir sob efeito de álcool</td><td>R$ 82.000</td><td>7 pts</td></tr>
<tr><td>Atropelar e fugir sem prestar socorro</td><td>R$ 90.000</td><td>8 pts</td></tr>
<tr><td>Conduzir veículo roubado</td><td>R$ 98.000</td><td>—</td></tr>
<tr><td>Provocar acidente por direção perigosa</td><td>R$ 105.000</td><td>8 pts</td></tr>
<tr><td>Dirigir colocando vidas em risco</td><td>R$ 115.000</td><td>10 pts</td></tr>
</tbody>
</table>
<h3>Infrações de extrema gravidade</h3>
<table>
<thead><tr><th>Infração</th><th>Valor</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Tentar atropelar intencionalmente um cidadão</td><td>R$ 120.000</td><td>12 pts</td></tr>
<tr><td>Utilizar veículo para atacar policiais</td><td>R$ 128.000</td><td>12 pts</td></tr>
<tr><td>Provocar acidente com múltiplas vítimas</td><td>R$ 135.000</td><td>15 pts</td></tr>
<tr><td>Fugir de perseguição causando acidentes graves</td><td>R$ 142.000</td><td>15 pts</td></tr>
<tr><td>Causar acidente intencional com vítimas</td><td>R$ 150.400</td><td>20 pts</td></tr>
</tbody>
</table>
<h2>Regras de aplicação</h2>
<ul>
<li>Toda multa deverá possuir registro da infração.</li>
<li>O policial deverá informar o motivo da autuação.</li>
<li>O cidadão poderá solicitar revisão da multa.</li>
<li>Infrações reincidentes poderão receber penalidades adicionais, conforme o regulamento da cidade.</li>
<li>Infrações que também constituam crimes poderão resultar em prisão, além da multa.</li>
<li>Apreensão do veículo poderá ser aplicada quando prevista no código da cidade.</li>
</ul>
<h2>CNH</h2>
<ul>
<li>0 a 9 pontos: situação regular.</li>
<li>10 a 14 pontos: advertência.</li>
<li>15 a 19 pontos: suspensão em análise.</li>
<li>20 pontos: suspensão obrigatória da CNH.</li>
<li>Após suspensão, o cidadão deverá cumprir o prazo estabelecido pela legislação da cidade e realizar a regularização da habilitação.</li>
</ul>`
  },

  police: {
    tabLabel: "Regras da Polícia",
    hero: {
      label: "CENTRAL DE REGRAS",
      titleHtml: "Polícia justa. <em>Cidade segura.</em>",
      subtitle: "Consulte o regulamento interno da Polícia da Fronteira do Sul. As regras valem para todos os agentes em serviço, dentro e fora de operações.",
      meta: ""
    },
    docLabel: "DOCUMENTO DA POLÍCIA",
    docTitle: "Regulamento da Polícia",
    highlight: {
      badge: "CONSULTA ABERTA",
      tag: "REGRA DE INTEGRIDADE",
      title: "O abuso de autoridade é proibido",
      text: "Todo agente deve agir dentro da legalidade e do bom senso. Uso excessivo de força, abordagem discriminatória e arbítrio serão tratados como infração disciplinar e podem resultar em suspensão ou remoção da função."
    },

    sections: [
      {
        id: "pol-1",
        title: "Princípios e conduta",
        html: `<p>A Polícia da Fronteira do Sul existe para proteger a população, garantir a ordem pública e dar suporte ao roleplay da cidade. Todo agente representa a instituição e deve agir com ética, imparcialidade e respeito.</p>
<ul>
<li>É obrigatório tratar todos os cidadãos com respeito, independentemente de etnia, gênero, religião ou facção.</li>
<li>Discussões pessoais, provocações e desavenças entre policiais são proibidas em serviço.</li>
<li>O uso do uniforme impõe responsabilidade: conduta fora do serviço também pode ser analisada pela administração.</li>
<li>Polícias não podem se envolver em ações ilegais, aceitar propinas ou favorecer criminosos de qualquer forma.</li>
<li>É proibido divulgar informações de operações em andamento para pessoas não autorizadas.</li>
</ul>`
      },
      {
        id: "pol-2",
        title: "Abordagem e prisão",
        html: `<ul>
<li>Toda abordagem deve ter fundamento: suspeita razoável, denúncia, mandado ou flagrante delito.</li>
<li>Ao abordar, identifique-se como policial, informe o motivo e trate o cidadão com educação.</li>
<li>Presos devem ser levados à delegacia ou presídio com segurança, informando o motivo da prisão.</li>
<li>É proibido prender sem justificativa, revistar sem motivo ou reter cidadãos por tempo excessivo.</li>
<li>Reversões de prisão somente são válidas com autorização do Alto Comando ou correção formal do erro.</li>
<li>Requisições de soltura seguem o protocolo da cidade: apenas through o sistema de tickets e com aprovação da administração.</li>
</ul>`
      },
      {
        id: "pol-3",
        title: "Uso da força",
        html: `<ul>
<li>O uso de força deve ser progressivo e proporcional à resistência.</li>
<li>Tiro para matar só é permitido em legítima defesa, para proteger terceiros ou em ações autorizadas com risco comprovado.</li>
<li>É proibido atirar em reféns, em pessoas desarmadas que não oferecem risco ou em alvos já neutralizados.</li>
<li>Abate somente com aviso prévio: avise o suspeito de parar antes de abrir fogo, sempre que possível.</li>
<li>O abuso de força, execução sumária e tortura resultam em banimento, conforme o regulamento geral.</li>
</ul>`
      },
      {
        id: "pol-4",
        title: "QRU, reféns e negociação",
        html: `<ul>
<li>QRU é acionada pelo despacho oficial; sem despacho não há deslocamento de viaturas.</li>
<li>Ao chegar ao local, siga o perímetro estabelecido e as ordens do responsável pela ação.</li>
<li>Negociação com criminosos deve ser conduzida por agente autorizado, com frieza e sem promessas impossíveis.</li>
<li>Reféns devem ser tratados com cuidado e jamais usados como escudo ou alvo.</li>
<li>Contingentes, limites de viaturas e regras específicas de cada ação seguem o regulamento geral da cidade.</li>
<li>Encerrada a ação, é obrigatório registrar o ocorrido e prestar contas à administração.</li>
</ul>`
      },
      {
        id: "pol-5",
        title: "Patrulhamento e viaturas",
        html: `<ul>
<li>Patrulhe as áreas de maior movimento da cidade e responda a chamados com prioridade.</li>
<li>Viaturas devem ser utilizadas com responsabilidade: proibido danificar, abandonar ou usar o veículo para diversão em serviço.</li>
<li>É proibido estacionar viaturas bloqueando portas, garagens, hospitais ou saídas de estabelecimentos.</li>
<li>Radio-carros e helicópteros seguem as mesmas regras de abordagem e uso de força.</li>
<li>Perseguições devem respeitar as regras de fuga da cidade: sem manobras perigosas forçadas (VDM) e com RP de direção.</li>
</ul>`
      },
      {
        id: "pol-6",
        title: "Rádio e comunicação",
        html: `<ul>
<li>Mantenha o rádio organizado: apenas informações úteis, sem conversa fiada durante operações.</li>
<li>Códigos e chamadas devem ser usados de forma coerente; rádio não é canal de provocação.</li>
<li>É proibido compartilhar canais de rádio da polícia com civis ou facções.</li>
<li>Denúncias internas, dúvidas de procedimento e pedidos de reforço seguem a hierarquia da corporação.</li>
</ul>`
      },
      {
        id: "pol-7",
        title: "Infrações e punições internas",
        html: `<ul>
<li>Descumprir procedimentos, agir com má-fé ou ignorar ordens do Alto Comando resulta em advertência, suspensão ou remoção.</li>
<li>Polícia que descumprir regras em ações (por exemplo, entrar no perímetro antes do anúncio) será punida conforme o regulamento geral.</li>
<li>Desonestidade em relatos, omissão de prova ou proteção a criminosos configura infração grave.</li>
<li>Reincidência em infrações leves converte-se automaticamente em infração grave.</li>
<li>Toda punição pode ser recorrida pelo sistema de tickets, apresentando as provas do ocorrido.</li>
</ul>
<p>Polícia boa é a que respeita as regras, o cidadão e o roleplay da cidade.</p>`
      }
    ],
    extrasHtml: `<h2>Código de ética resumido</h2>
<ul>
<li>Proteger, servir e respeitar.</li>
<li>Agir com proporcionalidade na força.</li>
<li>Preservar a vida sempre que possível.</li>
<li>Zero tolerância a corrupção e abuso.</li>
</ul>`
  },

  gallery: []
};
