<div align="center">

# 🍊 Orange HRM — Cypress Test Suite

[![Cypress](https://img.shields.io/badge/Cypress-15.x-04C38E?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Page Object Model](https://img.shields.io/badge/Pattern-Page%20Object%20Model-blue?style=for-the-badge)](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://github.com/brunno3356/primeiros-passos-cypress)

**Suíte completa de testes automatizados E2E para o sistema [Orange HRM](https://opensource-demo.orangehrmlive.com/)**  
Cobrindo 8 módulos | 50+ cenários de teste | Testes de carga e segurança incluídos

</div>

---

## 📋 Sobre o Projeto

Este projeto contém uma suíte abrangente de testes automatizados End-to-End (E2E) desenvolvida com **Cypress** para o sistema **Orange HRM**, um sistema open-source de gerenciamento de recursos humanos.

Os testes cobrem os principais módulos do sistema e incluem:
- ✅ Cenários de **sucesso** (fluxos felizes)
- ❌ Cenários de **falha** (validações e erros esperados)
- ⚠️ Cenários de **limite/borda** (strings com +300 caracteres, campos vazios)
- 🔒 Cenários de **segurança** (SQL Injection, XSS)
- ⚡ **Testes de carga** (login repetido, navegação em massa, tempo de resposta de API)

---

## 🗂️ Módulos Cobertos

| Módulo | Arquivo de Spec | Cenários | Tipos |
|--------|----------------|----------|-------|
| 🔐 **Login** | `login.spec.cy.js` | 13 | ✅ Sucesso, ❌ Falha, ⚠️ Limite, 🔒 Segurança |
| 👤 **My Info** | `user.spec.cy.js` | 7 | ✅ Sucesso, ⚠️ +300 chars, ❌ Campo obrigatório |
| 🧑‍💼 **PIM** | `pim.spec.cy.js` | 9 | ✅ Busca, ❌ Não encontrado, ⚠️ Limite, 🔒 XSS |
| 📅 **Leave** | `leave.spec.cy.js` | 8 | ✅ Acesso, ❌ Sem data, ⚠️ Data inválida |
| 📋 **Recruitment** | `recruitment.spec.cy.js` | 7 | ✅ Vagas, ❌ Candidato inexistente, ⚠️ Limite |
| 🏠 **Dashboard** | `dashboard.spec.cy.js` | 9 | ✅ Widgets, navegação, perfil |
| 📊 **Performance** | `performance.spec.cy.js` | 5 | ✅ KPIs, sub-menus, My Reviews |
| ⚡ **Carga** | `load.spec.cy.js` | 6 | 🔁 Login 5x, 6 módulos, interceptação de API |

**Total: ~64 cenários de teste**

---

## 📁 Estrutura do Projeto

```
primeiros-passos-cypress/
│
├── cypress/
│   ├── e2e/                          # Arquivos de teste (specs)
│   │   ├── login.spec.cy.js          # 🔐 Testes de Login
│   │   ├── user.spec.cy.js           # 👤 Testes de My Info
│   │   ├── pim.spec.cy.js            # 🧑‍💼 Testes de PIM
│   │   ├── leave.spec.cy.js          # 📅 Testes de Leave
│   │   ├── recruitment.spec.cy.js    # 📋 Testes de Recruitment
│   │   ├── dashboard.spec.cy.js      # 🏠 Testes de Dashboard
│   │   ├── performance.spec.cy.js    # 📊 Testes de Performance
│   │   └── load.spec.cy.js           # ⚡ Testes de Carga
│   │
│   ├── pages/                        # Page Objects (POM)
│   │   ├── loginPage.js              # Seletores e ações da tela de login
│   │   ├── dashboardPage.js          # Seletores e ações do dashboard
│   │   ├── menuPage.js               # Navegação pelo menu lateral
│   │   ├── myInfoPage.js             # Formulário My Info
│   │   ├── pimPage.js                # Busca e tabela do PIM
│   │   ├── leavePage.js              # Formulário e lista de licenças
│   │   ├── recruitmentPage.js        # Vagas e candidatos
│   │   └── performancePage.js        # KPIs e reviews
│   │
│   ├── fixtures/
│   │   └── userData.json             # Dados de teste (usuários, strings longas, etc.)
│   │
│   └── support/
│       ├── commands.js               # Comandos customizados Cypress
│       └── e2e.js                    # Configuração global de suporte
│
├── cypress.config.js                 # Configuração do Cypress
├── package.json                      # Dependências e scripts NPM
└── README.md                         # Documentação do projeto
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) v8 ou superior
- Acesso à internet (os testes rodam contra `https://opensource-demo.orangehrmlive.com`)

---

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/brunno3356/primeiros-passos-cypress.git
cd primeiros-passos-cypress
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Abrir o Cypress em modo interativo

```bash
npm run cypress:open
```

### 4. Rodar todos os testes em modo headless

```bash
npm test
```

### 5. Rodar testes por módulo

```bash
# Apenas Login
npm run test:login

# Apenas PIM
npm run test:pim

# Apenas Leave (Licenças)
npm run test:leave

# Apenas Recruitment
npm run test:recruitment

# Apenas Dashboard
npm run test:dashboard

# Apenas Performance
npm run test:performance

# Apenas My Info
npm run test:myinfo

# Apenas Testes de Carga
npm run test:load
```

---

## 🔬 Detalhes dos Cenários de Teste

### 🔐 Login
| Cenário | Tipo | Esperado |
|---------|------|----------|
| Credenciais válidas | ✅ Sucesso | Redireciona para Dashboard |
| Usuário inválido | ❌ Falha | Mensagem "Invalid credentials" |
| Ambos os campos vazios | ❌ Falha | Mensagem "Required" |
| Username com +300 chars | ⚠️ Limite | Não autentica, permanece na tela de login |
| Password com +300 chars | ⚠️ Limite | Não autentica, permanece na tela de login |
| SQL Injection | 🔒 Segurança | Não autentica, sistema estável |

### 🧑‍💼 PIM
| Cenário | Tipo | Esperado |
|---------|------|----------|
| Buscar "Admin" | ✅ Sucesso | Pelo menos 1 resultado |
| Buscar nome inexistente | ❌ Falha | "No Records Found" |
| Busca com +300 chars | ⚠️ Limite | Sistema não trava |
| Busca com XSS `<script>` | 🔒 Segurança | Script não executado |

### 👤 My Info
| Cenário | Tipo | Esperado |
|---------|------|----------|
| Atualização com dados válidos | ✅ Sucesso | Toast "Successfully Saved" |
| Nickname com exatamente 300 chars | ⚠️ Limite | Campo aceita sem erro |
| Nickname com +300 chars | ⚠️ Limite | Sistema não trava |
| Salvar com First Name vazio | ❌ Falha | Não salva |

---

## ⚡ Testes de Carga

Os testes em `load.spec.cy.js` simulam uso intenso do sistema:

| Teste | Descrição | Threshold |
|-------|-----------|-----------|
| Login repetido | 5 ciclos de login → dashboard → logout | Sistema deve permanecer estável |
| Navegação em massa | 6 módulos em sequência sem reload | Todos devem carregar |
| Busca repetida | 8 buscas no PIM com termos variados | Sem degradação visível |
| Tempo de carga | Dashboard após login | < 10 segundos |
| API Response | Endpoint PIM interceptado | Status 200/302 |

> **📌 Nota:** Para testes de carga real (milhares de usuários concorrentes), recomenda-se ferramentas como [k6](https://k6.io/), [Apache JMeter](https://jmeter.apache.org/) ou [Artillery](https://www.artillery.io/). O Cypress realiza simulação de carga sequencial em E2E.

---

## 🛠️ Comandos Customizados

O projeto inclui comandos Cypress reutilizáveis em `cypress/support/commands.js`:

```javascript
// Login direto sem passar pela UI toda vez
cy.loginAs()                          // Login como Admin (padrão)
cy.loginAs('username', 'password')    // Login com credenciais específicas

// Logout da aplicação
cy.logout()

// Aguardar spinner sumir
cy.waitForLoader()

// Navegar pelo menu lateral
cy.navigateTo('PIM')
cy.navigateTo('Leave')
```

---

## 🧩 Padrão Page Object Model (POM)

O projeto segue o padrão **Page Object Model**, onde cada página/módulo tem sua própria classe com:
- `selectors()` — todos os seletores CSS organizados
- Métodos de ação — `fillForm()`, `clickButton()`, etc.
- Métodos de verificação — `checkTitle()`, `checkResultsFound()`, etc.

```javascript
// Exemplo de uso
import PimPage from '../pages/pimPage.js'

const pimPage = new PimPage()

pimPage.accessPimModule()
pimPage.searchByName('Admin')
pimPage.checkResultsFound()
```

---

## 🌐 Ambiente de Teste

| Item | Valor |
|------|-------|
| **URL Base** | `https://opensource-demo.orangehrmlive.com/web/index.php` |
| **Usuário Admin** | `Admin` |
| **Senha Admin** | `admin123` |
| **Módulos Testados** | Login, PIM, Leave, Recruitment, Dashboard, Performance, My Info |

> ⚠️ O ambiente de demonstração é público e compartilhado. Os dados podem ser resetados periodicamente.

---

## 📦 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [Cypress](https://www.cypress.io/) | ^15.0.0 | Framework de testes E2E |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | ES6+ | Linguagem de programação |
| [Chance.js](https://chancejs.com/) | ^1.1.13 | Geração de dados aleatórios |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |

---

## 👨‍💻 Autor

**Brunno** — [@brunno3356](https://github.com/brunno3356)

QA Engineer | Cypress | Playwright | Automação de Testes

---

<div align="center">

Feito com ☕ e muito `cy.get()`

⭐ Se este projeto te ajudou, deixa uma estrela no repositório!

</div>
