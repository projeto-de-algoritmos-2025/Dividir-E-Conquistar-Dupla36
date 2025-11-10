## 🎬 Rankify: Sistema de Recomendação de Filmes por Similaridade de Ranqueamento

**Número da Lista**: 36

**Conteúdo da Disciplina**: FGA0124 - PROJETO DE ALGORITMOS - T01

## 👩‍💻 Alunos

<div align="center">
<table>
  <tr>
    <td align="center"><a href="https://github.com/danielle-soaress"><img style="border-radius: 50%;" src="https://github.com/danielle-soaress.png" width="190;" alt=""/><br /><sub><b>Danielle Soares</b></sub></a></td>
    <td align="center"><a href="https://github.com/Leticia-Arisa-K-Higa"><img style="border-radius: 50%;" src="https://github.com/Leticia-Arisa-K-Higa.png" width="190px;" alt=""/><br /><sub><b>Leticia Arisa</b></sub></a></td>
  </tr>
</table>

| Matrícula   | Aluno                          |
| ----------- | ------------------------------ |
| 23/1012058  | Danielle Soares da Silva       |
| 23/1012272  | Leticia Arisa Kobayashi Higa   |
</div>

## 🎬 Apresentação do Projeto

<div align="center">

<a href="https://youtu.be/dY56_IJ9qys"><img src="https://i.imgur.com/kzR0glG.png" width="50%"></a>
</div>

<div align="center">
Link: <a href="https://youtu.be/dY56_IJ9qys"> https://youtu.be/dY56_IJ9qys</a>
  <br>
Autores: <a href=https://github.com/danielle-soaress">Danielle Soares</a> e <a href=https://github.com/Leticia-Arisa-K-Higa">Leticia Arisa</a>.
</div>

## 🎯 Objetivo

Desenvolver um **Sistema de Recomendação de Filmes** que utilize a **similaridade de ranqueamento** para sugerir novos títulos aos usuários. O projeto foca na aplicação prática de métricas de correlação de ordem para identificar perfis de gosto semelhantes.

O sistema deve:

  * Permitir ao usuário **ranquear** filmes explicitamente (do mais ao menos preferido).
  * Implementar a **Contagem de Inversões** para medir a afinidade entre as listas de usuários.
  * Recomendar filmes do "vizinho mais próximo" que ainda não constem na lista ativa.

## 🔧 Tecnologias

  * **Linguagens:** HTML5, CSS3, **JavaScript**
  * **APIs/Armazenamento:**
      * **OMDb API** → Busca e obtenção de metadados dos filmes (títulos, posters).
      * **`localStorage`** → Persistência local da base de dados de usuários e suas listas ranqueadas.

## 🧠 Modelagem do Algoritmo (Contagem de Inversões)

  * **Ranqueamento:** Cada filme na lista de preferência do usuário representa um ranque, sendo a posição de índice `0` (zero) a maior preferência.
  * **Métrica Central:** O algoritmo utiliza a **Contagem de Inversões** para quantificar a discordância na ordem de preferência dos filmes em comum entre dois usuários ($L_A$ e $L_B$).
  * **Definição de Inversão:** Um par de filmes em comum é uma inversão se a ordem de preferência em $L_A$ for o oposto da ordem em $L_B$.
  * **Resultado:** O perfil que apresentar o **menor número de inversões** é designado como o **"Vizinho Mais Próximo"** e é usado como a fonte primária de recomendações.


## 🧩 Como funciona

1.  **Gerenciamento de Lista:**

      * O usuário digita seu nome e pode carregar sua lista salva localmente ou criar uma nova.
      * A **ordem** dos filmes na lista é crucial, pois define o ranqueamento.

2.  **Busca e Adição:**

      * Filmes são buscados através da **OMDb API**.
      * Ao clicar no poster, o filme é adicionado ao topo da lista, tornando-se a preferência mais recente.

3.  **Execução do Algoritmo:**

      * Ao solicitar recomendações, o sistema executa a **Contagem de Inversões** comparando a lista ativa com toda a base de usuários.

4.  **Geração da Recomendação:**

      * Os filmes sugeridos são aqueles presentes na lista do vizinho mais próximo, mas que não foram ranqueados pelo usuário ativo.


## 🚀 Como executar

1.  **Clonar o repositório**

<!-- end list -->

```bash
git clone https://www.youtube.com/shorts/3mMG25WHLkU
```

2.  Entre na pasta do projeto

<!-- end list -->

```bash
cd RankMatch
```

3.  Executar o programa

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.


## 💡 Observações

Sistema desenvolvido para o curso de Engenharia de Software da UnB-FCTE.
